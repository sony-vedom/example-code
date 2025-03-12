import { FileAllRequestBase, FileStatus, FileServerMediaFileType } from "../../../../../../models";
import { StateCreatorBaseType } from "../../../../../storeSlices";

export type FileParamsSlice = State & Actions;

type State = FileAllRequestBase;

type Actions = {
    setUserId: (id: string) => void;
    clearUserId: () => void;

    setFolderUid: (id: string) => void;
    clearFolderUid: () => void;

    setIncludeSubFiles: (val: boolean) => void;
    clearIncludeSubFiles: () => void;

    setStatus: (val: `${FileStatus}`) => void;
    clearStatus: () => void;

    setType: (val: `${FileServerMediaFileType}`) => void;
    clearType: () => void;

    clearFileParamsSlice: () => void;
};

const initialState: State = {
    userId: null,
    folderUid: null,
    includeSubFiles: null,
    status: null,
    type: null,
};

export const createFileParamsSlice: StateCreatorBaseType<FileParamsSlice> = (set) => {
    return {
        ...initialState,
        setUserId: (userId) => {
            set((state) => ({ ...state, userId }));
        },
        clearUserId: () => {
            set((state) => ({ ...state, userId: null }));
        },

        setFolderUid: (folderUid) => {
            set((state) => ({ ...state, folderUid }));
        },
        clearFolderUid: () => {
            set((state) => ({ ...state, folderUid: null }));
        },

        setIncludeSubFiles: (val) => {
            set((state) => ({ ...state, includeSubFiles: val }));
        },
        clearIncludeSubFiles: () => {
            set((state) => ({ ...state, includeSubFiles: null }));
        },

        setStatus: (status) => {
            set((state) => ({ ...state, status }));
        },
        clearStatus: () => {
            set((state) => ({ ...state, status: null }));
        },

        setType: (type) => {
            set((state) => ({ ...state, type }));
        },
        clearType: () => {
            set((state) => ({ ...state, type: null }));
        },

        clearFileParamsSlice: () => {
            set(() => initialState);
        },
    };
};
