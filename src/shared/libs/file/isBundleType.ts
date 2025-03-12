import { FileServerMediaFileType } from "../../models";

export const isBundleType = (type: FileServerMediaFileType) =>
    type === FileServerMediaFileType.AssetBundleAndroid ||
    type === FileServerMediaFileType.AssetBundleIos ||
    type === FileServerMediaFileType.AssetBundleWebGL;
