import { FileServerMediaFileType } from "./item";

export type FileServerDataFile = {
    type?: FileServerMediaFileType;
    id?: string;
    file?: File;
    folderUid?: string;
    isShown?: boolean;
    description?: string;
    progress?: number;
};
