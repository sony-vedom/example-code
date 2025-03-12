import { createContext, MutableRefObject } from "react";
import { Variant } from "../variants";

type IsOpenContextProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleIsOpen: () => void;
};

export const DropdownMenuIsOpenContext = createContext<IsOpenContextProps>({
    isOpen: false,
    setIsOpen: () => {},
    toggleIsOpen: () => {},
});

type CommonContextProps = {
    variant: Variant;
    triggerRef: MutableRefObject<HTMLButtonElement>;
};

export const DropdownMenuCommonContext = createContext<CommonContextProps>({
    variant: "primary",
    triggerRef: { current: null },
});
