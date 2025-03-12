import { useContext, useMemo } from "react";
import { appStore, cn } from "shared/libs";
import { getDaysByDate } from "./getDaysByDate";
import { getWeekDayNames } from "./getWeekDayNames";
import { DatePickerDisplayContext } from "../../context";
import { useDatePickerContent } from "../useDatePickerContent";

export const Days = () => {
    const { displayedDate } = useContext(DatePickerDisplayContext);
    const locale = appStore((state) => state.locale);
    const weekDayNames = useMemo(() => getWeekDayNames(), [locale]);
    const monthDays = useMemo(() => getDaysByDate({ date: displayedDate }), [displayedDate]);
    const { isSelecting, endSelecting, setValue, isToday, generateLineClassesByDate } = useDatePickerContent();

    return (
        <ol
            className="days auto-rows-[minmax(0,0.875rem)] grid-cols-[repeat(7,1.875rem)] gap-y-1.5"
            onMouseLeave={endSelecting}
            onMouseUp={endSelecting}
        >
            {weekDayNames.map((weekDay, i) => (
                <li
                    className="capitalize"
                    key={i}
                >
                    {weekDay.shortName}
                </li>
            ))}
            {monthDays.map((d) => {
                return (
                    <li
                        className={d.type}
                        key={d.date.toUTCString()}
                        onMouseDown={() => {
                            setValue(d.date);
                        }}
                        onMouseEnter={() => isSelecting && setValue(d.date)}
                    >
                        <div className={generateLineClassesByDate(d.date)}>
                            <div className={cn("mark", isToday(d.date) && "today")}>
                                <span>{d.day}</span>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
};
