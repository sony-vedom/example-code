import { FileServerSearchInput, UploadFileButton } from "entities/fileServer";
import { useTranslation } from "react-i18next";
import {
    closeAllPopupInstances,
    getFormatFile,
    getSystemFolderType,
    openPopup,
    useMediaQuery,
    usePaginatedAllFileServerStore,
} from "shared/libs";
import { PopupVariant } from "shared/models";
import { FileServerUploadingProps, useFileServerUploadingFormErrorStore } from "../FileServerUploadingPopup";

export const FileStorageContentPageHeader = () => {
    const { t } = useTranslation();
    const { setSearchText, clearSearchText, uploadFile, fileServerListData } = usePaginatedAllFileServerStore(
        (state) => ({
            setSearchText: state.setSearchText,
            clearSearchText: state.clearSearchText,
            uploadFile: state.uploadFile,
            fileServerListData: state.fileServerListData,
        })
    );

    const isTabletScreen = useMediaQuery("(max-width: 767px)");
    const { formatList, accept, bundlePlatforms } = getFormatFile(getSystemFolderType(fileServerListData));

    const updateErrors = useFileServerUploadingFormErrorStore((state) => state.updateErrors);

    const handleUpload = async (inputFile: File) =>
        uploadFile({
            file: inputFile,
            updateErrors: (errors) => {
                updateErrors({ fieldName: "file", message: errors });
            },
            accept,
            onUploadStart: () => {
                closeAllPopupInstances();
            },
        });

    const onOpenPopup = () => {
        openPopup<FileServerUploadingProps>({
            popup: PopupVariant.FileServerUploadingPopup,
            props: {
                formatList,
                accept,
                onUpload: (file) => handleUpload(file),
                bundlePlatforms,
            },
        });
    };

    return (
        <header className="mr-2.5 grid grid-cols-[initial] items-center gap-3 md:mr-0 md:grid-cols-[auto_1fr_auto] md:gap-12">
            <div className={"flex justify-between"}>
                <h4 className="flex flex-row items-center gap-2 text-xl">
                    <FileStorageIcon className="size-6 [&_path]:fill-primary-icon" />
                    <p className="text-primary-icon">{t("Файлы")}</p>
                </h4>
                {isTabletScreen && (
                    <UploadFileButton
                        onOpenPopup={onOpenPopup}
                        accept={accept}
                        onUpload={(file) => handleUpload(file)}
                    >
                        {t("Новый файл")}
                    </UploadFileButton>
                )}
            </div>
            <FileServerSearchInput
                onSearch={setSearchText}
                onReset={clearSearchText}
            />
            {!isTabletScreen && (
                <UploadFileButton
                    onOpenPopup={onOpenPopup}
                    onUpload={(file) => handleUpload(file)}
                    accept={accept}
                >
                    {t("Загрузить файл")}
                </UploadFileButton>
            )}
        </header>
    );
};
