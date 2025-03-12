import { Children, ComponentPropsWithRef, forwardRef, isValidElement, useMemo } from "react";
import { cn } from "shared/libs";
import { TableProvider } from "./config/TableProvider";
import { TableVariant, tableVariants } from "./config/variants";
import { TableBody } from "./Table.Body";
import { TableCell } from "./Table.Cell";
import { TableFooter } from "./Table.Footer";
import { TableHead } from "./Table.Head";
import { TableHeader } from "./Table.Header";
import { TableRow } from "./Table.Row";

type Props = ComponentPropsWithRef<"table"> & {
    variant?: TableVariant;
};

const TableWrapper = forwardRef<HTMLTableElement, Props>(
    ({ children, className, variant = "primary", ...props }: Props, ref) => {
        const columCount = useMemo(() => {
            let count = 0;
            Children.map(children, (child) => {
                if (isValidElement(child)) {
                    if (child.type === TableHeader || child.type === TableBody) {
                        Children.forEach(child.props.children, (childRow) => {
                            if (childRow.type === TableRow) {
                                count = Math.max(count, Children.count(childRow.props.children));
                            }
                        });
                    }
                }
            });
            return count;
        }, [children]);
        const classes = useMemo(
            () =>
                cn(
                    "grid [&_tbody]:contents [&_tfoot]:contents [&_thead]:contents [&_tr]:contents",
                    tableVariants.get(variant),
                    `grid-cols-${columCount}`,
                    className
                ),
            [className, variant]
        );
        return (
            <TableProvider variant={variant}>
                <table
                    ref={ref}
                    className={classes}
                    data-component="table"
                    {...props}
                >
                    {children}
                </table>
            </TableProvider>
        );
    }
);

TableWrapper.displayName = "Table";
export const Table: typeof TableWrapper & {
    Header?: typeof TableHeader;
    Head?: typeof TableHead;
    Body?: typeof TableBody;
    Cell?: typeof TableCell;
    Row?: typeof TableRow;
    Footer?: typeof TableFooter;
} = TableWrapper;
Table.Header = TableHeader;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Footer = TableFooter;
