import React from "react";
import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage, { PrintPageProps } from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";

type ChunkedPagesProps<T, B> = {
    Component: React.ComponentType<T>;
    BackFaceComponent?: React.ComponentType<B>;
    getBackFaceProps?: (item: T) => B;
    frontFacePrintPageProps?: Partial<PrintPageProps>;
    backFacePrintPageProps?: Partial<PrintPageProps>;
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
}: ChunkedPagesProps<T, B>) {
    const pagesPerCard = BackFaceComponent ? 2 : 1;
    const totalPages = Math.ceil(items.length / itemsPerPage) * pagesPerCard;
    return (
        <>
            {chunk(items, itemsPerPage).map((pageItems, pageIndex) => {
                const backPage = BackFaceComponent ? (
                    <PrintPage key={"action-deck-page-" + pageIndex + "-back"} {...frontFacePrintPageProps}>
                        <div className="flex flex-row-reverse flex-wrap content-center items-center justify-center">
                            {pageItems.map((item, itemIndex) => {
                                const backFaceProps = getBackFaceProps ? getBackFaceProps(item) : item;
                                return (
                                    <BackFaceComponent
                                        key={`chunked-page-item-${itemIndex}`}
                                        className="relative"
                                        {...(backFaceProps as B)}
                                    >
                                        <PrintMarkerCorners />
                                    </BackFaceComponent>
                                );
                            })}
                            <div className="text-xs font-kacHeading text-kac-iron w-full text-center mt-2 z-10">
                                {label} Back Face {pageIndex * pagesPerCard + 2}/{totalPages}
                            </div>
                        </div>
                    </PrintPage>
                ) : undefined;
                return (
                    <React.Fragment key={"action-deck-page-" + pageIndex}>
                        <PrintPage key={"action-deck-page-" + pageIndex} {...backFacePrintPageProps}>
                            <div className="flex flex-wrap content-center items-center justify-center">
                                {pageItems.map((item, itemIndex) => (
                                    <Component key={`chunked-page-item-${itemIndex}`} className="relative" {...item}>
                                        <PrintMarkerCorners />
                                    </Component>
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
