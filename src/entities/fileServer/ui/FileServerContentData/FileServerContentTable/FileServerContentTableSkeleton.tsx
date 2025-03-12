import { Skeleton } from "shared/ui";

export const FileServerContentTableSkeleton = () => {
    return (
        <table className="w-full [&_*]:text-sm [&_*]:font-normal [&_*]:text-primary-text [&_td]:py-2 [&_th]:pb-3 [&_th]:text-left">
            <tbody className="flex size-full grid-rows-6 flex-col items-center justify-center gap-2">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                    <Skeleton
                        className="h-24 w-full rounded-xl py-2"
                        key={i}
                    />
                ))}
            </tbody>
        </table>
    );
};
