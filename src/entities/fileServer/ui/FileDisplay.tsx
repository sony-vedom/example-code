import React, { useState } from "react";
import audioIcon from "assets/icons/audio-icon.svg";
import bundleIcon from "assets/icons/bundle-icon.svg";
import folderIcon from "assets/icons/file-server-folder.svg";
import model3DIcon from "assets/icons/model-3d-icon.svg";
import videoIcon from "assets/icons/video-icon.svg";
import { cn } from "shared/libs";
import { FileServerMediaFileType } from "shared/models";
import { ClassNameValue } from "tailwind-merge";
import "./index.css";

enum FileItemSize {
    L = "l",
    M = "m",
    S = "s",
    XS = "xs",
    XXS = "xxs",
}

const fileItemSizeConfig = {
    [FileItemSize.L]: { boxSize: 111, borderRadius: 18 },
    [FileItemSize.S]: { boxSize: 52, borderRadius: 10 },
    [FileItemSize.M]: { boxSize: 64, borderRadius: 12 },
    [FileItemSize.XS]: { boxSize: 16, borderRadius: 2.5 },
    [FileItemSize.XXS]: { boxSize: 12, borderRadius: 2 },
};

export enum MediaFileTypeDisplayType {
    FOLDER = "folder",
}

export type FileDisplayType = `${MediaFileTypeDisplayType}` | `${FileServerMediaFileType}`;

const fileItemDisplayTypeConfig: Record<FileDisplayType & "Folder", { icon: string; color: string }> = {
    [MediaFileTypeDisplayType.FOLDER]: {
        icon: folderIcon,
        color: "var(--bg-folder)",
    },
    [FileServerMediaFileType.AUDIO]: {
        icon: audioIcon,
        color: "var(--bg-audio)",
    },
    [FileServerMediaFileType.VIDEO]: {
        icon: videoIcon,
        color: "var(--bg-video)",
    },
    [FileServerMediaFileType.Model3D]: {
        icon: model3DIcon,
        color: "var(--bg-model3D)",
    },
    [FileServerMediaFileType.AssetBundleIos]: {
        icon: bundleIcon,
        color: "var(--bg-model3D)",
    },
    [FileServerMediaFileType.AssetBundleWebGL]: {
        icon: bundleIcon,
        color: "var(--bg-model3D)",
    },
    [FileServerMediaFileType.AssetBundleAndroid]: {
        icon: bundleIcon,
        color: "var(--bg-model3D)",
    },
};

type FileItemProps = {
    size?: `${FileItemSize}`;
    displayType?: `${FileDisplayType}`;
    url?: string;
    disabled?: boolean;
    className?: ClassNameValue;
};

export const FileDisplay = ({
    size = "l",
    displayType = MediaFileTypeDisplayType.FOLDER,
    url,
    disabled = false,
    className,
}: FileItemProps) => {
    const [isImageLoaded, setImageLoaded] = useState(false);
    const sizeValue = fileItemSizeConfig[size].boxSize;
    const borderRadiusValue = fileItemSizeConfig[size].borderRadius;
    const isImage = displayType == `${FileServerMediaFileType.IMAGE}`;
    const icon = !isImage ? fileItemDisplayTypeConfig[displayType].icon : url;
    const color =
        !disabled || displayType === MediaFileTypeDisplayType.FOLDER
            ? !isImage
                ? fileItemDisplayTypeConfig[displayType].color
                : "transparent"
            : "var( --bg-disabled)";
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    return (
        <div
            style={{
                width: sizeValue,
                height: sizeValue,
                borderRadius: borderRadiusValue,
                background: color,
            }}
            className={cn(`flex size-16 shrink-0 items-center justify-center`, className)}
        >
            <img
                style={{
                    width: isImage && isImageLoaded ? "100%" : `${sizeValue / 2}px`,
                    height: isImage && isImageLoaded ? "100%" : `${sizeValue / 2}px`,
                }}
                className={cn("rounded-[inherit]", {
                    ["blur-sm filter"]: disabled && isImage,
                })}
                onLoad={handleImageLoad}
                src={icon}
                alt={"Изображение файла"}
            />
        </div>
    );
};
