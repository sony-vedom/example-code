import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { appEndpoints, userRoles } from "shared/constants";
import { TooltipManager, PopupManager } from "shared/ui";
import { withProviders } from "./providers";

export const App = withProviders(() => {
    const initAppStore = appStore((state) => state.init);

    useEffect(() => {
        initAppStore();
    }, []);

    return (
        <ModalContextProvider>
            <Routes>
                <Route
                    element={
                        <RouteGuardLayoutByUserRole
                            requiredRoles={[userRoles.ADMIN, userRoles.SUPERADMIN, userRoles.CLIENT, userRoles.USER]}
                            redirectTo={appEndpoints.getAuthEndpoint("signin")}
                        />
                    }
                >
                    <Route element={<UserLayout />}>
                        <Route
                            path={appEndpoints.ROOT}
                            element={<MainLazy />}
                        />
                        <Route
                            path={appEndpoints.PROJECT}
                            element={<ProjectEditorPage />}
                        >
                            <Route
                                index
                                element={<Navigate to={appEndpoints.PROJECT_PARAMS} />}
                            />
                            <Route
                                element={<ProjectEditorParamsPage />}
                                path={appEndpoints.PROJECT_PARAMS}
                            />
                            <Route
                                element={<ProjectBrandingEditorPage />}
                                path={appEndpoints.PROJECT_BRANDING}
                            />
                            <Route
                                element={<ProjectMetricsSettingPage />}
                                path={appEndpoints.PROJECT_METRICS}
                            />
                        </Route>
                        <Route
                            path={appEndpoints.FILE_STORAGE}
                            element={<FileServer />}
                        />
                    </Route>
                </Route>
            </Routes>
            <TooltipManager />
            <PopupManager />
        </ModalContextProvider>
    );
});
