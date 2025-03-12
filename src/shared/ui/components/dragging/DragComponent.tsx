import { ComponentPropsWithoutRef, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { cn, limitValue, usePageScrollingControl } from "shared/libs";
import { Point } from "shared/models";
import styles from "./DragComponent.module.scss";
import { Snaps } from "./Snaps";

type Position = { x: number; y: number };
type Props = Omit<ComponentPropsWithoutRef<"div">, "onDragStart" | "onDrag" | "onDragEnd"> & {
    children: ReactNode;
    position: { x: number; y: number };
    disabled?: boolean;
    snapThreshold?: number;
    onDrag?: (pos: Position) => void;
    onDragStart?: (pos: Position) => void;
    onDragEnd?: (pos: Position) => void;
    freezedAxises?: { x: boolean; y: boolean };
    offset?: { x: number; y: number };
    limitX?: { min: number; max: number };
    limitY?: { min: number; max: number };
};

const correctPosBySnap = (pos: Position, center: Position, threshold: number) => {
    if (!threshold) return pos;
    const isSnapY = Math.abs(pos.y - center.y) < threshold;
    if (isSnapY) pos.y = center.y;
    const isSnapX = Math.abs(pos.x - center.x) < threshold;

    if (isSnapX) pos.x = 50;
    return pos;
};

const center = { x: 50, y: 50 }; // ?

export const DragComponent = ({
    children,
    position,
    className,
    style,
    disabled = false,
    onDrag,
    onDragStart,
    onDragEnd,
    snapThreshold = 0,
    freezedAxises = { x: false, y: false },
    offset = { x: 0, y: 0 },
    limitX = { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER },
    limitY = { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER },
    ...props
}: Props) => {
    const { enablePageScrolling, disablePageScrolling } = usePageScrollingControl();
    const target = useRef<HTMLDivElement>(null);
    const parent = useMemo(
        () => (!!target ? target.current?.parentElement : null),
        [target.current, target.current?.parentElement]
    );
    const parentRect = useMemo(() => (parent ? parent.getBoundingClientRect() : { width: 0, height: 0 }), [parent]);
    const isMoving = useRef(false);

    const startMovingPos = useRef<Position>({ x: 0, y: 0 });
    const startMovingMousePos = useRef<Position>({ x: 0, y: 0 });
    const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

    useEffect(() => {
        const x = limitValue(position.x + offset.x, limitX.min, limitX.max);
        const y = limitValue(position.y + offset.y, limitY.min, limitY.max);
        setPos({ x, y });
    }, [position]);

    const move = (point: Point) => {
        if (!isMoving.current) return;

        const offsetX = -((startMovingMousePos.current.x - point.x) / parentRect.width) * 100;
        const offsetY = -((startMovingMousePos.current.y - point.y) / parentRect.height) * 100;

        const newPosition = { x: startMovingPos.current.x + offsetX, y: startMovingPos.current.y + offsetY };
        const snappedPosition = correctPosBySnap(newPosition, center, snapThreshold);

        const x = freezedAxises.x ? pos.x : limitValue(snappedPosition.x - offset.x, limitX.min, limitX.max);
        const y = freezedAxises.y ? pos.y : limitValue(snappedPosition.y - offset.y, limitY.min, limitY.max);

        setPos({ x, y });
        onDrag?.({ x, y });
    };

    const moveStop = () => {
        if (!isMoving) return;

        isMoving.current = false;
        onDragEnd?.(pos);

        parent.removeEventListener("mouseleave", moveStop);
        parent.removeEventListener("mouseup", moveStop);
        parent.removeEventListener("mousemove", move);
        enablePageScrolling();
    };

    const moveStart = (startPoint: Point) => {
        if (isMoving.current) return;

        startMovingPos.current = { x: pos.x, y: pos.y };
        startMovingMousePos.current = startPoint;
        isMoving.current = true;
        onDragStart?.(pos);

        parent.addEventListener("mouseleave", moveStop);
        parent.addEventListener("mouseup", moveStop);
        parent.addEventListener("mousemove", move);
        disablePageScrolling();
    };

    const classes = useMemo(
        () => cn(styles["drag-component"], className, disabled && styles.disabled, isMoving.current && styles.active),
        [className, disabled, isMoving.current]
    );

    return (
        <>
            {!!snapThreshold && isMoving.current && (
                <Snaps
                    showVertical={pos.x === center.x}
                    showHorizontal={pos.y === center.y}
                />
            )}
            <div
                ref={target}
                style={{
                    ...style,
                    top: `${pos.y}%`,
                    left: `${pos.x}%`,
                }}
                className={classes}
                onTouchStart={(e) => {
                    e.stopPropagation();
                    const point = {
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY,
                    };
                    moveStart(point);
                }}
                onTouchEnd={(e) => {
                    if (!isMoving.current) return;
                    e.stopPropagation();
                    moveStop();
                }}
                onTouchMove={(e) => {
                    if (!isMoving.current) return;
                    const point = {
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY,
                    };
                    move(point);
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const point = {
                        x: e.clientX,
                        y: e.clientY,
                    };
                    moveStart(point);
                }}
                onMouseMove={(e) => {
                    if (!isMoving.current) return;
                    e.preventDefault();
                    e.stopPropagation();
                    const point = {
                        x: e.clientX,
                        y: e.clientY,
                    };
                    move(point);
                }}
                onMouseUp={(e) => {
                    if (!isMoving.current) return;
                    e.preventDefault();
                    e.stopPropagation();
                    moveStop();
                }}
                onMouseLeave={(e) => {
                    if (!isMoving.current) return;
                    e.preventDefault();
                    e.stopPropagation();
                    moveStop();
                }}
                {...props}
            >
                {children}
            </div>
        </>
    );
};
