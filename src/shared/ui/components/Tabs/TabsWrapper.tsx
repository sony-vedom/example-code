import { ComponentPropsWithRef, forwardRef, memo, ReactNode, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { TabsProvider } from "./context";
import { Tabs } from "./Tabs";

const variants = new Map([
    [
        "primary",
        "m-0 p-0.5 flex flex-nowrap gap-0 text-sm font-bold tracking-tight border border-solid border-[#e6e9f1] bg-[#eff1f8]text-slate-900  rounded-2xl dark:text-slate-400 dark:bg-[#2b2f30] dark:border-zinc-800 dark:text-neutral-500 [&_li]:px-3 [&_li]:py-2 [&_li]:bg-transparent [&_li:hover]:bg-slate-200 [&_li]:cursor-pointer [&_li]:flex [&_li]:items-center [&_li]:rounded-xl [&_li.checked]:text-black [&_li.checked]:dark:text-white [&_li.checked]:pointer-events-none [&_li.checked]:bg-[#181b2f] [&_li.checked]:text-[#eff1f8]  [&_li.checked]:dark:bg-[#232627] transition-all",
    ],
    ["clear", ""],
    [
        "statistics-filter",
        "flex flex-wrap gap-6 [&_li]:cursor-pointer  [&_li]:text-xs [&_li]:font-inter [&_li]:tracking-tight [&_li]:text-slate-400 [&_li]:dark:text-neutral-500 [&_li:hover]:text-black [&_li:hover]:dark:text-white [&_li]:font-semibold [&_li]:active:underline-offset-4 [&_li.checked]:pointer-events-none [&_li.checked]:relative [&_li.checked]:after:content-[''] [&_li.checked]:text-black [&_li.checked]:dark:text-white [&_li.checked:after]:absolute [&_li.checked:after]:-bottom-2.5  [&_li.checked:after]:left-0 [&_li.checked:after]:w-full [&_li.checked:after]:h-[1px] [&_li.checked:after]:bg-gradient-to-r [&_li.checked:after]:from-[#30f] [&_li.checked:after]:to-[#f09] transition-all",
    ],
]);

type Props = Omit<ComponentPropsWithRef<"ol">, "onChange"> & {
    children: ReactNode;
    variant?: "primary" | "clear" | "statistics-filter";
    selectedTab?: string | number;
    onChange?: ((value: string) => void) | ((value: number) => void) | (() => void);
};

export const TabsWrapper = memo(
    forwardRef<HTMLOListElement, Props>(function TabsWrapper(
        { children, selectedTab, className, variant = "primary", onChange = () => {}, ...props }: Props,
        ref
    ) {
        const classes = useMemo(() => twMerge("font-inter", variants.get(variant), className), [className, variant]);

        return (
            <TabsProvider
                selectedTab={selectedTab}
                onChange={onChange}
            >
                <Tabs
                    ref={ref}
                    className={classes}
                    {...props}
                >
                    {children}
                </Tabs>
            </TabsProvider>
        );
    })
);
