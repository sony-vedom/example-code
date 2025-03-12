import plugin from "tailwindcss/plugin";

/** @type {import("tailwindcss").Config} */
export default {
    mode: "jit",
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontSize: {
                "size-inherit": "inherit",
                xxs: "0.625rem",
                xxxs: "0.5rem",
                xxxxs: "0.375rem",
            },
            fontFamily: {
                inter: ["Inter", "ui-sans-serif", "system-ui"],
                montserrat: ["Montserrat", "ui-sans-serif", "system-ui"],
            },
            fontWeight: {
                "weight-inherit": "inherit",
            },
            spacing: {
                0.75: "0.1875rem",
                "1/10": "10%",
                "2/10": "20%",
                "3/10": "30%",
                "4/10": "40%",
                "5/10": "50%",
                "6/10": "60%",
                "7/10": "70%",
                "8/10": "80%",
                "9/10": "90%",
                inherit: "inherit",
            },
            colors: {
                "primary-text": "var(--primary-text)",
                "secondary-text": "var(--secondary-text)",
                "additional-text": "var(--additional-text)",
                "primary-bg": "var(--primary-bg)",
                "secondary-bg": "var(--secondary-bg)",
                "control-primary-bg": "var(--control-primary-bg)",
                "control-primary-text": "var(--control-primary-text)",
                "control-primary-border-color": "var(--control-primary-border-color)",
                "control-primary-border-color-hover": "var(--control-primary-border-color-hover)",
                "label-text": "var(--label-text)",
                link: "var(--link)",
                "primary-text-new": "var(--primary-text-new)",
                error: "var(--error)",
                success: "var(--success)",
                icon: "var(--icon)",
                "primary-icon": "var(--primary-icon)",
            },
            borderRadius: {
                "control-primary": "var(--control-primary-border-radius)",
                "control-smaller": "var(--control-smaller-border-radius)",
            },
            boxShadow: {
                dropdown: "var(--shadow-dropdown)",
            },
            animation: {
                "dropdown-enter": "dropdown 0.3s cubic-bezier(0.61, 1, 0.88, 1)",
                "dropdown-exit": "dropdown 0.3s cubic-bezier(0.61, 1, 0.88, 1) reverse",
                skeleton: "skeleton 2s linear infinite",
                preloader: "rotate-360 1s linear infinite",
                toast: "toast 5s linear",
            },
            keyframes: {
                dropdown: {
                    "0%": { maxHeight: "0" },
                    "100%": { maxHeight: "20rem" },
                },
                skeleton: {
                    to: { "background-position-x": "-200%" },
                },
                "rotate-360": {
                    "0%": { transform: "rotate(0)" },
                    "100%": { transform: "rotate(359deg)" },
                },
                toast: {
                    "0%": {
                        "transform-origin": "left",
                        transform: "scaleX(1)",
                    },
                    "100%": {
                        "transform-origin": "left",
                        transform: "scaleX(0)",
                    },
                },
            },
            typography: {
                notice: {
                    css: {
                        "--tw-prose-body": "var(--primary-text)",
                        "--tw-prose-headings": "var(--primary-text)",
                        "--tw-prose-lead": "var(--primary-text)",
                        "--tw-prose-links": "#248cff",
                        "--tw-prose-bold": "var(--primary-text)",
                        "--tw-prose-counters": "var(--primary-text)",
                        "--tw-prose-bullets": "var(--primary-text)",
                        "--tw-prose-hr": "var(--primary-text)",
                        "--tw-prose-quotes": "var(--primary-text)",
                        "--tw-prose-quote-borders": "var(--primary-text)",
                        "--tw-prose-captions": "var(--primary-text)",
                        "--tw-prose-code": "var(--primary-text)",
                        "--tw-prose-pre-code": "var(--primary-text)",
                        "--tw-prose-pre-bg": "var(--primary-bg)",
                        "--tw-prose-th-borders": "var(--primary-text)",
                        "--tw-prose-td-borders": "var(--primary-text)",
                        "--tw-prose-invert-body": "var(--primary-text)",
                        "--tw-prose-invert-headings": "var(--primary-text)",
                        "--tw-prose-invert-lead": "var(--primary-text)",
                        "--tw-prose-invert-links": "#248cff",
                        "--tw-prose-invert-bold": "var(--primary-text)",
                        "--tw-prose-invert-counters": "var(--primary-text)",
                        "--tw-prose-invert-bullets": "var(--primary-text)",
                        "--tw-prose-invert-hr": "var(--primary-text)",
                        "--tw-prose-invert-quotes": "var(--primary-text)",
                        "--tw-prose-invert-quote-borders": "var(--primary-text)",
                        "--tw-prose-invert-captions": "var(--primary-text)",
                        "--tw-prose-invert-code": "var(--primary-text)",
                        "--tw-prose-invert-pre-code": "var(--primary-bg)",
                        "--tw-prose-invert-pre-bg": "var(--primary-bg)",
                        "--tw-prose-invert-th-borders": "var(--primary-text)",
                        "--tw-prose-invert-td-borders": "var(--primary-text)",
                    },
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/container-queries"),
        require("tailwindcss-grid-area"),
        plugin(({ matchUtilities }) => {
            matchUtilities({
                filter: (value) => {
                    return {
                        filter: value,
                    };
                },
            });
        }),
        plugin(({ matchUtilities }) => {
            matchUtilities({
                "border-linear-gradient": (value) => {
                    const values = value.split("-");
                    const background = values[0] || "#fff";
                    const gradient =
                        values.slice(1).reduce((acc, v) => {
                            return acc + `, ${v}`;
                        }) || "#f09, #123";
                    return {
                        background: `linear-gradient(${background},${background}) padding-box,linear-gradient(${gradient}) border-box`,
                        boxSizing: "border-box",
                        borderColor: "#0000",
                    };
                },
            });
        }),
    ],
    safelist: [
        "grid-cols-1",
        "grid-cols-2",
        "grid-cols-3",
        "grid-cols-4",
        "grid-cols-5",
        "grid-cols-6",
        "grid-cols-7",
        "grid-cols-8",
        "grid-cols-9",
        "grid-cols-10",
        "grid-cols-11",
        "grid-cols-12",
        "transition-resize-block-enter",
        "transition-resize-block-exit",
        "transition-resize-block-enter-active",
        "transition-resize-block-exit-active",
        "transition-toast-enter",
        "transition-toast-exit",
        "transition-toast-enter-active",
        "transition-toast-exit-active",
    ],
};
