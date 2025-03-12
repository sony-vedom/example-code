import React, { FC, lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn, currentUserStore, useAllFileServerStore, withSuspense } from "shared/libs";
import { FileServerMediaFileType } from "shared/models";
import { ClassNameValue } from "tailwind-merge";
import { productStore, useProducts } from "../../products";
import { useFileServerUIManagerModalStore } from "../lib";

const MyFilesTab = withSuspense(lazy(() => import("./MyFilesTab").then((module) => ({ default: module.MyFiles }))));

const MyModelsTab = withSuspense(
    lazy(() => import("./MyModelsTab").then((module) => ({ default: module.MyModelsTab })))
);

const chipStyle: ClassNameValue =
    "flex items-center gap-1.5 rounded-[20px] px-1.5 px-1.5 px-3 py-0.5 text-center font-medium leading-[normal] text-primary-text-new opacity-50 dark:text-icon dark:border-icon border-2 border-solid border-transparent";

const activeStyle: ClassNameValue = "border-primary-text-new opacity-100 dark:border-white dark:!text-white";

export enum FileServerTabsTypes {
    FileServer = "fileServer",
    Models = "device",
}

const tabs = new Map<FileServerTabsTypes, FC<Omit<FileAttachUploadingProps, "isShowModelTab">>>([
    [FileServerTabsTypes.FileServer, MyFilesTab],
    [FileServerTabsTypes.Models, MyModelsTab],
]);

type FileAttachUploadingProps = {
    type?: FileServerMediaFileType | FileServerMediaFileType[];
    onAttachUpload?: (f?: File, hash?: string, size?: number, url?: string) => void;
    sceneId?: number;
    projectId?: number;
    isShowModelTab?: boolean;
};

export const FileServerAttachUploadingPopup = ({
    type,
    onAttachUpload,
    sceneId,
    projectId,
    isShowModelTab = false,
}: FileAttachUploadingProps) => {
    const { t } = useTranslation();
    const userId = currentUserStore((state) => state.id);

    const { init, clear } = useAllFileServerStore((state) => ({
        init: state.init,
        clear: state.clear,
    }));
    const clearProductStore = productStore((s) => s.clear);
    const clearFilters = productStore((s) => s.clearFilter);
    const { refetch } = useProducts();
    const clearUiData = useFileServerUIManagerModalStore((s) => s.clearBreadCrumbs);

    useEffect(() => {
        if (userId) {
            init(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (isShowModelTab) {
            return () => {
                clear();
                clearProductStore();
                clearFilters();
                // todo: убрать вместе с useProducts
                refetch();
            };
        }
    }, []);

    useEffect(() => {
        return () => {
            clearUiData();
            clear();
        };
    }, []);

    const [activeTab, setActiveTab] = useState<FileServerTabsTypes>(FileServerTabsTypes.FileServer);

    const Content = tabs.get(activeTab);

    return (
        <div className={"mx-4 my-5 flex h-[calc(100svh_-_1.25rem_*_2)] flex-col items-start gap-1 md:w-[430px]"}>
            <div className={"flex items-start gap-1 self-stretch py-0 pl-1 pr-4"}>
                <button
                    className={cn(chipStyle, {
                        [activeStyle]: activeTab === FileServerTabsTypes.FileServer,
                    })}
                    onClick={() => setActiveTab(FileServerTabsTypes.FileServer)}
                >
                    {t("Файлы")}
                </button>
                {isShowModelTab && (
                    <button
                        className={cn(chipStyle, {
                            [activeStyle]: activeTab === FileServerTabsTypes.Models,
                        })}
                        onClick={() => setActiveTab(FileServerTabsTypes.Models)}
                    >
                        {t("Мои модели")}
                    </button>
                )}
            </div>
            <Content
                type={type}
                onAttachUpload={onAttachUpload}
                sceneId={sceneId}
                projectId={projectId}
            />
        </div>
    );
};
