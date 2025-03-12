import { memo } from "react";
import DefaultIcon from "assets/icons/confirm-hexagon-black.svg?react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { cn } from "shared/libs";
import {
    FileServerDataFile,
    FileStorageAttachApiType,
    FileStorageDataFile,
    FileStorageEventType,
    FileServerMediaFileType,
} from "shared/models";
import { icons, texts, urls } from "./config";
import { textsFileServer } from "./config-file-server";

type Props = {
    data: FileStorageDataFile | FileServerDataFile;
    type: FileStorageEventType;
};

function isFileStorageApiType(type: unknown): type is FileStorageAttachApiType {
    return typeof type === "string" && (Object.values(FileStorageAttachApiType) as string[]).includes(type);
}

const getText = (typeFile: FileStorageAttachApiType | FileServerMediaFileType, typeEvent: FileStorageEventType) => {
    if (isFileStorageApiType(typeFile)) {
        return texts.has(typeEvent) ? texts.get(typeEvent).get(typeFile) : null;
    }
    return textsFileServer.has(typeEvent) ? textsFileServer.get(typeEvent).get(typeFile) : null;
};

export const FileStorageNotice = memo(({ data, type }: Props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const Icon = isFileStorageApiType(data.type) ? (icons.get(data.type) ?? DefaultIcon) : DefaultIcon;
    const text = getText(data?.type, type);
    const getUrl = isFileStorageApiType(data.type) && data.id ? urls.get(data.type) : null;

    const openPageHandler = () => {
        if (!getUrl) {
            return;
        }

        const url = getUrl(data.id);
        navigate(url);
    };

    return !!text ? (
        <button
            className="group"
            onClick={openPageHandler}
            disabled={!getUrl}
        >
            <p className="grid origin-right grid-cols-[auto_1fr] items-center gap-2 text-inherit transition-transform group-hover:scale-105 group-active:scale-95">
                <Icon
                    className={cn(
                        "size-5",
                        type === FileStorageEventType.REMOVED_WITH_ERROR ||
                            type === FileStorageEventType.UPLOADED_WITH_ERROR
                            ? "[&_path]:fill-error"
                            : "[&_path]:fill-icon"
                    )}
                />
                <span
                    className={cn(
                        "text-left text-inherit",
                        (type === FileStorageEventType.REMOVED_WITH_ERROR ||
                            type === FileStorageEventType.UPLOADED_WITH_ERROR) &&
                            "text-error"
                    )}
                >
                    {t(text)}
                </span>
            </p>
        </button>
    ) : null;
});

FileStorageNotice.displayName = "FileStorageNotice";
