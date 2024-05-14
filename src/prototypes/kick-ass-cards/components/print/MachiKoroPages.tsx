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
import "./MachiKoro.css";
import LidBox from "../../../../components/print/LidBox";
import { cardSizes } from "../../../../components/print/paperSizes";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";

const buildings: BuildingCardProps[] = [
    {
        title: "Malý pohostinský řetězec",
        imageUri: "/machi-koro/illustrations/restaurants.png",
        activation: "3× [food] (6-)",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 12,
        description: "Odevzdejte 3× [food] (6-) a vezměte si 12C z banku.",
    },
    {
        title: "Malý pohostinský řetězec",
        imageUri: "/machi-koro/illustrations/restaurants.png",
        activation: "3× [food] (6-)",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 12,
        description: "Odevzdejte 3× [food] (6-) a vezměte si 12C z banku.",
    },
    {
        title: "Velký pohostinský řetězec",
        imageUri: "/machi-koro/illustrations/big-restaurant.png",
        activation: "4× [food] (7+)",
        deckType: DeckTypeEnum.Big,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 24,
        description: "Odevzdejte 4× [food] (7+) a vezměte si 24C z banku.",
    },
    {
        title: "Sousedská výměna",
        imageUri: "/machi-koro/illustrations/giving-agreement.png",
        activation: "2× [card]",
        deckType: DeckTypeEnum.Landmark,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 0,
        description: "Odevzdejte 2 libovolné podniky a postavte zdarma 1 podnik z obecné nabídky.",
    },
    {
        title: "Yakuza úřaduje",
        imageUri: "/machi-koro/illustrations/yakuza.png",
        activation: "1× [special]",
        deckType: DeckTypeEnum.Landmark,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 15,
        description: "Máte-li alespoň 3× [special] , jednu odevzdejte a vezměte si 15C z banku.",
    },
    {
        title: "Konbini nadšenec",
        imageUri: "/machi-koro/illustrations/8-12.png",
        activation: "3× Samoobsluha",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 15,
        description: "Odevzdejte 3× Samoobsluha a vezměte si 15C z banku.",
    },
    {
        title: "Malý pasivní příjem",
        imageUri: "/machi-koro/illustrations/money.png",
        activation: "3× [industry] / [agriculture] / [cow] (6-)",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 5,
        description:
            "Odevzdejte 3× stejný podnik [industry] / [agriculture] / [cow] (6-) a získejte… \n\n Pasivní příjem \n Na začátku každého kola si vezměte 3C z banku.",
    },
    {
        title: "Velký pasivní příjem",
        imageUri: "/machi-koro/illustrations/stack-money.png",
        activation: "4× [industry] / [agriculture] (7+)",
        deckType: DeckTypeEnum.Big,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 10,
        description:
            "Odevzdejte 4× stejný podnik [industry] / [agriculture] (7+) a získejte… \n\n Pasivní příjem \n Na začátku každého kola si vezměte 10C z banku.",
    },
    {
        title: "Rozvinutý dopravní sektor",
        imageUri: "/machi-koro/illustrations/transport.png",
        activation: "",
        deckType: DeckTypeEnum.Big,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 0,
        description: "Máte-li aktivovaný Přístav, Nádraží i Letiště, zdarma postavte 1 další dominantu.",
    },
    {
        title: "Sousedská výměna",
        imageUri: "/machi-koro/illustrations/giving-agreement.png",
        activation: "2× [card]",
        deckType: DeckTypeEnum.Landmark,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 0,
        description: "Odevzdejte 2 libovolné podniky a postavte zdarma 1 podnik z obecné nabídky.",
    },
    {
        title: "Sousedská výměna",
        imageUri: "/machi-koro/illustrations/giving-agreement.png",
        activation: "2× [card]",
        deckType: DeckTypeEnum.Landmark,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 0,
        description: "Odevzdejte 2 libovolné podniky a postavte zdarma 1 podnik z obecné nabídky.",
    },
    {
        title: "Velký pohostinský řetězec",
        imageUri: "/machi-koro/illustrations/big-restaurant.png",
        activation: "4× [food] (7+)",
        deckType: DeckTypeEnum.Big,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 24,
        description: "Odevzdejte 4× [food] (7+) a vezměte si 24C z banku.",
    },
    {
        title: "Sousedská výměna",
        imageUri: "/machi-koro/illustrations/giving-agreement.png",
        activation: "2× [card]",
        deckType: DeckTypeEnum.Landmark,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 0,
        description: "Odevzdejte 2 libovolné podniky a postavte zdarma 1 podnik z obecné nabídky.",
    },
    {
        title: "Yakuza úřaduje",
        imageUri: "/machi-koro/illustrations/yakuza.png",
        activation: "1× [special]",
        deckType: DeckTypeEnum.Landmark,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 15,
        description: "Máte-li alespoň 3× [special] , jednu odevzdejte a vezměte si 15C z banku.",
    },
    {
        title: "Konbini nadšenec",
        imageUri: "/machi-koro/illustrations/8-12.png",
        activation: "3× Samoobsluha",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 15,
        description: "Odevzdejte 3× Samoobsluha a vezměte si 15C z banku.",
    },
    {
        title: "Malý pasivní příjem",
        imageUri: "/machi-koro/illustrations/money.png",
        activation: "3× [industry] / [agriculture] / [cow] (6-)",
        deckType: DeckTypeEnum.Small,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 5,
        description:
            "Odevzdejte 3× stejný podnik [industry] / [agriculture] / [cow] (6-) a získejte… \n\n Pasivní příjem \n Na začátku každého kola si vezměte 3C z banku.",
    },
    {
        title: "Velký pasivní příjem",
        imageUri: "/machi-koro/illustrations/stack-money.png",
        activation: "4× [industry] / [agriculture] (7+)",
        deckType: DeckTypeEnum.Big,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 10,
        description:
            "Odevzdejte 4× stejný podnik [industry] / [agriculture] (7+) a získejte… \n\n Pasivní příjem \n Na začátku každého kola si vezměte 10C z banku.",
    },
    {
        title: "Velký pasivní příjem",
        imageUri: "/machi-koro/illustrations/stack-money.png",
        activation: "4× [industry] / [agriculture] (7+)",
        deckType: DeckTypeEnum.Big,
        type: BuildingTypeEnum.PublicTender,
        cost: 0,
        reward: 10,
        description:
            "Odevzdejte 4× stejný podnik [industry] / [agriculture] (7+) a získejte… \n\n Pasivní příjem \n Na začátku každého kola si vezměte 10C z banku.",
    },
];

const safetyMargin = 5;

export default function MachiKoroPages() {
    return (
        <>
            <PrintPage
                key={"page-lidbox"}
                showControls
                orientation="landscape"
                contentClassName="flex flex-col !justify-center !items-center"
            >
                <div className="relative" style={{ width: 216 + "mm", height: 176 + "mm" }}>
                    <PrintMarkerCorners bleedMm={3} />
                    <img
                        src="/machi-koro/rules-outside.png"
                        className="block w-full h-full"
                        style={{ maxWidth: "unset" }}
                    />
                </div>
            </PrintPage>
            <PrintPage
                key={"page-lidbox"}
                showControls
                orientation="landscape"
                contentClassName="flex flex-col !justify-center !items-center"
            >
                <div className="relative" style={{ width: 216 + "mm", height: 176 + "mm" }}>
                    <PrintMarkerCorners bleedMm={3} />
                    <img
                        src="/machi-koro/rules-inside.png"
                        className="block  w-full h-full"
                        style={{ maxWidth: "unset" }}
                    />
                </div>
            </PrintPage>
            <PrintPage key={"page-lidbox"} showControls>
                <LidBox
                    showLabels
                    contentWidth={cardSizes["Bridge"].mm[0] + safetyMargin}
                    contentHeight={cardSizes["Bridge"].mm[1] + safetyMargin}
                    contentDepth={20}
                    classNamePartVisible="bg-[#e6a435]"
                />
            </PrintPage>
            <PrintPage size="A4" bleedInMm={0} showControls>
                <MdxArticle mdx={RulesMdx} className={"leading-tight columns-2 prose-sm prose-h1:text-2xl"} />
            </PrintPage>
            <ChunkedPages
                Component={BuildingCard}
                BackFaceComponent={BuildingCardBackFace}
                items={buildings}
                itemsPerPage={3 * 3}
                frontFacePrintPageProps={{
                    // orientation: "landscape",
                    bleedInMm: 0,
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
