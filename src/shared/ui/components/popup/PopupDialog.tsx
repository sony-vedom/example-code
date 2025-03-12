import React, { forwardRef } from "react";
import CloseModalIconNew from "assets/icons/cancel-cross-new-popup-icon.svg?react";
import closeModalIcon from "assets/icons/close.svg";
import { useTranslation } from "react-i18next";
import { PopupDefaultOptions, PopupDefaults } from "shared/constants";
import { closeLastPopupInstance, cn, useApp, usePopup } from "shared/libs";
import { PopupVariant } from "shared/models";
import styles from "./Popup.module.scss";

interface PopupProps {
    children: React.ReactNode;
    index: number;
    type: PopupVariant;
}

export const PopupDialog = forwardRef<HTMLDialogElement, PopupProps>(function PopupDialog(
    { children, index, type }: PopupProps,
    ref
) {
    const { t } = useTranslation();
    const { theme } = useApp();
    const { options } = usePopup();
    const defaultOptions = PopupDefaultOptions.get(type);
    const { defaultTitle } = PopupDefaults;
    const dialogTitle = options[index]?.title ?? t(defaultOptions?.title) ?? t(defaultTitle);
    const dialogWidth = options[index]?.width ?? defaultOptions?.width ?? "400px";
    const isNewDesign = options[index]?.isNewDesign ?? defaultOptions?.isNewDesign ?? false;
    const position = defaultOptions.position ?? "center";

    return (
        <>
            <dialog
                open
                ref={ref}
                style={{
                    zIndex: 1001 + index * 2,
                    width: position === "center" ? `min(100svw, ${dialogWidth})` : "",
                }}
                data-theme={theme}
                className={cn(styles.dialog, {
                    ["bg-white"]: isNewDesign,
                    ["left-2/4 top-2/4 max-h-[calc(100svh_-_63px)] -translate-x-2/4  -translate-y-2/4 rounded-[18px] max-md:bottom-0 max-md:top-auto max-md:!w-full max-md:translate-y-0 max-md:rounded-b-[0]"]:
                        position === "center",
                    ["left-full top-2/4 h-[100svh] max-w-[calc(100svw_-_63px)] -translate-x-full -translate-y-2/4"]:
                        position === "right" && isNewDesign,
                })}
            >
                {!isNewDesign ? (
                    <header className={styles["dialog-header"]}>
                        <div className={styles["dialog-header__title"]}>{dialogTitle}</div>
                        <button
                            className={styles["dialog-header__close"]}
                            onClick={() => closeLastPopupInstance()}
                        >
                            <img
                                src={closeModalIcon}
                                alt="Close Popup"
                                width={20}
                                height={20}
                                loading="eager"
                            />
                        </button>
                    </header>
                ) : (
                    <button
                        className={cn(
                            "absolute",
                            position === "center"
                                ? "right-[-45px] text-white"
                                : "right-[15px] top-[10px] text-[#6c7275]"
                        )}
                        onClick={() => closeLastPopupInstance()}
                    >
                        <CloseModalIconNew
                            width={25}
                            height={25}
                        />
                    </button>
                )}
                <div
                    className={cn(styles["dialog-content"], {
                        ["max-h-[calc(100svh_-_63px_*_2)] max-md:rounded-b-[0]"]: position === "center",
                        ["max-h-[100svh] [scrollbar-gutter:stable]"]: position === "right",
                    })}
                >
                    {children}
                </div>
            </dialog>
        </>
    );
});
