import React, { useEffect, useRef } from "react";
import { FileServerStoreType } from "shared/libs";
import { FileServerItemType } from "shared/models";
import { StoreApi, UseBoundStore } from "zustand";

const useAutoScroll = () => {
    const scrollFrame = useRef<number | null>(null);
    const currentDirection = useRef<"up" | "down" | null>(null);

    const stopScrolling = () => {
        if (scrollFrame.current !== null) {
            cancelAnimationFrame(scrollFrame.current);
            scrollFrame.current = null;
        }
        currentDirection.current = null;
    };

    const startScrolling = (direction: "up" | "down") => {
        if (currentDirection.current === direction) {
            return; // Если уже скроллим в этом направлении, ничего не делаем
        }

        stopScrolling(); // Остановить текущий скролл, если он есть
        currentDirection.current = direction;

        const scrollStep = () => {
            const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

            if (direction === "up" && window.scrollY > 0) {
                // Скроллить вверх
                window.scrollBy(0, -10); // Увеличьте значение (-10) для заметного эффекта
                scrollFrame.current = requestAnimationFrame(scrollStep);
            } else if (direction === "down" && window.scrollY < maxScrollTop) {
                // Скроллить вниз
                window.scrollBy(0, 10); // Увеличьте значение (10) для заметного эффекта
                scrollFrame.current = requestAnimationFrame(scrollStep);
            } else {
                stopScrolling(); // Остановить скроллинг, если достигнут край
            }
        };

        scrollFrame.current = requestAnimationFrame(scrollStep);
    };

    useEffect(() => {
        return () => stopScrolling(); // Остановить скроллинг при размонтировании
    }, []);

    return { startScrolling, stopScrolling };
};

export const useDragNDropFiles = (
    content: FileServerItemType,
    useFileServerStore: UseBoundStore<StoreApi<FileServerStoreType>>
) => {
    const { moveFile } = useFileServerStore((state) => ({
        moveFile: state.moveFile,
    }));
    const { startScrolling, stopScrolling } = useAutoScroll();

    const handleDragStart = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.dataTransfer.setData("application/json", JSON.stringify(content));
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const { clientY } = event;
        const scrollThreshold = 50; // Зона чувствительности к краям окна
        const targetElement = event.currentTarget.getBoundingClientRect(); // Координаты текущего элемента

        if (clientY < targetElement.top) {
            startScrolling("up");
        } else if (clientY > window.innerHeight - scrollThreshold) {
            startScrolling("down");
        } else {
            stopScrolling();
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLTableRowElement>) => {
        const target = event.currentTarget as HTMLElement;
        event.preventDefault();
        stopScrolling();
        const draggedContent = JSON.parse(event.dataTransfer.getData("application/json"));
        if (Number(target.dataset.directory)) {
            moveFile(draggedContent.hash, target.id, draggedContent.name);
        }
    };

    const handleDraggingEnterEvent = (ev: React.DragEvent<HTMLDivElement>) => {
        const target = ev.target as HTMLElement;
        if (!target || target.id === ev.dataTransfer!.getData("text/plain")) {
            return;
        }
        stopScrolling();
    };

    return {
        handleDragStart,
        handleDrop,
        handleDragOver,
        handleDraggingEnterEvent,
    };
};
