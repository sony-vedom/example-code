import React, { useEffect, useRef, useState } from "react";
import styles from "./ColorInput.module.scss";

type ColorPickerProps = {
    value?: string;
    children: React.ReactNode;
    pickedColor: (color: string) => void;
    disabled?: boolean;
};

export const ColorInput = ({ children, value, ...props }: ColorPickerProps) => {
    const [pickerOpen, setPickerOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setPickerOpen(false);
            }
        };

        if (pickerOpen) {
            document.addEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [pickerOpen]);

    const handlePickerClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (props.disabled) return;

        event.stopPropagation();
        setPickerOpen(!pickerOpen);
        if (!pickerOpen) {
            inputRef.current?.click();
        }
    };

    const chooseColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        props.pickedColor(color);
        setPickerOpen(false);
    };

    return (
        <div
            className={styles.picker}
            onClick={handlePickerClick}
        >
            {children}
            <input
                type="color"
                ref={inputRef}
                value={value}
                onChange={chooseColor}
                disabled={props.disabled}
            />
        </div>
    );
};
