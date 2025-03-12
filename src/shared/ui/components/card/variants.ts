export const cardVariants = Object.freeze(
    new Map([
        ["primary", "primary-card"],
        ["bigger", "bigger-card"],
        ["clear", ""],
    ])
);
export const cardHeaderVariants = Object.freeze(
    new Map([
        ["primary", "primary-card-header"],
        ["bigger", "bigger-card-header"],
        ["clear", ""],
    ])
);
export const cardBodyVariants = Object.freeze(
    new Map([
        ["primary", "primary-card-body"],
        ["bigger", "bigger-card-body"],
        ["clear", ""],
    ])
);

export type Variant = "primary" | "biggeer" | "clear";
