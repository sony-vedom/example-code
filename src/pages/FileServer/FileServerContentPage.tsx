import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { appEndpoints } from "shared/constants";
import { appStore, currentUserStore, usePaginatedAllFileServerStore } from "shared/libs";
import { FileServerContentPageBody, FileStorageContentPageHeader } from "widgets/fileStorage";

const FileServerContentPage = () => {
    const { t } = useTranslation();
    const language = appStore((state) => state.language);
    const setBreadcrumbs = appStore((state) => state.setBreadcrumbs);
    const initFileServerStore = usePaginatedAllFileServerStore((state) => state.init);
    const clearContent = usePaginatedAllFileServerStore((state) => state.clearContent);
    const userId = currentUserStore((state) => state.id);
    const fetchUser = currentUserStore((state) => state.fetchUser);

    useEffect(() => {
        document.title = t("Хранилище файлов");
        setBreadcrumbs([
            {
                label: t("Хранилище файлов"),
                path: appEndpoints.FILE_STORAGE,
            },
        ]);

        return () => {
            setBreadcrumbs([]);
            document.title = "example";
        };
    }, [language]);

    useEffect(() => {
        if (!userId) {
            fetchUser();
        }
    }, []);

    useEffect(() => {
        if (userId) {
            initFileServerStore(userId);
            return () => clearContent();
        }
    }, [userId]);

    return (
        <section className="flex flex-col gap-4 py-6 pl-4 pr-1 md:pr-4">
            <FileStorageContentPageHeader />
            <FileServerContentPageBody />
        </section>
    );
};

export default FileServerContentPage;
