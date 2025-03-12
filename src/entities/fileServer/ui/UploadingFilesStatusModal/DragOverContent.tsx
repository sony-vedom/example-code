import React from "react";
import FileArrowDown from "assets/icons/file-arrow-down.svg?react";
import { useTranslation } from "react-i18next";

export const DragOverContent = () => {
    const { t } = useTranslation();
    return (
        <>
            <FileArrowDown
                width={45}
                height={47}
            />
            <div>{t("Перенесите файл(ы) сюда")}</div>
        </>
    );
};
