import { ErrorsSlice } from "./createErrorsSlice";

export type FormField = string;
export type FormError<T> = { fieldName: T; message: string } | { fieldName: T; message: string[] };
export type FormStore<Fields extends FormField | null> = ErrorsSlice<Fields>;
export type ComputedState = {
    hasErrors: boolean;
};
