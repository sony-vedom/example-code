import { memo, useRef, useState } from "react";
import modelInfo from "assets/icons/model-info.svg";
import modelMoveToCenter from "assets/icons/model-move-to-center.svg";
import { CSSTransition } from "react-transition-group";
import { useApp } from "shared/libs";
import { Legend } from "./Legend";
import styles from "./ToolPanel.module.scss";
import { Panel } from "../../panel";

type Props = {
    onResetCamera: () => void;
    legendShown: boolean;
    handleShowModel: (val: boolean) => void;
    children?: React.ReactNode;
};

export const ToolPanel = memo(function ToolPanel({ children, onResetCamera, handleShowModel, legendShown }: Props) {
    const { theme } = useApp();
    const [animationEnabled, setAnimationEnabled] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <>
            <Panel variant={"models-preview"}>
                <ol>
                    <li>
                        <button
                            type="button"
                            className={styles["legend-btn"]}
                            onClick={() => handleShowModel(!legendShown)}
                        >
                            <img
                                src={modelInfo}
                                alt="move model to center"
                                width="24"
                                height="24"
                            />
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={onResetCamera}
                        >
                            <img
                                src={modelMoveToCenter}
                                alt="move model to center"
                                width="24"
                                height="24"
                            />
                        </button>
                    </li>
                    {children}
                </ol>
            </Panel>
            <CSSTransition
                in={legendShown}
                timeout={300}
                classNames={{
                    appear: styles["transition-by-opacity-and-blur-appear"],
                    enter: styles["transition-by-opacity-and-blur-enter"],
                    enterActive: styles["transition-by-opacity-and-blur-enter-active"],
                    exit: styles["transition-by-opacity-and-blur-exit"],
                    exitActive: styles["transition-by-opacity-and-blur-exit-active"],
                    exitDone: styles["transition-by-opacity-and-blur-exit-done"],
                }}
                nodeRef={ref}
                onEnter={() => setAnimationEnabled(true)}
                onExited={() => setAnimationEnabled(false)}
            >
                <div ref={ref}>
                    {(legendShown || animationEnabled) && (
                        <Legend
                            className={styles.legend}
                            data-theme={theme}
                            onClose={() => handleShowModel(false)}
                        />
                    )}
                </div>
            </CSSTransition>
        </>
    );
});
