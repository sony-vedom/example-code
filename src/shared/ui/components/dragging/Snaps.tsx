import { memo } from "react";
import styles from "./Snaps.module.scss";

type Props = {
    showVertical: boolean;
    showHorizontal: boolean;
};
export const Snaps = memo(function Snaps({ showVertical, showHorizontal }: Props) {
    return (
        <>
            {!!showVertical && <div className={styles["snap-vertical"]} />}
            {!!showHorizontal && <div className={styles["snap-horizontal"]} />}
        </>
    );
});
