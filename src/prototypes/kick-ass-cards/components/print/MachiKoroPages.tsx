import React from "react";
import ChunkedPages from "./ChunkedPages";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import MdxArticle from "../content/MdxArticle";
import RulesMdx from "../../data/encounters/Oscaru-no-machi-rules.mdx";
import BuildingCard, {
    BuildingCardBackFace,
    BuildingCardProps,
    BuildingTypeEnum,
    DeckTypeEnum,
} from "../machiKoro/BuildingCard";

const buildings: BuildingCardProps[] = [
    {
        activation: "",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 0,
        description: "",
    },
];

export default function MachiKoroPages() {
    return (
        <>
            <PrintPage size="A4" bleedInMm={0} showControls>
                <MdxArticle mdx={RulesMdx} className={"leading-tight columns-2 prose-sm prose-h1:text-2xl"} />
            </PrintPage>
            <ChunkedPages
                Component={BuildingCard}
                BackFaceComponent={BuildingCardBackFace}
                items={buildings}
                itemsPerPage={3 * 1}
                frontFacePrintPageProps={{
                    // orientation: "landscape",
                    bleedInMm: 0,
                    className: "flex flex-col",
                    showControls: true,
                    contentClassName: "p-[3mm] flex-1 flex relative items-stretch contents-stretch",
                }}
                backFacePrintPageProps={{
                    showControls: true,
                    bleedInMm: 0,
                    contentClassName: "p-[3mm]",
                }}
                label={"Roles"}
            />
        </>
    );
}
