import React, { FC, useEffect, useState } from "react";
import { cn } from "shared/libs";
import { UploadFiles } from "shared/ui";
import { ClassNameValue } from "tailwind-merge";
import { UploadingFilesStatusModal } from "./UploadingFilesStatusModal";
import "./index.css";

type Props = {
    onUpload(file: File): Promise<void>;
    clearErrors?: () => void;
    errors: Record<string, string[]>;
    accept: string;
    formatList: string;
    className?: ClassNameValue;
    isFileServerLoading?: boolean;
    bundlePlatforms?: string | null;
};

export function withFileUpload<P>(Component?: React.ComponentType<P>) {
    const WrappedComponent: FC<P & Props> = ({ className, isFileServerLoading, bundlePlatforms, ...restProps }) => {
        const [isDragOver, setIsDragOver] = useState(false);
        const [isDrag, setIsDrag] = useState(false);
        const errors = restProps.errors ? Object.values(restProps.errors).flat() : [];
        useEffect(() => {
            const onDragEnter = () => {
                setIsDrag(true);
            };
            const onDrLeave = (e: globalThis.DragEvent) => {
                if (document.contains(e.relatedTarget as Element)) {
                    return;
                } else {
                    setIsDrag(false);
                }
            };
            document.addEventListener("dragenter", onDragEnter);
            document.addEventListener("dragleave", onDrLeave);
            return () => {
                document.removeEventListener("dragenter", onDragEnter);
                document.removeEventListener("dragleave", onDrLeave);
            };
        }, []);

        const handleCloseFileInfo =
            errors.length || isDragOver || Component
                ? () => {
                      setIsDrag(false);
                      setIsDragOver(false);
                      restProps.clearErrors();
                  }
                : undefined;

        return (
            <UploadFiles
                onUpload={(f) => {
                    restProps.onUpload(f);
                    setIsDragOver(false);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                }}
                onDragEnd={() => setIsDragOver(false)}
                onDragLeave={() => setIsDragOver(false)}
                onDragStart={(e) => {
                    e.preventDefault();
                }}
                isNeedOpenUploadPopup={isDragOver || !Component}
                accept={restProps.accept}
                className={cn("flex w-full grow flex-col items-start px-0", className)}
            >
                {!isDrag && !errors.length && Component && !isFileServerLoading ? (
                    <Component {...(restProps as P)} />
                ) : (
                    <UploadingFilesStatusModal
                        bundlePlatforms={bundlePlatforms}
                        isLoading={isFileServerLoading}
                        isDragOver={isDragOver}
                        formatList={restProps.formatList}
                        onCloseFileInfo={handleCloseFileInfo}
                        errors={errors}
                    />
                )}
            </UploadFiles>
        );
    };
    WrappedComponent.displayName = `withFileUpload(${Component?.displayName || Component?.name || "WrappedComponent"})`;

    return WrappedComponent;
}
