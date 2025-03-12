import { memo, useState } from "react";
import { Preloader } from "components";
import { useTranslation } from "react-i18next";
import styles from "./VideoPlayer.module.scss";

type Props = {
    src: string | File;
    controlsEnabled?: boolean;
    className?: string;
};

export const VideoPlayer = memo(function VideoPlayer({ src, controlsEnabled, className = "" }: Props) {
    const { t } = useTranslation();
    const classes = `${styles.player} ${className}`;
    const url = typeof src === "string" ? src : URL.createObjectURL(src);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <video
                onLoadStart={() => setIsLoading(true)}
                onLoadedData={() => setIsLoading(false)}
                className={classes}
                controls={controlsEnabled}
                muted
                autoPlay
                loop
            >
                <source
                    src={url}
                    type="video/mp4"
                />
                {t("Ваш браузер не поддерживает видео-элемент")}
            </video>
            {isLoading && (
                <div style={{ position: "absolute", top: "8px" }}>
                    {" "}
                    <Preloader />
                </div>
            )}
        </>
    );
});
