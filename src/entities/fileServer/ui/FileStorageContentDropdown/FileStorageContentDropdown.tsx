import DeleteIconFileServer from "assets/icons/delete-icon-file-server.svg?react";
import FileStorageContextMenuIcon from "assets/icons/file-storage-context-menu-icon.svg?react";
import { useTranslation } from "react-i18next";
import { cn, FileServerStoreType, openPopup } from "shared/libs";
import { ActionConfirmationProps, FileServerItemType, FileServerMediaFileType, PopupVariant } from "shared/models";
import { DropdownMenu } from "shared/ui";
import { confirmationModalIcons } from "utils/icons";
import { StoreApi, UseBoundStore } from "zustand";

type Props = {
    className?: string;
    content?: FileServerItemType | null;
    isBreadCrumb?: boolean;
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>;
};

const itemClass =
    "flex w-full items-center justify-between gap-2.5 rounded-lg bg-white p-2 text-sm font-normal leading-[normal] text-[#8798AB] hover:bg-white dark:bg-[#00000042]";

export const FileStorageContentDropdown = ({ content, isBreadCrumb = false, className, useFileServerStore }: Props) => {
    const { t } = useTranslation();
    const { removeFile, updateFolderName, createNewFolder } = useFileServerStore((state) => ({
        removeFile: state.removeFile,
        updateFolderName: state.updateFolderName,
        createNewFolder: state.createNewFolder,
    }));

    const handleDelete = () => {
        openPopup<ActionConfirmationProps>({
            popup: PopupVariant.ActionConfirmation,
            props: {
                title: `${t("Вы уверены что хотите удалить")} ${t(content?.name)}?`,
                icon: confirmationModalIcons.ConfirmShield,
                acceptText: t("Да, удалить"),
                callback: async () => {
                    await removeFile(content?.type as unknown as FileServerMediaFileType, content?.hash);
                },
            },
            options: {
                title: t("Удаление файла"),
            },
        });
    };

    const handleCreateNewFolder = () => {
        openPopup({
            popup: PopupVariant.CreatingNewFolder,
            props: {
                onCreateNewFolder: createNewFolder,
            },
        });
    };

    const handleUpdateFolderName = () => {
        openPopup({
            popup: PopupVariant.UpdatingFolderName,
            props: {
                initialName: content.name,
                directoryUid: content.hash,
                onUpdateFolderName: updateFolderName,
            },
        });
    };

    return (
        <DropdownMenu
            className="h-full"
            onClick={(e) => e.stopPropagation()}
        >
            <DropdownMenu.Trigger className={cn("group flex items-center justify-center self-center p-1", className)}>
                <FileStorageContextMenuIcon className="size-4 transition-transform group-hover:scale-125 dark:invert-[1]" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                className={
                    "flex w-48 flex-col items-stretch gap-0.5 rounded-[14px] bg-[#FFFFFF8F] p-1.5 backdrop-blur-md"
                }
            >
                {content && !content?.isDirectory && (
                    <DropdownMenu.Item
                        className={itemClass}
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                    >
                        {t("Удалить")}
                        <DeleteIconFileServer />
                    </DropdownMenu.Item>
                )}
                {isBreadCrumb && (
                    <DropdownMenu.Item
                        className={itemClass}
                        onClick={(e) => {
                            e.preventDefault();
                            handleCreateNewFolder();
                        }}
                    >
                        {t("Создать новую папку")}
                    </DropdownMenu.Item>
                )}
                {content && content?.isDirectory && (
                    <DropdownMenu.Item
                        className={itemClass}
                        onClick={(e) => {
                            e.preventDefault();
                            handleUpdateFolderName();
                        }}
                    >
                        {t("Переименовать папку")}
                    </DropdownMenu.Item>
                )}
            </DropdownMenu.Content>
        </DropdownMenu>
    );
};
