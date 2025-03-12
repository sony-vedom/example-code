import { memo, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const SelectFieldExtension = memo(function SelectFieldExtension({ children }: Props) {
    return <>{children}</>;
});
