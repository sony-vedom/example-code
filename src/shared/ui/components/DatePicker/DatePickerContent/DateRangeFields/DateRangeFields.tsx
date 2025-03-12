import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { DateField } from "./DateField";
import { DatePickerValueContext } from "../../context";

export const DateRangeFields = () => {
    const { t } = useTranslation();
    const { prevValue, setPrevValue, nextValue, setNextValue, maxValue } = useContext(DatePickerValueContext);
    const firstFieldRef = useRef<HTMLInputElement>(null);
    const secondFieldRef = useRef<HTMLInputElement>(null);

    const setPrev = (d: Date | null) => {
        if (!!nextValue && !!d && d.getTime() > nextValue.getTime()) {
            setPrevValue(nextValue);
            setNextValue(d);
        } else {
            setPrevValue(d);
        }
    };
    const setNext = (d: Date | null) => {
        if (!!prevValue && !!d && d.getTime() < prevValue.getTime()) {
            setNextValue(prevValue);
            setPrevValue(d);
        } else {
            setNextValue(d);
        }
    };

    return (
        <form
            className="grid grid-cols-[repeat(2,6rem)] gap-2.5"
            data-component="date-picker-date-range-fields"
        >
            <DateField
                ref={firstFieldRef}
                type="text"
                placeholder={t("Дата начала")}
                value={prevValue}
                max={maxValue}
                onChange={setPrev}
                onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        e.preventDefault();
                        secondFieldRef.current?.focus();
                    }
                    if (e.code === "Escape") {
                        e.preventDefault();
                        firstFieldRef.current?.blur();
                    }
                }}
            />
            <DateField
                ref={secondFieldRef}
                type="text"
                placeholder={t("Дата окончания")}
                value={nextValue}
                max={maxValue}
                onChange={setNext}
                onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        e.preventDefault();
                        firstFieldRef.current?.focus();
                    }
                    if (e.code === "Escape") {
                        e.preventDefault();
                        firstFieldRef.current?.blur();
                    }
                }}
            />
        </form>
    );
};
