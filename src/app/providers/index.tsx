import { ComponentType } from "react";
import { withNotices } from "./withNotices";
import { withSessionListener } from "./withSessionListener";
import { withToasts } from "./withToasts";

export const withProviders = function withProviders(Component: ComponentType) {
    return withSessionListener(withNotices(withToasts(Component)));
};
