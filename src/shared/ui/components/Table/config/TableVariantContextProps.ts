import { createContext } from "react";
import { TableVariant } from "./variants";

type TableVariantContextProps = {
    variant: TableVariant;
};

export const TableVariantContext = createContext<TableVariantContextProps>({
    variant: "primary",
});
