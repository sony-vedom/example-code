import { ReactNode, useCallback, useEffect, useState } from "react";
import {
    DatePickerDisplayContext,
    DatePickerOpenContext,
    DatePickerValueContext,
    DatePickerVariantContext,
} from "./DatePickerContext";
import { DisplayedMode, Variant } from "../constants";

type Props = {
    prevValue: Date;
    nextValue: Date;
    maxValue: Date | null;
    variant: Variant;
    children: ReactNode;
    onChange?: (value: Date, nextValue?: Date) => void;
};

export const DatePickerProvider = ({
    variant,
    children,
    prevValue: basePrevValue,
    nextValue: baseNextValue,
    maxValue,
    onChange,
}: Props) => {
    const [prevValue, setPrevValue] = useState<Date | null>(basePrevValue);
    const [nextValue, setNextValue] = useState<Date | null>(baseNextValue);

    const [displayedDate, setDisplayedDate] = useState<Date>(baseNextValue ?? basePrevValue ?? new Date());
    const [displayedMode, setDisplayedMode] = useState<DisplayedMode>(DisplayedMode.DAYS);
    const setDisplayedYear = useCallback(
        (year: number) => setDisplayedDate(new Date(year, displayedDate.getMonth(), displayedDate.getDate())),
        [displayedDate]
    );
    const setDisplayedMonth = useCallback(
        (month: number) => setDisplayedDate(new Date(displayedDate.getFullYear(), month, displayedDate.getDate())),
        [displayedDate]
    );

    const displayPrev = () => {
        switch (displayedMode) {
            case DisplayedMode.MONTHS:
                setDisplayedYear(displayedDate.getFullYear() - 1);
                break;
            case DisplayedMode.YEARS:
                setDisplayedYear(displayedDate.getFullYear() - 1);
                break;
            case DisplayedMode.DAYS:
            default:
                setDisplayedMonth(displayedDate.getMonth() - 1);
                break;
        }
    };
    const displayNext = () => {
        switch (displayedMode) {
            case DisplayedMode.MONTHS:
                setDisplayedYear(displayedDate.getFullYear() + 1);
                break;
            case DisplayedMode.YEARS:
                setDisplayedYear(displayedDate.getFullYear() + 1);
                break;
            case DisplayedMode.DAYS:
            default:
                setDisplayedMonth(displayedDate.getMonth() + 1);
                break;
        }
    };

    useEffect(() => {
        if (!!prevValue && !!nextValue) {
            onChange?.(prevValue, nextValue);
        }
    }, [prevValue, nextValue]);

    const [isOpen, setIsOpen] = useState(false);
    const setIsOpenWithCheckValues = useCallback(
        (value: boolean) => {
            setIsOpen(value);

            if (value === false && (!prevValue || !nextValue)) {
                onChange?.(prevValue, nextValue);
            }
        },
        [onChange, setIsOpen, prevValue, nextValue]
    );
    const toggleIsOpenWithCheckValues = () => setIsOpenWithCheckValues(!isOpen);

    return (
        <DatePickerVariantContext.Provider value={variant}>
            <DatePickerOpenContext.Provider
                value={{ isOpen, setIsOpen: setIsOpenWithCheckValues, toggleIsOpen: toggleIsOpenWithCheckValues }}
            >
                <DatePickerValueContext.Provider
                    value={{
                        prevValue,
                        setPrevValue,
                        nextValue,
                        setNextValue,
                        maxValue,
                    }}
                >
                    <DatePickerDisplayContext.Provider
                        value={{
                            currentDate: new Date(),
                            displayedMode,
                            setDisplayedMode,
                            displayedDate,
                            setDisplayedDate,
                            setDisplayedYear,
                            setDisplayedMonth,
                            displayNext,
                            displayPrev,
                        }}
                    >
                        {children}
                    </DatePickerDisplayContext.Provider>
                </DatePickerValueContext.Provider>
            </DatePickerOpenContext.Provider>
        </DatePickerVariantContext.Provider>
    );
};
