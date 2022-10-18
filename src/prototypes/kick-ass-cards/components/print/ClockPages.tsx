import { range } from "lodash";
import React from "react";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import Clock from "../Clock";

const copies = 2;

const CARDS_PER_PAGE = 16;

const blankActor = {
    name: "",
    occupation: "",
    specials: [],
    tricks: [],
    titles: [],
    wounds: [],
    assets: [],
    notes: "",
};
export default function ClockPages() {
    return (
        <>
            {range(copies).map((pageIndex) => (
                <PrintPage key={"page-" + pageIndex}>
                    <div className="flex-1 flex flex-row flex-wrap content-center items-stretch">
                        {range(CARDS_PER_PAGE).map((cardIndex) => {
                            return (
                                <Clock key={cardIndex} {...blankActor} className="flex-1">
                                    <PrintMarkerCorners />
                                </Clock>
                            );
                        })}
                    </div>
                </PrintPage>
            ))}
        </>
    );
}
