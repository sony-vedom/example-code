import {
    useRef,
    useMemo,
    useImperativeHandle,
    ReactNode,
    MutableRefObject,
    ComponentPropsWithRef,
    forwardRef,
} from "react";
import { Preloader } from "components";
import { cn, useApp } from "shared/libs";
import { ButtonVariants, variants } from "./variants";

type ButtonPreloaderProps = {
    btnRef: MutableRefObject<HTMLButtonElement | null>;
};

const ButtonPreloader = ({ btnRef }: ButtonPreloaderProps) => {
    const preloaderSize = btnRef.current ? btnRef.current.offsetHeight * 0.5 + "px" : "50%";
    return <Preloader height={preloaderSize} />;
};

export type ButtonProps = ComponentPropsWithRef<"button"> & {
    children: ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
    variant?: ButtonVariants;
    className?: string;
    "data-component"?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { children, disabled, isLoading, variant = "primary", type = "button", className, ...props }: ButtonProps,
    ref
) {
    const { theme } = useApp();
    const btnRef = useRef<HTMLButtonElement | null>(null);
    useImperativeHandle(ref, () => btnRef.current!);

    const buttonClasses = useMemo(
        () => cn(variants.get(variant) ?? variants.get("primary"), className || ""),
        [variant, className, disabled]
    );

    return (
        <button
            ref={btnRef}
            data-theme={theme}
            data-component="button"
            disabled={isLoading || disabled}
            className={buttonClasses}
            type={type}
            {...props}
        >
            {!isLoading ? <span className="content">{children}</span> : <ButtonPreloader btnRef={btnRef} />}
        </button>
    );
});
