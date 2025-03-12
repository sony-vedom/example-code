import { ComponentType } from "react";
import {
    useToastToDisplayUpdatedStoreInfo,
    useFileStorageStore,
    useAllFileServerStore,
    usePaginatedAllFileServerStore,
} from "shared/libs";
import { Toasts } from "shared/ui/components/Toasts";

export function withToasts<Props>(WrappedComponent: ComponentType) {
    const WithToasts = (props: Props) => {
        useToastToDisplayUpdatedStoreInfo(useFileStorageStore);
        useToastToDisplayUpdatedStoreInfo(useAllFileServerStore);
        useToastToDisplayUpdatedStoreInfo(usePaginatedAllFileServerStore);
        return (
            <>
                <Toasts />
                <WrappedComponent {...props} />
            </>
        );
    };

    WithToasts.displayName = `withToasts(${WrappedComponent.displayName || WrappedComponent.name})`;
    return WithToasts;
}
