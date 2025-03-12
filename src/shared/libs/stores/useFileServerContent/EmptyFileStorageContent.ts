import { FileServerItemType } from "../../../models";

export const EMPTY_FILE_SERVER_CONTENT = Object.freeze<FileServerItemType>({
    hash: "EMPTY_FILE_STORAGE_CONTENT",
    url: "",
    size: 0,
    createdAt: new Date().toISOString(),
    subFiles: [],
    type: "1",
    isDirectory: false,
    name: "string",
    isSystemFolder: false,
});
