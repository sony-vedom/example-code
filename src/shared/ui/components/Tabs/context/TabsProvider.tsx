import { ReactNode, useEffect, useState } from "react";
import { TabsContext } from "./TabsContext";
type Props = {
    children: ReactNode;
    selectedTab?: string | number;
    onChange?: ((value: string) => void) | ((value: number) => void);
};

export const TabsProvider = ({ children, selectedTab, onChange }: Props) => {
    const [selectedValue, setSelectedValue] = useState<ReactNode | null>(null);
    useEffect(() => {
        if (selectedTab) {
            setSelectedValue(selectedTab);
        }
    }, [selectedTab]);

    return (
        <TabsContext.Provider value={{ selectedValue, setSelectedValue, onChange }}>{children}</TabsContext.Provider>
    );
};
