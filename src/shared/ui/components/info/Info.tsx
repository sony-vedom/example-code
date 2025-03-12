import { ComponentProps, ElementType, useEffect, useMemo, useState } from "react";
import { appStore, cn } from "shared/libs";
import styles from "./Info.module.scss";

type Props<T extends ElementType> = ComponentProps<T> & {
    tag?: string;
    variant?: "alert-success" | "alert-error" | "badge-grey" | "badge-red" | "badge-green";
    displayDuration?: number;
};

export const Info = <T extends ElementType = "div">({
    tag: Component = "div",
    className,
    displayDuration,
    variant = "success",
    children = null,
    "data-component": dataComponent,
    ...props
}: Props<T>) => {
    const theme = appStore((state) => state.theme);
    const [showing, setShowing] = useState(true);
    const classNames = useMemo(() => cn(styles.info, styles[variant], className), [className, variant]);

    useEffect(() => {
        if (displayDuration) {
            setTimeout(() => setShowing(false), displayDuration);
        }
    }, [displayDuration]);

    return !!children && showing ? (
        <Component
            className={classNames}
            data-component={dataComponent || "Info"}
            data-theme={theme}
            {...props}
        >
            {children}
        </Component>
    ) : null;
};
