import { MONTH_COUNT, nullParams } from "../../constants";

type Params = {
    date?: Date;
    locale?: string;
};

export const getMonthsByDate = ({ locale = "default", date = new Date() }: Params = nullParams) => {
    const names: {
        index: number;
        nameShort: string;
        name: string;
        date?: Date;
    }[] = Array.from({ length: MONTH_COUNT }, (_, i) => {
        const d = new Date(date.getFullYear(), i);
        return {
            index: d.getMonth(),
            name: d.toLocaleDateString(locale, { month: "long" }),
            nameShort: d.toLocaleDateString(locale, { month: "short" }),
            date: d,
        };
    });

    return names;
};
