import { useCallback, useEffect } from "react";
import { currentUserStore, useNoticesStore, FileServerStoreType } from "shared/libs";
import { CurrentUserEventType, FileStorageEventType, FileServerDataFile } from "shared/models";
import { FileStorageNotice } from "widgets/fileStorage";
import { StoreApi, UseBoundStore } from "zustand";

export const useNoticesToDisplayFileServerEvents = (
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>
) => {
    const { addNotice, clearNotices } = useNoticesStore((state) => ({
        addNotice: state.addNotice,
        clearNotices: state.clearNotices,
    }));
    const subscribeOnFileStorageEvents = useFileServerStore((state) => state.subscribe);
    const unsubscribeOnFileStorageEvents = useFileServerStore((state) => state.unsubscribe);
    const subscribeOnCurrentUserEvents = currentUserStore((state) => state.subscribe);
    const unsubscribeOnCurrentUserEvents = currentUserStore((state) => state.unsubscribe);

    const generateNotificationForUploadingEvent = useCallback(
        (data: FileServerDataFile) => {
            const content = (
                <FileStorageNotice
                    data={data}
                    type={FileStorageEventType.UPLOADING}
                />
            );
            const notification = {
                id: `upload-${data.type}-${data.id}`,
                content: content,
            };
            addNotice(notification);
        },
        [addNotice]
    );
    const generateNotificationForUploadedEvent = useCallback(
        (data: FileServerDataFile) => {
            const content = (
                <FileStorageNotice
                    data={data}
                    type={FileStorageEventType.UPLOADED}
                />
            );
            const notification = {
                id: `upload-${data.type}-${data.id}`,
                content: content,
            };
            addNotice(notification);
        },
        [addNotice]
    );
    const generateNotificationForErrorEvent = useCallback(
        (data: FileServerDataFile) => {
            const content = (
                <FileStorageNotice
                    data={data}
                    type={FileStorageEventType.UPLOADED_WITH_ERROR}
                />
            );
            const notification = {
                id: `upload-${data.type}-${data.id}`,
                content: content,
            };
            addNotice(notification);
        },
        [addNotice]
    );

    const generateNotificationForRemovingEvent = useCallback(
        (data: FileServerDataFile) => {
            const content = (
                <FileStorageNotice
                    data={data}
                    type={FileStorageEventType.REMOVING}
                />
            );
            const notification = {
                id: `remove-${data.type}-${data.id}`,
                content: content,
            };
            addNotice(notification);
        },
        [addNotice]
    );
    const generateNotificationForRemovedEvent = useCallback(
        (data: FileServerDataFile) => {
            const content = (
                <FileStorageNotice
                    data={data}
                    type={FileStorageEventType.REMOVED}
                />
            );
            const notification = {
                id: `remove-${data.type}-${data.id}`,
                content: content,
            };
            addNotice(notification);
        },
        [addNotice]
    );
    const generateNotificationForRemovingErrorEvent = useCallback(
        (data: FileServerDataFile) => {
            const content = (
                <FileStorageNotice
                    data={data}
                    type={FileStorageEventType.REMOVED_WITH_ERROR}
                />
            );
            const notification = {
                id: `remove-${data.type}-${data.id}`,
                content: content,
            };
            addNotice(notification);
        },
        [addNotice]
    );

    useEffect(() => {
        subscribeOnFileStorageEvents(FileStorageEventType.UPLOADING, generateNotificationForUploadingEvent);
        subscribeOnFileStorageEvents(FileStorageEventType.UPLOADED, generateNotificationForUploadedEvent);
        subscribeOnFileStorageEvents(FileStorageEventType.UPLOADED_WITH_ERROR, generateNotificationForErrorEvent);
        subscribeOnFileStorageEvents(FileStorageEventType.REMOVING, generateNotificationForRemovingEvent);
        subscribeOnFileStorageEvents(FileStorageEventType.REMOVED, generateNotificationForRemovedEvent);
        subscribeOnFileStorageEvents(
            FileStorageEventType.REMOVED_WITH_ERROR,
            generateNotificationForRemovingErrorEvent
        );
        subscribeOnCurrentUserEvents(CurrentUserEventType.LOGGED_OUT, clearNotices);
        return () => {
            unsubscribeOnFileStorageEvents(FileStorageEventType.UPLOADING, generateNotificationForUploadingEvent);
            unsubscribeOnFileStorageEvents(FileStorageEventType.UPLOADED, generateNotificationForUploadedEvent);
            unsubscribeOnFileStorageEvents(FileStorageEventType.UPLOADED_WITH_ERROR, generateNotificationForErrorEvent);
            subscribeOnFileStorageEvents(FileStorageEventType.REMOVING, generateNotificationForRemovingEvent);
            subscribeOnFileStorageEvents(FileStorageEventType.REMOVED, generateNotificationForRemovedEvent);
            subscribeOnFileStorageEvents(
                FileStorageEventType.REMOVED_WITH_ERROR,
                generateNotificationForRemovingErrorEvent
            );
            unsubscribeOnCurrentUserEvents(CurrentUserEventType.LOGGED_OUT, clearNotices);
        };
    }, []);
};
