import { ComponentType, Suspense } from "react";
import { Preloader } from "shared/ui/icons/Preloader";

/**
 * Wraps the React Component with React.Suspense and FallbackComponent while loading.
 * @param {React.ComponentType & any} Component - lazy loading component to wrap.
 * @param {React.ComponentType} Fallback - component to show while the WrappedComponent is loading.
 */
export const withSuspense = function withSuspense<Props>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component: ComponentType | any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Fallback: ComponentType = Preloader
) {
    const WithSuspense = (props: Props) => {
        return (
            <Suspense fallback={<Fallback />}>
                <Component {...props} />
            </Suspense>
        );
    };

    WithSuspense.displayName = `withSuspense(${Component?.displayName || Component?.name})`;
    return WithSuspense;
};
