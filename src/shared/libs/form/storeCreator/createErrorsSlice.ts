import { FormField, FormStore } from "./types";
import { StateCreatorDevtoolsType } from "../../storeSlices";

export type ErrorsSlice<Fields extends FormField | null> = State<Fields> & Actions<Fields>;

type State<T extends string> = {
    errors: Record<T, string[]> | null;
};

type Actions<T extends string> = {
    updateErrors: (
        args:
            | { fieldName: T; message: string }
            | { fieldName: T; message: string[] }
            | { fieldName: T; message: string }[]
            | { fieldName: T; message: string[] }[]
    ) => void;
    clearErrors: (fieldName?: string) => void;
};

const initialState = <T extends FormField>(): State<T> => ({
    errors: null,
});

const mergeErrors = <T extends string>(
    currentErrors: Record<T, string[]> | null,
    fieldName: T,
    message: string | string[]
): Record<T, string[]> => {
    return {
        ...currentErrors,
        [fieldName]: currentErrors?.[fieldName]
            ? [...currentErrors[fieldName], ...(Array.isArray(message) ? message : [message])]
            : Array.isArray(message)
              ? message
              : [message],
    };
};

export const createErrorsSlice =
    <T extends FormField>(): StateCreatorDevtoolsType<FormStore<T>, State<T> & Actions<T>> =>
    (set, get) => ({
        ...initialState<T>(),
        updateErrors(val) {
            if (Array.isArray(val)) {
                // Если передан массив объектов с ошибками
                set((s) => ({
                    ...s,
                    errors: val.reduce((acc, { fieldName, message }) => mergeErrors(acc, fieldName, message), {
                        ...s.errors,
                    } as Record<T, string[]>),
                }));
            } else {
                // Если передан одиночный объект с одной или несколькими ошибками
                set((s) => ({
                    ...s,
                    errors: mergeErrors(s.errors, val.fieldName, val.message),
                }));
            }
        },
        clearErrors(fieldName) {
            if (fieldName) {
                const newErrors = { ...get().errors };
                delete newErrors[fieldName];
                set((s) => ({
                    ...s,
                    errors: newErrors,
                }));
                return;
            }
            set((s) => ({
                ...s,
                errors: null,
            }));
        },
    });
