import { ComponentPropsWithRef, forwardRef, useContext, useImperativeHandle, useMemo } from "react";
import debounce from "debounce";
import { cn, useOutsideClick } from "shared/libs";
import { DropdownMenuIsOpenContext, DropdownMenuCommonContext } from "./context/DropdownMenuContext";
import { contentVariants } from "./variants";
import { DropdownBlock } from "../DropdownBlock";

type Props = ComponentPropsWithRef<"ol">;

export const DropdownMenuContent = forwardRef<HTMLOListElement, Props>(
    ({ children, className, ...props }: Props, ref) => {
        const { isOpen, setIsOpen } = useContext(DropdownMenuIsOpenContext);
        const { triggerRef, variant } = useContext(DropdownMenuCommonContext);
        const debouncedSetIsOpen = debounce(setIsOpen, 10);
        const contentRef = useOutsideClick<HTMLOListElement>(() => debouncedSetIsOpen?.(false));
        useImperativeHandle(ref, () => contentRef.current!);

        const classes = useMemo(
            () => cn("scrollbar-hidden", contentVariants.get(variant) || contentVariants.get("primary"), className),
            [className, variant]
        );

        return (
            <DropdownBlock
                tag="ol"
                owner={triggerRef}
                className={classes}
                isOpen={isOpen}
                horizontalAnchorTo="right"
                setIsOpen={setIsOpen}
                data-component="dropdown-menu-content"
                {...props}
            >
                {children}
            </DropdownBlock>
        );
    }
);

DropdownMenuContent.displayName = "DropdownMenu.Content";
