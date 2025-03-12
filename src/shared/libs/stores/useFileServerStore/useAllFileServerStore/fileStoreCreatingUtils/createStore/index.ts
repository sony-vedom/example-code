import { createComputed } from "zustand-computed";
import { AllFileServerSlice, createAllServerStoreSlice } from "./createAllFileServerSlice";
import { createFileParamsSlice, FileParamsSlice } from "./createFileParamsSlice";
import { CreateFileServerSlice, createFileServerSlice } from "./createFileServerSlice";
import { FileAllResponseData, FileServerDataFile, FileSortType, FileStorageEventType } from "../../../../../../models";
import {
    createImmerFetchingStoreSlice,
    createImmerInfoStoreSlice,
    createImmerPageStoreSlice,
    createImmerSearchStoreSlice,
    createImmerSortingStoreSlice,
    createSubscriptionSlice,
    FetchStoreSlice,
    InfoStoreSlice,
    PageStoreSlice,
    SearchStoreSlice,
    SortingStoreSlice,
} from "../../../../../storeSlices";

type ComputedState = {
    fileServerListData: FileAllResponseData | undefined;
};

export type FileServerStoreType = FileServerStoreBase & ComputedState;

export type FileServerStoreBase = FetchStoreSlice &
    PageStoreSlice &
    SearchStoreSlice &
    SortingStoreSlice<FileSortType> &
    InfoStoreSlice &
    FileParamsSlice &
    AllFileServerSlice &
    CreateFileServerSlice;

export const computedAllFileServerStore = createComputed(
    ({ list }: FileServerStoreBase): ComputedState => ({
        fileServerListData: list?.data,
    })
);

export const fileServerInitSortType = Object.freeze({
    sortOrder: 0,
    sortBy: 0,
});

export const createFileStore = computedAllFileServerStore((set, get, store) => ({
    ...createImmerPageStoreSlice(set, get, store),
    ...createImmerSearchStoreSlice(set, get, store),
    ...createImmerFetchingStoreSlice(set, get, store),
    ...createImmerSortingStoreSlice<FileSortType>({
        sortType: fileServerInitSortType,
    })(set, get, store),
    ...createImmerInfoStoreSlice(set, get, store),
    ...createFileParamsSlice(set, get, store),
    ...createAllServerStoreSlice(set, get, store),
    ...createSubscriptionSlice<FileStorageEventType, FileServerDataFile>()(set, get, store),
    ...createFileServerSlice(set, get, store),
    limit: 25,
}));
