import { cn } from "shared/libs/hooks/cn";

export type Variant = "primary" | "clear" | "bigger";

export const contentVariants = Object.freeze(
    new Map([
        ["clear", ""],
        [
            "bigger",
            cn(
                "absolute z-[3000] h-auto max-h-[28em] overflow-auto rounded-xl bg-white py-3 shadow-[0_33px_138px_#0000000d,0_15px_64px_#0000000a,0_9px_36px_#0000000a,0_5px_23px_#00000008,0_4px_14px_#00000008,0_2px_8px_#00000005,0_1px_4px_#00000003] transition-all dark:bg-[#232627]"
            ),
        ],
        [
            "primary",
            cn(
                "absolute z-[3000] h-auto max-h-[28em] overflow-auto rounded-lg bg-white py-2 shadow-[0_33px_138px_#0000000d,0_15px_64px_#0000000a,0_9px_36px_#0000000a,0_5px_23px_#00000008,0_4px_14px_#00000008,0_2px_8px_#00000005,0_1px_4px_#00000003] transition-all  dark:bg-[#232627]"
            ),
        ],
    ])
);

export const itemVariants = Object.freeze(
    new Map([
        ["clear", ""],
        [
            "bigger",
            cn(
                "flex w-full cursor-pointer flex-row items-center justify-start gap-5 px-4 py-5 text-sm font-semibold text-[#181b2f] transition-all hover:bg-slate-200 dark:text-[#eff1f8] dark:hover:bg-[#2b2f30]"
            ),
        ],
        [
            "primary",
            cn(
                "flex w-full cursor-pointer flex-row items-center justify-start gap-4 px-3.5 py-4 text-xs font-semibold text-[#181b2f] transition-all hover:bg-slate-200 dark:text-[#eff1f8] dark:hover:bg-[#2b2f30]"
            ),
        ],
    ])
);
