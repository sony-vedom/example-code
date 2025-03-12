import { FC } from "react";
import ToastFailure from "assets/icons/toast_failure.svg?react";
import ToastSuccess from "assets/icons/toast_success.svg?react";
import { ToastType } from "shared/models";
import { cn } from "../../../libs/hooks/cn";

export const icons = new Map<ToastType, FC<React.SVGProps<SVGSVGElement>>>([
    [ToastType.SUCCESS, ToastSuccess],
    [ToastType.INFO, ToastSuccess],
    [ToastType.WARNING, ToastSuccess],
    [ToastType.FAILURE, ToastFailure],
]);

export const titles = new Map<ToastType, string>([
    [ToastType.SUCCESS, "Действие выполнено"],
    [ToastType.INFO, "Информация"],
    [ToastType.WARNING, "Предупреждение"],
    [ToastType.FAILURE, "Ошибка"],
]);

const commonCss = cn(
    "relative w-72 overflow-hidden rounded-xl bg-secondary-bg shadow-[0_14px_40px_#0000001e,0_2px_10px_#0000000f]"
);

export const variants = Object.freeze(
    new Map<ToastType, string>([
        [ToastType.SUCCESS, cn(commonCss, "[&_hr]:bg-success")],
        [ToastType.INFO, cn(commonCss, "info")],
        [ToastType.WARNING, cn(commonCss, "warning")],
        [ToastType.FAILURE, cn(commonCss, "[&_hr]:bg-error")],
    ])
);
