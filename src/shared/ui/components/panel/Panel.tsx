import { memo, useMemo } from "react";
import { useApp } from "shared/libs";
import styles from "./Panel.module.scss";

type Props = {
    variant?: "models-preview";
    className?: string;
    children?: React.ReactNode;
};

export const Panel = memo(function ToolPanel({ children, className, variant = "models-preview" }: Props) {
    const { theme } = useApp();
    const classNames = useMemo(() => `${styles[variant]} ${className}`, [variant, className]);

    return (
        <>
            <aside
                data-theme={theme}
                className={classNames}
            >
                {children}
            </aside>
        </>
    );
});
