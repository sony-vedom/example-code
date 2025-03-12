import { FileServerStoreType, UseFileServerUIManagerType } from "shared/libs";
import { FileServerItemType } from "shared/models";
import { StoreApi, UseBoundStore } from "zustand";

export const useOnSelectItem = (
    content: FileServerItemType,
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>,
    useFileServerUIManagerStore: UseFileServerUIManagerType,
    onUpload?: (f?: File, hash?: string, size?: number, url?: string, isAttach?: boolean) => void,
    disabled?: boolean
) => {
    const { hash, name, isDirectory, url, size } = content;
    const setFolderUid = useFileServerStore((state) => state.setFolderUid);
    const updateBreadCrumbs = useFileServerUIManagerStore((state) => state.updateBreadCrumbs);

    // const showPreview = useFileStorageContent((state) => state.showPreview);
    // const setSelectedContent = useFileStorageContent((state) => state.setSelectedContent);

    return () => {
        if (isDirectory) {
            setFolderUid(hash);
            updateBreadCrumbs({
                name,
                folderUid: hash,
            });
            return;
        }
        if (onUpload && !disabled && !isDirectory) {
            onUpload(undefined, hash, size, url, true);
        }
        // setSelectedContent(content);
        // showPreview();
    };
};
