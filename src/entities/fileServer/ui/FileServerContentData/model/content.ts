import { FileServerStoreType, UseFileServerUIManagerType } from "shared/libs";
import { FileServerItemType, FileServerMediaFileType } from "shared/models";
import { StoreApi, UseBoundStore } from "zustand";

export enum ContentSize {
    S = "s",
    L = "l",
}

export type FileServerContentProps = {
    size: `${ContentSize}`;
    enableAction?: boolean;
    onUpload?: (f?: File, hash?: string, size?: number, url?: string, isAttach?: boolean) => void;
    type?: FileServerMediaFileType | FileServerMediaFileType[];
    content: FileServerItemType[];
    isLoading: boolean;
    isFetching: boolean;
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>;
    useFileServerUIManagerStore: UseFileServerUIManagerType;
};
