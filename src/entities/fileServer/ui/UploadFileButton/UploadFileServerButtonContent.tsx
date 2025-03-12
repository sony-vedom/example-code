import { MouseEventHandler, PropsWithChildren } from "react";
import FileStorageAddIcon from "assets/icons/file-storage-add-icon.svg?react";
import { appStore, cn } from "shared/libs";
import { ClassNameValue } from "tailwind-merge";

type UploadFileServerButtonContentProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: ClassNameValue;
};

export const UploadFileServerButtonContent = ({
    onClick,
    children,
    className,
}: PropsWithChildren<UploadFileServerButtonContentProps>) => {
    const theme = appStore((state) => state.theme);
    const backgroundImage =
        theme !== "dark"
            ? "linear-gradient(#ffffff, #ffffff), radial-gradient(circle at top left, #1b67f7, #e22fff)"
            : "linear-gradient(#000000, #000000), radial-gradient(circle at top left, #1b67f7, #e22fff)";
    return (
        <button
            onClick={onClick}
            style={{
                backgroundClip: "content-box, border-box",
                backgroundImage: backgroundImage,
            }}
            className={cn(
                "self-stretch rounded-lg border border-transparent bg-origin-border p-0 dark:bg-[#0f1215] [&_*]:text-xs",
                className
            )}
        >
            <div className={"group flex items-center gap-1.5 px-2.5 py-1"}>
                <FileStorageAddIcon />
                <span
                    className={
                        "bg-gradient-to-r from-[#1b67f7] to-[#e22fff] bg-clip-text text-transparent dark:from-[#1b67f7] dark:to-[#e22fff]"
                    }
                >
                    {children}
                </span>
            </div>
        </button>
    );
};
