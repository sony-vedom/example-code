import { Select as SelectWrapper } from "./Select";
import { SelectContent } from "./SelectContent";
import { SelectFieldExtension } from "./SelectFieldExtension";
import { SelectItem } from "./SelectItem";
import { SelectTrigger } from "./SelectTrigger";

export const Select: typeof SelectWrapper & {
    Trigger?: typeof SelectTrigger;
    Content?: typeof SelectContent;
    Item?: typeof SelectItem;
    FieldExtension?: typeof SelectFieldExtension;
} = SelectWrapper;
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.FieldExtension = SelectFieldExtension;
