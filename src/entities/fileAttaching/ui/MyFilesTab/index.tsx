import React, { useState } from "react";
import { closeAllPopupInstances, closeLastPopupInstance, getFormatFile, useAllFileServerStore } from "shared/libs";
import { FileServerMediaFileType } from "shared/models";
import { FileServerBrowser } from "./FileServerBrowser";
import { withFileUpload } from "../../../fileServer";
import { useFileAttachFormErrorStore, useFileServerUIManagerModalStore } from "../../lib";

type MyFilesTabProps = {
    type?: FileServerMediaFileType | FileServerMediaFileType[];
    onAttachUpload?: (f?: File, hash?: string, size?: number, url?: string, isAttach?: boolean) => void;
    bundlePlatforms: string | null;
};

const FileUpload = withFileUpload(FileServerBrowser);

export const MyFiles = ({ type, onAttachUpload }: MyFilesTabProps) => {
    const { formatList, accept, bundlePlatforms } = getFormatFile(type);
    const [isFileServerLoading, setIsFileServerLoading] = useState<boolean>(false);

    const { uploadFile } = useAllFileServerStore((state) => ({
        uploadFile: state.uploadFile,
    }));

    const { updateErrors, clearErrors, errors } = useFileAttachFormErrorStore((state) => ({
        updateErrors: state.updateErrors,
        clearErrors: state.clearErrors,
        errors: state.errors,
    }));

    const handleUpload = async (inputFile: File) => {
        uploadFile({
            file: inputFile,
            allowedType: type,
            accept,
            updateErrors: (formatErrors: string[]) => {
                updateErrors({ fieldName: "file", message: formatErrors });
            },
            onUploadStart: () => {
                setIsFileServerLoading(true);
            },
            onUploadFinish: (params: { file: File; uid: string; url: string }) => {
                setIsFileServerLoading(false);
                onAttachUpload(params.file, params.uid, undefined, params.url, true);
                // todo: убрать, когда появится вкладка с купленными моделями
                if (
                    (Array.isArray(type) && type.includes(FileServerMediaFileType.Model3D)) ||
                    type === FileServerMediaFileType.Model3D
                ) {
                    closeAllPopupInstances();
                    return;
                }
                closeLastPopupInstance();
            },
        });
    };

    return (
        <FileUpload
            useFileServerUIManagerModalStore={useFileServerUIManagerModalStore}
            errors={errors}
            onAttachUpload={onAttachUpload}
            onUpload={(file) => handleUpload(file)}
            accept={accept}
            formatList={formatList}
            type={type}
            bundlePlatforms={bundlePlatforms}
            isFileServerLoading={isFileServerLoading}
            clearErrors={clearErrors}
        />
    );
};
