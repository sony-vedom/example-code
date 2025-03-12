import { ReactNode } from "react";
import { TableVariantContext } from "./TableVariantContextProps";
import { TableVariant } from "./variants";
type Props = {
    variant: TableVariant;
    children: ReactNode;
    onChange?: (value: boolean) => void;
};

export const TableProvider = ({ variant, children }: Props) => {
    return <TableVariantContext.Provider value={{ variant }}>{children}</TableVariantContext.Provider>;
};
