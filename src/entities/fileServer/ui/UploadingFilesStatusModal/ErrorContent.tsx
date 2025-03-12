import React from "react";
import ErrorUploadIcon from "assets/icons/file-upload-error.svg?react";
import { useTranslation } from "react-i18next";

type Props = { errors?: string[] };

export const ErrorContent = ({ errors }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <ErrorUploadIcon
                width={55}
                height={55}
            />
            {errors.map((el, i) => (
                <div
                    key={i}
                    className={"text-center font-semibold"}
                >
                    {t(el)}
                </div>
            ))}
        </>
    );
};
