import { ComponentPropsWithRef, forwardRef, memo, ReactNode, useImperativeHandle, useRef } from "react";
import { SelectProvider } from "./context";
import { Value, Variant } from "./Models";
import { SelectContent } from "./SelectContent";
import { SelectTrigger } from "./SelectTrigger";

type Props = Omit<ComponentPropsWithRef<"button">, "onChange"> & {
    children: ReactNode;
    placeholder?: ReactNode;
    onChange?: (value: Value) => void;
    variant?: Variant;
};

export const Select = memo(
    forwardRef<HTMLButtonElement, Props>(function SelectWrapper(
        { children, variant = "primary", onChange, ...props }: Props,
        baseRef
    ) {
        const ref = useRef<HTMLButtonElement>(null);
        useImperativeHandle(baseRef, () => ref.current!);

        return (
            <SelectProvider
                onChange={onChange}
                initChildren={children}
            >
                <SelectTrigger
                    ref={ref}
                    variant={variant}
                    {...props}
                />
                <SelectContent
                    variant={variant}
                    owner={ref}
                />
            </SelectProvider>
        );
    })
);

Select.displayName = "Select";
