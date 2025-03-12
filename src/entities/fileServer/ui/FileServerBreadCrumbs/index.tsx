import { cn, FileServerStoreType, useMediaQuery, UseFileServerUIManagerType } from "shared/libs";
import { ClassNameValue } from "tailwind-merge";
import { StoreApi, UseBoundStore } from "zustand";
import { FileServerContentProps } from "../FileServerContentData/model";
import { FileStorageContentDropdown } from "../FileStorageContentDropdown";
import { FileServerBreadCrumbsBase } from "./FileServerBreadCrumbsBase";

type FileServerPageBreadCrumbsProps = {
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>;
    enableAction?: boolean;
    className?: ClassNameValue;
    useFileServerUIManagerStore: UseFileServerUIManagerType;
} & Pick<FileServerContentProps, "size">;

export const FileSeverBreadCrumbs = ({
    useFileServerStore,
    size,
    enableAction,
    className,
    useFileServerUIManagerStore,
}: FileServerPageBreadCrumbsProps) => {
    const folderProps = useFileServerStore((state) => ({
        setFolderUid: state.setFolderUid,
        setPaginationUpdateStrategy: state.setPaginationUpdateStrategy,
        data: state?.fileServerListData,
    }));

    const breadCrumbsProps = useFileServerUIManagerStore((s) => ({
        breadCrumbs: s.breadCrumbs,
        updateBreadCrumbs: s.updateBreadCrumbs,
    }));

    const isMobileScreen = useMediaQuery("(max-width: 48rem)");

    return (
        <div className={cn("flex flex-1 gap-1", className)}>
            <FileServerBreadCrumbsBase
                {...folderProps}
                {...breadCrumbsProps}
                size={isMobileScreen ? "s" : size === "l" ? "m" : "s"}
            />
            <div className={"grid h-full content-center items-center"}>
                {enableAction && (
                    <FileStorageContentDropdown
                        useFileServerStore={useFileServerStore}
                        isBreadCrumb
                    />
                )}
            </div>
        </div>
    );
};
