import { ComponentProps, useRef, useState, ClipboardEvent, KeyboardEvent, useEffect } from "react";
import { cn } from "shared/libs";
import { NumberInput } from "./NumberInput";
import { InputVariant } from "./variants";

type Props = ComponentProps<"div"> & {
    variant?: InputVariant;
    numberCharacters?: number;
    onFill: (value: string) => void;
};

export const CodeInput = ({ className = "", numberCharacters = 6, id = "code-input", onFill, ...props }: Props) => {
    const ref = useRef<HTMLDivElement>();
    const classNames = cn(
        "flex flex-row gap-2 [&>div]:px-0 [&>div]:py-5 [&>div]:text-2xl [&>div]:font-bold [&_input]:text-center",
        className
    );
    const [values, setValues] = useState<string[]>(Array(numberCharacters).fill(""));

    const generateFieldIdByIndex = (idx: number) => `${id}-element-${idx}`;
    const focusFieldByIndex = (idx: number) => document.getElementById(generateFieldIdByIndex(idx))?.focus();

    const handleInputKeyDown = (idx: number) => (event: KeyboardEvent<HTMLInputElement>) => {
        const key = event.key;

        if (key === "Backspace" && idx !== 0) {
            if (values[idx] === "") {
                setTimeout(() => focusFieldByIndex(idx - 1));
            } else {
                values[idx] = "";
                setValues([...values]);
            }
        } else if (key === "ArrowRight") {
            focusFieldByIndex(idx + 1);
        } else if (key === "ArrowLeft") {
            focusFieldByIndex(idx - 1);
        }
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        const pastedData = event.clipboardData.getData("text");
        const pastedDigits = pastedData.match(/\d/g);

        if (pastedDigits && pastedDigits.length === numberCharacters) {
            setValues(pastedDigits);
        }
        event.preventDefault();
    };

    useEffect(() => {
        if (values.every((e) => !!e)) {
            onFill(values.join(""));
        }
    }, [values]);

    return (
        <div
            ref={ref}
            className={classNames}
            id={id}
            {...props}
        >
            {values.map((value, idx) => (
                <NumberInput
                    key={`Input number: ${idx}`}
                    id={generateFieldIdByIndex(idx)}
                    min={0}
                    max={9}
                    placeholder="-"
                    value={value}
                    onChange={(v) => {
                        values[idx] = v;
                        setValues([...values]);
                        focusFieldByIndex(idx + 1);
                    }}
                    onFocus={() => (document.getElementById(generateFieldIdByIndex(idx)) as HTMLInputElement)?.select()}
                    onKeyDown={handleInputKeyDown(idx)}
                    onPaste={handlePaste}
                />
            ))}
        </div>
    );
};
