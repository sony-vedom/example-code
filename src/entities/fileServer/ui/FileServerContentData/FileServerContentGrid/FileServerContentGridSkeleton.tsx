import { cn } from "shared/libs";
import { Skeleton } from "shared/ui";
import { FileServerContentProps } from "../model";

export const FileServerContentGridSkeleton = ({ size }: Pick<FileServerContentProps, "size">) => {
    return (
        <>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                <Skeleton
                    className={cn("w-full rounded-xl p-2", size === "l" ? "h-[286px]" : "h-[125px]")}
                    key={i}
                />
            ))}
        </>
    );
};
