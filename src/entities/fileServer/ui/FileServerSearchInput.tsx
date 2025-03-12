import fileStorageSearchIcon from "assets/icons/file-storage-search-icon.svg";
import { useTranslation } from "react-i18next";
import { cn } from "shared/libs";
import { SearchInput } from "shared/ui";
import { ClassNameValue } from "tailwind-merge";
import "./index.css";

type FileStorageSearchInputProps = {
    onSearch: (term: string) => void;
    onReset: () => void;
    className?: ClassNameValue;
};

export const FileServerSearchInput = ({ onSearch, onReset, className }: FileStorageSearchInputProps) => {
    const { t } = useTranslation();
    return (
        <SearchInput
            variant="clear"
            className={cn(
                "gap-3 rounded-[1.25rem] bg-[#e1e5f388] px-6 py-2.5 [&_.search-icon]:opacity-25 [&_input]:text-sm",
                className
            )}
            placeholder={t("Поиск по файлам")}
            searchIcon={fileStorageSearchIcon}
            onSearch={onSearch}
            onReset={onReset}
        />
    );
};
