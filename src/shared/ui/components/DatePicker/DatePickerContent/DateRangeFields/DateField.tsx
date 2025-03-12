import { ComponentProps, forwardRef, memo, useEffect, useState } from "react";
import CloseSmallIcon from "assets/icons/close-small-black.svg?react";
import { appStore, cn, logger } from "shared/libs";
import { z } from "zod";

const dateValidationScheme = z
    .string()
    .max(10)
    .refine(
        (date) => {
            const data = date.match(/\d+/g);
            if (!data || data.length !== 3 || data[2].length !== 4) {
                return false;
            }

            const year = parseInt(data[2]);
            const month = parseInt(data[1]);
            const day = parseInt(data[0]);

            if (month > 12 || month < 1) {
                return false;
            }
            const lastDay = new Date(year, month - 1, 0).getDate();
            if (day > lastDay || day < 1) {
                return false;
            }

            return true;
        },
        {
            message: "",
        }
    );

const convertDateToString = (value: Date | null, locale: string) =>
    !!value ? value.toLocaleDateString(locale, { year: "numeric", month: "2-digit", day: "2-digit" }) : "";

type Props = Omit<ComponentProps<"input">, "value" | "max" | "onChange"> & {
    value: Date | null;
    max?: Date | null;
    onChange: (value: Date | null) => void;
};

export const DateField = memo(
    forwardRef<HTMLInputElement, Props>(
        ({ value, onChange, onBlur, max, className, type = "text", ...props }: Props, ref) => {
            const locale = appStore((state) => state.locale);
            const [val, setVal] = useState("");
            const [hasError, setHasError] = useState(false);

            const isInsideRange = (v: Date) => (!!max && !!v ? v.getTime() <= max.getTime() : true);
            useEffect(() => {
                if (isInsideRange(value)) {
                    setVal(convertDateToString(value, locale));
                    setHasError(false);
                } else {
                    setHasError(true);
                }
            }, [value, locale]);

            useEffect(() => {
                if (!val) {
                    return;
                }

                (async () => {
                    try {
                        await dateValidationScheme.parseAsync(val);
                        const data = val.match(/\d+/g);
                        const newVal = new Date(parseInt(data[2]), parseInt(data[1]) - 1, parseInt(data[0]));

                        if (isInsideRange(newVal) === false) {
                            throw new Error("New value is out of range");
                        }

                        if (newVal.getTime() !== value.getTime()) {
                            onChange(newVal);
                        }

                        setHasError(false);
                    } catch (e) {
                        logger.error(e);
                        setHasError(true);
                    }
                })();
            }, [val]);

            const handleClear = () => {
                setVal("");
                onChange(null);
                setHasError(false);
            };

            return (
                <fieldset
                    className={cn(
                        "grid min-w-[auto] grid-cols-[1fr_auto] gap-1 rounded border-2 border-solid border-transparent bg-[#D989FF30] p-0.5",
                        hasError && "border-[#f09]",
                        className
                    )}
                >
                    <input
                        ref={ref}
                        type={type}
                        value={val}
                        className={cn(
                            "w-full flex-1 bg-transparent text-xxs font-semibold text-[#00000088] outline-none placeholder:text-[#00000030] dark:text-[#ffffff88] dark:placeholder:text-[#ffffff30]"
                        )}
                        onChange={(e) => setVal(e.target.value)}
                        onBlur={(e) => {
                            if (hasError) {
                                setVal(convertDateToString(value, locale));
                            }
                            onBlur?.(e);
                        }}
                        {...props}
                    />
                    {!!val && (
                        <button
                            className="group"
                            onClick={handleClear}
                        >
                            <CloseSmallIcon className="size-2 transition-all group-hover:scale-125 group-active:scale-90 [&_path]:fill-[#00000030] group-hover:[&_path]:fill-[#00000088] dark:[&_path]:fill-[#ffffff30] dark:group-hover:[&_path]:fill-[#ffffff88]" />
                        </button>
                    )}
                </fieldset>
            );
        }
    )
);

DateField.displayName = "DateField";
