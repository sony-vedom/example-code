import { memo } from "react";
import { Html } from "@react-three/drei";
import styles from "./LoadingProgress.module.scss";
import { LazyImage } from "../..";

type Props = {
    preview?: string;
    className?: string;
};
export const LoadingProgress = memo(function LoadingProgress({ preview, className = "" }: Props) {
    return (
        <Html className={`${styles["loading-progress"]} ${className}`}>
            <LazyImage
                className={styles["loading-progress-preview"]}
                src={preview}
                loading="eager"
            >
                {/* {progress} // todo: придумать, как отображать прогресс */}
            </LazyImage>
        </Html>
    );
});
