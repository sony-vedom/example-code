import { ComponentPropsWithRef, memo, MutableRefObject, useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { SelectItemsContext, SelectOpenContext } from "./context";
import { Variant } from "./Models";
import { DropdownBlock } from "../DropdownBlock";

type Props = ComponentPropsWithRef<"ol"> & {
    owner: MutableRefObject<HTMLButtonElement>;
    variant: Variant;
};

const variants = new Map([
    [
        "primary",
        "rounded-b-xl bg-white dark:bg-[#232627] [&_li]:text-[#181b2f] dark:[&_li]:text-[#eff1f8] [&_li]:p-3 [&_li:hover]:bg-slate-200 dark:[&_li:hover]:bg-[#2b2f30] font-semibold text-md [&_li]:cursor-pointer [&_li.checked]:pointer-events-none [&_li.checked]:opacity-50",
    ],
    ["clear", ""],
    [
        "smaller",
        "rounded-b bg-white dark:bg-[#232627] [&_li]:text-[#181b2f] dark:[&_li]:text-[#eff1f8] [&_li]:px-2.5 [&_li]:py-1.5 [&_li:hover]:bg-slate-200 dark:[&_li:hover]:bg-[#2b2f30] font-semibold text-md [&_li]:cursor-pointer [&_li.checked]:pointer-events-none  [&_li.checked]:opacity-50 text-xs",
    ],
]);

export const SelectContent = memo(function SelectItems({ owner, variant, className, ...props }: Props) {
    const { isOpen, setIsOpen } = useContext(SelectOpenContext);
    const items = useContext(SelectItemsContext);
    const classes = useMemo(() => twMerge("shadow-xl", variants.get(variant), className), [className, variant]);

    return (
        <DropdownBlock
            tag="ol"
            owner={owner}
            className={classes}
            isOpen={isOpen}
            horizontalAnchorTo="left-right"
            setIsOpen={setIsOpen}
            data-component="select-content"
            {...props}
        >
            {items}
        </DropdownBlock>
    );
});
