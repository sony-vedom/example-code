import {
    ComponentPropsWithRef,
    forwardRef,
    memo,
    ReactNode,
    useContext,
    useImperativeHandle,
    useMemo,
    useRef,
} from "react";
import arrowIcon from "assets/icons/arrow-black-rounded.svg";
import { twMerge } from "tailwind-merge";
import { SelectContext, SelectFieldExtensionContext, SelectOpenContext } from "./context";
import { Value, Variant } from "./Models";

const buttonVariants = new Map([
    [
        "primary",
        "p-3 flex gap-2.5 items-center rounded-xl bg-[#eff1f8] text-[#181b2f] dark:bg-[#232627] dark:text-[#eff1f8] hover:bg-slate-200 dark:hover:bg-slate-700 [&_span]:font-semibold",
    ],
    [
        "smaller",
        "px-2.5 py-1.5 flex gap-1 items-center rounded bg-[#eff1f8] text-[#181b2f] dark:bg-[#232627] dark:text-[#eff1f8] hover:bg-slate-200 dark:hover:bg-slate-700 [&_span]:text-xs [&_img]:w-2 [&_img]:h-2.5",
    ],
    ["clear", ""],
]);

type Props = Omit<ComponentPropsWithRef<"button">, "onChange"> & {
    placeholder?: ReactNode;
    onChange?: (value: Value) => void;
    variant: Variant;
};

export const SelectTrigger = memo(
    forwardRef<HTMLButtonElement, Props>(function SelectButton(
        { placeholder = "", variant = "primary", className, onChange, onClick, ...props }: Props,
        baseRef
    ) {
        const ref = useRef<HTMLButtonElement>(null);
        const { isOpen, setIsOpen } = useContext(SelectOpenContext);
        const fieldExtension = useContext(SelectFieldExtensionContext);
        const { selectedItem } = useContext(SelectContext);

        useImperativeHandle(baseRef, () => ref.current!);

        const buttonClasses = useMemo(
            () =>
                twMerge(
                    buttonVariants.get(variant),
                    "justify-between transition-all",
                    className,
                    isOpen ? "rounded-b-none shadow-xl" : ""
                ),
            [variant, isOpen, className]
        );

        return (
            <button
                ref={ref}
                type="button"
                className={buttonClasses}
                data-component="select-trigger"
                onClick={(e) => {
                    setIsOpen(!isOpen);
                    onClick?.(e);
                }}
                {...props}
            >
                {fieldExtension}
                <span className="inline-block flex-1 truncate text-left">{selectedItem ?? placeholder}</span>
                <img
                    className={`transition-all dark:invert ${!isOpen ? "rotate-180" : ""}`}
                    width="14"
                    height="24"
                    loading="eager"
                    src={arrowIcon}
                    alt="icon"
                />
            </button>
        );
    })
);
