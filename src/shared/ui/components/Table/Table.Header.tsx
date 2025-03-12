import { ComponentPropsWithRef, forwardRef, useContext, useMemo } from "react";
import { cn } from "shared/libs";
import { TableVariantContext } from "./config/TableVariantContextProps";
import { tableHeaderVariants } from "./config/variants";

type Props = ComponentPropsWithRef<"thead">;

export const TableHeader = forwardRef<HTMLTableSectionElement, Props>(
    ({ children, className, ...props }: Props, ref) => {
        const { variant } = useContext(TableVariantContext);
        const classes = useMemo(() => cn(tableHeaderVariants.get(variant), className), [className, variant]);

        return (
            <thead
                ref={ref}
                className={classes}
                data-component="table-header"
                {...props}
            >
                {children}
            </thead>
        );
    }
);

TableHeader.displayName = "Table.Header";
