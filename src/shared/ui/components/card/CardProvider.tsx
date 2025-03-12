import { ReactNode } from "react";
import { CardContextVariant } from "./CardContext";
import { Variant } from "./variants";
type Props = {
    variant: Variant;
    children: ReactNode;
};

export const CardProvider = ({ variant, children }: Props) => {
    return <CardContextVariant.Provider value={variant}>{children}</CardContextVariant.Provider>;
};
