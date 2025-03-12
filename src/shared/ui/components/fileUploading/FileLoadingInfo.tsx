import { memo, useEffect, useMemo, useState } from "react";
import imageLoaded from "assets/icons/checkmark_circled.svg";
import dragDropImage from "assets/icons/drag-drop.svg";
import imageRejected from "assets/icons/unsuccessful.svg";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { useDebounce } from "shared/libs";
import { Preloader } from "shared/ui";
import styles from "./FileLoadingInfo.module.scss";

type FileLoadingInfoState = "idle" | "loading" | "loaded" | "rejected" | "disabled";

type Props = {
    state: FileLoadingInfoState;
};
export const FileLoadingInfo = memo(function BrandingFileLoading({ state }: Props) {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const debouncedVisibilitySet = useDebounce(() => setIsVisible(true), 100);
    const figureClass = useMemo(
        () => `${styles["loader-block__content"]} ${isVisible ? styles.visible : ""}`,
        [isVisible]
    );

    useEffect(() => {
        setIsVisible(false);
        debouncedVisibilitySet();
    }, [state]);

    //TODO: Fix Trans not rerender on language change
    switch (state) {
        case "idle":
            return (
                <figure className={figureClass}>
                    <img
                        width={115}
                        height={89}
                        loading="eager"
                        src={dragDropImage}
                        alt={t(
                            "Изображение облаков, указывающее на возможность загрузки файлов переносом, либо нажатием"
                        )}
                    />
                    <figcaption>
                        <Trans>
                            Перетащите или <b>выберите</b> файл
                        </Trans>
                    </figcaption>
                </figure>
            );
        case "loading":
            return (
                <div className={figureClass}>
                    <Preloader />
                    <figcaption>{t("Загружаем...")}</figcaption>
                </div>
            );
        case "loaded":
            return (
                <figure className={figureClass}>
                    <img
                        width={37}
                        height={37}
                        loading="eager"
                        src={imageLoaded}
                        alt={t("Значок в виде галочки, говорящий о том, что изображение загружено")}
                    />
                    <figcaption>{t("Изображение загружено")}</figcaption>
                </figure>
            );
        case "rejected":
            return (
                <figure className={figureClass}>
                    <img
                        width={37}
                        height={37}
                        loading="eager"
                        src={imageRejected}
                        alt={t("Значок в виде красного крестика, говорящий о том, что изображение не было загружено")}
                    />
                    <figcaption>{t("Произошла ошибка")}</figcaption>
                </figure>
            );
        default:
            return null;
    }
});
