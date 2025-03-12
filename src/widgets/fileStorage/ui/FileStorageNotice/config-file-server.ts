import ArObjectIcon from "assets/icons/p3d.svg?react";
import AudioIcon from "assets/icons/paudio.svg?react";
import MarkerIcon from "assets/icons/pmarker.svg?react";
import { FileServerMediaFileType, FileStorageEventType } from "shared/models";

export const icons = new Map<FileServerMediaFileType, React.FC<React.SVGProps<SVGSVGElement>>>([
    [FileServerMediaFileType.IMAGE, MarkerIcon],
    [FileServerMediaFileType.AUDIO, AudioIcon],
    [FileServerMediaFileType.Model3D, ArObjectIcon],
]);

const uploadingTexts = new Map<FileServerMediaFileType, string>([
    [FileServerMediaFileType.IMAGE, "Изображение загружается..."],
    [FileServerMediaFileType.AUDIO, "Аудио загружается..."],
    [FileServerMediaFileType.Model3D, "3D-модель загружается..."],
    [FileServerMediaFileType.VIDEO, "Видео загружается..."],
    [FileServerMediaFileType.AssetBundleAndroid, "Бандл Android загружается..."],
    [FileServerMediaFileType.AssetBundleIos, "Бандл iOS загружается..."],
    [FileServerMediaFileType.AssetBundleWebGL, "Бандл WebGL загружается..."],
]);

const uploadedTexts = new Map<FileServerMediaFileType, string>([
    [FileServerMediaFileType.IMAGE, "Изображение загружено"],
    [FileServerMediaFileType.AUDIO, "Аудио загружено"],
    [FileServerMediaFileType.Model3D, "3D-модель загружена"],
    [FileServerMediaFileType.VIDEO, "Видео загружено"],
    [FileServerMediaFileType.AssetBundleAndroid, "Бандл Android загружен"],
    [FileServerMediaFileType.AssetBundleIos, "Бандл iOS загружен"],
    [FileServerMediaFileType.AssetBundleWebGL, "Бандл WebGL загружен"],
]);

const errorTexts = new Map<FileServerMediaFileType, string>([
    [FileServerMediaFileType.IMAGE, "Произошла ошибка при загрузке изображения"],
    [FileServerMediaFileType.AUDIO, "Произошла ошибка при загрузке аудио"],
    [FileServerMediaFileType.Model3D, "Произошла ошибка при загрузке 3D-модели"],
    [FileServerMediaFileType.VIDEO, "Произошла ошибка при загрузке видео"],
    [FileServerMediaFileType.AssetBundleAndroid, "Произошла ошибка при загрузке бандла Android"],
    [FileServerMediaFileType.AssetBundleIos, "Произошла ошибка при загрузке бандла iOS"],
    [FileServerMediaFileType.AssetBundleWebGL, "Произошла ошибка при загрузке бандла WebGL"],
]);

const removingTexts = new Map<FileServerMediaFileType, string>([
    [FileServerMediaFileType.IMAGE, "Изображение удаляется..."],
    [FileServerMediaFileType.AUDIO, "Аудио удаляется..."],
    [FileServerMediaFileType.Model3D, "3D-модель удаляется..."],
    [FileServerMediaFileType.VIDEO, "Видео удаляется..."],
    [FileServerMediaFileType.AssetBundleAndroid, "Бандл Android удаляется..."],
    [FileServerMediaFileType.AssetBundleIos, "Бандл iOS удаляется..."],
    [FileServerMediaFileType.AssetBundleWebGL, "Бандл WebGL удаляется..."],
]);

const removedTexts = new Map<FileServerMediaFileType, string>([
    [FileServerMediaFileType.IMAGE, "Изображение удалено"],
    [FileServerMediaFileType.AUDIO, "Аудио удалено"],
    [FileServerMediaFileType.Model3D, "3D-модель удалена"],
    [FileServerMediaFileType.VIDEO, "Видео удалено"],
    [FileServerMediaFileType.AssetBundleAndroid, "Бандл Android удален"],
    [FileServerMediaFileType.AssetBundleIos, "Бандл iOS удален"],
    [FileServerMediaFileType.AssetBundleWebGL, "Бандл WebGL удален"],
]);

const removedErrorText = new Map<FileServerMediaFileType, string>([
    [FileServerMediaFileType.IMAGE, "Произошла ошибка при удалении изображения"],
    [FileServerMediaFileType.AUDIO, "Произошла ошибка при удалении аудио"],
    [FileServerMediaFileType.Model3D, "Произошла ошибка при удалении 3D-модели"],
    [FileServerMediaFileType.VIDEO, "Произошла ошибка при удалении видео"],
    [FileServerMediaFileType.AssetBundleAndroid, "Произошла ошибка при удалении бандла Android"],
    [FileServerMediaFileType.AssetBundleIos, "Произошла ошибка при удалении бандла iOS"],
    [FileServerMediaFileType.AssetBundleWebGL, "Произошла ошибка при удалении бандла WebGL"],
]);

export const textsFileServer = new Map<FileStorageEventType, Map<FileServerMediaFileType, string>>([
    [FileStorageEventType.UPLOADING, uploadingTexts],
    [FileStorageEventType.UPLOADED, uploadedTexts],
    [FileStorageEventType.UPLOADED_WITH_ERROR, errorTexts],
    [FileStorageEventType.REMOVING, removingTexts],
    [FileStorageEventType.REMOVED, removedTexts],
    [FileStorageEventType.REMOVED_WITH_ERROR, removedErrorText],
]);
