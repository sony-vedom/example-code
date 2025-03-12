import React, { memo, Suspense, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PopupDefaults } from "shared/constants";
import { usePopup } from "shared/libs";
import { Popup, PopupDialog } from "./";
import styles from "./Popup.module.scss";
import { Preloader } from "../../icons";

export const PopupManager = memo(function PopupManager() {
    const { opened, content } = usePopup();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (opened?.length) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [opened]);

    return ReactDOM.createPortal(
        <>
            <Popup />
            <TransitionGroup component={null}>
                {opened?.map((popup, index) => (
                    <CSSTransition
                        key={`${opened[index].toString()}-${index}`}
                        timeout={{
                            enter: PopupDefaults.appearAnimationDuration,
                            exit: PopupDefaults.dissappearAnimationDuration,
                        }}
                        classNames={{
                            enter: styles["dialog-enter"],
                            enterActive: styles["dialog-enter-active"],
                            exit: styles["dialog-exit"],
                            exitActive: styles["dialog-exit-active"],
                        }}
                        nodeRef={dialogRef}
                        unmountOnExit
                        onEntered={() => {}}
                    >
                        <PopupDialog
                            key={index}
                            ref={dialogRef}
                            index={index}
                            type={popup}
                        >
                            <Suspense fallback={<Preloader />}>{content[index]}</Suspense>
                        </PopupDialog>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </>,
        document.getElementById("portal-modal")
    );
});
