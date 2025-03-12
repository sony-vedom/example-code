import { useContext, useMemo, useState } from "react";
import { cn } from "shared/libs";
import { TODAY } from "../constants";
import { DatePickerValueContext } from "../context";

const covertDateForCompare = (date: Date, type: "time" | "year" | "year-month") => {
    switch (type) {
        case "year":
            return date?.getFullYear();
        case "year-month":
            return date ? new Date(date.getFullYear(), date.getMonth()).getTime() : null;
        case "time":
        default:
            return date?.getTime();
    }
};

type Props = {
    comparitionType?: "time" | "year" | "year-month";
};

const NULL_PROPS: Props = {
    comparitionType: "time",
};

export const useDatePickerContent = ({ comparitionType: compareType = "time" }: Props = NULL_PROPS) => {
    const { prevValue, setPrevValue, nextValue, setNextValue, maxValue } = useContext(DatePickerValueContext);

    // selection
    const [selectingType, setSelectingType] = useState<"prev" | "next" | null>(null);
    const isSelecting = useMemo(() => !!selectingType, [selectingType]);
    const endSelecting = () => {
        if (!!maxValue) {
            const isPrevValueMoreMaxValue =
                covertDateForCompare(prevValue, compareType) > covertDateForCompare(maxValue, compareType);
            if (isPrevValueMoreMaxValue) {
                // ! хак для обновления выбранного диапазона
                setPrevValue(null);
                setTimeout(() => setPrevValue(maxValue), 10);
            }
            const isNextValueMoreMaxValue =
                covertDateForCompare(nextValue, compareType) > covertDateForCompare(maxValue, compareType);
            if (isNextValueMoreMaxValue) {
                // ! хак для обновления выбранного диапазона
                setNextValue(null);
                setTimeout(() => setNextValue(maxValue), 10);
            }
        }
        setSelectingType(null);
    };

    const setValue = (d: Date) => {
        if (selectingType === "prev") {
            if (!!nextValue && d.getTime() > nextValue.getTime()) {
                setSelectingType("next");
                setPrevValue(nextValue);
                setNextValue(d);
            } else {
                setPrevValue(d);
            }
        } else if (selectingType === "next") {
            if (!!prevValue && d.getTime() < prevValue.getTime()) {
                setSelectingType("prev");
                setNextValue(prevValue);
                setPrevValue(d);
            } else {
                setNextValue(d);
            }
        } else if (!prevValue) {
            setSelectingType("prev");
            setPrevValue(d);
        } else if (!nextValue) {
            if (prevValue.getTime() > d.getTime()) {
                setSelectingType("prev");
                setNextValue(prevValue);
                setPrevValue(d);
            } else {
                setNextValue(d);
                setSelectingType("next");
            }
        } else {
            const rangeCenter = prevValue.getTime() + (nextValue.getTime() - prevValue.getTime()) / 2;
            const dateCenter = new Date(rangeCenter);
            if (d.getTime() > dateCenter.getTime()) {
                setSelectingType("next");
                setNextValue(d);
            } else {
                setSelectingType("prev");
                setPrevValue(d);
            }
        }
    };

    // comparision
    const isToday = (date: Date) =>
        covertDateForCompare(date, compareType) === covertDateForCompare(TODAY, compareType);
    const isPrevDate = (d: Date) => {
        return !!prevValue && covertDateForCompare(prevValue, compareType) === covertDateForCompare(d, compareType);
    };
    const isNextDate = (d: Date) => {
        return !!nextValue && covertDateForCompare(nextValue, compareType) === covertDateForCompare(d, compareType);
    };
    const isInRange = (d: Date) => {
        if (!prevValue || !nextValue) {
            return false;
        }
        const isMorePrevDate = covertDateForCompare(prevValue, compareType) <= covertDateForCompare(d, compareType);
        const isLessNextDate = covertDateForCompare(nextValue, compareType) >= covertDateForCompare(d, compareType);
        return isMorePrevDate && isLessNextDate;
    };

    const isOutPermittedRange = (d: Date) => {
        if (!maxValue || !isInRange(d)) {
            return false;
        }

        const isMoreMaxValue = covertDateForCompare(d, compareType) > covertDateForCompare(maxValue, compareType);
        return isMoreMaxValue;
    };

    const generateLineClassesByDate = (date: Date) =>
        cn(
            "line",
            isInRange(date) && "in-range",
            isOutPermittedRange(date) && "out-permitted-range",
            isNextDate(date) && "selected-next",
            isPrevDate(date) && "selected-prev"
        );

    return {
        isSelecting,
        setValue,
        endSelecting,
        isToday,
        generateLineClassesByDate,
    };
};
