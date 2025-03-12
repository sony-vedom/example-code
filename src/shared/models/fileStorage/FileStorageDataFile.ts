import { FileStorageAttachApiType } from "./FileStorageAttachApiType";

export type FileStorageDataFile = {
    type: FileStorageAttachApiType;
    id: number;
    file?: File | string;
    isShown?: boolean;
    description?: string;
    progress?: number;
    hash?: string;
    size?: number;
};
