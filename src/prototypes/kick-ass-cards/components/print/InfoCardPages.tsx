import { range } from "lodash";
import React from "react";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import InfoCard from "../gameComponents/InfoCard";

const copies = 1;

const CARDS_PER_PAGE = 4;

export default function InfoCardPages() {
    return (
        <>
            {range(copies).map((pageIndex) => (
                <PrintPage key={"page-" + pageIndex}>
                    <div className="flex-1 flex flex-row flex-wrap content-center items-stretch">
                        {range(CARDS_PER_PAGE).map((cardIndex) => {
                            return (
                                <InfoCard key={cardIndex} forPrint>
                                    <PrintMarkerCorners />
                                </InfoCard>
                            );
                        })}
                    </div>
                </PrintPage>
            ))}
        </>
    );
}
