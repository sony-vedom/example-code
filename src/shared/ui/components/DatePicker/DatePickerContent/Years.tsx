import { useContext, useMemo } from "react";
import debounce from "debounce";
import { cn } from "shared/libs";
import { DisplayedMode, MIN_YEAR } from "../constants";
import { DatePickerDisplayContext } from "../context";
import { useDatePickerContent } from "./useDatePickerContent";

export const Years = () => {
    const { setDisplayedMode, setDisplayedYear, currentDate } = useContext(DatePickerDisplayContext);
    const years = useMemo(() => {
        const length = currentDate.getFullYear() - MIN_YEAR + 1;
        return Array.from({ length }, (_, i) => ({ year: MIN_YEAR + i, date: new Date(MIN_YEAR + i, 0) }));
    }, []);
    const { isSelecting, endSelecting, setValue, isToday, generateLineClassesByDate } = useDatePickerContent({
        comparitionType: "year",
    });

    const setDisplayedModeDebounced = debounce(setDisplayedMode, 10);

    return (
        <ol
            className="years"
            onMouseLeave={() => {
                if (isSelecting) {
                    setDisplayedModeDebounced(DisplayedMode.MONTHS);
                    endSelecting();
                }
            }}
            onMouseUp={() => {
                if (isSelecting) {
                    setDisplayedModeDebounced(DisplayedMode.MONTHS);
                    endSelecting();
                }
            }}
        >
            {years.map((y, index) => (
                <li
                    key={index}
                    onMouseDown={() => {
                        setDisplayedYear(y.year);
                        setValue(y.date);
                    }}
                    onMouseEnter={() => {
                        if (isSelecting) {
                            setDisplayedYear(y.year);
                            setValue(y.date);
                        }
                    }}
                >
                    <div className={generateLineClassesByDate(y.date)}>
                        <div className={cn("mark", isToday(y.date) && "today")}>
                            <span>{y.year}</span>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
};
