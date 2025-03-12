import { ReactElement, ReactNode, memo, useState, HTMLAttributes, useMemo } from "react";
import { useApp } from "shared/libs";
import styles from "./LazyImage.module.scss";

type Props = {
    src?: string;
    alt?: string;
    loading?: "lazy" | "eager";
    decoding?: "async" | "sync" | "auto";
    width?: string | number;
    height?: string | number;
    title?: string;
    className?: string;
    errorComponent?: ReactElement;
    children?: ReactNode;
} & HTMLAttributes<HTMLImageElement>;

export const LazyImage = memo(function LazyImage({
    loading = "lazy",
    decoding = "async",
    errorComponent,
    className = "",
    children,
    ...props
}: Props) {
    const { theme } = useApp();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const classes = useMemo(
        () => `${styles.figure} ${isLoading ? styles.loading : ""} ${isError ? styles.error : ""} ${className}`,
        [className, isError, isLoading]
    );

    const onLoad = () => setIsLoading(false);
    const onError = () => {
        setIsLoading(false);
        setIsError(true);
    };

    return (
        <figure
            className={classes}
            data-theme={theme}
        >
            {!isError ? (
                <img
                    loading={loading}
                    decoding={decoding}
                    className={styles.image}
                    onLoad={onLoad}
                    onError={onError}
                    {...props}
                />
            ) : (
                errorComponent
            )}
            {children}
        </figure>
    );
});
