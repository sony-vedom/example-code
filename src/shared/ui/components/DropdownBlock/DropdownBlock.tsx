import { ComponentProps, CSSProperties, memo, MutableRefObject, useState, useEffect, ElementType } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { useWindowHeight, useWindowWidth } from "@react-hook/window-size";
import debounce from "debounce";
import { createPortal } from "react-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { cn, useOutsideClick } from "shared/libs";
import { HorizontalAnchorTo } from "./DropdownBlockModels";
import { calculatePositionStyle } from "./positionStyleCalculation";

type Props<T extends ElementType> = ComponentProps<T> & {
    owner: MutableRefObject<HTMLElement>;
    isOpen: boolean;
    tag?: string;
    horizontalAnchorTo?: HorizontalAnchorTo;
    setIsOpen: (isOpen: boolean) => void;
};

export const DropdownBlock = memo(function DropdownBlock<T extends ElementType = "div">({
    tag: Component = "div",
    isOpen,
    setIsOpen,
    owner,
    className,
    children,
    horizontalAnchorTo = "right",
    ...props
}: Props<T>) {
    const width = useWindowWidth();
    const height = useWindowHeight();
    const debouncedSetIsOpen = debounce(setIsOpen, 10);
    const ref = useOutsideClick<HTMLDivElement>(() => debouncedSetIsOpen?.(false));

    const [style, setStyle] = useState<CSSProperties>({});
    const updateStyle = debounce(() => {
        if (!owner.current || !ref.current) {
            return;
        }
        const s = calculatePositionStyle(owner, ref, { width, height }, horizontalAnchorTo);
        setStyle(s);
    }, 10);
    useResizeObserver(owner, updateStyle);
    useEffect(() => updateStyle(), [isOpen, width, owner.current, ref.current, height]);

    return (
        <>
            {createPortal(
                <SwitchTransition>
                    <CSSTransition
                        appear
                        key={isOpen.toString()}
                        timeout={{
                            enter: 300,
                            exit: 280,
                        }}
                        classNames={{
                            enter: "animate-dropdown-enter",
                            exit: "animate-dropdown-exit",
                        }}
                    >
                        {isOpen ? (
                            <Component
                                {...props}
                                ref={ref}
                                style={{ ...style, ...props.style }}
                                className={cn(
                                    "scrollbar-hidden absolute z-[3000] h-auto max-h-[min(20rem,100dvh)] overflow-auto  transition-all",
                                    className
                                )}
                                data-component="dropdown-block"
                            >
                                {children}
                            </Component>
                        ) : (
                            <></>
                        )}
                    </CSSTransition>
                </SwitchTransition>,
                document.getElementById("portal-dropdown")
            )}
        </>
    );
});
