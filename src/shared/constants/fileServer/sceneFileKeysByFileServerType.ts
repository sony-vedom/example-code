import { FileStorageAttachApiType, FileServerMediaFileType } from "shared/models";

export const sceneFileKeysByFileServerType = new Map<
    FileStorageAttachApiType,
    FileServerMediaFileType | FileServerMediaFileType[]
>([
    [FileStorageAttachApiType.SCENE_MARKER, FileServerMediaFileType.IMAGE],
    [FileStorageAttachApiType.SCENE_AUDIO, FileServerMediaFileType.AUDIO],
    [FileStorageAttachApiType.SCENE_AR_OBJECT, [FileServerMediaFileType.Model3D, FileServerMediaFileType.VIDEO]],
    [FileStorageAttachApiType.SCENE_ASSET_WEBGL, FileServerMediaFileType.AssetBundleWebGL],
    [FileStorageAttachApiType.SCENE_ASSET_IOS, FileServerMediaFileType.AssetBundleIos],
    [FileStorageAttachApiType.SCENE_ASSET_ANDROID, FileServerMediaFileType.AssetBundleAndroid],
]);
