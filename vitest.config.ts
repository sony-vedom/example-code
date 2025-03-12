/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
                svgoConfig: {
                    multipass: true,
                    floatPrecision: 2,
                    js2svg: {
                        indent: 2, // number
                        pretty: false, // boolean
                    },
                    plugins: [
                        {
                            name: "preset-default",
                            params: {
                                overrides: {
                                    removeViewBox: false,
                                    cleanupIds: false,
                                    removeHiddenElems: false,
                                },
                            },
                        },
                    ],
                },
            },
        }),
    ],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./vitest.setup.ts",
        passWithNoTests: true,
    },
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src"),
            app: path.resolve(__dirname, "./src/app"),
            pages: path.resolve(__dirname, "./src/pages"),
            widgets: path.resolve(__dirname, "./src/widgets"),
            features: path.resolve(__dirname, "./src/features"),
            entities: path.resolve(__dirname, "./src/entities"),
            shared: path.resolve(__dirname, "./src/shared"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler", // or "modern"
            },
        },
    },
});
