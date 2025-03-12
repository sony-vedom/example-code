import { Language } from "shared/models";

export const appEndpoints = Object.freeze({

    PROJECTS: "/projects",

    PROJECT: "/projects/:id",
    PROJECT_PARAMS: "params",
    PROJECT_BRANDING: "branding",
    PROJECT_METRICS: "metrics",
    getProjectEditorEndpoint: (id: number | string, tab: "params" | "branding" | "metrics" | ":tab" = "params") =>
        `/projects/${id}/${tab}`,
    getProjectBrandingEditorEndpoint: (id: number | string) => `/projects/${id}/branding`,

    FILE_STORAGE: "/files",
});
