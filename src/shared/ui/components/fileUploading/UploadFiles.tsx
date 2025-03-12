import { memo, useMemo, useRef } from "react";
import { logDebug, useApp } from "shared/libs";
import { DropWrapper, HiddenUploadInput } from "shared/ui";
import { ClassNameValue } from "tailwind-merge";
import styles from "./UploadFiles.module.scss";

type Props = {
    onUpload: (f: File) => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDragEnd?: (e: React.DragEvent) => void;
    onDragLeave?: (e: React.DragEvent) => void;
    onDragStart?: (e: React.DragEvent) => void;
    children?: React.ReactNode;
    className?: ClassNameValue;
    accept?: string;
    disabled?: boolean;
    variant?: "clear" | "primary" | "transparent-background";
    isNeedOpenUploadPopup?: boolean;
};

export const UploadFiles = memo(function UploadFiles({
    children,
    className = "",
    variant = "clear",
    accept = "*/*",
    onDragOver,
    onDragEnd,
    onDragLeave,
    onUpload,
    disabled,
    onDragStart,
    isNeedOpenUploadPopup = true,
}: Props) {
    const { theme } = useApp();
    const uploadRef = useRef<HTMLInputElement>(null);
    const classNames = useMemo(
        () => `${variant === "clear" ? "" : styles[variant]} ${className}`,
        [className, variant]
    );

    const uploadFile = async (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        let fileTemp: File | null = null;
        if ("dataTransfer" in e) {
            fileTemp = e.dataTransfer.files[0];
        } else if (e.target?.files?.length) {
            fileTemp = e.target.files[0];
        }
        if (fileTemp) {
            if (uploadRef.current) {
                uploadRef.current.value = "";
            }
            onUpload(fileTemp);
        } else {
            logDebug("err", fileTemp);
        }
    };

    const openUploadPopup = () => {
        if (isNeedOpenUploadPopup) {
            uploadRef.current?.click();
        }
    };

    return (
        <DropWrapper
            className={classNames}
            data-theme={theme}
            onDrop={uploadFile}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={openUploadPopup}
            onDragStart={onDragStart}
        >
            {children}
            {!disabled && (
                <HiddenUploadInput
                    ref={uploadRef}
                    onChange={uploadFile}
                    format={accept}
                />
            )}
        </DropWrapper>
    );
});
