import React, { PropsWithChildren } from "react";
import { UploadFiles } from "shared/ui";
import { ClassNameValue } from "tailwind-merge";
import { UploadFileServerButtonContent } from "./UploadFileServerButtonContent";

type UploadFileButtonBaseProps = {
    accept: string;
    onOpenPopup?: () => void;
    onUpload: (file: File) => Promise<unknown>;
    className?: ClassNameValue;
};

export const UploadFileButton = ({
    children,
    className,
    onOpenPopup,
    accept,
    onUpload,
}: PropsWithChildren<UploadFileButtonBaseProps>) => {
    if (onOpenPopup) {
        return (
            <UploadFileServerButtonContent
                className={className}
                onClick={onOpenPopup}
            >
                {children}
            </UploadFileServerButtonContent>
        );
    }

    return (
        <UploadFiles
            className={className}
            onUpload={onUpload}
            accept={accept}
        >
            <UploadFileServerButtonContent>{children}</UploadFileServerButtonContent>
        </UploadFiles>
    );
};
