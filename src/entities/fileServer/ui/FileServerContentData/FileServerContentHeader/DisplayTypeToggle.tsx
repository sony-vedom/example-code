import { memo } from "react";
import ToggleActiveIcon from "assets/icons/file-storage-display-type-toggle-active.svg?react";
import ToggleGridIcon from "assets/icons/file-storage-display-type-toggle-grid.svg?react";
import ToggleTableIcon from "assets/icons/file-storage-display-type-toggle-table.svg?react";
import { cn, UseFileServerUIManagerType } from "shared/libs";
import { FileStorageContentDisplayType } from "shared/models";
import { ClassNameValue } from "tailwind-merge";

type DisplayTypeToggleProps = {
    className?: ClassNameValue;
    useFileServerUIManagerStore: UseFileServerUIManagerType;
};

export const DisplayTypeToggle = memo(({ className, useFileServerUIManagerStore }: DisplayTypeToggleProps) => {
    const { displayType, toggleDisplayType } = useFileServerUIManagerStore((state) => ({
        displayType: state.displayType,
        toggleDisplayType: state.toggleDisplayType,
    }));
    const getClassesByType = (type: FileStorageContentDisplayType) =>
        cn(
            type === FileStorageContentDisplayType.TABLE ? "rounded-l-2xl" : "rounded-r-2xl",
            "relative flex w-14 flex-row justify-center justify-items-stretch border border-solid border-[#00000016] p-2.5 transition-all duration-1000",
            displayType === type && "border-r-0 bg-[#1b67f740] [&>svg]:opacity-75",
            displayType === type &&
                (type === FileStorageContentDisplayType.TABLE
                    ? "[&>svg:not(.active)]:ml-6"
                    : "[&>svg:not(.active)]:mr-6"),
            displayType !== type &&
                "group-hover:[&>svg:not(.active)]:scale-125 group-hover:[&>svg:not(.active)]:opacity-50 [&_.active]:opacity-0"
        );

    const handleToggle = (type: FileStorageContentDisplayType) => () => {
        if (displayType === type) {
            return;
        }
        toggleDisplayType();
    };

    return (
        <div className={cn("group flex flex-nowrap", className)}>
            <button
                className={getClassesByType(FileStorageContentDisplayType.TABLE)}
                onClick={handleToggle(FileStorageContentDisplayType.TABLE)}
            >
                <ToggleActiveIcon className="active absolute left-2.5 size-3 opacity-75 duration-1000 dark:invert-[1]" />
                <ToggleTableIcon className="size-3 opacity-10 transition-all dark:invert-[1]" />
            </button>
            <button
                className={getClassesByType(FileStorageContentDisplayType.GRID)}
                onClick={handleToggle(FileStorageContentDisplayType.GRID)}
            >
                <ToggleGridIcon className="size-3 opacity-10 transition-all dark:invert-[1]" />
                <ToggleActiveIcon className="active absolute right-2.5 size-3 opacity-75 duration-1000 dark:invert-[1]" />
            </button>
        </div>
    );
});

DisplayTypeToggle.displayName = "DisplayTypeToggle";
