import { FC, ReactNode } from "react";

type Props = {
    isAccessAllowed: boolean;
};

export function withPermission<P>(Component: React.ComponentType<P>, fallback: ReactNode = null): FC<P & Props> {
    const WrappedComponent: FC<P & Props> = (props) => {
        const { isAccessAllowed, ...restProps } = props;

        if (!isAccessAllowed) {
            return <>{fallback}</>;
        }

        return <Component {...(restProps as P)} />;
    };

    WrappedComponent.displayName = `withPermission(${Component.displayName || Component.name || "WrappedComponent"})`;

    return WrappedComponent;
}
