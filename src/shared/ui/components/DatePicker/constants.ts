export const MONTH_COUNT = 12;
export const WEEK_DAY_COUNT = 7;
export const MIN_YEAR = 2016;

export const nullParams = {
    date: new Date(),
    locale: "default",
};

export enum FirstWeekDayIndex {
    SUNDAY = 0,
    MONDAY = 1,
}

export enum DisplayedMode {
    DAYS = 0,
    MONTHS = 1,
    YEARS = 2,
}

const d = new Date();
export const TODAY = Object.freeze(new Date(d.getFullYear(), d.getMonth(), d.getDate()));

export type Variant = "primary" | "clear" | "statistics";

export const contentVariants = Object.freeze(
    new Map([
        ["clear", ""],
        ["primary", ""],
        ["statistics", "statistics-datepicker-content"],
    ])
);
export const contentNavigationVariants = Object.freeze(
    new Map([
        ["clear", ""],
        ["primary", ""],
        ["statistics", "statistics-datepicker-content-navigation"],
    ])
);

export const triggerVariants = Object.freeze(
    new Map([
        ["clear", ""],
        ["primary", ""],
        ["statistics", "statistics-datepicker-trigger"],
    ])
);
