import { MutableRefObject, useContext } from "react";
import { cn } from "shared/libs";
import { DropdownBlock } from "../../DropdownBlock";
import { contentVariants, DisplayedMode } from "../constants";
import { DatePickerDisplayContext, DatePickerOpenContext, DatePickerVariantContext } from "../context";
import { DateRangeFields } from "./DateRangeFields/DateRangeFields";
import { Days } from "./Days";
import { Months } from "./Months";
import { Navigation } from "./Navigation";
import { Years } from "./Years";

type Props = {
    owner: MutableRefObject<HTMLButtonElement>;
};
export const DatePickerContent = ({ owner }: Props) => {
    const variant = useContext(DatePickerVariantContext);
    const { displayedMode } = useContext(DatePickerDisplayContext);
    const { isOpen, setIsOpen } = useContext(DatePickerOpenContext);
    const classes = cn(contentVariants.get(variant) ?? contentVariants.get("primary"));

    return (
        <DropdownBlock
            tag="section"
            horizontalAnchorTo="left"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className={classes}
            owner={owner}
            data-component="date-picker-content"
        >
            <DateRangeFields />
            <Navigation />
            {displayedMode === DisplayedMode.DAYS && <Days />}
            {displayedMode === DisplayedMode.MONTHS && <Months />}
            {displayedMode === DisplayedMode.YEARS && <Years />}
        </DropdownBlock>
    );
};
