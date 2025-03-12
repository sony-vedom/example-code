import { ComponentPropsWithoutRef, memo } from "react";
import closeIcon from "assets/icons/close-black.svg";
import { useTranslation } from "react-i18next";
import { useApp } from "shared/libs";
import styles from "./Legend.module.scss";

type Props = ComponentPropsWithoutRef<"section"> & {
    onClose: () => void;
};

export const Legend = memo(function Legend({ onClose, ...props }: Props) {
    const { theme } = useApp();
    const { t } = useTranslation();

    return (
        <section
            {...props}
            data-theme={theme}
            className={styles.legend}
        >
            <header className={styles.header}>{t("Как пользоваться")}</header>
            <p>{t("Чтобы повернуть модель используйте тап или левую кнопку мыши")}</p>
            <p>{t("Чтобы увеличить или уменьшить модель, используйте колесо мыши или жест увеличения")}</p>
            <p>{t("Чтобы переместить модель, используйте правую кнопку мыши или тап двумя пальцами")}</p>
            <button onClick={onClose}>
                <img
                    src={closeIcon}
                    width={24}
                    height={24}
                    loading="eager"
                    alt=""
                />
            </button>
        </section>
    );
});
