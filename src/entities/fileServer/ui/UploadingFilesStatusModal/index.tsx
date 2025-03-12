import React from "react";
import CloseModalIconNew from "assets/icons/cancel-cross-new-popup-icon.svg?react";
import { Preloader } from "components";
import { cn } from "shared/libs";
import { DefaultContent } from "./DefaultContent";
import { DragOverContent } from "./DragOverContent";
import { ErrorContent } from "./ErrorContent";

type ContentManagerProps = {
    isDragOver?: boolean;
    formatList?: string;
    isError?: boolean;
    errors?: string[];
    isLoading?: boolean;
    bundlePlatforms?: string | null;
};

const ContentManager = ({
    isDragOver,
    formatList,
    isError,
    errors = [],
    isLoading,
    bundlePlatforms,
}: ContentManagerProps) => {
    if (isLoading) {
        return <Preloader />;
    }
    if (isError) {
        return <ErrorContent errors={errors} />;
    }
    if (isDragOver) {
        return <DragOverContent />;
    }
    return (
        <DefaultContent
            bundlePlatforms={bundlePlatforms}
            formatList={formatList}
        />
    );
};

type UploadingFilesCurrentStateProps = {
    formatList?: string;
    isDragOver?: boolean;
    onCloseFileInfo?: () => void;
    errors?: string[];
    isLoading?: boolean;
    bundlePlatforms?: string | null;
};

export const UploadingFilesStatusModal = ({
    formatList = "",
    isDragOver,
    onCloseFileInfo,
    errors,
    isLoading,
    bundlePlatforms,
}: UploadingFilesCurrentStateProps) => {
    const isError = errors.length ? Boolean(errors.length) : false;
    return (
        <div
            onClick={() => {
                if (isError) {
                    onCloseFileInfo();
                }
            }}
            className={cn(
                "border-uploading-files relative flex size-full flex-col items-center justify-center gap-3 rounded-2xl bg-[var(--bg-uploading-files-server)] p-2.5 text-sm text-[var(--text-files-color)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)]",
                {
                    ["!bg-[var(--bg-uploading-file-server-dragOver)]"]: isDragOver,
                    ["border-uploading-files_error !bg-[var(--bg-uploading-file-server-error)] text-[var(--text-file-color-error)]"]:
                        isError,
                    ["cursor-pointer"]: !isLoading,
                }
            )}
        >
            {onCloseFileInfo && !isLoading && (
                <button
                    className={"absolute right-5 top-5 text-[inherit]"}
                    onClick={(e) => {
                        e.stopPropagation();
                        onCloseFileInfo();
                    }}
                >
                    <CloseModalIconNew
                        width={25}
                        height={25}
                    />
                </button>
            )}
            <ContentManager
                errors={errors}
                isError={isError}
                isDragOver={isDragOver}
                formatList={formatList}
                isLoading={isLoading}
                bundlePlatforms={bundlePlatforms}
            />
        </div>
    );
};
