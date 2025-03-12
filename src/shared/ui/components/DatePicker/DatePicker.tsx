import { ComponentProps, useRef } from "react";
import { Variant } from "./constants";
import { DatePickerProvider } from "./context";
import { DatePickerContent } from "./DatePickerContent";
import { DatePickerTrigger } from "./DatePickerTrigger";
import "./DatePicker.css";

type Props = Omit<ComponentProps<"button">, "onChange" | "value"> & {
    value?: Date | null;
    nextValue?: Date | null;
    variant?: Variant;
    maxValue?: Date;
    onChange?: (value: Date | null, nextValue?: Date | null) => void;
};

export const DatePicker = ({ value, nextValue, maxValue = null, variant = "primary", onChange, ...props }: Props) => {
    const ref = useRef<HTMLButtonElement>(null);
    return (
        <DatePickerProvider
            variant={variant}
            prevValue={value}
            nextValue={nextValue}
            maxValue={maxValue}
            onChange={onChange}
        >
            <DatePickerTrigger
                ref={ref}
                {...props}
            />
            <DatePickerContent owner={ref} />
        </DatePickerProvider>
    );
};
