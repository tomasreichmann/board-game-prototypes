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
        title: "Malý pohostinský řetězec",
        activation: "3 x [food] (6-)",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 20,
        description:
            "Na zakázku japonského konglomerátu vybuduj 3 [food] objekty s aktivační hodnotou (6-) a odevzdej je za odměnu 20 mincí.",
    },
    {
        title: "Velký pohostinský řetězec",
        activation: "4 x [food] (7+)",
        deckType: DeckTypeEnum.Big,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 40,
        description:
            "Na zakázku japonského konglomerátu vybuduj 4 [food] objekty s aktivační hodnotou 7+ a odevzdej je za odměnu 40 mincí.",
    },
    {
        title: "Sousedská výměna",
        activation: "2 x [any]",
        deckType: DeckTypeEnum.Landmark,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 0,
        description:
            "Bohatý soused nabízí výhodnou výměnu.\n2 z tvých libovolných podniků odevzdej a vezmi si 1 podnik z obecné nabídky.",
    },
    {
        title: "Yakuza úřaduje",
        activation: "1 x [special]",
        deckType: DeckTypeEnum.Landmark,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 15,
        description: "Má-li hráč na tahu alespoň 3 [special], může odevzdat jednu z nich Yakuze za odměnu 15 mincí.",
    },
    {
        title: "Konbini nadšenec",
        activation: "3 x Maloobchod",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 15,
        description: "Jako fanatik do fami-chiki odevzdej 3 podniky Maloobchod za odměnu 15 mincí.",
    },
    {
        title: "Malý pasivní příjem",
        activation: "3 x [industry] (6-) / 3x [agriculture] (6-) / 3x [cow] (6-)",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 5,
        description:
            "Pokud má hráč na tahu 3+ kopií podniků typu [industry],  [agriculture] nebo [cow] s aktivační hodnotou 6-,  může je investovat a odevzdat výměnou za tuto kartu\n\nPasivní příjem\nVlastník této karty si na začátku každého kola vezme z banky 3 mince.",
    },
    {
        title: "Velký pasivní příjem",
        activation: "4 x [industry] (7+) / 4x [agriculture] (7+)",
        deckType: DeckTypeEnum.Big,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 10,
        description:
            "Pokud má hráč na tahu 4+ kopií podniků typu [industry] nebo [agriculture] s aktivační hodnotou 7+,  může je investovat a odevzdat výměnou za tuto kartu\n\nPasivní příjem\nVlastník této karty si na začátku každého kola vezme z banky 10 mincí.",
    },
    {
        title: "Rozvinutý dopravní sektor ",
        activation: "",
        deckType: DeckTypeEnum.Big,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 0,
        description:
            "Má-li hráč na tahu aktivovaný přístav, nádraží i letiště, může si vybrat a postavit 1 další [landmark] objekt.",
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
