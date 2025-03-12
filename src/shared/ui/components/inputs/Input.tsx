import { ComponentProps, ReactNode, forwardRef, memo, useImperativeHandle, useMemo, useRef } from "react";
import { cn, useId } from "shared/libs";
import { InputVariant, inputVariants } from "./variants";

type Props = ComponentProps<"input"> & {
    variant?: InputVariant;
    children?: ReactNode;
};

export const Input = memo(
    forwardRef<HTMLInputElement, Props>(({ className = "", id, variant = "primary", children, ...props }, baseRef) => {
        const classNames = useMemo(
            () => cn(inputVariants.get(variant) || inputVariants.get("primary"), className),
            [className]
        );
        const identifier = useId({ id, prefix: "input" });
        const ref = useRef<HTMLInputElement>();
        useImperativeHandle(baseRef, () => ref.current!);

        const focusInput = () => ref.current.focus();

        return (
            <div
                className={classNames}
                onClick={focusInput}
                data-component="Input"
            >
                <input
                    ref={ref}
                    id={identifier}
                    className="size-full border-0 bg-transparent p-0 text-size-inherit font-weight-inherit leading-none text-inherit outline-0 transition-all"
                    {...props}
                />
                {children}
            </div>
        );
    })
);

Input.displayName = "Input";
