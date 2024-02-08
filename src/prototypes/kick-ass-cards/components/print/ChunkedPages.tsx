import React from "react";
import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";

type ChunkedPagesProps<T, B> = {
    Component: React.ComponentType<T>;
    BackFaceComponent?: React.ComponentType<B>;
    getBackFaceProps?: (item: T) => B;
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
}: ChunkedPagesProps<T, B>) {
    const pagesPerCard = BackFaceComponent ? 2 : 1;
    const totalPages = Math.ceil(items.length / itemsPerPage) * pagesPerCard;
    return (
        <>
            {chunk(items, itemsPerPage).map((pageItems, pageIndex) => {
                const backPage = BackFaceComponent ? (
                    <PrintPage key={"action-deck-page-" + pageIndex + "-back"}>
                        <div className="flex flex-row-reverse flex-wrap content-center items-center justify-center">
                            {pageItems.map((item, itemIndex) => {
                                const backFaceProps = getBackFaceProps ? getBackFaceProps(item) : item;
                                return (
                                    <BackFaceComponent
                                        key={`chunked-page-item-${itemIndex}`}
                                        {...(backFaceProps as B)}
                                        className="relative"
                                    >
                                        <PrintMarkerCorners />
                                    </BackFaceComponent>
                                );
                            })}
                            <h2 className="text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                                {label} Back Face {pageIndex * pagesPerCard + 2}/{totalPages}
                            </h2>
                        </div>
                    </PrintPage>
                ) : undefined;
                return (
                    <React.Fragment key={"action-deck-page-" + pageIndex}>
                        <PrintPage key={"action-deck-page-" + pageIndex}>
                            <div className="flex flex-wrap content-center items-center justify-center">
                                {pageItems.map((item, itemIndex) => (
                                    <Component key={`chunked-page-item-${itemIndex}`} {...item} className="relative">
                                        <PrintMarkerCorners />
                                    </Component>
                                ))}
                                <h2 className="text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                                    {label} {pageIndex * pagesPerCard + 1}/{totalPages}
                                </h2>
                            </div>
                        </PrintPage>
                        {backPage}
                    </React.Fragment>
                );
            })}
            <DataToggle
                data={items}
                initialCollapsed
                className="print:hidden flex flex-col w-full items-start relative"
            />
        </>
    );
}
