import { memo } from "react";
import { appStore, cn, FileServerStoreType, UseFileServerUIManagerType } from "shared/libs";
import { FileServerItemType } from "shared/models";
import { StoreApi, UseBoundStore } from "zustand";
import { FileDisplay, MediaFileTypeDisplayType } from "../../FileDisplay";
import { FileStorageContentDropdown } from "../../FileStorageContentDropdown";
import { useOnSelectItem } from "../lib";
import { useDragNDropFiles } from "../lib/useDragNDropFiles";
import { FileServerContentProps } from "../model";

type Params = {
    content: FileServerItemType;
    onUpload: FileServerContentProps["onUpload"];
    disabled?: boolean;
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>;
    useFileServerUIManagerStore: UseFileServerUIManagerType;
};

export const FileServerContentGridCardLarge = memo(
    ({ content, onUpload, disabled, useFileServerStore, useFileServerUIManagerStore }: Params) => {
        const locale = appStore((state) => state.locale);
        const selectedContent = useFileServerUIManagerStore((state) => state.selectedContent);
        const onSelect = useOnSelectItem(content, useFileServerStore, useFileServerUIManagerStore, onUpload);
        const { handleDragStart, handleDragOver, handleDraggingEnterEvent, handleDrop } = useDragNDropFiles(
            content,
            useFileServerStore
        );
        return (
            <div
                className={cn(
                    "grid grid-cols-[1rem_auto_1fr_auto] gap-2 rounded-xl bg-[#1B67F708] p-2 text-primary-text transition-colors grid-areas-['icon_title_title_dropdown'_'owner_owner_date_date'_'preview_preview_preview_preview']",
                    selectedContent.hash === content.hash && "cursor-default hover:bg-[#1B67F726]",
                    "border border-solid border-transparent bg-[#1B67F712]",
                    !disabled && "bg-[#1B67F712] hover:border-[#1B67F7] hover:bg-[#1B67F716]",
                    content.isDirectory && !disabled && "cursor-pointer",
                    disabled && "cursor-not-allowed"
                )}
                draggable={!content.isDirectory}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDraggingEnterEvent}
                onClick={onSelect}
                id={content.hash}
                data-directory={Number(content.isDirectory)}
            >
                <figure className="contents">
                    <div className={"flex size-6 items-center justify-center grid-area/icon"}>
                        <FileDisplay
                            size={"xs"}
                            url={content.url}
                            disabled={disabled}
                            displayType={content.isDirectory ? MediaFileTypeDisplayType.FOLDER : content.type}
                        />
                    </div>
                    <figcaption className="line-clamp-1 self-center text-left text-sm font-medium leading-6 grid-area/title">
                        {content.name}
                    </figcaption>
                </figure>
                <FileStorageContentDropdown
                    useFileServerStore={useFileServerStore}
                    className="grid-area/dropdown"
                    content={content}
                />
                <time
                    dateTime={content.createdAt}
                    className="flex justify-end text-sm font-normal grid-area/date"
                >
                    {new Intl.DateTimeFormat(locale, {
                        dateStyle: "short",
                    }).format(new Date(content.createdAt))}
                </time>
                <figure className="flex h-52 items-center justify-center rounded-xl bg-white grid-area/preview dark:bg-[#c8cccd99]">
                    <FileDisplay
                        size={"m"}
                        url={content.url}
                        disabled={disabled}
                        displayType={content.isDirectory ? MediaFileTypeDisplayType.FOLDER : content.type}
                    />
                </figure>
            </div>
        );
    }
);

FileServerContentGridCardLarge.displayName = "FileServerContentGridCardLarge";
