import { useMemo } from "react";
import CloseIcon from "assets/icons/close-small-black.svg?react";
import { useTranslation } from "react-i18next";
import { useToastStore } from "shared/libs";
import { ToastType } from "shared/models";
import { icons, titles, variants } from "./config";

type Props = {
    id: string;
    children: React.ReactNode;
    type: ToastType;
    isNeedTranslation?: boolean;
};

export const Toast = ({ id, type, children, isNeedTranslation }: Props) => {
    const { t } = useTranslation();
    const tryHideToastById = useToastStore((state) => state.tryHideById);
    const classes = useMemo(() => variants.get(type), [type]);
    const Icon = useMemo(() => icons.get(type), [type]);
    const title = useMemo(() => t(titles.get(type)), [type]);

    return (
        <div>
            <div className="pb-2.5">
                <div className={classes}>
                    <div className="grid w-full grid-cols-[auto_1fr] items-center gap-x-2.5 p-4 grid-areas-['icon_title'_'icon_content']">
                        <Icon className="size-8 grid-area/icon" />
                        <b className="font-bold text-primary-text grid-area/title">{title}</b>
                        <div className="text-xs font-semibold text-secondary-text grid-area/content">
                            {isNeedTranslation && typeof children === "string" ? t(children) : children}
                        </div>
                    </div>
                    <hr className="h-0.5 animate-toast border-0 bg-primary-text grid-area/line" />
                    <button
                        className="group absolute right-2 top-2"
                        onClick={() => tryHideToastById(id)}
                    >
                        <CloseIcon className="size-3 transition-all group-hover:scale-110 [&_path]:fill-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};
