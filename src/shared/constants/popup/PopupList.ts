import React, { lazy } from "react";
import { PopupVariant } from "shared/models";

const ProductModel3dViewPopup = lazy(() =>
    import("widgets/products").then((module) => ({
        default: module.ProductModel3dViewPopup,
    }))
);

const ActivateBrandingPopup = lazy(() =>
    import("entities/brandings/ui/ActivateBrandingPopup/ActivateBrandingPopup").then((module) => ({
        default: module.ActivateBrandingPopup,
    }))
);
const ActionConfirmation = lazy(() =>
    import("shared/ui").then((module) => ({
        default: module.ActionConfirmation,
    }))
);
const GeosignsModal = lazy(() =>
    import("components").then((module) => ({
        default: module.GeosignsModal,
    }))
);

const BundleUpload = lazy(() =>
    import("widgets/scenes").then((module) => ({
        default: module.BundleUpload,
    }))
);
const NonResidentAlert = lazy(() =>
    import("components").then((module) => ({
        default: module.NonResidentAlert,
    }))
);

const PurchaseRestrictedAlert = lazy(() =>
    import("components").then((module) => ({
        default: module.PurchaseRestrictedAlert,
    }))
);

const PhoneNotSet = lazy(() =>
    import("features/user/ui/PhoneNotSet/PhoneNotSet").then((module) => ({
        default: module.PhoneNotSet,
    }))
);
const TariffExceeded = lazy(() =>
    import("widgets/projects").then((module) => ({
        default: module.TariffExceeded,
    }))
);
const UserModelsPopup = lazy(() =>
    import("features/userContent/ui/userModelsPopup").then((module) => ({
        default: module.UserModelsPopup,
    }))
);

const PopupActionMessage = lazy(() =>
    import("components").then((module) => ({
        default: module.PopupActionMessage,
    }))
);
const ProjectExpiry = lazy(() =>
    import("widgets/projects").then((module) => ({
        default: module.ProjectExpiry,
    }))
);

const FileServerAttachUploadingPopup = lazy(() =>
    import("entities/fileAttaching").then((module) => ({
        default: module.FileServerAttachUploadingPopup,
    }))
);
const FileServerUploadingPopup = lazy(() =>
    import("widgets/fileStorage").then((module) => ({
        default: module.FileServerUploadingPopup,
    }))
);

const CreatingNewFolder = lazy(() =>
    import("shared/ui").then((module) => ({
        default: module.CreatingNewFolder,
    }))
);

const UpdatingFolderName = lazy(() =>
    import("shared/ui").then((module) => ({
        default: module.UpdatingFolderName,
    }))
);

export const PopupList = new Map<PopupVariant, React.ComponentType>([
    [PopupVariant.ProductModel3dViewPopup, ProductModel3dViewPopup],
    [PopupVariant.ActivateBrandingPopup, ActivateBrandingPopup],
    [PopupVariant.ActionConfirmation, ActionConfirmation],
    [PopupVariant.GeosignsModal, GeosignsModal],
    [PopupVariant.BundleUpload, BundleUpload],
    [PopupVariant.NonResidentAlert, NonResidentAlert],
    [PopupVariant.PhoneNotSet, PhoneNotSet],
    [PopupVariant.TariffExceeded, TariffExceeded],
    [PopupVariant.UserModels, UserModelsPopup],
    [PopupVariant.PurchaseRestrictedAlert, PurchaseRestrictedAlert],
    [PopupVariant.ProjectExpiry, ProjectExpiry],
    [PopupVariant.PopupActionMessage, PopupActionMessage],
    [PopupVariant.FileServerAttachUploadingPopup, FileServerAttachUploadingPopup],
    [PopupVariant.FileServerUploadingPopup, FileServerUploadingPopup],
    [PopupVariant.CreatingNewFolder, CreatingNewFolder],
    [PopupVariant.UpdatingFolderName, UpdatingFolderName],
]);
