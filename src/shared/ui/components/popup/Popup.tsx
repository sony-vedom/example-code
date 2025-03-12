import React, { useEffect } from "react";
import { PopupDefaults } from "shared/constants";
import { closeLastPopupInstance, usePopup } from "shared/libs";
import styles from "./Popup.module.scss";

export const Popup: React.FC = () => {
    const { opened } = usePopup();

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!PopupDefaults.closeOnClickOutside) return;
        const target = e.target as HTMLDivElement;
        if (target.classList.contains(styles.overlay)) closeLastPopupInstance();
    };

    const handleEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape" && PopupDefaults.closeOnEscape) closeLastPopupInstance();
    };

    useEffect(() => {
        if (opened.length >= 0) document.body.addEventListener("keydown", handleEsc);
        else document.body.removeEventListener("keydown", handleEsc);

        return () => {
            document.body.removeEventListener("keydown", handleEsc);
        };
    }, [opened]);

    if (opened.length <= 0) return null;
    return (
        <div
            className={styles.overlay}
            style={{ zIndex: 1000 + (opened.length - 1) * 2 }}
            onClick={handleClose}
        />
    );
};
