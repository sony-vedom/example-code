import { ComponentProps, forwardRef, useMemo } from "react";
import styles from "./Checkbox.module.scss";

type CheckboxVariants = "primary" | "squared" | "flag" | "flag-red";

type Props = ComponentProps<"input"> & {
    variant?: CheckboxVariants;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(
    ({ variant = "primary", className = "", disabled = false, ...props }: Props, baseRef) => {
        const classNames = useMemo(() => {
            const classesMap = new Map<CheckboxVariants, string>([
                ["squared", styles.squared],
                ["primary", ""],
            ]);
            const selectedClasses: string[] = [styles.switch, classesMap.get(variant), className];
            return selectedClasses.join(" ");
        }, [variant, className]);

        return (
            <div className={`relative ${styles[variant]}  ${classNames}`}>
                <input
                    ref={baseRef}
                    type="checkbox"
                    name="remember"
                    disabled={disabled}
                    {...props}
                />
                <div />
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";
