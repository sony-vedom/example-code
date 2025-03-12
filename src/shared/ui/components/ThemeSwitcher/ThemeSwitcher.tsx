import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "shared/libs";
import { themeSwitchIcons } from "utils/icons";
import styles from "./ThemeSwitcher.module.scss";

export const ThemeSwitcher = memo(function ThemeSwitcher() {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useApp();

    return (
        <button
            className={styles.theme}
            onClick={toggleTheme}
            data-theme={theme}
            data-tooltip={theme === "dark" ? t("Включить светлую тему") : t("Включить темную тему")}
        >
            <div className={styles.theme__icon}>{themeSwitchIcons[theme]}</div>
            <div className={styles.theme__border}></div>
            <div className={styles.theme__mode}>{theme === "dark" ? t("Ночь") : t("День")}</div>
        </button>
    );
});
