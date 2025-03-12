import { Children, ComponentProps, ElementType, ReactNode, isValidElement } from "react";
import { cn } from "shared/libs";
import { CardBody } from "./Card.Body";
import { CardHeader } from "./Card.Header";
import { CardProvider } from "./CardProvider";
import { cardVariants, Variant } from "./variants";
import "./Card.css";

type Props<Tag extends ElementType> = ComponentProps<Tag> & {
    tag?: string;
    children: ReactNode;
    variant?: Variant;
};

const CardWrapper = <Tag extends ElementType = "section">({
    children,
    className,
    tag: Component = "section",
    variant = "primary",
    ...props
}: Props<Tag>) => {
    let header: ReactNode | null = null;
    let body: ReactNode | null = null;
    Children.forEach(children, (child) => {
        if (isValidElement(child)) {
            if (child.type === CardHeader) {
                header = child;
            } else if (child.type === CardBody) {
                body = child;
            }
        }
    });
    const filterdChildren = Children.toArray(children).filter((child) => {
        if (isValidElement(child)) {
            return !(child.type === CardHeader || child.type === CardBody);
        }
        return true;
    });

    return (
        <CardProvider variant={variant}>
            <Component
                className={cn(cardVariants.get(variant), className)}
                data-component="card"
                {...props}
            >
                {!!header && header}
                {!!body && body}
                {filterdChildren}
            </Component>
        </CardProvider>
    );
};

CardWrapper.displayName = "Card";
export const Card: typeof CardWrapper & {
    Header?: typeof CardHeader;
    Body?: typeof CardBody;
} = CardWrapper;
Card.Header = CardHeader;
Card.Body = CardBody;
