import { memo, useEffect, useState } from "react";
import { useContent } from "shared/libs";
import { VideoPlayer } from "./VideoPlayer";
import styles from "./VideoPreview.module.scss";

type Props = {
    src: string | File;
    preview?: string;
    className?: string;
    controlsEnabled?: boolean;
};

export const VideoPreview = memo(function VideoPreview({ src, preview, controlsEnabled, className = "" }: Props) {
    const classes = `${styles.preview} ${className}`;
    const [isHovered, setIsHovered] = useState(false);
    const [imgUrl, setImgUrl] = useState<string>(preview ?? "");

    const { makePreviewFromVideoFile } = useContent();
    useEffect(() => {
        (async () => {
            const u = preview ?? URL.createObjectURL(await makePreviewFromVideoFile(src!));
            setImgUrl(u);
        })();
    }, []);

    return (
        <div
            className={classes}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? (
                <VideoPlayer
                    src={src}
                    controlsEnabled={controlsEnabled}
                />
            ) : (
                <figure>
                    <img
                        src={imgUrl}
                        alt="preview"
                    />
                </figure>
            )}
        </div>
    );
});
