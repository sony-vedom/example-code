import { ComponentPropsWithRef, forwardRef, useContext, useMemo } from "react";
import { cn } from "shared/libs";
import { TableVariantContext } from "./config/TableVariantContextProps";
import { tableCellVariants } from "./config/variants";

type Props = ComponentPropsWithRef<"td">;

export const TableCell = forwardRef<HTMLTableCellElement, Props>(({ children, className, ...props }: Props, ref) => {
    const { variant } = useContext(TableVariantContext);
    const classes = useMemo(() => cn(tableCellVariants.get(variant), className), [className, variant]);
    return (
        <td
            ref={ref}
            className={classes}
            data-component="table-cell"
            {...props}
        >
            {children}
        </td>
    );
});

TableCell.displayName = "Table.Cell";
