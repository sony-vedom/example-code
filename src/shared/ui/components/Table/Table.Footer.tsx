import { ComponentPropsWithRef, forwardRef } from "react";

type Props = ComponentPropsWithRef<"tfoot">;

export const TableFooter = forwardRef<HTMLTableSectionElement, Props>(({ children, ...props }: Props, ref) => {
    return (
        <tfoot
            ref={ref}
            data-component="table-footer"
            {...props}
        >
            {children}
        </tfoot>
    );
});

TableFooter.displayName = "Table.Footer";
