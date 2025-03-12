import { ComponentPropsWithRef } from "react";
import { useToastStore } from "shared/libs";

type Props = ComponentPropsWithRef<"div"> & {
    onDrop: (e: React.DragEvent) => void;
    format?: string;
};

export const DropWrapper = ({ children, onDrop, format, className = "", onClick = () => {}, ...props }: Props) => {
    const showFailureToast = useToastStore((state) => state.showFailure);
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const tryCheckType = (files: FileList) => {
        if (!format) return;

        const fls = Array.from(files);
        for (const f of fls) {
            const ext = f?.name?.split(".").pop()?.toLowerCase() || "";
            if (!~format.indexOf(f.type) && !~format.indexOf(ext)) {
                throw new Error();
            }
        }
    };

    const onDropHandler = (evt: React.DragEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        try {
            tryCheckType(evt.dataTransfer.files);
            onDrop(evt);
        } catch {
            showFailureToast("Неверный тип файла");
        }
    };
    // todo: add tagName
    return (
        <div
            className={className}
            onClick={onClick}
            onDrop={onDropHandler}
            onDragOver={onDragOver}
            onDragEnter={onDragOver}
            onDragLeave={onDragOver}
            {...props}
        >
            {children}
        </div>
    );
};
