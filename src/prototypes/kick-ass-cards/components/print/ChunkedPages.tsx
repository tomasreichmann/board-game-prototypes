import React, { HTMLAttributes } from "react";
import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage, { PrintPageProps } from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";
import { twMerge } from "tailwind-merge";

export type ChunkedPagesProps<T, B> = {
    Component: React.ComponentType<T>;
    BackFaceComponent?: React.ComponentType<B>;
    getBackFaceProps?: (item: T) => B;
    frontFacePrintPageProps?: Partial<PrintPageProps>;
    backFacePrintPageProps?: Partial<PrintPageProps>;
    pageContentClassName?: string;
    pageContentProps?: HTMLAttributes<HTMLDivElement>;
    frontFacePageContentClassName?: string;
    frontFacePageContentProps?: HTMLAttributes<HTMLDivElement>;
    backFacePageContentClassName?: string;
    backFacePageContentProps?: HTMLAttributes<HTMLDivElement>;
    items: T[];
    itemsPerPage: number;
    label?: string;
    labelPosition?: "top" | "bottom" | "left" | "right";
};

export default function ChunkedPages<T, B>({
    Component,
    BackFaceComponent,
    getBackFaceProps,
    items,
    itemsPerPage,
    label,
    labelPosition = "bottom",
    frontFacePrintPageProps,
    backFacePrintPageProps,
    pageContentClassName,
    frontFacePageContentClassName = pageContentClassName,
    backFacePageContentClassName = pageContentClassName,
    pageContentProps,
    frontFacePageContentProps = pageContentProps,
    backFacePageContentProps = pageContentProps,
}: ChunkedPagesProps<T, B>) {
    const pagesPerCard = BackFaceComponent ? 2 : 1;
    const totalPages = Math.ceil(items.length / itemsPerPage) * pagesPerCard;
    const labelClassName = twMerge(
        "text-xs font-kacHeading text-kac-iron w-full text-center z-10 absolute",
        labelPosition === "bottom" && "bottom-[12mm] print:bottom-[2mm]",
        labelPosition === "top" && "top-[12mm] print:top-[2mm]",
        labelPosition === "left" &&
            "left-[12mm] print:left-[2mm] top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 w-auto",
        labelPosition === "right" &&
            "right-[12mm] print:right-[2mm] top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 w-auto"
    );
    return (
        <>
            {chunk(items, itemsPerPage).map((pageItems, pageIndex) => {
                const backPage = BackFaceComponent ? (
                    <PrintPage key={"chunked-back-page-" + pageIndex + "-back"} {...backFacePrintPageProps}>
                        <div
                            {...backFacePageContentProps}
                            className={twMerge(
                                "flex-1 flex flex-row-reverse flex-wrap content-start items-center justify-center",
                                backFacePageContentClassName
                            )}
                        >
                            {pageItems.map((item, itemIndex) => {
                                const backFaceProps = getBackFaceProps ? getBackFaceProps(item) : item;
                                return (
                                    <BackFaceComponent
                                        key={`chunked-page-item-${itemIndex}`}
                                        className="relative"
                                        {...(backFaceProps as B)}
                                    />
                                );
                            })}
                            <div className={labelClassName}>
                                {label} Back Face {pageIndex * pagesPerCard + 2}/{totalPages}
                            </div>
                        </div>
                    </PrintPage>
                ) : undefined;
                return (
                    <React.Fragment key={"chunked-page-" + pageIndex}>
                        <PrintPage key={"chunked-front-page-" + pageIndex} {...frontFacePrintPageProps}>
                            <div
                                {...frontFacePageContentProps}
                                className={twMerge(
                                    "flex-1 flex flex-wrap content-start items-center justify-center",
                                    frontFacePageContentClassName
                                )}
                            >
                                {pageItems.map((item, itemIndex) => (
                                    <Component key={`chunked-page-item-${itemIndex}`} className="relative" {...item} />
                                ))}
                                <div className={labelClassName}>
                                    {label} {pageIndex * pagesPerCard + 1}/{totalPages}
                                </div>
                            </div>
                        </PrintPage>
                        {backPage}
                    </React.Fragment>
                );
            })}
            <DataToggle
                data={items}
                initialCollapsed
                buttonContent={<>{label}: Show data</>}
                className="print:hidden flex flex-col w-full items-start relative"
            />
        </>
    );
}
