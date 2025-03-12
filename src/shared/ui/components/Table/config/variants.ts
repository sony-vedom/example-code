import { cn } from "shared/libs/hooks/cn";

export type TableVariant = "primary" | "clear";

export const tableVariants = Object.freeze(
    new Map([
        ["clear", ""],
        ["primary", cn("gap-y-0.5 [&_tfoot]:px-4 [&_tfoot]:pt-5")],
    ])
);
export const tableHeaderVariants = Object.freeze(
    new Map([
        ["clear", ""],
        ["primary", cn("rounded bg-[#eff1f8] text-sm text-[#8798ab]")],
    ])
);
export const tableHeadVariants = Object.freeze(
    new Map([
        ["clear", ""],
        [
            "primary",
            cn(
                "flex min-h-12 items-center text-balance bg-[#eff1f8] p-1 text-sm text-[#8798ab] first:rounded-l-lg first:pl-4 last:rounded-r-lg last:pr-4 dark:bg-[#1f2425] lg:text-nowrap"
            ),
        ],
    ])
);
export const tableCellVariants = Object.freeze(
    new Map([
        ["clear", ""],
        [
            "primary",
            cn(
                "font-moserrat flex min-h-12 min-h-16 items-center gap-1 text-balance p-1 text-sm text-xs text-[#181b2f] first:pl-4 last:pr-4 dark:text-[#eff1f8]"
            ),
        ],
    ])
);
