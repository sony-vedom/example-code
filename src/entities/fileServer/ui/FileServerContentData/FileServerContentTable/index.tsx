import { cn } from "shared/libs";
import { ClassNameValue } from "tailwind-merge";
import { FileServerContentTableRow } from "./FileServerContentTableRow";
import { FileServerContentTableSkeleton } from "./FileServerContentTableSkeleton";
import { checkDisabled } from "../lib";
import { FileServerContentProps } from "../model";

const rowClasses: ClassNameValue =
    "grid grid-cols-[4rem_4fr_auto] grid-areas-['icon_name_dropdown'_'icon_time_dropdown'] gap-x-4";

const FileServerContentTable = ({
    size,
    enableAction,
    onUpload,
    type,
    content,
    isFetching,
    isLoading,
    useFileServerStore,
    useFileServerUIManagerStore,
}: FileServerContentProps) => {
    return (
        <table
            className={cn(
                "w-full [&_*]:text-sm [&_*]:font-normal [&_*]:text-primary-text md:[&_td:nth-of-type(1)]:pl-2 [&_th]:pb-3 [&_th]:text-left",
                {
                    ["md:[&_td:nth-of-type(1)]:pl-6 md:[&_td]:py-2"]: size === "l",
                    ["[&_td:last-of-type]:!hidden"]: !enableAction,
                }
            )}
        >
            <tbody>
                {isLoading ? (
                    <FileServerContentTableSkeleton />
                ) : (
                    content?.map((c) => {
                        const isDisabled = checkDisabled(c, type, isFetching);
                        return (
                            <FileServerContentTableRow
                                useFileServerUIManagerStore={useFileServerUIManagerStore}
                                useFileServerStore={useFileServerStore}
                                key={c.hash}
                                className={cn(rowClasses, {
                                    ["md:grid-cols-[5.5rem_4fr_1fr_auto] md:grid-areas-['icon_name_time_dropdown']"]:
                                        size === "l",
                                })}
                                disabled={isDisabled}
                                onUpload={(...args) => {
                                    if (!isDisabled) {
                                        onUpload(...args);
                                    }
                                }}
                                content={c}
                            />
                        );
                    })
                )}
            </tbody>
        </table>
    );
};

export default FileServerContentTable;
