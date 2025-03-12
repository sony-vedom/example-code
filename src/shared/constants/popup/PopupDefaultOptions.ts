import { PopupOptions, PopupVariant } from "shared/models";

export const PopupDefaultOptions = new Map<PopupVariant, PopupOptions>([
    [PopupVariant.FileServerAttachUploadingPopup, { width: "458px", isNewDesign: true, position: "right" }],
    [PopupVariant.FileServerUploadingPopup, { width: "458px", isNewDesign: true }],
    [PopupVariant.CreatingNewFolder, { title: "Создание папки" }],
    [PopupVariant.UpdatingFolderName, { title: "Обновление имени папки" }],
]);
