import { ComponentProps, forwardRef, useImperativeHandle, useRef } from "react";
import EyeClosedIcon from "assets/icons/eye-closed.svg?react";
import EyeIcon from "assets/icons/eye.svg?react";
import { useToggle } from "shared/libs";
import { Input } from "shared/ui";
import { InputVariant } from "./variants";

type Props = Omit<ComponentProps<"input">, "ref"> & {
    variant?: InputVariant;
};

export const PasswordInput = forwardRef<HTMLInputElement, Props>(function PasswordInput(
    { type = "password", className, ...props }: Props,
    baseRef
) {
    const ref = useRef<HTMLInputElement>(null);
    useImperativeHandle(baseRef, () => ref.current!);
    const [isShownAsText, toggleIsShownAsText] = useToggle(false);

    return (
        <div>
            <Input
                ref={ref}
                className="grid  grid-cols-[1fr_2.5rem] pr-2.5 [&_input:disabled~.change-type-button]:pointer-events-none [&_input:disabled~.change-type-button]:opacity-0"
                type={isShownAsText ? "text" : type}
                variant="disabled-state-like-label"
                {...props}
            >
                <button
                    type="button"
                    tabIndex={-1}
                    className="change-type-button -my-4 flex size-11 items-center justify-center rounded-xl bg-secondary-bg transition-colors hover:bg-transparent [&:hover>*]:scale-150"
                    onClick={toggleIsShownAsText}
                >
                    {isShownAsText ? (
                        <EyeClosedIcon className="size-6 transition-transform [&:active>*]:scale-90" />
                    ) : (
                        <EyeIcon className="size-6 transition-transform [&:active>*]:scale-90" />
                    )}
                </button>
            </Input>
        </div>
    );
});
