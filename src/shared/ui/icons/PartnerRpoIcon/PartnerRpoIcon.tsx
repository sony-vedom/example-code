import { useMemo } from "react";
import { appStore } from "shared/libs";

export const PartnerRpoIcon = () => {
    const language = appStore((state) => state.language);
    const textComponent = useMemo(() => {
        switch (language) {
            case "en":
                return (
                    <text
                        style={{
                            fill: "rgb(189, 194, 206)",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "11.1538px",
                            fontWeight: "700",
                            lineHeight: "17.8462px",
                            whiteSpace: "pre",
                        }}
                        transform="matrix(1.0212149620056152, 0, 0, 0.9862069487571715, 8.460044860839844, 3.8029727935791)"
                    >
                        <tspan
                            x="32.033"
                            y="12.916"
                        >
                            Software
                        </tspan>
                        <tspan
                            x="32.03300094604492"
                            dy="1.2em"
                        >
                            ​
                        </tspan>
                        <tspan>Registry</tspan>
                        <tspan
                            x="32.03300094604492"
                            dy="1.2em"
                        >
                            ​
                        </tspan>
                    </text>
                );

            case "es":
                return (
                    <text
                        style={{
                            fill: "rgb(189, 194, 206)",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "11.1538px",
                            fontWeight: "700",
                            lineHeight: "17.8462px",
                            whiteSpace: "pre",
                        }}
                        transform="matrix(1.0212149620056152, 0, 0, 0.9862069487571715, 8.460044860839844, 3.8029727935791)"
                    >
                        <tspan
                            x="32.033"
                            y="12.916"
                        >
                            Registro
                        </tspan>
                        <tspan
                            x="32.03300094604492"
                            dy="1.2em"
                        >
                            ​
                        </tspan>
                        <tspan>de Software</tspan>
                        <tspan
                            x="32.03300094604492"
                            dy="1.2em"
                        >
                            ​
                        </tspan>
                    </text>
                );

            default:
                return (
                    <text
                        style={{
                            fill: "rgb(189, 194, 206)",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "11.1538px",
                            fontWeight: "700",
                            lineHeight: "17.8462px",
                            whiteSpace: "pre",
                        }}
                        transform="matrix(1.0212149620056152, 0, 0, 0.9862069487571715, 8.460044860839844, -2.197026014328003)"
                    >
                        <tspan
                            x="32.033"
                            y="12.916"
                        >
                            Реестр
                        </tspan>
                        <tspan
                            x="32.033"
                            dy="1.2em"
                        >
                            ​
                        </tspan>
                        <tspan>программного</tspan>
                        <tspan
                            x="32.033"
                            dy="1.2em"
                        >
                            ​
                        </tspan>
                        <tspan>обеспечения</tspan>
                    </text>
                );
        }
    }, [language]);

    return (
        <svg
            width="140"
            height="39"
            viewBox="0 0 122 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <clipPath id="clip0_3514_102111">
                    <rect
                        width="113"
                        height="36"
                        fill="white"
                        transform="translate(0 2)"
                    />
                </clipPath>
            </defs>
            <g
                clipPath="url(#clip0_3514_102111)"
                transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, -1.7763568394002505e-15)"
            >
                <mask
                    id="mask0_3514_102111"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="2"
                    width="113"
                    height="36"
                >
                    <path
                        d="M113 2H0V38H113V2Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask0_3514_102111)">
                    <mask
                        id="mask1_3514_102111"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="2"
                        width="35"
                        height="36"
                    >
                        <path
                            d="M35 2H0V38H35V2Z"
                            fill="white"
                        />
                    </mask>
                    <g mask="url(#mask1_3514_102111)">
                        <path
                            d="M14.4815 29.6968L18.9697 25.2051L14.4815 20.7134L9.99329 25.2051L14.4815 29.6968Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M14.511 10.4511L17.9062 7.05326L14.511 3.6554L11.1158 7.05326L14.511 10.4511Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M5.45809 29.6665L9.94634 25.1748L5.45809 20.6831L0.969849 25.1748L5.45809 29.6665Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M5.45809 11.5449L9.94634 7.05323L5.45809 2.56152L0.969849 7.05323L5.45809 11.5449Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M14.4819 37.4386L17.6065 34.3115L14.4819 31.1844L11.3572 34.3115L14.4819 37.4386Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M14.4814 19.5565L17.8761 16.1592L14.4814 12.7619L11.0867 16.1592L14.4814 19.5565Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M5.45875 37.2918L8.51468 34.2335L5.45875 31.1752L2.40283 34.2335L5.45875 37.2918Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M5.45809 20.6055L9.94634 16.1138L5.45809 11.6221L0.969849 16.1138L5.45809 20.6055Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M23.504 26.3701L24.6358 25.2373L23.504 24.1045L22.3721 25.2373L23.504 26.3701Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M23.5041 9.38103L25.7677 7.11571L23.5041 4.8504L21.2405 7.11571L23.5041 9.38103Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M32.5805 26.3701L33.7124 25.2373L32.5805 24.1045L31.4486 25.2373L32.5805 26.3701Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M28.0538 30.8759L29.1856 29.7432L28.0538 28.6104L26.9219 29.7432L28.0538 30.8759Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M20.1319 30.8759L21.2638 29.7432L20.1319 28.6104L19 29.7432L20.1319 30.8759Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M32.5821 9.35674L34.8214 7.11575L32.5821 4.87476L30.3429 7.11575L32.5821 9.35674Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M23.504 35.4062L24.6358 34.2734L23.504 33.1407L22.3721 34.2734L23.504 35.4062Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M23.5026 18.4415L25.7905 16.1519L23.5026 13.8622L21.2148 16.1519L23.5026 18.4415Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M32.5805 35.4062L33.7124 34.2734L32.5805 33.1407L31.4486 34.2734L32.5805 35.4062Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M32.5807 18.4172L34.8442 16.1519L32.5807 13.8865L30.3171 16.1519L32.5807 18.4172Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M28.0539 13.8869L30.3175 11.6216L28.0539 9.35626L25.7903 11.6216L28.0539 13.8869Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M28.0539 22.9474L30.3175 20.6821L28.0539 18.4168L25.7903 20.6821L28.0539 22.9474Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M20.1319 22.9474L22.3955 20.6821L20.1319 18.4168L17.8684 20.6821L20.1319 22.9474Z"
                            fill="#BDC2CE"
                        />
                        <path
                            d="M19.0002 13.8869L21.2638 11.6216L19.0002 9.35626L16.7366 11.6216L19.0002 13.8869Z"
                            fill="#BDC2CE"
                        />
                    </g>
                </g>
            </g>
            {textComponent}
        </svg>
    );
};
