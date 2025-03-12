import React, { memo } from "react";
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
    className: string;
    onUpload?: FileServerContentProps["onUpload"];
    disabled?: boolean;
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>;
    useFileServerUIManagerStore: UseFileServerUIManagerType;
};

export const FileServerContentTableRow = memo(
    ({ content, className, onUpload, disabled, useFileServerStore, useFileServerUIManagerStore }: Params) => {
        const locale = appStore((state) => state.locale);
        const selectedContent = useFileServerUIManagerStore((state) => state.selectedContent);
        const onSelect = useOnSelectItem(content, useFileServerStore, useFileServerUIManagerStore, onUpload);

        const { handleDragStart, handleDragOver, handleDraggingEnterEvent, handleDrop } = useDragNDropFiles(
            content,
            useFileServerStore
        );

        return (
            <tr
                className={cn(
                    className,
                    "rounded-xl bg-transparent py-2 transition-colors",
                    selectedContent.hash === content.hash && "bg-[#1B67F716]",
                    disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#1B67F716]"
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
                <td className="grid-area/icon">
                    <FileDisplay
                        url={content.url}
                        size={"m"}
                        disabled={disabled}
                        displayType={content.isDirectory ? MediaFileTypeDisplayType.FOLDER : content.type}
                    />
                </td>
                <td className="line-clamp-1 flex items-center grid-area/name">{content.name}</td>
                <td className="flex items-center grid-area/time">
                    <time dateTime={content.createdAt}>
                        {new Intl.DateTimeFormat(locale, {
                            dateStyle: "short",
                        }).format(new Date(content.createdAt))}
                    </time>
                </td>
                <td className={"grid-area/dropdown [&>div]:grid"}>
                    <FileStorageContentDropdown
                        useFileServerStore={useFileServerStore}
                        content={content}
                        className="h-7 w-5 px-7 py-0"
                    />
                </td>
            </tr>
        );
    }
);

FileServerContentTableRow.displayName = "FileStorageContentTableRow";
