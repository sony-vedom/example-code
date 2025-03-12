import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { createFileStore, FileServerStoreBase, setSearchParamsUpdating } from "./fileStoreCreatingUtils";
import { DEBUG_ENABLED } from "../../../../constants";
import { urlStorageConfig } from "../../../storeSlices";

export const usePaginatedAllFileServerStore = create<FileServerStoreBase>()(
    devtools(
        persist(createFileStore, {
            name: "usePaginatedAllFileServerStore",
            storage: createJSONStorage(() => urlStorageConfig),
            partialize: (state) => ({
                page: state.page,
                limit: state.limit,
                searchText: state.searchText,
                sortType: state.sortType,
                type: state.type,
                folderUid: state.folderUid,
                includeSubFiles: state.includeSubFiles,
                status: state.status,
            }),
        }),
        {
            name: "usePaginatedAllFileServerStore",
            enabled: DEBUG_ENABLED,
        }
    )
);

usePaginatedAllFileServerStore.subscribe(setSearchParamsUpdating);
