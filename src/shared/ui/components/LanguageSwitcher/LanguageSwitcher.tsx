import { memo, useState, MouseEvent } from "react";
import { DropdownList } from "components";
import { useApp } from "shared/libs";
import { twMerge } from "tailwind-merge";
import { headerIcons } from "utils/icons";
import styles from "./LanguageSwitcher.module.scss";

export const LanguageSwitcher = memo(function LanguageSwitcher() {
    const { theme } = useApp();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { language, setLanguage } = useApp();
    const selectCss = twMerge(styles.switcher__select, "flex items-center gap-0.5");

    return (
        <div
            className={styles.switcher}
            data-theme={theme}
            onClick={(e: MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }}
        >
            <div className={styles.switcher__icon}>
                <div className={styles["switcher__icon-inner"]}>{headerIcons.languageElement}</div>
            </div>
            <div className={selectCss}>
                {language.toUpperCase()} <span className={isOpen ? styles.opened : ""}>{headerIcons.arrowDown}</span>
                {isOpen && (
                    <DropdownList
                        items={[
                            {
                                name: "RU",
                                action: () => setLanguage("ru"),
                            },
                            {
                                name: "EN",
                                action: () => setLanguage("en"),
                            },
                            {
                                name: "ES",
                                action: () => setLanguage("es"),
                            },
                        ]}
                        showDropDown={isOpen}
                        toggleDropDown={setIsOpen}
                    />
                )}
            </div>
        </div>
    );
});
