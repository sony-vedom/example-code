import BrandingIcon from "assets/icons/branding-template-icon.svg?react";
import ArObjectIcon from "assets/icons/p3d.svg?react";
import AudioIcon from "assets/icons/paudio.svg?react";
import BundleIcon from "assets/icons/pbundle.svg?react";
import MarkerIcon from "assets/icons/pmarker.svg?react";
import ProfileIcon from "assets/icons/profile.svg?react";
import { appEndpoints } from "shared/constants";
import { FileStorageAttachApiType, FileStorageEventType } from "shared/models";

export const icons = new Map<FileStorageAttachApiType, React.FC<React.SVGProps<SVGSVGElement>>>([
    [FileStorageAttachApiType.BRANDING_BACKGROUND, BrandingIcon],
    [FileStorageAttachApiType.BRANDING_LOGO, BrandingIcon],
    [FileStorageAttachApiType.BRANDING_TEMPLATE_BACKGROUND, BrandingIcon],
    [FileStorageAttachApiType.BRANDING_TEMPLATE_LOGO, BrandingIcon],
    [FileStorageAttachApiType.PROFILE_AVATAR, ProfileIcon],
    [FileStorageAttachApiType.SCENE_MARKER, MarkerIcon],
    [FileStorageAttachApiType.SCENE_AR_OBJECT, ArObjectIcon],
    [FileStorageAttachApiType.SCENE_ASSET_ANDROID, BundleIcon],
    [FileStorageAttachApiType.SCENE_ASSET_IOS, BundleIcon],
    [FileStorageAttachApiType.SCENE_ASSET_WEBGL, BundleIcon],
    [FileStorageAttachApiType.SCENE_AUDIO, AudioIcon],
]);

const uploadingTexts = new Map<FileStorageAttachApiType, string>([
    [FileStorageAttachApiType.BRANDING_BACKGROUND, "Фон брендингового экрана обновляется..."],
    [FileStorageAttachApiType.BRANDING_LOGO, "Логотип брендингового экрана обновляется..."],
    [FileStorageAttachApiType.BRANDING_TEMPLATE_BACKGROUND, "Фон шаблона брендингового экрана обновляется..."],
    [FileStorageAttachApiType.BRANDING_TEMPLATE_LOGO, "Логотип шаблона брендингового экрана обновляется..."],
    [FileStorageAttachApiType.SCENE_UI_BUTTON_IMAGE, "Изображение кнопки обновляется..."],
    [FileStorageAttachApiType.PROFILE_AVATAR, "Аватар профиля обновляется..."],
    [FileStorageAttachApiType.SCENE_MARKER, "Изображение сцены обновляется..."],
    [FileStorageAttachApiType.SCENE_AR_OBJECT, "AR-объект сцены обновляется..."],
    [FileStorageAttachApiType.SCENE_ASSET_ANDROID, "Android бандл сцены обновляется..."],
    [FileStorageAttachApiType.SCENE_ASSET_IOS, "iOS бандл сцены обновляется..."],
    [FileStorageAttachApiType.SCENE_ASSET_WEBGL, "WebGL бандл сцены обновляется..."],
    [FileStorageAttachApiType.SCENE_AUDIO, "Аудио сцены обновляется..."],
]);

const uploadedTexts = new Map<FileStorageAttachApiType, string>([
    [FileStorageAttachApiType.BRANDING_BACKGROUND, "Фон брендингового экрана обновлен"],
    [FileStorageAttachApiType.BRANDING_LOGO, "Логотип брендингового экрана обновлен"],
    [FileStorageAttachApiType.BRANDING_TEMPLATE_BACKGROUND, "Фон шаблона брендингового экрана обновлен"],
    [FileStorageAttachApiType.BRANDING_TEMPLATE_LOGO, "Логотип шаблона брендингового экрана обновлен"],
    [FileStorageAttachApiType.SCENE_UI_BUTTON_IMAGE, "Изображение кнопки обновлено"],
    [FileStorageAttachApiType.PROFILE_AVATAR, "Аватар профиля обновлен"],
    [FileStorageAttachApiType.SCENE_MARKER, "Изображение сцены обновлено"],
    [FileStorageAttachApiType.SCENE_AR_OBJECT, "AR-объект сцены обновлен"],
    [FileStorageAttachApiType.SCENE_ASSET_ANDROID, "Android бандл сцены обновлен"],
    [FileStorageAttachApiType.SCENE_ASSET_IOS, "iOS бандл сцены обновлен"],
    [FileStorageAttachApiType.SCENE_ASSET_WEBGL, "WebGL бандл сцены обновлен"],
    [FileStorageAttachApiType.SCENE_AUDIO, "Аудио сцены обновлено"],
]);

const errorTexts = new Map<FileStorageAttachApiType, string>([
    [FileStorageAttachApiType.BRANDING_BACKGROUND, "Произошла ошибка при обновлении фона брендингового экрана"],
    [FileStorageAttachApiType.BRANDING_LOGO, "Произошла ошибка при обновлении логотипа брендингового экрана"],
    [
        FileStorageAttachApiType.BRANDING_TEMPLATE_BACKGROUND,
        "Произошла ошибка при обновлении фона шаблона брендингового экрана",
    ],
    [
        FileStorageAttachApiType.BRANDING_TEMPLATE_LOGO,
        "Произошла ошибка при обновлении логотипа шаблона брендингового экрана",
    ],
    [FileStorageAttachApiType.SCENE_UI_BUTTON_IMAGE, "Произошла ошибка при обновлении изображения кнопки"],
    [FileStorageAttachApiType.PROFILE_AVATAR, "Произошла ошибка при обновлении Аватара профиля"],
    [FileStorageAttachApiType.SCENE_MARKER, "Произошла ошибка при обновлении изображения сцены"],
    [FileStorageAttachApiType.SCENE_AR_OBJECT, "Произошла ошибка при обновлении AR-объекта сцены"],
    [FileStorageAttachApiType.SCENE_ASSET_ANDROID, "Произошла ошибка при обновлении Android бандла сцены"],
    [FileStorageAttachApiType.SCENE_ASSET_IOS, "Произошла ошибка при обновлении iOS бандла сцены"],
    [FileStorageAttachApiType.SCENE_ASSET_WEBGL, "Произошла ошибка при обновлении WebGL бандла сцены"],
    [FileStorageAttachApiType.SCENE_AUDIO, "Произошла ошибка при обновлении Аудио сцены"],
]);

export const texts = new Map<FileStorageEventType, Map<FileStorageAttachApiType, string>>([
    [FileStorageEventType.UPLOADING, uploadingTexts],
    [FileStorageEventType.UPLOADED, uploadedTexts],
    [FileStorageEventType.UPLOADED_WITH_ERROR, errorTexts],
]);

export const urls = new Map<FileStorageAttachApiType, (id: number | string) => string | undefined>([
    [
        FileStorageAttachApiType.BRANDING_BACKGROUND,
        (id: number | string) => appEndpoints.getProjectEditorEndpoint(id, "branding"),
    ],
    [
        FileStorageAttachApiType.BRANDING_LOGO,
        (id: number | string) => appEndpoints.getProjectEditorEndpoint(id, "branding"),
    ],
    [FileStorageAttachApiType.BRANDING_TEMPLATE_BACKGROUND, appEndpoints.getBrandingTemplateEndpoint],
    [FileStorageAttachApiType.BRANDING_TEMPLATE_LOGO, appEndpoints.getBrandingTemplateEndpoint],
    [
        FileStorageAttachApiType.PROFILE_AVATAR,
        (id: number | string) => appEndpoints.getProjectEditorEndpoint(id, "params"),
    ],
]);
