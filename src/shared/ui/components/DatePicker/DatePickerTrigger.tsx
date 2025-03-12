import { ComponentProps, forwardRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "shared/libs";
import { triggerVariants } from "./constants";
import { DatePickerOpenContext, DatePickerValueContext, DatePickerVariantContext } from "./context";

type Props = ComponentProps<"button">;

export const DatePickerTrigger = forwardRef<HTMLButtonElement, Props>(
    ({ className, onClick, ...props }: Props, ref) => {
        const { t } = useTranslation();
        const { prevValue, nextValue } = useContext(DatePickerValueContext);
        const variant = useContext(DatePickerVariantContext);
        const { toggleIsOpen } = useContext(DatePickerOpenContext);
        const classes = cn(triggerVariants.get(variant), className);

        return (
            <button
                ref={ref}
                className={classes}
                onClick={(e) => {
                    toggleIsOpen();
                    onClick?.(e);
                }}
                data-component="date-picker-trigger"
                {...props}
            >
                {`${t("с")} ${!!prevValue ? prevValue.toLocaleDateString() : "..."} – ${t("по")} ${!!nextValue ? nextValue.toLocaleDateString() : "..."}`}
            </button>
        );
    }
);

DatePickerTrigger.displayName = "DatePickerTrigger";
