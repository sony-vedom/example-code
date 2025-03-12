import React, { forwardRef } from "react";
import { useApp } from "shared/libs";
import styles from "./Tooltip.module.scss";

interface TooltipProps extends React.ComponentPropsWithoutRef<"div"> {
    text: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ text, className, ...props }: TooltipProps, ref) => {
    const { theme } = useApp();

    return (
        <div
            {...props}
            ref={ref}
            className={[className, styles.tooltip].filter(Boolean).join(" ")}
            data-theme={theme}
        >
            <article className={styles["tooltip-box"]}>{text}</article>
        </div>
    );
});

Tooltip.displayName = "Tooltip";
