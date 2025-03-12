import { TabsItem } from "./TabsItem";
import { TabsWrapper } from "./TabsWrapper";

export const Tabs: typeof TabsWrapper & {
    Item?: typeof TabsItem;
} = TabsWrapper;
Tabs.Item = TabsItem;
