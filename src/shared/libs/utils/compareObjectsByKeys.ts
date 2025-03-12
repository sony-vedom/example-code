import deepEqual from "deep-equal";

export function compareObjectsByKeys(obj1: object, obj2: object, keys: string[]) {
    return keys.every((key) => deepEqual(obj1[key], obj2[key]));
}
