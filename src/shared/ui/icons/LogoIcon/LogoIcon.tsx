import { memo } from "react";
import LogoText from "assets/icons/logo-text.svg?react";
// import LogoText from "assets/icons/logo-text-global.svg?react";
import Logo from "assets/icons/logo.svg?react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { appEndpoints } from "shared/constants";

export const LogoIcon = memo(() => {
    const { t } = useTranslation();

    return (
        <Link
            to={appEndpoints.DASHBOARD}
            className="grid grid-cols-[auto_1fr] gap-x-2 grid-areas-['icon_title'_'icon_description']"
        >
            <Logo className="size-6 grid-area/icon" />
            <LogoText className="grid-area/title" />
            <span className="text-[.4rem] font-medium leading-loose text-icon grid-area/description">
                {t("дополненнаяреальность")}
            </span>
        </Link>
    );
});

LogoIcon.displayName = "LogoIcon";
