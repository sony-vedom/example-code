import { AxiosError } from "axios";
import { t } from "i18next";
import { FileServerApi } from "shared/api";
import { InfoStoreSlice } from "shared/libs/storeSlices/InfoStoreSlice";
import { SubscriptionSlice } from "shared/libs/storeSlices/SubscriptionSlice";
import { FileServerDataFile, FileStorageEventType, FileUploadResponse, FileServerMediaFileType } from "shared/models";
import { AllFileServerSlice } from "./createAllFileServerSlice";
import { validateFile } from "../../../../../file";
import { StateCreatorDevtoolsType } from "../../../../../storeSlices";
import { logger } from "../../../../../utils";

export type CreateFileServerSlice = State &
    Actions &
    InfoStoreSlice &
    SubscriptionSlice<FileStorageEventType, FileServerDataFile> &
    AllFileServerSlice;

type State = {
    uploadingFiles: FileServerDataFile[];
    movingFiles: FileServerDataFile[];
    removingFiles: string[];
};

const initialState: State = {
    uploadingFiles: [],
    movingFiles: [],
    removingFiles: [],
};

const blockWindowClosingHandler = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
};

type Actions = {
    uploadFile: (args: {
        file: File;
        allowedType?: FileServerMediaFileType | FileServerMediaFileType[];
        updateErrors: (errors: string[]) => void;
        accept: string;
        onUploadStart?: () => void;
        onUploadFinish?: (data: { file: File; uid: string; url: string }) => void;
    }) => void;
    _uploadFileBase: (data: FileServerDataFile) => Promise<FileUploadResponse | null>;
    removeFile: (type: FileServerMediaFileType, id: string) => Promise<boolean>;
    updateFileUploadingProgress: (data: FileServerDataFile) => void;
    createNewFolder: (name: string, parentFolderUid?: string) => Promise<void>;
    updateFolderName: (newName: string, folderUid: string) => Promise<void>;
    moveFile: (fileUid: string, destinationFolderUid: string, fileName: string) => Promise<void>;
    clearFileServerSlice: () => void;
};

export const createFileServerSlice: StateCreatorDevtoolsType<CreateFileServerSlice, State & Actions> = (set, get) => ({
    ...initialState,
    uploadFile: async ({ file, allowedType, accept, updateErrors, onUploadStart, onUploadFinish }) => {
        try {
            const validatingData = await validateFile(file, updateErrors, get().list?.data, allowedType, accept);

            if (validatingData) {
                const uploadPromise = get()._uploadFileBase({
                    type: validatingData.type,
                    file: validatingData.file,
                    folderUid: get().list.data?.DirectoryUid ?? "",
                    id: Math.random() + Date.now().toString(36),
                });

                onUploadStart?.();

                const res = await uploadPromise;
                onUploadFinish?.({
                    file: validatingData.file,
                    uid: res.uid,
                    url: res.url,
                });
            }
        } catch (e) {
            logger.error(e);
        }
    },
    async _uploadFileBase({ file, type, id, isShown = false, description = "", folderUid }) {
        const element = { file, type, isShown, description, id };
        let result = null;
        get().executeUploadEvents(FileStorageEventType.UPLOADING, element);
        try {
            window?.addEventListener("beforeunload", blockWindowClosingHandler);
            set(
                (state) => ({
                    ...state,
                    uploadingFiles: [...state.uploadingFiles, element],
                }),
                false,
                "uploadingFiles.start"
            );
            const res = await FileServerApi.uploadFile(file, type, folderUid, (evt) => {
                const progress = evt.progress || 0;
                get().updateFileUploadingProgress({ ...element, progress });
            });
            result = res.data.response;
            get().forceRefetch();
            get().executeUploadEvents(FileStorageEventType.UPLOADED, element);
        } catch (e) {
            get().executeUploadEvents(FileStorageEventType.UPLOADED_WITH_ERROR, element);
            get().setInfo({
                type: "error",
                message: e,
            });
        } finally {
            window?.removeEventListener("beforeunload", blockWindowClosingHandler);
            set(
                (state) => ({
                    ...state,
                    uploadingFiles: state.uploadingFiles.filter((f) => f.id !== id),
                }),
                false,
                "uploadingFiles.end"
            );
        }
        return result;
    },
    async removeFile(type, id) {
        let res = true;
        try {
            get().executeUploadEvents(FileStorageEventType.REMOVING, { type, id });
            set(
                (state) => ({
                    ...state,
                    removingFiles: [...state.removingFiles, id],
                }),
                false,
                "removingFiles.start"
            );
            await FileServerApi.deleteFile(id, type);

            get().executeUploadEvents(FileStorageEventType.REMOVED, { type, id });
            get().forceRefetch();
        } catch (e) {
            res = false;
            get().executeUploadEvents(FileStorageEventType.REMOVED_WITH_ERROR, { type, id });
            get().setInfo({
                type: "error",
                message: e,
            });
            if (e instanceof AxiosError) {
                get().setInfo({ type: "error", message: t(e.response?.data?.response.message) });
                return;
            }
            if (e instanceof Error) {
                get().setInfo({ type: "error", message: t(e.message) });
                return;
            }
            get().setInfo({ type: "error", message: e });
        } finally {
            set(
                (state) => ({
                    ...state,
                    uploadingFiles: state.uploadingFiles.filter((f) => f.id !== id),
                }),
                false,
                "removingFiles.end"
            );
        }
        return res;
    },
    updateFileUploadingProgress: (data: FileServerDataFile) => {
        const uploadingFiles = get().uploadingFiles.map((d) => (d.id === data.id && d.type === data.type ? data : d));
        set((state) => ({ ...state, uploadingFiles }), false, "updateFileUploadingProgress");
    },
    createNewFolder: async (name, parentFolderUid) => {
        try {
            await FileServerApi.createFolder(parentFolderUid ?? "", name);
            get().forceRefetch();
            get().setInfo({ type: "success", message: `Папка ${name} успешно создана` });
        } catch (error) {
            set(
                (s) => ({
                    ...s,
                    isFetching: false,
                    isLoading: false,
                }),
                false,
                "fetch.error"
            );
            get().setInfo({ type: "error", message: error });
        }
    },
    updateFolderName: async (newName, folderUid) => {
        try {
            await FileServerApi.updateFolder(folderUid, newName);
            get().forceRefetch();
            get().setInfo({ type: "success", message: `Имя папки ${newName} успешно обновлено` });
        } catch (e) {
            set(
                (s) => ({
                    ...s,
                    isFetching: false,
                    isLoading: false,
                }),
                false,
                "fetch.error"
            );
            if (e instanceof AxiosError) {
                get().setInfo({ type: "error", message: t(e.response?.data?.response.message) });
                return;
            }
            if (e instanceof Error) {
                get().setInfo({ type: "error", message: t(e.message) });
                return;
            }
            get().setInfo({ type: "error", message: e });
        }
    },
    moveFile: async (fileUid, destinationFolderUid, fileName) => {
        try {
            await FileServerApi.moveFolder(fileUid, destinationFolderUid);
            get().forceRefetch();
            get().setInfo({ type: "success", message: `Файл ${fileName} успешно перемещен` });
        } catch (error) {
            set(
                (s) => ({
                    ...s,
                    isFetching: false,
                    isLoading: false,
                }),
                false,
                "fetch.error"
            );
            get().setInfo({ type: "error", message: error });
        }
    },
    clearFileServerSlice: () => {
        set(initialState, false, "clear");
    },
});
