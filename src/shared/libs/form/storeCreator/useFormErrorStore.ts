import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createComputed } from "zustand-computed";
import { createErrorsSlice } from "./createErrorsSlice";
import { ComputedState, FormField, FormStore } from "./types";
import { DEBUG_ENABLED } from "../../../constants";

export const computed = <T extends string>() =>
    createComputed(({ errors }: FormStore<T>): ComputedState => {
        return {
            hasErrors: errors ? Boolean(Object.keys(errors).length) : false,
        };
    });

const createStore = <T extends FormField>() =>
    computed<T>()((set, get, store) => ({
        ...createErrorsSlice<T>()(set, get, store),
    }));

export const createFormErrorStore = <T extends FormField>(storeName: string) =>
    create<FormStore<T>>()(
        devtools(createStore<T>(), {
            name: storeName,
            enabled: DEBUG_ENABLED,
        })
    );
