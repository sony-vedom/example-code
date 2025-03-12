import { useTranslation } from "react-i18next";
import { closeSpecificPopupInstance, useApp } from "shared/libs";
import { ActionConfirmationProps, PopupVariant } from "shared/models";
import { Button } from "shared/ui";
import { exclamationPoint } from "utils/icons";
import styles from "./ActionConfirmation.module.scss";

export const ActionConfirmation: React.FC<ActionConfirmationProps> = ({
    title,
    icon,
    acceptText,
    callback,
    onCloseClick,
}: ActionConfirmationProps) => {
    const { t } = useTranslation();
    const { theme } = useApp();

    const closePopup = (action: () => void) => {
        if (action) action();
        closeSpecificPopupInstance({ popup: PopupVariant.ActionConfirmation });
    };

    return (
        <div
            className={styles.confirmation}
            data-theme={theme}
        >
            <div className={styles["confirmation-info"]}>
                <div className={styles["confirmation-info__icon"]}>{icon ?? exclamationPoint}</div>
                <div className={styles["confirmation-info__title"]}>{title}</div>
            </div>
            <div className={styles.confirmation__actions}>
                <Button
                    onClick={() => {
                        closePopup(callback);
                    }}
                >
                    {acceptText ?? t("Да, продолжить")}
                </Button>
                <Button
                    variant="gray"
                    onClick={() => closePopup(onCloseClick)}
                >
                    {t("Нет, закрыть окно")}
                </Button>
            </div>
        </div>
    );
};
