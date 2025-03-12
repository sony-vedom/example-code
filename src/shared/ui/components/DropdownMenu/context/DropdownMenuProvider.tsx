import { ReactNode, useEffect, useRef } from "react";
import { useToggle } from "shared/libs";
import { DropdownMenuIsOpenContext, DropdownMenuCommonContext } from "./DropdownMenuContext";
import { Variant } from "../variants";
type Props = {
    variant: Variant;
    children: ReactNode;
    onChange?: (value: boolean) => void;
};

export const DropdownMenuProvider = ({ variant, children, onChange }: Props) => {
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false);

    useEffect(() => {
        onChange?.(isOpen);
    }, [isOpen]);

    return (
        <DropdownMenuCommonContext.Provider value={{ variant, triggerRef }}>
            <DropdownMenuIsOpenContext.Provider value={{ isOpen, setIsOpen, toggleIsOpen }}>
                {children}
            </DropdownMenuIsOpenContext.Provider>
        </DropdownMenuCommonContext.Provider>
    );
};
