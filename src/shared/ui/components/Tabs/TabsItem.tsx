import { ComponentPropsWithRef, forwardRef, memo, ReactNode, useContext, useMemo } from "react";
import { cn } from "shared/libs";
import { TabsContext } from "./context/TabsContext";

type Props = Omit<ComponentPropsWithRef<"li">, "value"> & {
    children: ReactNode;
    className?: string;
    default?: boolean;
    value?: number | string;
};
export const TabsItem = memo(
    forwardRef<HTMLLIElement, Props>(({ children, onClick, className, value, ...props }: Props, ref) => {
        const { selectedValue, setSelectedValue, onChange } = useContext(TabsContext);

        const classes = useMemo(
            () => cn(selectedValue === value ? "checked" : "", className),
            [selectedValue, className]
        );

        return (
            <li
                ref={ref}
                className={classes}
                data-component="tabs-item"
                onClick={(e) => {
                    setSelectedValue(value);
                    if (typeof value === "number" || typeof value === "string") {
                        onChange(value as never);
                    }
                    onClick?.(e);
                }}
                {...props}
            >
                {children}
            </li>
        );
    })
);

TabsItem.displayName = "Tabs.Item";
