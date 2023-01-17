import { range } from "lodash";
import React from "react";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import PlayerCharacterCard from "../gameComponents/PlayerCharacterCard";

const copies = 3;

const blankCharacter = {
    name: "",
    occupation: "",
    specials: [],
    tricks: [],
    titles: [],
    wounds: [],
    assets: [],
    notes: "",
};
export default function PlayerCharacterCardPages() {
    return (
        <>
            {range(copies).map((pageIndex) => (
                <PrintPage key={"page-" + pageIndex}>
                    <div className="flex-1 flex flex-col content-center items-stretch">
                        <PlayerCharacterCard {...blankCharacter} className="flex-1">
                            <PrintMarkerCorners />
                        </PlayerCharacterCard>
                        <PlayerCharacterCard {...blankCharacter} className="flex-1">
                            <PrintMarkerCorners />
                        </PlayerCharacterCard>
                    </div>
                </PrintPage>
            ))}
        </>
    );
}
