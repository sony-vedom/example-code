import { FileServerStoreBase } from "./createStore";
import { FileAllRequest, PaginationUpdateStrategy } from "../../../../../models";
import { compareObjectsByKeys } from "../../../../utils";

const searchParamsKeys: Array<keyof FileAllRequest | string> = [
    "type",
    "userId",
    "folderUid",
    "includeSubFiles",
    "sortBy",
    "sortOrder",
    "status",
    "limit",
    "searchText",
];

export const setSearchParamsUpdating = (state: FileServerStoreBase, prevState: FileServerStoreBase) => {
    if (!compareObjectsByKeys(state, prevState, searchParamsKeys) && !state.isLoading) {
        state.setPaginationUpdateStrategy(PaginationUpdateStrategy.REPLACE);
        state.refetch();
        return;
    }
    if (state.page !== prevState.page && state.page !== 1) {
        state.refetch();
    }
};
