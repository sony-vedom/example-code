import { ListRequestDTO, type PaginationResponse } from "../api";
import { FileServerItemType, FileStatus, FileServerMediaFileType } from "./item";

export type FileAllRequestBase = {
    userId?: string;
    folderUid?: string | null;
    includeSubFiles?: null | boolean;
    status?: `${FileStatus}`;
    type?: `${FileServerMediaFileType}`;
};

export type FileAllRequest = Omit<ListRequestDTO, "showDeleted"> & FileAllRequestBase;

export type FileAllResponseData = {
    Directory: string;
    DirectoryUid: string;
    ParentId: null | string;
    IsSystemFolder: boolean;
};

export type FileAllResponse = PaginationResponse<FileServerItemType, FileAllResponseData> & {
    emptyMessage: string | null;
};

export type FileSortType = FileAllRequest;

export type FileUploadResponse = Response & { uid: string; fileUrl: string };
