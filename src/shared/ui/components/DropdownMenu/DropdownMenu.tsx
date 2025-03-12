import { Children, ComponentPropsWithRef, forwardRef, isValidElement, useMemo } from "react";
import { DropdownMenuProvider } from "./context";
import { DropdownMenuContent } from "./DropdownMenu.Content";
import { DropdownMenuItem } from "./DropdownMenu.Item";
import { DropdownMenuTrigger } from "./DropdownMenu.Trigger";
import { Variant } from "./variants";

type Props = Omit<ComponentPropsWithRef<"div">, "onChange"> & {
    variant?: Variant;
    onChange?: (value: boolean) => void;
};

const DropdownMenuWrapper = forwardRef<HTMLDivElement, Props>(
    ({ onChange, children, variant = "primary", ...props }: Props, ref) => {
        const trigger = useMemo(() => {
            const triggers = Children.map(children, (child) =>
                isValidElement(child) && child.type === DropdownMenuTrigger ? child : null
            );
            return triggers.length > 0 ? triggers[0] : null;
        }, [children]);

        const content = useMemo(() => {
            const contents = Children.map(children, (child) =>
                isValidElement(child) && child.type === DropdownMenuContent ? child : null
            );
            return contents.length > 0 ? contents[0] : null;
        }, [children]);

        return (
            <DropdownMenuProvider
                variant={variant}
                onChange={onChange}
            >
                <div
                    ref={ref}
                    {...props}
                >
                    {trigger}
                    {content}
                </div>
            </DropdownMenuProvider>
        );
    }
);

DropdownMenuWrapper.displayName = "DropdownMenu";
export const DropdownMenu: typeof DropdownMenuWrapper & {
    Trigger?: typeof DropdownMenuTrigger;
    Content?: typeof DropdownMenuContent;
    Item?: typeof DropdownMenuItem;
} = DropdownMenuWrapper;
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
