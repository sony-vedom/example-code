import React, { ComponentProps, forwardRef, memo, useEffect, useMemo, useState } from "react";
import { cn, useId } from "shared/libs";
import { z } from "zod";
import styles from "./ColorTextInput.module.scss";
import { Input } from "./Input";

type Props = Omit<ComponentProps<"input">, "ref"> & {
    color: string;
    setColor: (color: string) => void;
};

const isColor = (color: string): boolean => {
    return CSS.supports("color", color);
};
const validationColorSchema = z.string().refine(isColor);

export const ColorTextInput = memo(
    forwardRef<HTMLInputElement, Props>(
        ({ id, color, setColor, disabled = false, className, ...props }: Props, baseRef) => {
            const identifier = useId({ id, prefix: "color-picker-" });
            const [value, setValue] = useState(color);
            const hasError = useMemo(() => !validationColorSchema.safeParse(value).success, [value]);
            const classNames = useMemo(
                () => cn(styles.color, hasError && styles.error, className),
                [className, hasError]
            );

            useEffect(() => {
                if (color === value) return;
                setValue(color);
            }, [color]);

            useEffect(() => {
                try {
                    validationColorSchema.parse(value);
                    setColor(value);
                } catch (e) {
                    // noop
                }
            }, [value]);

            return (
                <Input
                    ref={baseRef}
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => setValue(e.target?.value || "")}
                    title="Text color input field"
                    className={classNames}
                    id={`${identifier}-text`}
                    disabled={disabled}
                    variant="clear"
                    data-component="color-text-input"
                    {...props}
                >
                    <input
                        id={`${identifier}-color-input`}
                        type="color"
                        value={color ?? ""}
                        onChange={(e) => setValue(e.target?.value || "")}
                    />
                </Input>
            );
        }
    )
);

ColorTextInput.displayName = "ColorTextInput";
