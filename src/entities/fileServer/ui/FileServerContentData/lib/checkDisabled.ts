import { FileServerItemType, FileServerMediaFileType } from "shared/models";

export const checkDisabled = (
    elem: FileServerItemType,
    type?: FileServerMediaFileType | FileServerMediaFileType[],
    isFetching?: boolean
) => {
    if (type === undefined) {
        return false;
    }
    if (elem.isDirectory) {
        return isFetching;
    }
    if (Array.isArray(type)) {
        return !type.includes(Number(elem.type)) || isFetching;
    }
    return type?.toString() !== elem?.type?.toString() || isFetching;
};
