import { FC, lazy, memo, PropsWithChildren, useMemo } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { cn, FileServerStoreType, useIntersectionObserver, UseFileServerUIManagerType } from "shared/libs";
import { withSuspense } from "shared/libs/hocs/withSuspense";
import { FileStorageContentDisplayType, PaginationUpdateStrategy } from "shared/models";
import { Preloader } from "shared/ui";
import { ClassNameValue } from "tailwind-merge";
import { StoreApi, UseBoundStore } from "zustand";
import { FileServerContentHeader } from "./FileServerContentHeader";
import { FileServerContentProps } from "./model";

const Table = withSuspense<FileServerContentProps>(lazy(() => import("./FileServerContentTable")));
const Grid = withSuspense<FileServerContentProps>(lazy(() => import("./FileServerContentGrid")));

const contentComponentsByDisplayType = new Map<FileStorageContentDisplayType, FC<FileServerContentProps>>([
    [FileStorageContentDisplayType.TABLE, Table],
    [FileStorageContentDisplayType.GRID, Grid],
]);

type FileServerContentDataProps = {
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>;
    className?: ClassNameValue;
    useFileServerUIManagerStore: UseFileServerUIManagerType;
} & Pick<FileServerContentProps, "enableAction" | "size" | "onUpload" | "type"> &
    PropsWithChildren;

export const FileServerContentData = memo(
    ({
        useFileServerStore,
        size,
        enableAction,
        onUpload,
        type,
        className,
        children,
        useFileServerUIManagerStore,
    }: FileServerContentDataProps) => {
        const displayType = useFileServerUIManagerStore((state) => state.displayType);
        const showPreview = useFileServerUIManagerStore((state) => state.showPreview);
        const { limitReached, isFetching, nextPage, isLoading, setPaginationUpdateStrategy, content } =
            useFileServerStore((state) => ({
                limitReached: state.limitReached,
                isFetching: state.isFetching,
                nextPage: state.nextPage,
                isLoading: state.isLoading,
                setPaginationUpdateStrategy: state.setPaginationUpdateStrategy,
                content: state.list?.results,
            }));

        const Content = useMemo(() => contentComponentsByDisplayType.get(displayType), [displayType]);

        const fetchNextPage = async () => {
            if (limitReached && isFetching) {
                return;
            }
            setPaginationUpdateStrategy(PaginationUpdateStrategy.APPEND);
            nextPage();
        };
        const refPagination = useIntersectionObserver<HTMLDivElement>(fetchNextPage);

        return (
            <section className={cn("flex flex-col gap-4 rounded-3xl bg-secondary-bg", className)}>
                {showPreview && (
                    <FileServerContentHeader useFileServerUIManagerStore={useFileServerUIManagerStore}>
                        {children}
                    </FileServerContentHeader>
                )}
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={displayType}
                        timeout={{
                            enter: 300,
                            exit: 300,
                        }}
                        classNames="transition-resize-block"
                    >
                        <>
                            <Content
                                useFileServerUIManagerStore={useFileServerUIManagerStore}
                                useFileServerStore={useFileServerStore}
                                size={size}
                                enableAction={enableAction}
                                content={content}
                                isFetching={isFetching}
                                isLoading={isLoading}
                                onUpload={onUpload}
                                type={type}
                            />
                            {!limitReached && !isFetching && !isLoading && (
                                <div ref={refPagination}>
                                    <Preloader />
                                </div>
                            )}
                        </>
                    </CSSTransition>
                </SwitchTransition>
            </section>
        );
    }
);

FileServerContentData.displayName = "FileStorageContentData";
