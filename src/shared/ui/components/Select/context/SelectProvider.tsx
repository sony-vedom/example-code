import { Children, isValidElement, ReactNode, useCallback, useEffect, useState } from "react";
import { Value } from "../Models";
import { SelectContext } from "./SelectContext";
import { SelectFieldExtension } from "../SelectFieldExtension";
import { SelectItem } from "../SelectItem";
import { SelectFieldExtensionContext } from "./SelectFieldExtensionContext";
import { SelectItemsContext } from "./SelectItemsContext";
import { SelectOpenContext } from "./SelectOpenContext";

type Props = {
    children: ReactNode;
    initChildren: ReactNode;
    onChange?: (value: Value) => void;
};

export const SelectProvider = ({ children, initChildren, onChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ReactNode | null>(null);
    const [fieldExtension, setFieldExtension] = useState<ReactNode | null>(null);
    const [items, setItems] = useState<ReactNode[]>([]);
    const set = useCallback(
        (item: ReactNode, value: Value) => {
            setSelectedItem(item);
            setIsOpen(false);
            onChange?.(value);
        },
        [onChange, setIsOpen, setSelectedItem]
    );

    useEffect(() => {
        const itms: ReactNode[] = [];
        Children.forEach(initChildren, (child) => {
            if (!isValidElement(child)) {
                return;
            }
            if (child.type === SelectItem) {
                itms.push(child);
                if (child.props.default) {
                    setSelectedItem(child.props.children);
                }
            }
            if (child.type === SelectFieldExtension) {
                setFieldExtension(child);
            }
        });

        setItems(itms);
    }, [initChildren]);

    return (
        <SelectContext.Provider
            value={{
                set,
                selectedItem,
                setSelectedItem,
            }}
        >
            <SelectOpenContext.Provider
                value={{
                    isOpen,
                    setIsOpen,
                }}
            >
                <SelectItemsContext.Provider value={items}>
                    <SelectFieldExtensionContext.Provider value={fieldExtension}>
                        {children}
                    </SelectFieldExtensionContext.Provider>
                </SelectItemsContext.Provider>
            </SelectOpenContext.Provider>
        </SelectContext.Provider>
    );
};
