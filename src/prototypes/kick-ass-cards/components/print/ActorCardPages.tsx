import { range } from "lodash";
import React from "react";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import ActorCard from "../gameComponents/ActorCard";

const copies = 2;

const CARDS_PER_PAGE = 6;

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
export default function ActorCardPages() {
    return (
        <>
            {range(copies).map((pageIndex) => (
                <PrintPage key={"page-" + pageIndex}>
                    <div className="flex flex-wrap content-center items-center">
                        {range(CARDS_PER_PAGE).map((cardIndex) => {
                            return (
                                <ActorCard key={cardIndex} size="Trump" {...blankActor}>
                                    <PrintMarkerCorners />
                                </ActorCard>
                            );
                        })}
                    </div>
                </PrintPage>
            ))}
        </>
    );
}
