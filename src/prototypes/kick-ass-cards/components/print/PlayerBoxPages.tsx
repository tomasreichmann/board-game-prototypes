import { range } from "lodash";
import React from "react";
import Icon from "../Icon";
import { cardSizes } from "../../../../components/print/paperSizes";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import PlayerCharacterCard from "../gameComponents/PlayerCharacterCard";
import PaperCraftBox from "../PaperCraftBox";

const copies = 2;

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
export default function PlayerBoxPages() {
    const safetyMargin = 5;
    return (
        <>
            {range(copies).map((pageIndex) => (
                <PrintPage key={"page-" + pageIndex}>
                    <div className="flex-1 flex flex-col content-center items-stretch">
                        <PaperCraftBox
                            contentWidth={cardSizes["Mini US game"].mm[0] + safetyMargin}
                            contentHeight={cardSizes["Mini US game"].mm[1] + safetyMargin}
                            contentDepth={15}
                            classNameVisible="bg-kac-bone-light"
                            bendStyles={{ borderColor: "#a3835f" }}
                            contentLidOutsideTop={
                                <div className="h-full w-full flex flex-col justify-center items-center ">
                                    <Icon icon="backpack" className="text-kac-fire-dark h-16" />
                                    <div className="w-32 text-lg border-kac-bone-dark border-b-2 border-dashed min-h-8" />
                                    <div className="text-sm text-kac-fire-dark font-kacHeading">Player</div>
                                </div>
                            }
                        />
                    </div>
                </PrintPage>
            ))}
        </>
    );
}
