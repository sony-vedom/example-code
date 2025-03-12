import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createFileStore, FileServerStoreBase, setSearchParamsUpdating } from "./fileStoreCreatingUtils";
import { DEBUG_ENABLED } from "../../../../constants";

export const useAllFileServerStore = create<FileServerStoreBase>()(
    devtools(createFileStore, {
        name: "useFileServerStore",
        enabled: DEBUG_ENABLED,
    })
);

useAllFileServerStore.subscribe(setSearchParamsUpdating);
