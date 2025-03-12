import { ComponentProps, ElementType, useContext } from "react";
import { cn } from "shared/libs";
import { CardContextVariant } from "./CardContext";
import { cardBodyVariants } from "./variants";

type Props<Tag extends ElementType> = ComponentProps<Tag> & {
    tag?: string;
};

export const CardBody = <Tag extends ElementType = "div">({
    children,
    className,
    tag: Component = "div",
    ...props
}: Props<Tag>) => {
    const variant = useContext(CardContextVariant);
    return (
        <Component
            className={cn("", cardBodyVariants.get(variant), className)}
            data-component="card-body"
            {...props}
        >
            {children}
        </Component>
    );
};

CardBody.displayName = "Card.Body";
