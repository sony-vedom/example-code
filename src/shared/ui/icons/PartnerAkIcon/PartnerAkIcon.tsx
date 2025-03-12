import { useMemo } from "react";
import { appStore } from "shared/libs";

export const PartnerAkIcon = () => {
    const language = appStore((state) => state.language);
    const textComponent = useMemo(() => {
        switch (language) {
            case "en":
                return ["ACCREDITED", "IT COMPANY"];
            case "es":
                return ["EMPRESA DE", "TI ACREDITADA"];
            default:
                return ["АККРЕДИТОВАННАЯ", "IT КОМПАНИЯ"];
        }
    }, [language]);

    return (
        <svg
            width="170"
            height="32"
            viewBox="0 0 160 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M23.8045 26.1706H4.36344V6.72934H19.5373L23.9008 2.36591H0V30.5339H28.168V12.4974L23.8045 16.8609V26.1706Z"
                fill="#BDC2CE"
            />
            <path
                d="M9.14393 12.5937L6.05847 15.6791L13.4654 23.0861L32 4.55145L28.9145 1.46606L13.4654 16.9153L9.14393 12.5937Z"
                fill="#BDC2CE"
            />
            <text
                style={{
                    fill: "rgb(189, 194, 206)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    letterSpacing: "0.1px",
                    whiteSpace: "pre",
                }}
                transform="matrix(1.1269209384918213, 0, 0, 1.1269209384918213, 5.934328079223633, -0.6866889595985413)"
            >
                <tspan
                    x="32.033"
                    y="12.916"
                >
                    {textComponent[0]}
                </tspan>
                <tspan
                    x="32.033"
                    dy="1.2em"
                >
                    ​
                </tspan>
                <tspan>{textComponent[1]}</tspan>
            </text>
        </svg>
    );
};
