import React, { useEffect } from "react";
import { withFileUpload } from "entities/fileServer";
import { createFormErrorStore } from "shared/libs";
import { ClassNameValue } from "tailwind-merge";

export type FileServerUploadingProps = {
    formatList?: string;
    accept?: string;
    onUpload?: (file: File) => Promise<void>;
    className?: ClassNameValue;
    bundlePlatforms?: string | null;
};

const FileUpload = withFileUpload();

export const useFileServerUploadingFormErrorStore = createFormErrorStore<"file">("useFormErrorStoreScaling");

export const FileServerUploadingPopup = ({
    formatList,
    onUpload,
    accept,
    bundlePlatforms,
}: FileServerUploadingProps) => {
    const { errors, clearErrors } = useFileServerUploadingFormErrorStore((state) => ({
        errors: state.errors,
        clearErrors: state.clearErrors,
    }));
    useEffect(() => {
        return clearErrors;
    }, []);
    return (
        <FileUpload
            errors={errors}
            onUpload={onUpload}
            accept={accept}
            formatList={formatList}
            clearErrors={clearErrors}
            className={"h-[361px]"}
            bundlePlatforms={bundlePlatforms}
        />
    );
};
