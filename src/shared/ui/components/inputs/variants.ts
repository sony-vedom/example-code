import { cn } from "shared/libs/hooks/cn";

export type InputVariant =
    | "primary"
    | "title-like-placeholder"
    | "disabled-state-like-label"
    | "small"
    | "smaller"
    | "clear"
    | "blur-state-like-label";

const commonClasses = cn(
    "relative flex w-full flex-row items-center items-center gap-3 rounded-control-primary border border-solid border-control-primary-border-color bg-control-primary-bg font-semibold text-control-primary-text outline-none transition-all has-[input:not(:disabled)]:hover:border-control-primary-border-color-hover"
);

export const inputVariants = Object.freeze(
    new Map<InputVariant, string>([
        ["primary", cn(commonClasses, "px-5 py-4 text-base")],
        ["title-like-placeholder", cn(commonClasses, "px-5 py-4 text-base")],
        [
            "disabled-state-like-label",
            cn(
                commonClasses,
                "px-5 py-4 text-base  has-[input:disabled]:border-transparent has-[input:disabled]:bg-transparent has-[input:disabled]:text-opacity-50 [&_input:disabled]:truncate"
            ),
        ],
        [
            "blur-state-like-label",
            cn(
                commonClasses,
                "px-5 py-4 text-base has-[input:not(:focus)]:border-transparent has-[input:not(:focus)]:bg-transparent has-[input:not(:focus)]:text-opacity-50  [&_input:focus]:truncate"
            ),
        ],
        ["small", cn(commonClasses, "p-3 text-xs")],
        ["smaller", cn(commonClasses, "rounded-control-smaller px-2.5 py-1.5 text-xs")],
        ["clear", "flex flex-row items-center gap-0 rounded-0 bg-transparent"],
    ])
);
