import { useMemo } from "react";
import { FileSeverBreadCrumbs, FileServerContentData, FileStoragePreview } from "entities/fileServer";
import { cn, usePaginatedAllFileServerStore } from "shared/libs";
import { useFileServerUiManagerStoreFilePage } from "../../lib";

export const FileServerContentPageBody = () => {
    const { isPreviewShowed } = useFileServerUiManagerStoreFilePage((state) => ({
        isPreviewShowed: state.isPreviewShowed,
    }));

    const contentClasses = useMemo(
        () => cn("grid  gap-3 transition-all", isPreviewShowed ? "grid-cols-[3fr_1fr]" : "grid-cols-[3fr_0fr]"),
        [isPreviewShowed]
    );

    return (
        <div className={contentClasses}>
            <FileServerContentData
                useFileServerUIManagerStore={useFileServerUiManagerStoreFilePage}
                enableAction
                size={"l"}
                useFileServerStore={usePaginatedAllFileServerStore}
                className={"p-6"}
            >
                <FileSeverBreadCrumbs
                    useFileServerUIManagerStore={useFileServerUiManagerStoreFilePage}
                    enableAction
                    size={"l"}
                    useFileServerStore={usePaginatedAllFileServerStore}
                />
            </FileServerContentData>
            <div className={cn("overflow-x-hidden opacity-0 transition-opacity", isPreviewShowed && "opacity-100")}>
                {isPreviewShowed && (
                    <FileStoragePreview
                        useFileServerUIManagerStore={useFileServerUiManagerStoreFilePage}
                        useFileServerStore={usePaginatedAllFileServerStore}
                    />
                )}
            </div>
        </div>
    );
};
