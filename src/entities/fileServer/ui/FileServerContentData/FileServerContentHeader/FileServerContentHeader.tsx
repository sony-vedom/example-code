import { memo, PropsWithChildren } from "react";
import { UseFileServerUIManagerType } from "shared/libs";
import { DisplayTypeToggle } from "./DisplayTypeToggle";

type FileServerContentHeaderProps = PropsWithChildren & {
    useFileServerUIManagerStore: UseFileServerUIManagerType;
};

export const FileServerContentHeader = memo(
    ({ children, useFileServerUIManagerStore }: FileServerContentHeaderProps) => {
        // const togglePreview = useFileStorageContent((state) => state.togglePreview);

        return (
            <header className="flex flex-row gap-3 max-sm:flex-col">
                {children}
                <DisplayTypeToggle useFileServerUIManagerStore={useFileServerUIManagerStore} />
                {/*<button*/}
                {/*    onClick={togglePreview}*/}
                {/*    className="group"*/}
                {/*>*/}
                {/*    <FileStorageInfoIcon className="size-6 opacity-25  transition-all group-hover:scale-125 group-hover:opacity-100 dark:invert-[1]" />*/}
                {/*</button>*/}
            </header>
        );
    }
);

FileServerContentHeader.displayName = "FileStorageContentHeader";
