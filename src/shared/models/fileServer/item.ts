export enum FileStatus {
    DELETED = 0,
    UPLOADED = 1,
    CDN = 2,
}

export enum FileServerMediaFileType {
    None = 0,
    IMAGE = 1,
    AUDIO = 2,
    VIDEO = 3,
    Model3D = 4,
    AssetBundleIos = 5,
    AssetBundleAndroid = 6,
    AssetBundleWebGL = 7,
    ButtonImage = 8,
}

export type BundleFileServerType =
    | FileServerMediaFileType.AssetBundleIos
    | FileServerMediaFileType.AssetBundleAndroid
    | FileServerMediaFileType.AssetBundleWebGL;

export type FileServerItemType = {
    type: `${FileServerMediaFileType}`;
    isSystemFolder: boolean;
    isDirectory: boolean;
    // аналог id
    hash: string;
    name: string;
    url: string;
    size: number;
    subFiles: FileServerItemType[];
    // Полная ISO-строка с Timezone
    createdAt: string;
};
