import React from "react";
import { useTranslation } from "react-i18next";
import { closeLastPopupInstance, useAllFileServerStore, UseFileServerUIManagerType } from "shared/libs";
import { FileServerMediaFileType, PaginationUpdateStrategy } from "shared/models";
import {
    FileServerContentData,
    FileSeverBreadCrumbs,
    UploadFileButton,
    FileServerSearchInput,
} from "../../../fileServer";
import { FileListWrapper } from "../FileListWrapper";

export type FileListProps = {
    type?: FileServerMediaFileType | FileServerMediaFileType[];
    onAttachUpload?: (f?: File, hash?: string, size?: number, url?: string, isAttach?: boolean) => void;
    onUpload(file: File): Promise<void>;
    accept: string;
    useFileServerUIManagerModalStore: UseFileServerUIManagerType;
};

export const FileServerBrowser = ({
    type,
    onAttachUpload,
    onUpload,
    accept,
    useFileServerUIManagerModalStore,
}: FileListProps) => {
    const { t } = useTranslation();

    const {
        isFetching,
        isLoading,
        limitReached,
        nextPage,
        setPaginationUpdateStrategy,
        setSearchText,
        clearSearchText,
    } = useAllFileServerStore((state) => ({
        setSearchText: state.setSearchText,
        clearSearchText: state.clearSearchText,
        isLoading: state.isLoading,
        isFetching: state.isFetching,
        limitReached: state.limitReached,
        nextPage: state.nextPage,
        setPaginationUpdateStrategy: state.setPaginationUpdateStrategy,
    }));

    const fetchNextPage = async () => {
        if (limitReached && isFetching) {
            return;
        }
        setPaginationUpdateStrategy(PaginationUpdateStrategy.APPEND);
        nextPage();
    };

    return (
        <>
            <FileServerSearchInput
                className={"w-full"}
                onSearch={setSearchText}
                onReset={clearSearchText}
            />
            <FileListWrapper
                isFetching={isFetching || isLoading}
                fetchNextPage={fetchNextPage}
                limitReached={limitReached}
            >
                <FileSeverBreadCrumbs
                    useFileServerUIManagerStore={useFileServerUIManagerModalStore}
                    className={"w-full"}
                    enableAction={false}
                    size={"s"}
                    useFileServerStore={useAllFileServerStore}
                />
                <FileServerContentData
                    size={"s"}
                    useFileServerStore={useAllFileServerStore}
                    useFileServerUIManagerStore={useFileServerUIManagerModalStore}
                    type={type}
                    onUpload={(...args) => {
                        onAttachUpload(...args);
                        closeLastPopupInstance();
                    }}
                    className={"w-full [&>div]:p-0 [&_header]:flex-row-reverse [&_header]:justify-between"}
                >
                    <UploadFileButton
                        onUpload={onUpload}
                        accept={accept}
                        className={"h-[34p" + "x] [&_button]:h-full"}
                    >
                        {t("Загрузить файл")}
                    </UploadFileButton>
                </FileServerContentData>
            </FileListWrapper>
        </>
    );
};
