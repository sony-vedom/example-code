import { cn, useMediaQuery } from "shared/libs";
import { FileServerContentGridCardLarge } from "./FileServerContentGridCardLarge";
import { FileServerContentGridCardSmall } from "./FileServerContentGridCardSmall";
import { FileServerContentGridSkeleton } from "./FileServerContentGridSkeleton";
import { checkDisabled } from "../lib";
import { FileServerContentProps } from "../model";

const FileServerContentGrid = ({
    size,
    onUpload,
    type,
    content,
    isFetching,
    isLoading,
    useFileServerStore,
    useFileServerUIManagerStore,
}: FileServerContentProps) => {
    const isSmallDeviceScreen = useMediaQuery("(max-width: 768px)");
    return (
        <div
            className={cn("grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-3", {
                ["md:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]"]: size === "l",
            })}
        >
            {isLoading ? (
                <FileServerContentGridSkeleton size={isSmallDeviceScreen ? "s" : size} />
            ) : size === "l" && !isSmallDeviceScreen ? (
                content?.map((c) => {
                    const isDisabled = checkDisabled(c, type, isFetching);
                    return (
                        <FileServerContentGridCardLarge
                            useFileServerUIManagerStore={useFileServerUIManagerStore}
                            useFileServerStore={useFileServerStore}
                            onUpload={(...args) => {
                                if (!isDisabled) {
                                    onUpload(...args);
                                }
                            }}
                            key={c.hash}
                            content={c}
                            disabled={isDisabled}
                        />
                    );
                })
            ) : (
                content?.map((c) => {
                    const isDisabled = checkDisabled(c, type, isFetching);
                    return (
                        <FileServerContentGridCardSmall
                            useFileServerUIManagerStore={useFileServerUIManagerStore}
                            useFileServerStore={useFileServerStore}
                            onUpload={(...args) => {
                                if (!isDisabled) {
                                    onUpload(...args);
                                }
                            }}
                            key={c.hash}
                            content={c}
                            disabled={isDisabled}
                        />
                    );
                })
            )}
        </div>
    );
};

export default FileServerContentGrid;
