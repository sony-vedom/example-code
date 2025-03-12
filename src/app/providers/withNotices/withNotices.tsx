import { ComponentType } from "react";
import { useNoticesToDisplayFileServerEvents } from "./useNoticesToDisplayFileServerEvents";
import { useNoticesToDisplayFileStorageEvents } from "./useNoticesToDisplayFileStorageEvents";
import { useAllFileServerStore, usePaginatedAllFileServerStore } from "../../../shared/libs";

export function withNotices<Props>(WrappedComponent: ComponentType) {
    const WithNotifications = (props: Props) => {
        useNoticesToDisplayFileStorageEvents();
        useNoticesToDisplayFileServerEvents(useAllFileServerStore);
        useNoticesToDisplayFileServerEvents(usePaginatedAllFileServerStore);
        return <WrappedComponent {...props} />;
    };

    WithNotifications.displayName = `withNotifications(${WrappedComponent.displayName || WrappedComponent.name})`;
    return WithNotifications;
}
