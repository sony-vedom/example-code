export const variants = new Map([
    [
        "primary",
        "flex justify-center items-center [&>*]:inline-flex [&>*]:flex-row px-4 min-h-12 rounded-xl [&>span]:font-bold bg-transparent hover:bg-[#181b2f] text-[#eff1f8] hover:text-[#eff1f8] [&>span]:text-size-inherit [&>span]:text-inherit text-sm font-bold [&>*]:relative [&>*]:gap-2 [&>*]:items-center [&>*]:justify-center [&>*]:transition-all transition-all [&:hover>*]:scale-110 [&:active>*]:scale-90 before:bg-black relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-[#30f] before:to-[#f09] before:opacity-100 before:transition-all before:hover:opacity-0 before:rounded-xl disabled:pointer-events-none [&:disabled>*]:opacity-50",
    ],
    [
        "gray",
        "flex justify-center items-center [&>*]:inline-flex [&>*]:flex-row [&>*]:gap-2 [&>*]:items-center [&>*]:justify-center px-4 py-3 rounded-xl [&>span]:font-bold bg-[#eff1f8] text-[#181b2f] dark:bg-[#141718] dark:text-[#eff1f8] hover:bg-[#8798ab] hover:text-[#eff1f8] dark:hover:bg-[#8798ab80] [&>span]:text-size-inherit [&>span]:text-inherit text-sm font-bold [&>*]:transition-all transition-all [&:hover>*]:scale-110 [&:active>*]:scale-90 disabled:pointer-events-none [&:disabled>*]:opacity-50",
    ],
    [
        "ghost",
        "flex justify-center items-center [&>*]:inline-flex [&>*]:flex-row [&>*]:gap-2 [&>*]:items-center [&>*]:justify-center px-4 py-3 rounded-xl [&>span]:font-bold bg-transparent text-[#181b2f] dark:text-[#eff1f8] [&>span]:text-size-inherit [&>span]:text-inherit text-sm font-bold [&>*]:transition-all transition-all [&:hover>*]:scale-110 [&:active>*]:scale-90 disabled:pointer-events-none [&:disabled>*]:opacity-50",
    ],
    [
        "danger",
        "flex justify-center items-center [&>*]:inline-flex [&>*]:flex-row px-4 min-h-12 rounded-xl [&>span]:font-bold [&>span]:text-size-inherit [&>span]:text-inherit text-sm font-bold [&>*]:relative [&>*]:gap-2 [&>*]:items-center [&>*]:justify-center [&>*]:transition-all transition-all [&:hover>*]:scale-110 [&:active>*]:scale-90 overflow-hidden bg-[#ff00991a] text-[#f09] hover:bg-[#f09] hover:text-white disabled:pointer-events-none [&:disabled>*]:opacity-50",
    ],
    [
        "outline-primary",
        "flex justify-center items-center [&>*]:inline-flex [&>*]:flex-row px-4 min-h-12 rounded-xl [&>span]:font-bold text-sm font-bold [&>*]:relative [&>*]:gap-2 [&>*]:items-center [&>*]:justify-center [&>*]:transition-all transition-all [&:hover>*]:scale-110 [&:active>*]:scale-90 overflow-hidden border-2 border-linear-gradient-[#fff-90deg-#30f_15%-#f09] dark:border-linear-gradient-[#2b2f30-90deg-#30f_15%-#f09] [&>*]:bg-clip-text [&>*]:text-transparent [&>*]:bg-gradient-to-r [&>*]:from-[#30f] [&>*]:to-[#f09] disabled:pointer-events-none [&:disabled>*]:opacity-50",
    ],
    ["clear", ""],
]);

export type ButtonVariants = "primary" | "gray" | "danger" | "ghost" | "clear" | "outline-primary";
