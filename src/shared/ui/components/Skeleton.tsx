import { ComponentPropsWithRef, memo } from "react";
import { appStore, cn } from "shared/libs";

type Props = ComponentPropsWithRef<"div">;

export const Skeleton = memo(function Skeleton({ className, style, ...props }: Props) {
    const theme = appStore((state) => state.theme);
    return (
        <div
            style={{
                backgroundImage:
                    theme === "light"
                        ? "linear-gradient(110deg, #f6f7f800 8%, #edeef1 18%, #f6f7f800 33%)"
                        : "linear-gradient(110deg, #23262700 8%, #2b2f30 18%, #23262700 33%)",
                backgroundSize: "200% 100%",
                ...style,
            }}
            className={cn("animate-skeleton bg-[#f6f7f8] dark:bg-[#232627]", className)}
            {...props}
        />
    );
});
