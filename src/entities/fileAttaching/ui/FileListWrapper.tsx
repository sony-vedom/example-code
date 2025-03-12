import React, { PropsWithChildren } from "react";
import { cn, useIntersectionObserver } from "shared/libs";
import { Preloader } from "shared/ui";
import { ClassNameValue } from "tailwind-merge";

type FileListWrapperProps = {
    className?: ClassNameValue;
    limitReached: boolean;
    isFetching: boolean;
    fetchNextPage: () => void;
} & PropsWithChildren;

export const FileListWrapper = ({
    className,
    children,
    isFetching,
    limitReached,
    fetchNextPage,
}: FileListWrapperProps) => {
    const refPagination = useIntersectionObserver<HTMLDivElement>(fetchNextPage, {
        root: document.querySelectorAll("dialog")[document.querySelectorAll("dialog").length - 1],
    });

    return (
        <div className={cn("grid h-svh w-full flex-[0] flex-col items-start gap-1 py-5", className)}>
            {children}
            {!limitReached && !isFetching && (
                <div
                    className={"mt-auto flex w-full p-10"}
                    ref={refPagination}
                >
                    <Preloader />
                </div>
            )}
        </div>
    );
};
