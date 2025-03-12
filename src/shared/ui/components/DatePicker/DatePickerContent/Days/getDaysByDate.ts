import { FirstWeekDayIndex, WEEK_DAY_COUNT } from "../../constants";

type Props = { date: Date; firstWeekDayIndex?: FirstWeekDayIndex };

const getWeekDay = ({ date, firstWeekDayIndex: firstWeekDayIndex = FirstWeekDayIndex.MONDAY }: Props) => {
    const idx = date.getDay() - firstWeekDayIndex;
    return idx >= 0 ? idx : WEEK_DAY_COUNT + idx;
};

export const getDaysByDate = ({ date, firstWeekDayIndex = FirstWeekDayIndex.MONDAY }: Props) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    // previous
    const previousDate = new Date(currentYear, currentMonth, 0);
    const previousMontWeekhDay = getWeekDay({ date: previousDate, firstWeekDayIndex });
    const prevDayCount = previousMontWeekhDay === 6 ? 0 : previousMontWeekhDay + 1;
    const prevMounthDayCount = previousDate.getDate() - prevDayCount;
    const prevMonthDays = Array.from({ length: prevDayCount }, (_, i) => {
        const dayNumber = prevMounthDayCount + i + 1;
        const d = new Date(currentYear, currentMonth - 1, dayNumber);
        return {
            day: dayNumber,
            type: "prev",
            date: d,
        };
    });
    // current
    const length = new Date(currentYear, currentMonth + 1, 0).getDate();
    const currentMonthDays = Array.from({ length }, (_, i) => {
        const dayNumber = i + 1;
        const d = new Date(currentYear, currentMonth, dayNumber);
        return {
            day: dayNumber,
            type: "cur",
            date: d,
        };
    });
    // next
    const nextDate = new Date(currentYear, currentMonth + 1, 1);
    const nextMontWeekhDay = getWeekDay({ date: nextDate, firstWeekDayIndex });
    const nextDayCount = nextMontWeekhDay === 0 ? 0 : WEEK_DAY_COUNT - nextMontWeekhDay;
    const nextMonthDays = Array.from({ length: nextDayCount }, (_, i) => {
        const dayNumber = i + 1;
        const d = new Date(currentYear, currentMonth + 1, dayNumber);
        return {
            day: dayNumber,
            type: "next",
            date: d,
        };
    });

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};
