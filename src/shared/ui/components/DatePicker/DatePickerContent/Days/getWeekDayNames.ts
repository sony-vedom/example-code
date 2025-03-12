export const getWeekDayNames = (locale: string = "default") => {
    return Array.from({ length: 7 }, (_, i) => new Date(1970, 0, 5 + i)).map((d) => ({
        name: d.toLocaleString(locale, { weekday: "long" }),
        shortName: d.toLocaleString(locale, { weekday: "short" }),
    }));
};
