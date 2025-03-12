import React, { CSSProperties, useCallback, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { TooltipDefaults } from "shared/constants";
import { useDebounce, useTooltip } from "shared/libs";
import { Tooltip } from "./Tooltip";
import styles from "./Tooltip.module.scss";
export const TooltipManager: React.FC = () => {
    const { margin, appearingDelay, transitionDuration, maxWidth, hideTooltips } = TooltipDefaults;
    const tooltipRef = useRef<HTMLDivElement>(null);
    const {
        data: { x, y, content, position },
        calculatePosition,
    } = useTooltip();

    const updateTooltipDimensions = useDebounce(
        useCallback(
            (ref: HTMLDivElement) => {
                const { width, height } = ref.getBoundingClientRect();
                calculatePosition(width, height, margin);
            },
            [calculatePosition]
        ),
        appearingDelay
    );

    useEffect(() => {
        if (content && tooltipRef.current && x == -100) updateTooltipDimensions(tooltipRef.current);
    }, [content, x]);

    const tooltipStyle: CSSProperties = useMemo(() => {
        if (x === 0 || y === 0 || !content) return {};

        return {
            left: `${x}px`,
            top: `${y}px`,
            visibility: content ? "visible" : "hidden",
            transition: `all ${transitionDuration}ms ease`,
            maxWidth,
        };
    }, [x, y, content, transitionDuration, maxWidth]);

    const tooltipClassName: string = useMemo(() => {
        return styles[position] || "";
    }, [position]);

    if (hideTooltips || !content) return null;
    return ReactDOM.createPortal(
        <TransitionGroup component={null}>
            <CSSTransition
                key={`${y}_${x}`}
                classNames={{
                    enter: styles["tooltip-appear-enter"],
                    enterActive: styles["tooltip-appear-enter-active"],
                }}
                addEndListener={(done) => {
                    if (tooltipRef.current) tooltipRef.current.addEventListener("transitionend", done, false);
                }}
                nodeRef={tooltipRef}
            >
                <Tooltip
                    ref={tooltipRef}
                    text={content}
                    className={tooltipClassName}
                    style={tooltipStyle}
                />
            </CSSTransition>
        </TransitionGroup>,
        document.body
    );
};
