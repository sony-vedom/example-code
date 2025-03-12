import { useCallback, useEffect } from "react";
import { currentUserStore, useFileStorageStore, useNoticesStore } from "shared/libs";
import { CurrentUserEventType, FileStorageDataFile, FileStorageEventType } from "shared/models";
import { FileStorageNotice } from "widgets/fileStorage";

export const useNoticesToDisplayFileStorageEvents = () => {
    const { addNotice, clearNotices } = useNoticesStore((state) => ({
        addNotice: state.addNotice,
        clearNotices: state.clearNotices,
    }));
    const subscribeOnFileStorageEvents = useFileStorageStore((state) => state.subscribe);
    const unsubscribeOnFileStorageEvents = useFileStorageStore((state) => state.unsubscribe);
    const subscribeOnCurrentUserEvents = currentUserStore((state) => state.subscribe);
    const unsubscribeOnCurrentUserEvents = currentUserStore((state) => state.unsubscribe);

    const generateNotificationForUploadingEvent = useCallback(
        (data: FileStorageDataFile) => {
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
        (data: FileStorageDataFile) => {
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
        (data: FileStorageDataFile) => {
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

    useEffect(() => {
        subscribeOnFileStorageEvents(FileStorageEventType.UPLOADING, generateNotificationForUploadingEvent);
        subscribeOnFileStorageEvents(FileStorageEventType.UPLOADED, generateNotificationForUploadedEvent);
        subscribeOnFileStorageEvents(FileStorageEventType.UPLOADED_WITH_ERROR, generateNotificationForErrorEvent);
        subscribeOnCurrentUserEvents(CurrentUserEventType.LOGGED_OUT, clearNotices);
        return () => {
            unsubscribeOnFileStorageEvents(FileStorageEventType.UPLOADING, generateNotificationForUploadingEvent);
            unsubscribeOnFileStorageEvents(FileStorageEventType.UPLOADED, generateNotificationForUploadedEvent);
            unsubscribeOnFileStorageEvents(FileStorageEventType.UPLOADED_WITH_ERROR, generateNotificationForErrorEvent);
            unsubscribeOnCurrentUserEvents(CurrentUserEventType.LOGGED_OUT, clearNotices);
        };
    }, []);
};
