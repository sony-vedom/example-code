import { CSSProperties, MutableRefObject } from "react";
import { HorizontalAnchorTo } from "./DropdownBlockModels";

const calculateBottomStyle = (ownerRect: DOMRect, selfRect: DOMRect, windowHeight: number): CSSProperties => {
    const top = ownerRect.bottom + document.documentElement.scrollTop;
    const height = windowHeight - top > selfRect.height ? "initial" : windowHeight - top;
    return {
        top,
        height,
    };
};

const calculateTopStyle = (ownerRect: DOMRect, selfRect: DOMRect, windowHeight: number): CSSProperties => {
    const bottom = windowHeight - ownerRect.top - document.documentElement.scrollTop;
    const height = -(bottom - windowHeight) > selfRect.height ? "initial" : -(bottom - windowHeight);
    return {
        bottom,
        height,
    };
};

const calculateHorizontalStyle = (
    ownerRect: DOMRect,
    selfRect: DOMRect,
    windowWidth: number,
    anchor: HorizontalAnchorTo
) => {
    switch (anchor) {
        case "left":
            const overflow = windowWidth - (ownerRect.left + document.documentElement.scrollLeft + selfRect.width);
            return {
                left: ownerRect.left + document.documentElement.scrollLeft + (overflow < 0 && overflow),
            };
        case "left-right":
            return {
                left: ownerRect.left + document.documentElement.scrollLeft,
                width: ownerRect.width,
            };
        case "right":
        default:
            return {
                right: windowWidth - ownerRect.right + document.documentElement.scrollLeft,
            };
    }
};

export const calculatePositionStyle = (
    owner: MutableRefObject<HTMLElement>,
    self: MutableRefObject<HTMLElement>,
    windowSize: { width: number; height: number },
    horizontalAnchorTo: HorizontalAnchorTo
): CSSProperties => {
    const ownerRect = owner.current.getBoundingClientRect();
    const selfRect = self.current.getBoundingClientRect();
    const verticalStyle =
        windowSize.height / 1.5 > ownerRect.top + ownerRect.height / 2
            ? calculateBottomStyle(ownerRect, selfRect, windowSize.height)
            : calculateTopStyle(ownerRect, selfRect, windowSize.height);
    const horizontalSize = calculateHorizontalStyle(ownerRect, selfRect, windowSize.width, horizontalAnchorTo);

    return {
        ...verticalStyle,
        ...horizontalSize,
    };
};
