import { forwardRef, useContext, MouseEvent, useImperativeHandle } from "react";
import { Button, ButtonProps } from "../Button";
import { DropdownMenuIsOpenContext, DropdownMenuCommonContext } from "./context";

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ id, children, variant, onClick, ...props }: ButtonProps, ref) => {
        const { toggleIsOpen } = useContext(DropdownMenuIsOpenContext);
        const { triggerRef } = useContext(DropdownMenuCommonContext);

        useImperativeHandle(ref, () => triggerRef.current!);

        const click = (e: MouseEvent<HTMLButtonElement>) => {
            toggleIsOpen();
            onClick?.(e);
        };

        return (
            <Button
                ref={triggerRef}
                variant={variant || "ghost"}
                type="button"
                data-component="dropdown-menu-trigger"
                onClick={click}
                {...props}
            >
                {children}
            </Button>
        );
    }
);

DropdownMenuTrigger.displayName = "DropdownMenu.Trigger";
