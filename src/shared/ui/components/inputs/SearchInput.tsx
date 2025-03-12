import { useRef, useState, KeyboardEvent, useEffect, ComponentPropsWithRef } from "react";
import CloseIcon from "assets/icons/close-small-black.svg?react";
import defaultSearchIcon from "assets/icons/search.svg";
import { cn, useDebounce } from "shared/libs";
import { Input } from "shared/ui";
import { InputVariant } from "./variants";

type SearchProps = ComponentPropsWithRef<"input"> & {
    onSearch: (term: string) => void;
    onReset?: () => void;
    changeSearch?: (text: string) => void;
    variant?: InputVariant;
    searchIcon?: string;
};

export const SearchInput = ({
    onSearch,
    onReset,
    variant,
    changeSearch,
    className,
    searchIcon,
    ...props
}: SearchProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const resetSearch = () => {
        setSearchTerm("");
        onReset?.();
    };
    const findDebounced = useDebounce(onSearch, 500);
    const performSearch = (e: KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
        if ("key" in e && e.key !== "Enter") return;
        onSearch(searchTerm);
    };

    useEffect(() => {
        if (searchTerm === "") {
            onReset?.();
        } else if (changeSearch) {
            changeSearch(searchTerm);
        }
    }, [searchTerm]);

    return (
        <Input
            type="text"
            ref={inputRef}
            value={searchTerm}
            onKeyUp={performSearch}
            className={cn(
                "grid grid-cols-[1rem_1fr_minmax(0,0.625rem)]  grid-areas-['icon_input_close'] [&>input]:grid-area/input",
                className
            )}
            onChange={(e) => {
                setSearchTerm(e?.target?.value);
                findDebounced(e?.target?.value);
            }}
            variant={variant}
            {...props}
        >
            {!searchTerm && (
                <img
                    width={18}
                    height={18}
                    src={searchIcon ?? defaultSearchIcon}
                    onClick={performSearch}
                    className="grid-area/icon"
                />
            )}
            {searchTerm?.length > 0 && (
                <button
                    onClick={resetSearch}
                    className="group cursor-pointer grid-area/close"
                >
                    <CloseIcon className="size-3 transition-all group-hover:scale-110 [&_path]:fill-icon" />
                </button>
            )}
        </Input>
    );
};
