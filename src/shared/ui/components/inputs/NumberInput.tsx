import {
    ChangeEvent,
    ComponentProps,
    forwardRef,
    memo,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { cn } from "shared/libs";
import { Input } from "./Input";
import { InputVariant } from "./variants";

type Props = Omit<ComponentProps<"input">, "value" | "onError" | "onInput" | "onChange"> & {
    value?: number | string;
    variant?: InputVariant;
    numberType?: "float" | "integer";
    max?: number;
    min?: number;
    allowIncorrectValues?: boolean;
    onError?: (message: string) => void;
    onChange?: (value: string) => void;
};

const floatSepartorMask = /[\.\,]/g;

const tryConvertToNumber = (value: string | number) => {
    let newValue = Infinity;
    try {
        // ! не подходит для чисел с любимым в Америке форматом 999.999.999,99
        // ! если такой будет прилетать, то придется переделывать функцию конвертации
        newValue = typeof value === "string" ? parseFloat(value.replace(/\,/g, ".")) : value;
    } finally {
        return newValue;
    }
};

const validateNumber = (value: number | string, min: number, max: number) => {
    const num = tryConvertToNumber(value);

    if (num > max) {
        return { hasError: true, message: "Введенное значение больше максимального значения" };
    } else if (num < min) {
        return { hasError: true, message: "Введенное значение меньше минимального значения" };
    } else if (Number.isNaN(num)) {
        return { hasError: true, message: "Значение не является числом" };
    } else {
        return { hasError: false, message: "" };
    }
};

const isIncompleteFloat = (val: string) => /^-?\d*[.,]$/.test(val); // для записи вида 3. | 3,

export const NumberInput = memo(
    forwardRef<HTMLInputElement, Props>(
        (
            {
                value,
                children,
                className,
                numberType = "integer",
                max = Number.MAX_SAFE_INTEGER,
                min = Number.MIN_SAFE_INTEGER,
                allowIncorrectValues = false,
                onBeforeInput = () => {},
                onError = () => {},
                onChange = () => {},
                ...props
            },
            baseRef
        ) => {
            const ref = useRef<HTMLInputElement>();
            useImperativeHandle(baseRef, () => ref.current!);
            const charMask = useMemo(() => (numberType === "float" ? /[0-9,\.]/ : /[0-9]/), [numberType]);

            const [val, setVal] = useState(value);
            const [hasError, setHasError] = useState(false);

            useEffect(() => {
                const newVal = tryConvertToNumber(value);
                const oldVal = tryConvertToNumber(val);
                if (Number.isNaN(newVal) === false && newVal !== oldVal) {
                    setVal(value);
                }
            }, [value]);

            const handleBeforeInput = (event: React.CompositionEvent<HTMLInputElement>) => {
                onBeforeInput?.(event);
                // проверка вводимого символа
                const isFirstSymbol = ref.current.selectionStart === 0;
                const isAvailablleChar = charMask.test(event.data) || (event.data === "-" && isFirstSymbol);
                const hasMultipleDots =
                    numberType === "float" &&
                    (event.currentTarget.value.match(floatSepartorMask) || []).length > 0 &&
                    floatSepartorMask.test(event.data);
                if (!isAvailablleChar || hasMultipleDots) {
                    event.preventDefault();
                    return;
                }
            };

            const tryExecInput = (newValue: string, callback: () => void) => {
                if (numberType === "float" && isIncompleteFloat(newValue)) {
                    setHasError(true);
                    onError("Введите число полностью");
                    return;
                }
                const validationResult = validateNumber(newValue, min, max);
                if (validationResult.hasError) {
                    setHasError(true);
                    onError(validationResult.message);
                } else {
                    callback();
                }
            };

            const tryLimitValue = (v: string) => {
                if (allowIncorrectValues || (numberType === "float" && isIncompleteFloat(v))) {
                    return v;
                }
                const convertedValue = parseFloat(v.replace(",", "."));
                if (allowIncorrectValues || isNaN(convertedValue)) {
                    return v;
                }

                return Math.min(max, Math.max(min, convertedValue)).toString();
            };

            const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
                const newVal = tryLimitValue(event.currentTarget.value);
                setHasError(false);
                setVal(newVal);

                tryExecInput(newVal, () => onChange(newVal));
            };

            return (
                <Input
                    ref={ref}
                    value={val}
                    className={cn(hasError && "!border-red-500", className)}
                    onBeforeInput={handleBeforeInput}
                    onChange={handleChange}
                    {...props}
                    data-component="NumberInput"
                >
                    {children}
                </Input>
            );
        }
    )
);

NumberInput.displayName = "NumberInput";
