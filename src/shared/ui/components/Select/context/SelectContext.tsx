import { createContext, ReactNode } from "react";
import { Value } from "../Models";

type Props = {
    selectedItem: ReactNode | null;
    setSelectedItem: React.Dispatch<React.SetStateAction<ReactNode | null>>;
    set: (item: ReactNode, value: Value) => void;
};

export const SelectContext = createContext<Props>({
    selectedItem: null,
    setSelectedItem: () => {},
    set: () => {},
});
