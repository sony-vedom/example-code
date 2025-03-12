import { useTranslation } from "react-i18next";
import { FileServerStoreType, UseFileServerUIManagerType } from "shared/libs";
import { StoreApi, UseBoundStore } from "zustand";
import { FileStorageContentDropdown } from "../FileStorageContentDropdown";

type Props = {
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>;
    useFileServerUIManagerStore: UseFileServerUIManagerType;
};

export const FileStoragePreview = ({ useFileServerStore, useFileServerUIManagerStore }: Props) => {
    const { t } = useTranslation();
    const selectedContent = useFileServerUIManagerStore((state) => state.selectedContent);
    return (
        <section className="flex flex-col gap-3 rounded-3xl bg-secondary-bg p-6">
            <header className="flex flex-row">
                <p className="flex-1 text-left text-primary-text">{t("Файлы")}</p>
                <FileStorageContentDropdown
                    useFileServerStore={useFileServerStore}
                    content={selectedContent}
                    className="p-1"
                />
            </header>
            Превью
        </section>
    );
};
