import { ComponentPropsWithRef, forwardRef, useContext, useMemo } from "react";
import { cn } from "shared/libs";
import { TableVariantContext } from "./config/TableVariantContextProps";
import { tableHeadVariants } from "./config/variants";

type Props = ComponentPropsWithRef<"th">;

export const TableHead = forwardRef<HTMLTableCellElement, Props>(({ children, className, ...props }: Props, ref) => {
    const { variant } = useContext(TableVariantContext);
    const classes = useMemo(() => cn(tableHeadVariants.get(variant), className), [className, variant]);
    return (
        <th
            ref={ref}
            className={classes}
            data-component="table-head"
            {...props}
        >
            {children}
        </th>
    );
});

TableHead.displayName = "Table.Head";
