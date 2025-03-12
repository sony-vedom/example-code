import { createContext } from "react";
import { DisplayedMode, Variant } from "../constants";

type OpenProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    toggleIsOpen: () => void;
};

export const DatePickerOpenContext = createContext<OpenProps>({
    isOpen: false,
    setIsOpen: () => {},
    toggleIsOpen: () => {},
});
DatePickerOpenContext.displayName = "DatePickerOpenContext";

type ValueProps = {
    prevValue: Date | null;
    setPrevValue: React.Dispatch<React.SetStateAction<Date | null>>;
    nextValue: Date | null;
    setNextValue: React.Dispatch<React.SetStateAction<Date | null>>;
    maxValue: Date | null;
};

export const DatePickerValueContext = createContext<ValueProps>({
    prevValue: null,
    setPrevValue: () => {},
    nextValue: null,
    setNextValue: () => {},
    maxValue: null,
});
DatePickerValueContext.displayName = "DatePickerValueContext";

export const DatePickerVariantContext = createContext<Variant>("primary");
DatePickerVariantContext.displayName = "DatePickerVariantContext";

type DisplayProps = {
    currentDate: Date;
    displayedMode: DisplayedMode;
    setDisplayedMode: React.Dispatch<React.SetStateAction<DisplayedMode>>;
    displayedDate: Date;
    setDisplayedDate: React.Dispatch<React.SetStateAction<Date>>;
    setDisplayedYear: (y: number) => void;
    setDisplayedMonth: (m: number) => void;
    displayNext: () => void;
    displayPrev: () => void;
};

export const DatePickerDisplayContext = createContext<DisplayProps>({
    currentDate: new Date(),
    displayedMode: DisplayedMode.DAYS,
    setDisplayedMode: () => {},
    displayedDate: null,
    setDisplayedDate: () => {},
    setDisplayedYear: () => {},
    displayNext: () => {},
    displayPrev: () => {},
    setDisplayedMonth: () => {},
});
DatePickerDisplayContext.displayName = "DatePickerDisplayContext";
