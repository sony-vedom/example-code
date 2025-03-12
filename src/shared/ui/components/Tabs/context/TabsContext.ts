import { createContext, ReactNode } from "react";

type TabsContextProps = {
    selectedValue: ReactNode | null;
    setSelectedValue: React.Dispatch<React.SetStateAction<ReactNode | null>>;
    onChange?: ((value: string) => void) | ((value: number) => void) | (() => void);
};

export const TabsContext = createContext<TabsContextProps>(null);
