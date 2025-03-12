import { checkRealOggFormat } from "./checkRealOggFormat";
import { isBundleType } from "./isBundleType";
import {
    BundleFileServerType,
    BUNDLES_DISPLAY_CONFIG,
    FileAllResponseData,
    FileServerMediaFileType,
    mediaFileConfig,
    SystemFolderTypeConfig,
} from "../../models";

export const validateFileFormat = async (accept: string, file: File) => {
    const fileExtension = file.name.slice(file.name.lastIndexOf("."));

    const realFormat: string | null = file.type === "video/ogg" ? await checkRealOggFormat(file) : null;

    if (realFormat && accept.includes(realFormat)) {
        return undefined;
    }

    if (file.type && !accept.includes(file.type)) {
        return ["Неверный формат файла"];
    }
    if (!file.type && !accept.includes(fileExtension)) {
        return ["Неверный формат файла"];
    }
    return undefined;
};

export const validateFileBundleFormat = (file: File, type?: BundleFileServerType) => {
    const errors: string[] = [];
    if (/\./.test(file.name)) {
        errors.push("В имени файла не должно быть расширения");
    }
    if (type) {
        const fileName: string = file.name.toLowerCase();
        const displayName = Object.entries(BUNDLES_DISPLAY_CONFIG).find((el) => el[1] === type)[0];
        const isValid = fileName.includes(displayName.toLowerCase());
        if (!isValid) {
            errors.push(`В имени файла должен присутствовать идентификатор платформы ${displayName}`);
        }
    }
    return errors.length ? errors : undefined;
};

const findMediaType = async (file: File): Promise<FileServerMediaFileType | undefined> => {
    if (!/\./.test(file.name)) {
        const foundType = Object.keys(BUNDLES_DISPLAY_CONFIG).find((el) =>
            file.name.toLowerCase().includes(el.toLowerCase())
        );
        return BUNDLES_DISPLAY_CONFIG[foundType as unknown as keyof typeof BUNDLES_DISPLAY_CONFIG];
    }

    const fileExtension = file.name.slice(file.name.lastIndexOf("."));

    const realFormat: string | null = file.type === "video/ogg" ? await checkRealOggFormat(file) : null;

    for (const [type, config] of mediaFileConfig) {
        if (realFormat && config.accept.includes(realFormat)) {
            return type;
        }
        if (
            !realFormat &&
            ((file.type && config.accept.includes(file.type)) || config.accept.includes(fileExtension))
        ) {
            return type;
        }
    }

    return undefined;
};

const getAllowedMediaType = (
    type: FileServerMediaFileType,
    allowedType: FileServerMediaFileType | FileServerMediaFileType[]
): FileServerMediaFileType | undefined => {
    if (Array.isArray(allowedType)) {
        return allowedType.includes(type) ? type : undefined;
    }
    return type === allowedType ? type : undefined;
};

export const getSystemFolderType = (fileServerListData: FileAllResponseData) => {
    if (
        fileServerListData &&
        fileServerListData.IsSystemFolder &&
        fileServerListData.Directory &&
        fileServerListData.Directory in SystemFolderTypeConfig
    ) {
        return SystemFolderTypeConfig[fileServerListData.Directory];
    }
    return undefined;
};

function determinePreparedType(
    type: FileServerMediaFileType | FileServerMediaFileType[],
    fileServerListData: FileAllResponseData
) {
    if (fileServerListData.Directory === "/") {
        return type;
    }
    const systemFolderType = getSystemFolderType(fileServerListData);
    if (systemFolderType) {
        if (!Array.isArray(systemFolderType) && !Array.isArray(type)) {
            return systemFolderType === type ? type : undefined;
        }
        if (Array.isArray(type) && !Array.isArray(systemFolderType)) {
            return type.includes(systemFolderType) ? type : undefined;
        }
        if (!Array.isArray(type) && Array.isArray(systemFolderType)) {
            return systemFolderType.includes(type) ? type : undefined;
        }
        if (Array.isArray(type) && Array.isArray(systemFolderType)) {
            const intersection = type.filter((t) => systemFolderType.includes(t));
            return intersection.length > 0 ? intersection : undefined;
        }
    }
    return type;
}

export const validateFile = async (
    file: File,
    updateErrors: (errors: string[]) => void,
    fileServerListData: FileAllResponseData,
    allowedType?: FileServerMediaFileType | FileServerMediaFileType[],
    accept?: string
) => {
    let errors: string[];
    const foundMediaType = await findMediaType(file);

    if (!foundMediaType) {
        errors = ["Неверный формат файла"];
    }

    const foundAllowedType = allowedType
        ? determinePreparedType(allowedType, fileServerListData)
        : getSystemFolderType(fileServerListData);

    if (foundAllowedType) {
        let isBundle = false;
        const isArrayAllowedType = Array.isArray(foundAllowedType);
        if (isArrayAllowedType) {
            const hasBundleType = foundAllowedType.some(isBundleType);
            const allBundleTypes = foundAllowedType.every(isBundleType);

            if (hasBundleType && !allBundleTypes) {
                // есть хотя бы 1 бандл, и хотя бы 1 не бандл
                throw new Error("Невозможно обработать смешанный массив");
            }

            isBundle = allBundleTypes;
        } else {
            isBundle = isBundleType(foundAllowedType);
        }

        if (isBundle) {
            errors = validateFileBundleFormat(
                file,
                !Array.isArray(foundAllowedType) ? (foundAllowedType as BundleFileServerType) : undefined
            );
        } else {
            const type = getAllowedMediaType(foundMediaType, foundAllowedType);
            if (!type) {
                errors = ["Неверный формат файла"];
            } else {
                errors = await validateFileFormat(accept, file);
            }
        }
    }

    if (allowedType && !foundAllowedType) {
        errors = ["Неверный формат файла"];
    }

    if (errors?.length && updateErrors) {
        updateErrors(errors);
        return;
    }

    return {
        file,
        type: foundMediaType,
    };
};
