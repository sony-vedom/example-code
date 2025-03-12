import React from "react";
import FileBreadCrumbsIcon from "assets/icons/file-breadcrumbs-arrow.svg?react";
import { useTranslation } from "react-i18next";
import { FileAllResponseData, FileBreadCrumb, PaginationUpdateStrategy } from "shared/models";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "../../../../shared/libs";

enum FileServerBreadCrumbsSize {
    S = "s",
    M = "m",
}

type FileServerBreadCrumbsProps = {
    breadCrumbs: FileBreadCrumb[];
    updateBreadCrumbs: (val: FileBreadCrumb[] | FileBreadCrumb) => void;
    setFolderUid: (id: string) => void;
    setPaginationUpdateStrategy: (value: PaginationUpdateStrategy) => void;
    data: FileAllResponseData;
    className?: ClassNameValue;
    size?: `${FileServerBreadCrumbsSize}`;
};

export const FileServerBreadCrumbsBase = ({
    breadCrumbs,
    updateBreadCrumbs,
    setFolderUid,
    setPaginationUpdateStrategy,
    className,
    data,
    size = "m",
}: FileServerBreadCrumbsProps) => {
    const { t } = useTranslation();

    return (
        <div className={cn("flex items-center gap-0.5 px-1 py-0", className)}>
            {breadCrumbs?.map((el, i, arr) => {
                const isNotActiveBreadCrumb =
                    data?.Directory !== "/" ? el?.folderUid !== data?.DirectoryUid : el?.name !== t("Мои файлы");
                return (
                    <React.Fragment key={i}>
                        <div
                            onClick={() => {
                                if (isNotActiveBreadCrumb) {
                                    updateBreadCrumbs(el);
                                    setPaginationUpdateStrategy(PaginationUpdateStrategy.REPLACE);
                                    setFolderUid(el.folderUid);
                                }
                            }}
                            className={cn("cursor-pointer dark:text-icon", {
                                ["text-[var(--no-active-breadcrumbs)]"]: isNotActiveBreadCrumb,
                                ["text-xl"]: size === "m",
                                ["text-lg"]: size === "s",
                            })}
                        >
                            {el.name === "Мои файлы" ? t(el.name) : el.name}
                        </div>
                        {i < arr.length - 1 && (
                            <FileBreadCrumbsIcon
                                className={cn("dark:text-icon", {
                                    ["size-[18px]"]: size === "m",
                                })}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
