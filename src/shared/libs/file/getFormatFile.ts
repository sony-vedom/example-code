import { isBundleType } from "./isBundleType";
import {
    DISPLAY_FORMATS,
    MediaFileConfig,
    mediaFileConfig,
    FileServerMediaFileType,
    BUNDLES_DISPLAY_CONFIG,
} from "../../models";

export const getFormatFile = (
    type?: FileServerMediaFileType | FileServerMediaFileType[]
): {
    accept: string;
    formatList: string;
    bundlePlatforms: string;
} => {
    if (Array.isArray(type)) {
        if (type.includes(FileServerMediaFileType.AssetBundleAndroid)) {
            return type.reduce(
                (acc, el) => {
                    const mediaFileConfigItem = mediaFileConfig.get(el);
                    if (acc.bundlePlatforms) {
                        return {
                            accept: "*/*",
                            formatList: "",
                            bundlePlatforms: acc.bundlePlatforms + ", " + mediaFileConfigItem.formatList,
                        };
                    }
                    return {
                        accept: "*/*",
                        formatList: "",
                        bundlePlatforms: mediaFileConfigItem.formatList,
                    };
                },
                {} as MediaFileConfig & { bundlePlatforms: string }
            );
        }
        return type.reduce(
            (acc, el) => {
                const mediaFileConfigItem = mediaFileConfig.get(el);
                if (acc.accept && acc.formatList) {
                    return {
                        accept: acc.accept + "," + mediaFileConfigItem.accept,
                        formatList: acc.formatList + ", " + mediaFileConfigItem.formatList,
                        bundlePlatforms: null,
                    };
                }
                return {
                    accept: mediaFileConfigItem.accept,
                    formatList: mediaFileConfigItem.formatList,
                    bundlePlatforms: null,
                };
            },
            {} as MediaFileConfig & { bundlePlatforms: null }
        );
    }
    if (type) {
        const mediaFileConfigItem = mediaFileConfig.get(type);
        if (isBundleType(type)) {
            return {
                accept: "*/*",
                formatList: "",
                bundlePlatforms: mediaFileConfigItem.formatList,
            };
        }
        return {
            accept: mediaFileConfigItem.accept,
            formatList: mediaFileConfigItem.formatList,
            bundlePlatforms: null,
        };
    }
    return {
        accept: "*/*",
        formatList: Object.values(DISPLAY_FORMATS).join(", "),
        bundlePlatforms: Object.keys(BUNDLES_DISPLAY_CONFIG).join(", "),
    };
};
