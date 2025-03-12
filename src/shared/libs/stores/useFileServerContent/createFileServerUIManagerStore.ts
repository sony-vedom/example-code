import { DEBUG_ENABLED } from "shared/constants";
import { FileBreadCrumb, FileServerItemType, FileStorageContentDisplayType } from "shared/models";
import { create, StoreApi, UseBoundStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EMPTY_FILE_SERVER_CONTENT } from "./EmptyFileStorageContent";

export type UseFileServerUIManagerType = UseBoundStore<StoreApi<FileStorageUIManagerType>>;
type FileStorageUIManagerType = State & Actions;

type State = {
    isPreviewShowed: boolean;
    displayType: FileStorageContentDisplayType;
    selectedContent: FileServerItemType | null;
    breadCrumbs: FileBreadCrumb[];
};

const initialBreadcrumb = {
    name: "Мои файлы",
    folderUid: null,
};

const initialState: State = {
    isPreviewShowed: false,
    selectedContent: EMPTY_FILE_SERVER_CONTENT,
    displayType: FileStorageContentDisplayType.TABLE,
    breadCrumbs: [initialBreadcrumb],
};

type Actions = {
    init: (content: FileServerItemType[]) => void;
    showPreview: () => void;
    togglePreview: () => void;
    toggleDisplayType: () => void;
    setSelectedContent: (content: FileServerItemType) => void;
    updateBreadCrumbs: (val: FileBreadCrumb[] | FileBreadCrumb) => void;
    clearBreadCrumbs: () => void;
    clear: () => void;
};

export const createFileServerUIManagerStore = (name: string) =>
    create<State & Actions>()(
        devtools(
            persist(
                (set, get) => ({
                    init: (content) => {
                        set(
                            (s) => ({
                                ...s,
                                content,
                            }),
                            false,
                            "init"
                        );
                    },
                    updateBreadCrumbs: (newVal) => {
                        if (Array.isArray(newVal)) {
                            set((s) => ({
                                ...s,
                                breadCrumbs: newVal,
                            }));
                            return;
                        }
                        if (
                            newVal.name === initialBreadcrumb.name &&
                            newVal.folderUid === initialBreadcrumb.folderUid
                        ) {
                            set((s) => ({
                                ...s,
                                breadCrumbs: [initialBreadcrumb],
                            }));
                            return;
                        }
                        const newBreadCrumbsIndex = get().breadCrumbs.findIndex(
                            (el) => el.folderUid === newVal.folderUid
                        );
                        if (newBreadCrumbsIndex >= 0) {
                            set((s) => ({
                                ...s,
                                breadCrumbs: s.breadCrumbs.slice(0, newBreadCrumbsIndex + 1),
                            }));
                            return;
                        }
                        set((s) => ({
                            ...s,
                            breadCrumbs: [...s.breadCrumbs, newVal],
                        }));
                    },
                    clearBreadCrumbs: () => {
                        set((s) => ({
                            ...s,
                            breadCrumbs: initialState.breadCrumbs,
                        }));
                    },
                    showPreview: () => {
                        if (get().isPreviewShowed === true) return;
                        set((state) => ({ ...state, isPreviewShowed: true }), false, "showPreview");
                    },
                    togglePreview: () => {
                        set((state) => ({ ...state, isPreviewShowed: !get().isPreviewShowed }), false, "togglePreview");
                    },
                    toggleDisplayType: () => {
                        const displayType =
                            get().displayType === FileStorageContentDisplayType.TABLE
                                ? FileStorageContentDisplayType.GRID
                                : FileStorageContentDisplayType.TABLE;
                        set((state) => ({ ...state, displayType }), false, "toggleDisplayType");
                    },
                    setSelectedContent: (content) => {
                        if (get().selectedContent?.hash === content.hash) return;
                        set((state) => ({ ...state, selectedContent: content }), false, "selectContent");
                    },
                    clear: () => set(initialState),
                    ...initialState,
                }),
                {
                    name: name,
                    partialize: (state) => ({
                        displayType: state.displayType,
                        breadCrumbs: state.breadCrumbs,
                    }),
                }
            ),
            {
                name: name,
                enabled: DEBUG_ENABLED,
            }
        )
    );
