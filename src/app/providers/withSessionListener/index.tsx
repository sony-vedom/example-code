import { ComponentType, useEffect } from "react";
import { useFileServerUIManagerModalStore } from "entities/fileAttaching";
import { currentUserStore, useAllFileServerStore, usePaginatedAllFileServerStore } from "shared/libs";
import { CurrentUserEventType } from "shared/models";
import { useFileServerUiManagerStoreFilePage } from "widgets/fileStorage";
import { StoreApi, UseBoundStore } from "zustand";

const storesConfig: UseBoundStore<StoreApi<{ clear: () => void }>>[] = [
    useFileServerUiManagerStoreFilePage,
    useFileServerUIManagerModalStore,
    useAllFileServerStore,
    usePaginatedAllFileServerStore,
];

export function withSessionListener<Props>(WrappedComponent: ComponentType<Props>) {
    const WithSessionListener = (props: Props) => {
        const subscribeOnCurrentUserEvents = currentUserStore((state) => state.subscribe);
        const unsubscribeOnCurrentUserEvents = currentUserStore((state) => state.unsubscribe);

        const handleLogout = () => {
            storesConfig.forEach((el) => el.getState().clear());
        };

        useEffect(() => {
            subscribeOnCurrentUserEvents(CurrentUserEventType.LOGGED_OUT, handleLogout);

            return () => {
                unsubscribeOnCurrentUserEvents(CurrentUserEventType.LOGGED_OUT, handleLogout);
            };
        }, [handleLogout, subscribeOnCurrentUserEvents, unsubscribeOnCurrentUserEvents]);

        return <WrappedComponent {...props} />;
    };

    WithSessionListener.displayName = `withSessionListener(${WrappedComponent.displayName || WrappedComponent.name})`;

    return WithSessionListener;
}
