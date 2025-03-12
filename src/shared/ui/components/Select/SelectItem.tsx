import { ComponentPropsWithRef, forwardRef, memo, ReactNode, useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { SelectContext } from "./context";
import { Value } from "./Models";

type ItemProps = ComponentPropsWithRef<"li"> & {
    children: ReactNode;
    default?: boolean;
    value?: Value;
};
export const SelectItem = memo(
    forwardRef<HTMLLIElement, ItemProps>(function SelectItem(
        { children, onClick, value, className, ...props }: ItemProps,
        ref
    ) {
        const { selectedItem, set } = useContext(SelectContext);

        const classes = useMemo(() => {
            return twMerge(className, selectedItem === children ? "checked" : "");
        }, [selectedItem]);

        return (
            <li
                ref={ref}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.(e);
                    set(children, value);
                }}
                data-component="select-item"
                className={classes}
                {...props}
            >
                {children}
            </li>
        );
    })
);
