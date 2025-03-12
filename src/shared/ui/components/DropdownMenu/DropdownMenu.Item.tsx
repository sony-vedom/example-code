import { ComponentPropsWithRef, forwardRef, MouseEvent, useContext, useMemo } from "react";
import { cn } from "shared/libs";
import { DropdownMenuIsOpenContext, DropdownMenuCommonContext } from "./context";
import { itemVariants } from "./variants";

type Props = ComponentPropsWithRef<"li">;

export const DropdownMenuItem = forwardRef<HTMLLIElement, Props>(
    ({ children, className, onClick, ...props }: Props, ref) => {
        const { setIsOpen } = useContext(DropdownMenuIsOpenContext);
        const { variant } = useContext(DropdownMenuCommonContext);
        const classes = useMemo(
            () => cn(itemVariants.get(variant) || itemVariants.get("primary"), className),
            [className, variant]
        );
        const click = (e: MouseEvent<HTMLLIElement>) => {
            e.stopPropagation();
            setIsOpen(false);
            onClick?.(e);
        };
        return (
            <li
                ref={ref}
                className="[&:active>*]:scale-90 [&:hover>*]:scale-105"
                onClick={click}
                data-component="dropdown-menu-item"
                {...props}
            >
                <button className={cn(classes, className)}>{children}</button>
            </li>
        );
    }
);

DropdownMenuItem.displayName = "DropdownMenu.Item";
