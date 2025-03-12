import { memo } from "react";
import Loader from "assets/icons/loader.svg?react";
import { cn } from "shared/libs";

type Props = {
    className?: string;
};

export const Preloader = memo(({ className }: Props) => {
    const classes = cn("flex size-20 size-full items-center justify-center", className);
    return (
        <div
            className={classes}
            data-component="preloader"
        >
            <Loader className="transform-style-preserve-3d backface-visibility-hidden size-20 animate-preloader" />
        </div>
    );
});

Preloader.displayName = "Preloader";
