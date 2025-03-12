import React from "react";
import UploadDocumentIcon from "assets/icons/upload-document-icon.svg?react";
import { useTranslation } from "react-i18next";

type DefaultContentProps = {
    formatList?: string;
    bundlePlatforms?: string | null;
};

export const DefaultContent = ({ formatList, bundlePlatforms }: DefaultContentProps) => {
    const { t } = useTranslation();
    return (
        <>
            <div className={"text-center"}>
                <div>{t("Добавить файл")}</div>
                <UploadDocumentIcon className={"w-full"} />
                <div>{t("Перенесите файл(ы) сюда")}</div>
            </div>
            {formatList && (
                <div className={"text-center"}>
                    <div>{t("Можно загрузить форматы:")}</div>
                    <div>
                        <span className={"text-l text-lg font-normal text-[#000000BF] dark:text-white"}>
                            {formatList}
                        </span>
                    </div>
                </div>
            )}
            {bundlePlatforms && (
                <div className={"text-center"}>
                    <div>{t("Можно загрузить бандл(ы) для платформ:")}</div>
                    <div>
                        <span className={"text-l text-lg font-normal text-[#000000BF] dark:text-white"}>
                            {bundlePlatforms}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};
