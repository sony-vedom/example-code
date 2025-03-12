import { FileParamsSlice } from "./createFileParamsSlice";
import { FileServerApi } from "../../../../../../api";
import { FileAllResponse, FileAllResponseData, FileServerItemType, FileSortType } from "../../../../../../models";
import {
    FetchStoreSlice,
    InfoStoreSlice,
    PageStoreSlice,
    SearchStoreSlice,
    SortingStoreSlice,
    StateCreatorDevtoolsType,
} from "../../../../../storeSlices";
import { preparedListByPaginationStrategy } from "../../../../../utils";
import { currentUserStore } from "../../../../useCurrentUser";

export type AllFileServerSlice = State &
    Actions &
    FetchStoreSlice &
    PageStoreSlice &
    SearchStoreSlice &
    SortingStoreSlice<FileSortType> &
    InfoStoreSlice &
    FileParamsSlice;

type State = {
    list: FileAllResponse;
    queue: { request: (state: AllFileServerSlice) => Promise<FileAllResponse> }[];
};

type Actions = {
    init: (userId: string) => void;
    refetch: () => Promise<void>;
    forceRefetch: () => Promise<void>;
    getPaginatedAll: () => Promise<void>;
    clear: () => void;
    clearContent: () => void;
    addToQueue: (request: (state: AllFileServerSlice) => Promise<FileAllResponse>) => void;
    processQueue: () => void;
    findFileServerItem: (text: string) => void;
};

const initialState: State = {
    list: null,
    queue: [],
};

export const createAllServerStoreSlice: StateCreatorDevtoolsType<AllFileServerSlice, State & Actions> = (set, get) => ({
    ...initialState,
    init: async (userId) => {
        set((s) => ({
            ...s,
            userId,
        }));
        get().setUserId(userId);
        get().getPaginatedAll();
    },
    refetch: async () => {
        await get().getPaginatedAll();
    },
    forceRefetch: async () => {
        get().clearContent();
        get().setPage(1);
        get().refetch();
    },
    // TODO: очередь вынести в отдельный слайс, добавить abort
    addToQueue: (request) => {
        const shouldStartQueue = get().queue.length === 0;
        set((state) => ({
            ...state,
            queue: [...state.queue, { request }],
        }));
        if (shouldStartQueue) get().processQueue();
    },
    processQueue: async () => {
        if (get().queue.length === 0) return;

        const [{ request }, ...rest] = get().queue;
        set(
            (s) => ({
                ...s,
                queue: rest,
                isFetching: true,
                isLoading: !get()?.list?.results?.length,
            }),
            false,
            "fetch.start"
        );
        try {
            const res = await request(get());
            const preparedData = preparedListByPaginationStrategy<
                FileServerItemType,
                FileAllResponseData,
                Pick<FileAllResponse, "emptyMessage">
            >(get().paginationUpdateStrategy, get().list, res);
            get().setPageCount(res.pageCount || 1);
            get().setItemTotalCount(res.totalCount);

            set(
                (s) => ({
                    ...s,
                    list: preparedData,
                    isFetching: false,
                    isLoading: false,
                }),
                false,
                "fetch.end"
            );
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
        } finally {
            get().processQueue();
        }
    },
    async getPaginatedAll() {
        get().addToQueue(async (state) => {
            const res = await FileServerApi.getPaginatedAll({
                limit: state.limit,
                page: state.page,
                search: state.searchText,
                sortBy: state.sortType.sortBy,
                sortOrder: state.sortType.sortOrder,
                userId: state.userId ?? currentUserStore.getState().id,
                folderUid: state.folderUid,
                includeSubFiles: state.includeSubFiles,
                status: state.status,
                type: state.type,
            });
            return res;
        });
    },
    findFileServerItem: (text) => {
        get().setPage(1);
        get().setSearchText(text);
    },
    clearContent: () => {
        set((s) => ({
            ...s,
            list: null,
        }));
    },
    clear: () => {
        const state = get();
        state.clearInfo();
        state.clearFetching();
        state.clearPages();
        state.clearSearchText();
        state.clearSorting();
        state.clearInfo();
        state.clearFileParamsSlice();
        set(() => initialState);
    },
});
