import React, { forwardRef } from "react";
import { useId } from "shared/libs";

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    format?: string;
};
export const HiddenUploadInput = forwardRef<HTMLInputElement, Props>(function HiddenUploadInput(
    { onChange, format = undefined, id = undefined }: Props,
    ref
) {
    const identifier = useId({ id, prefix: "upload" });
    const accept = format ?? "*/*";

    return (
        <input
            id={identifier}
            name="upload"
            ref={ref}
            type="file"
            onChange={onChange}
            accept={accept}
            hidden
        />
    );
});
