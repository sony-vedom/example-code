import { useContext, useMemo } from "react";
import debounce from "debounce";
import { appStore, cn } from "shared/libs";
import { getMonthsByDate } from "./getMonthByDate";
import { DisplayedMode } from "../../constants";
import { DatePickerDisplayContext } from "../../context";
import { useDatePickerContent } from "../useDatePickerContent";

export const Months = () => {
    const locale = appStore((state) => state.locale);
    const { setDisplayedMode, setDisplayedMonth, displayedDate } = useContext(DatePickerDisplayContext);
    const monthNames = useMemo(() => getMonthsByDate({ date: displayedDate, locale }), [locale]);

    const { isSelecting, endSelecting, setValue, isToday, generateLineClassesByDate } = useDatePickerContent({
        comparitionType: "year-month",
    });

    const setDisplayedModeDebounced = debounce(setDisplayedMode, 10);

    return (
        <ol
            className="months"
            onMouseLeave={() => {
                if (isSelecting) {
                    setDisplayedModeDebounced(DisplayedMode.DAYS);
                    endSelecting();
                }
            }}
            onMouseUp={() => {
                if (isSelecting) {
                    setDisplayedModeDebounced(DisplayedMode.DAYS);
                    endSelecting();
                }
            }}
        >
            {monthNames.map((m, index) => (
                <li
                    key={index}
                    onMouseDown={() => {
                        setDisplayedMonth(m.index);
                        setValue(m.date);
                    }}
                    onMouseEnter={() => {
                        if (isSelecting) {
                            setDisplayedMonth(m.index);
                            setValue(m.date);
                        }
                    }}
                >
                    <div className={generateLineClassesByDate(m.date)}>
                        <div className={cn("mark", isToday(m.date) && "today")}>
                            <span>{m.name}</span>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
};
