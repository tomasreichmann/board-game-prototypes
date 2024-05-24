import React, { HTMLAttributes } from "react";
import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage, { PrintPageProps } from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";
import { twMerge } from "tailwind-merge";

type ChunkedPagesProps<T, B> = {
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
    label: string;
};

export default function ChunkedPages<T, B>({
    Component,
    BackFaceComponent,
    getBackFaceProps,
    items,
    itemsPerPage,
    label,
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
                            <div className="text-xs font-kacHeading text-kac-iron w-full text-center mt-2 z-10 h-0">
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
                                <div className="text-xs font-kacHeading text-kac-iron w-full text-center mt-2 z-10">
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
