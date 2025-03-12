import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { limitsOnPage } from "shared/constants";
import { useApp } from "shared/libs";
import { Select } from "shared/ui";
import { otherIcons } from "utils/icons";
import styles from "./Paginator.module.scss";

type Props = {
    first: number;
    last: number;
    current: number;
    class?: string;
    className?: string;
    onChangePage?: (p: number) => void;
    limit?: number;
    setLimit?: (l: number) => void;
};

export const Paginator = (props: Props) => {
    const { t } = useTranslation();
    const { theme } = useApp();
    const [goToPage, setGoToPage] = useState<string>(props.current > 0 ? props.current.toString() : "1");
    const [maxVisiblePages, setMaxVisiblePages] = useState<number>(5);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updatemaxVisiblePages = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const elementWidth = 65;
                const maxNumberShown = 5;
                let maxPagesToShow = Math.floor(containerWidth / elementWidth);
                maxPagesToShow = Math.min(maxPagesToShow, maxNumberShown);
                setMaxVisiblePages(maxPagesToShow);
            }
        };

        updatemaxVisiblePages();
        window.addEventListener("resize", updatemaxVisiblePages);
        return () => window.removeEventListener("resize", updatemaxVisiblePages);
    }, []);

    const calculatePagesToDraw = (): number[] => {
        const totalPages: number = props.last - props.first + 1;
        const result: number[] = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = props.first; i <= props.last; i++) {
                result.push(i);
            }
        } else if (props.current <= maxVisiblePages - 1) {
            for (let i = props.first; i <= maxVisiblePages; i++) {
                result.push(i);
            }
            if (totalPages > maxVisiblePages) {
                result.push(-1);
                result.push(props.last);
            }
        } else if (props.current >= props.last - maxVisiblePages) {
            if (totalPages > maxVisiblePages) {
                result.push(props.first);
                result.push(-1);
            }
            for (let i = props.last - (maxVisiblePages - 1); i <= props.last; i++) {
                result.push(i);
            }
        } else {
            result.push(props.first);
            result.push(-2);
            for (let i = props.current - 1; i <= props.current + 1; i++) {
                result.push(i);
            }
            result.push(-2);
            result.push(props.last);
        }

        return result;
    };

    const handlePageClick = (page: number) => () => {
        if (props.onChangePage && page !== props.current) {
            props.onChangePage(page);
        }
    };

    const renderPageNumbers = () => {
        const pagesArray = calculatePagesToDraw();
        return pagesArray.map((page, index) => {
            if (page > 0) {
                return (
                    <div
                        key={index}
                        className={`${styles.page} ${page === props.current ? styles.active : ""}`}
                        onClick={handlePageClick(page)}
                    >
                        {page}
                    </div>
                );
            } else {
                return (
                    <div
                        key={index}
                        className={`${styles.page} ${styles.dots}`}
                    >
                        ...
                    </div>
                );
            }
        });
    };

    return (
        <div
            className={`${styles.container} ${styles[props.class || ""]} ${props.className || ""}`}
            data-theme={theme}
            data-component="paginator"
            ref={containerRef}
        >
            <div className={styles.pages}>
                <div
                    className={`${props.current < 2 ? styles.disabled : styles.controller} rotate-180`}
                    onClick={() =>
                        props.onChangePage && props.first != props.current && props.onChangePage(props.current - 1)
                    }
                >
                    {otherIcons.Next}
                </div>
                <div className={styles["pages-items"]}>{renderPageNumbers()}</div>
                <div
                    className={props.current >= props.last ? styles.disabled : styles.controller}
                    onClick={() =>
                        props.onChangePage && props.last != props.current && props.onChangePage(props.current + 1)
                    }
                >
                    {otherIcons.Next}
                </div>
            </div>
            <div className={styles.goto}>
                <label htmlFor="#gotopage">{t("Перейти на стр.")}</label>
                <div className={styles.bubble}>
                    <input
                        type="text"
                        value={goToPage}
                        id="gotopage"
                        onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, "");
                            const value = input !== "" ? parseInt(input, 10) : props.first;
                            if (value > props.last) {
                                setGoToPage(props.last.toString());
                            } else if (value < props.first) {
                                setGoToPage(props.first.toString());
                            } else {
                                setGoToPage(value.toString());
                            }
                        }}
                    />
                    <div onClick={() => goToPage && props.onChangePage && props.onChangePage(parseInt(goToPage))}>
                        {otherIcons.Next}
                    </div>
                </div>
                {props.limit && props.setLimit && (
                    <>
                        <label htmlFor="elems-on-page">{t("Элементов на стр.")}</label>
                        <Select
                            id="elems-on-page"
                            className="h-full w-20 rounded-md border border-[#e6e9f1] py-1 pl-2.5 pr-1 dark:border-[#232627] [&>img]:rounded-md [&>img]:bg-white [&>img]:p-2.5 [&_img]:size-7"
                            variant="smaller"
                        >
                            {limitsOnPage.map((limit) => (
                                <Select.Item
                                    key={limit}
                                    default={props.limit === limit}
                                    onClick={() => props.setLimit(limit)}
                                >
                                    {limit}
                                </Select.Item>
                            ))}
                        </Select>
                    </>
                )}
            </div>
        </div>
    );
};
