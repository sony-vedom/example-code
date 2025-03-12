import { ComponentProps, ElementType, useContext } from "react";
import { cn } from "shared/libs";
import { CardContextVariant } from "./CardContext";
import { cardHeaderVariants } from "./variants";

type Props<Tag extends ElementType> = ComponentProps<Tag> & {
    tag?: string;
};

export const CardHeader = <Tag extends ElementType = "header">({
    children,
    className,
    tag: Component = "header",
    ...props
}: Props<Tag>) => {
    const variant = useContext(CardContextVariant);
    return (
        <Component
            className={cn(
                "text-card-header-base dark:text-card-header-dark  rounded-c",
                cardHeaderVariants.get(variant),
                className
            )}
            data-component="card-header"
            {...props}
        >
            {children}
        </Component>
    );
};

CardHeader.displayName = "Card.Header";
