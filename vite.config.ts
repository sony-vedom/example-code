import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import mkcert from "vite-plugin-mkcert";
import checker from "vite-plugin-checker";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const config = {
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
            ViteImageOptimizer({
                png: {
                    // https://sharp.pixelplumbing.com/api-output#png
                    quality: 80,
                },
                jpeg: {
                    // https://sharp.pixelplumbing.com/api-output#jpeg
                    quality: 80,
                },
                jpg: {
                    // https://sharp.pixelplumbing.com/api-output#jpeg
                    quality: 80,
                },
            }),
            mkcert({ savePath: "./tls" }), // generating certificates for https://localhost
            checker({
                typescript: true,
                eslint: {
                    lintCommand: 'eslint --config .eslintrc.json "./src/**/*.{js,jsx,ts,tsx}"',
                },
            }), // ts type checking
        ],
        devServer: {
            https: {
                cert: "./tls/cert.pem",
                key: "./tls/dev.pem",
            },
        },
        build: {
            target: "es2015",
            outDir: "build",
            manifest: true,
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
    };
    return defineConfig(config);
});
