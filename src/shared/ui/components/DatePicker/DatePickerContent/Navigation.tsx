import { useContext } from "react";
import ArrowIcon from "assets/icons/arrow-black-rounded.svg?react";
import { useTranslation } from "react-i18next";
import { appStore, cn } from "shared/libs";
import { contentNavigationVariants, DisplayedMode } from "../constants";
import { DatePickerDisplayContext, DatePickerVariantContext } from "../context";

export const Navigation = () => {
    const variant = useContext(DatePickerVariantContext);
    const classes = cn(contentNavigationVariants.get(variant) ?? contentNavigationVariants.get("primary"));
    const { t } = useTranslation();
    const locale = appStore((state) => state.locale);
    const { displayedDate, setDisplayedDate, displayedMode, setDisplayedMode, displayNext, displayPrev } =
        useContext(DatePickerDisplayContext);
    const year = displayedDate.getFullYear();
    const monthName = displayedDate.toLocaleDateString(locale, { month: "long" });
    const displayCurrentDay = () => {
        setDisplayedDate(new Date());
        setDisplayedMode(DisplayedMode.DAYS);
    };

    return displayedMode !== DisplayedMode.YEARS ? (
        <div
            className={classes}
            data-component="date-picker-navigation"
        >
            {displayedMode <= DisplayedMode.MONTHS ? (
                <button
                    className="group flex items-center gap-1 text-size-inherit text-inherit"
                    onClick={() => setDisplayedMode(displayedMode + 1)}
                >
                    <ArrowIcon className="size-2.5 -rotate-90  transition-all hover:scale-125 group-hover:scale-125 group-active:scale-90" />
                    {displayedMode === DisplayedMode.DAYS && <b className="font-semibold">{monthName}</b>} {year}
                </button>
            ) : (
                <div className="" />
            )}

            <div className="flex flex-nowrap gap-2 text-size-inherit text-inherit">
                {displayedMode === DisplayedMode.DAYS && (
                    <button
                        className="text-size-inherit text-inherit"
                        onClick={displayCurrentDay}
                    >
                        {t("Сегодня")}
                    </button>
                )}
                <button
                    onClick={displayPrev}
                    className="group p-1"
                >
                    <ArrowIcon className="size-2 transition-all hover:scale-125 group-hover:scale-125 group-active:scale-90" />
                </button>
                <button
                    className="group p-1"
                    onClick={displayNext}
                >
                    <ArrowIcon className="size-2 rotate-180 transition-all group-hover:scale-125 group-active:scale-90" />
                </button>
            </div>
        </div>
    ) : null;
};
