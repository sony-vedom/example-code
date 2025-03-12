import { createContext } from "react";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SelectOpenContext = createContext<Props>({
    isOpen: false,
    setIsOpen: () => {},
});
