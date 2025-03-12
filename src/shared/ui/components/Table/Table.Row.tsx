import { ComponentPropsWithRef, forwardRef } from "react";

type Props = ComponentPropsWithRef<"tr">;

export const TableRow = forwardRef<HTMLTableRowElement, Props>(({ children, ...props }: Props, ref) => {
    return (
        <tr
            ref={ref}
            data-component="table-row"
            {...props}
        >
            {children}
        </tr>
    );
});

TableRow.displayName = "Table.Row";
