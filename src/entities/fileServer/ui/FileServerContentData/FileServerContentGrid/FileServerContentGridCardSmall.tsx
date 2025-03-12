import { cn, FileServerStoreType, UseFileServerUIManagerType } from "shared/libs";
import { FileServerItemType } from "shared/models";
import { StoreApi, UseBoundStore } from "zustand";
import { FileDisplay, MediaFileTypeDisplayType } from "../../FileDisplay";
import { useOnSelectItem } from "../lib";
import { FileServerContentProps } from "../model";

type FileItemProps = {
    content: FileServerItemType;
    disabled?: boolean;
    onUpload?: FileServerContentProps["onUpload"];
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>;
    useFileServerUIManagerStore: UseFileServerUIManagerType;
};

export const FileServerContentGridCardSmall = ({
    disabled = false,
    onUpload,
    content,
    useFileServerStore,
    useFileServerUIManagerStore,
}: FileItemProps) => {
    const onSelect = useOnSelectItem(content, useFileServerStore, useFileServerUIManagerStore, onUpload);

    return (
        <div
            onClick={onSelect}
            className={cn(
                "flex flex-col items-start justify-center gap-px",
                disabled ? "cursor-not-allowed" : "cursor-pointer"
            )}
        >
            <div className={"flex items-center justify-center gap-0.5"}>
                <div>
                    <FileDisplay
                        size={"xxs"}
                        displayType={content.isDirectory ? MediaFileTypeDisplayType.FOLDER : content.type}
                        url={content.url}
                        disabled={disabled}
                    />
                </div>
                <div
                    className={
                        "line-clamp-1 w-[108px] overflow-hidden text-ellipsis text-[10.6px] font-medium not-italic leading-[normal] text-[rgba(0,0,0,0.75)] dark:text-white"
                    }
                >
                    {content.name}
                </div>
            </div>
            <FileDisplay
                key={`${content.hash}-file-display`}
                displayType={content.isDirectory ? MediaFileTypeDisplayType.FOLDER : content.type}
                url={content.url}
                disabled={disabled}
            />
        </div>
    );
};
