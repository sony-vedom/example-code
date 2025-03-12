import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input } from "shared/ui";
import { closeLastPopupInstance } from "../../../../libs";

export type UpdatingFolderNameProps = {
    initialName?: string;
    directoryUid?: string;
    onUpdateFolderName?: (newName: string, folderUid: string) => Promise<void>;
};
export const UpdatingFolderName = ({ initialName, directoryUid, onUpdateFolderName }: UpdatingFolderNameProps) => {
    const [name, setFolderName] = useState<string>();
    const { t } = useTranslation();

    const handleCreate = () => {
        if (name && directoryUid) {
            onUpdateFolderName(name, directoryUid);
        }
        closeLastPopupInstance();
    };

    const handleCancel = () => {
        closeLastPopupInstance();
    };

    return (
        <div className={"relative flex flex-col gap-8 px-[38px] pb-7 pt-8"}>
            <div className={"grid gap-2"}>
                <label>
                    <b className={"dark:text-gray-500"}>{t("Имя папки")}</b>
                    <Input
                        defaultValue={initialName}
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                </label>
            </div>
            <div className={"grid grid-cols-2 items-stretch justify-center gap-x-2"}>
                <Button
                    disabled={!name || name === initialName}
                    onClick={handleCreate}
                >
                    {t("Обновить")}
                </Button>
                <Button
                    onClick={handleCancel}
                    variant={"gray"}
                >
                    {t("Закрыть окно")}
                </Button>
            </div>
        </div>
    );
};
