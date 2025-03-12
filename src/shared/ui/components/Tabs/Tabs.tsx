import {
    Children,
    cloneElement,
    ComponentPropsWithRef,
    forwardRef,
    isValidElement,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { appStore } from "shared/libs";
import { TabsContext } from "./context";

type Props = ComponentPropsWithRef<"ol">;

export const Tabs = forwardRef<HTMLOListElement, Props>(function Tabs({ children, ...props }: Props, ref) {
    const language = appStore((state) => state.language);
    const { setSelectedValue } = useContext(TabsContext);
    const [tabs, setTabs] = useState<ReactNode[]>([]);

    useEffect(() => {
        Children.forEach(children, (child, index) => {
            if (isValidElement(child) && child.props.default) {
                setSelectedValue(child.props.value ?? index);
            }
        });
    }, []);

    useEffect(() => {
        const tbs: ReactNode[] = [];
        Children.forEach(children, (child, index) => {
            if (!isValidElement(child)) {
                return;
            }

            const clonedChild = cloneElement(child, {
                ...child.props,
                key: child.key ?? index,
                value: child.props.value ?? index,
            });
            tbs.push(clonedChild);
        });

        setTabs(tbs);
    }, [language, children]);

    return (
        <ol
            ref={ref}
            data-component="tabs"
            {...props}
        >
            {tabs}
        </ol>
    );
});
