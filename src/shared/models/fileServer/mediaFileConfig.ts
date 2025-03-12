import { FileServerMediaFileType } from "./item";

export const ACCEPTS = {
    PNG: "image/png",
    JPEG: "image/jpeg",
    WEBP: "image/webp",
    GLB: ".glb",
    MP4: "video/mp4",
    OGG: "audio/ogg",
} as const;

export const DISPLAY_FORMATS = {
    PNG: ".png",
    JPEG: ".jpeg",
    JPG: ".jpg",
    GLB: ".glb",
    MP4: ".mp4",
    OGG: ".ogg",
} as const;

export const BUNDLES_DISPLAY_CONFIG = {
    Android: FileServerMediaFileType.AssetBundleAndroid,
    iOS: FileServerMediaFileType.AssetBundleIos,
    WebGL: FileServerMediaFileType.AssetBundleWebGL,
} as const;

export type MediaFileConfig = {
    accept: string;
    formatList: string;
};

export const mediaFileConfig = Object.freeze(
    new Map<FileServerMediaFileType, MediaFileConfig>([
        [
            FileServerMediaFileType.IMAGE,
            {
                accept: `${ACCEPTS.PNG},${ACCEPTS.JPEG},${ACCEPTS.WEBP}`,
                formatList: `${DISPLAY_FORMATS.JPEG}, ${DISPLAY_FORMATS.PNG}, ${DISPLAY_FORMATS.JPG}`,
            },
        ],
        [
            FileServerMediaFileType.VIDEO,
            {
                accept: ACCEPTS.MP4,
                formatList: `${DISPLAY_FORMATS.MP4}`,
            },
        ],
        [
            FileServerMediaFileType.Model3D,
            {
                accept: `${ACCEPTS.GLB}`,
                formatList: `${DISPLAY_FORMATS.GLB}`,
            },
        ],
        [
            FileServerMediaFileType.AUDIO,
            {
                accept: ACCEPTS.OGG,
                formatList: `${DISPLAY_FORMATS.OGG}`,
            },
        ],
        [
            FileServerMediaFileType.AssetBundleIos,
            {
                accept: "",
                formatList: "IOS",
            },
        ],
        [
            FileServerMediaFileType.AssetBundleAndroid,
            {
                accept: "",
                formatList: "Android",
            },
        ],
        [
            FileServerMediaFileType.AssetBundleWebGL,
            {
                accept: "",
                formatList: "Webgl",
            },
        ],
    ])
);

export const SystemFolderTypeConfig: Readonly<Record<string, FileServerMediaFileType | FileServerMediaFileType[]>> = {
    "/Audios": FileServerMediaFileType.AUDIO,
    "/Model3Ds": FileServerMediaFileType.Model3D,
    "/Videos": FileServerMediaFileType.VIDEO,
    "/Images": FileServerMediaFileType.IMAGE,
    "/AssetBundles": [
        FileServerMediaFileType.AssetBundleAndroid,
        FileServerMediaFileType.AssetBundleIos,
        FileServerMediaFileType.AssetBundleWebGL,
    ],
} as const;
