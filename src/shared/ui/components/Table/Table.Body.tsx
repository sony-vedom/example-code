import { ComponentPropsWithRef, forwardRef } from "react";

type Props = ComponentPropsWithRef<"tbody">;

export const TableBody = forwardRef<HTMLTableSectionElement, Props>(({ children, ...props }: Props, ref) => {
    return (
        <tbody
            ref={ref}
            data-component="table-body"
            {...props}
        >
            {children}
        </tbody>
    );
});

TableBody.displayName = "Table.Body";
