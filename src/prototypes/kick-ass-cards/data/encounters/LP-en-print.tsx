import { useState } from "react";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import Clock from "../../components/Clock";
import ActorCard, { ActorCardBackFace } from "../../components/gameComponents/ActorCard";
import AssetCard, { AssetCardBackFace } from "../../components/gameComponents/AssetCard";
import PaperMini from "../../components/gameComponents/PaperMini";
import ChunkedPages from "../../components/print/ChunkedPages";
import {
    actors,
    clocks,
    defaultActorProps,
    defaultClockProps,
    defaultEffectProps,
    assets,
    effects,
    defaultAssetProps,
} from "./LP-common-en";
import Button from "../../components/controls/Button";
import PaperCraftBox from "../../components/PaperCraftBox";
import { cardSizes } from "../../../../components/print/paperSizes";
import Icon from "../../components/Icon";
import CardBox from "../../../../components/print/CardBox";
import EffectCard, { EffectCardBackFace } from "../../components/gameComponents/EffectCard";

const sizePerPageMap = {
    small: 4 * 4,
    medium: 3 * 3,
};
const effectItems = multiplyByCount(
    Object.values(effects).map((item) => ({
        ...defaultEffectProps,
        count: 1,
        ...item,
        bleedMm: 3,
        className: "relative -m-[3mm]",
    })),
    "count",
    defaultCountAdapter
);
const assetItems = multiplyByCount(Object.values(assets), "count", defaultCountAdapter).map((item) => ({
    ...defaultAssetProps,
    ...item,
    bleedMm: 3,
    className: "relative -m-[3mm]",
}));
const actorItems = Object.values(actors).map((item) => ({
    ...defaultActorProps,
    ...item,
    bleedMm: 3,
    className: "relative -m-[3mm]",
}));

const sections = ["Actors", "Assets", "PCs", "Counters", "Effects", "Boxes"] as const;
const defaultSectionVisibility = {
    Actors: true,
    Assets: true,
    PCs: true,
    Counters: true,
    Effects: true,
    Boxes: true,
};

const boxSafetyMargin = 5;

export default function LPCardPages() {
    const [displayedSections, setDisplayedSections] = useState(defaultSectionVisibility);
    return (
        <>
            <div className="flex-1 shrink-0 basis-full w-full print:hidden flex flex-row gap-2">
                {sections.map((section) => (
                    <Button
                        variant="text"
                        color={displayedSections[section as keyof typeof displayedSections] ? "success" : "primary"}
                        key={section}
                        className="appearance-none bg-transparent"
                        onClick={() =>
                            setDisplayedSections((displayedSections) => ({
                                ...displayedSections,
                                [section as keyof typeof displayedSections]:
                                    !displayedSections[section as keyof typeof displayedSections],
                            }))
                        }
                    >
                        {section}
                    </Button>
                ))}
            </div>

            {displayedSections["Assets"] && (
                <ChunkedPages
                    Component={AssetCard}
                    BackFaceComponent={AssetCardBackFace}
                    items={assetItems}
                    itemsPerPage={sizePerPageMap.small}
                    frontFacePrintPageProps={{
                        bleedInMm: 10,
                        contentClassName: "p-[3mm]",
                    }}
                    backFacePrintPageProps={{
                        bleedInMm: 0,
                        contentClassName: "p-[3mm]",
                    }}
                    label="Assets"
                />
            )}
            {displayedSections["Actors"] && (
                <ChunkedPages
                    Component={ActorCard}
                    BackFaceComponent={ActorCardBackFace}
                    items={actorItems.map((item) => ({
                        ...defaultActorProps,
                        ...item,
                    }))}
                    itemsPerPage={sizePerPageMap.medium}
                    frontFacePrintPageProps={{
                        bleedInMm: 0,
                        contentClassName: "p-[3mm]",
                    }}
                    backFacePrintPageProps={{
                        bleedInMm: 0,
                        contentClassName: "p-[3mm]",
                    }}
                    label="Actors"
                />
            )}
            {displayedSections["PCs"] && (
                <PrintPage key={"action-deck-page"}>
                    <div className="flex flex-wrap content-center items-center justify-center">
                        <ActorCard
                            {...defaultActorProps}
                            bleedMm={3}
                            className="m-[-3mm]"
                            name="Amara"
                            notes="Uses her ankh to control drones for reconnaissance and attack"
                            occupation="Mercenary"
                            threat="Attacks with a laser sun gun"
                            toughness={4}
                            currentToughness={4}
                            hideCounter
                            imageUri="/LP/characters/amara.png"
                        >
                            <PrintMarkerCorners />
                        </ActorCard>
                        <ActorCard
                            {...defaultActorProps}
                            bleedMm={3}
                            className="m-[-3mm]"
                            name="Holden Cantos"
                            occupation="Handyman"
                            threat="Boosts turbine to burn stuff and melt metal"
                            notes="Builds drones for recon and attack"
                            toughness={4}
                            currentToughness={4}
                            hideCounter
                            imagePosition="top"
                            imageUri="/LP/characters/holden.png"
                        >
                            <PrintMarkerCorners />
                        </ActorCard>
                        <ActorCard
                            {...defaultActorProps}
                            bleedMm={3}
                            className="m-[-3mm]"
                            name="L'Anaes"
                            occupation="Mercenary"
                            threat="Special: Release mind affecting spores"
                            notes="Fearless, Simple minded, Badly healed broken bone"
                            toughness={4}
                            currentToughness={4}
                            hideCounter
                            imagePosition="top"
                            imageUri="/LP/characters/lanaes.png"
                        >
                            <PrintMarkerCorners />
                        </ActorCard>
                        <PaperMini
                            className="ml-4 mt-10"
                            imageUri="/LP/characters/holden.png"
                            baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                            baseContent="Holden"
                            imageStyle={{ backgroundPosition: "center bottom" }}
                            backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                            backBaseContent="Holden"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            className="mt-10"
                            imageUri="/LP/characters/amara.png"
                            baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                            baseContent="Amara"
                            imageStyle={{ backgroundPosition: "center bottom" }}
                            backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                            backBaseContent="Amara"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            className="mt-10"
                            imageUri="/LP/characters/lanaes.png"
                            baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                            baseContent="L'Anaes"
                            imageStyle={{ backgroundPosition: "center bottom" }}
                            backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                            backBaseContent="L'Anaes"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            className="mt-10"
                            imageUri="/LP/characters/drones.png"
                            baseClassName="pt-2 bg-kac-cloth text-white text-center"
                            baseContent="Drones"
                            imageStyle={{ backgroundPosition: "center bottom" }}
                            backBaseClassName="pt-2 bg-kac-cloth text-white text-center"
                            backBaseContent="Drones"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            className="mt-10"
                            imageUri="/LP/characters/scarabeus.png"
                            baseClassName="pt-2 bg-kac-cloth text-white text-center"
                            baseContent="Scarabeus"
                            imageStyle={{ backgroundPosition: "center bottom" }}
                            backBaseClassName="pt-2 bg-kac-cloth text-white text-center"
                            backBaseContent="Scarabeus"
                            baseWidth="0.5in"
                            height="1in"
                            width="1in"
                        />
                        <div className="text-xs font-kacHeading text-kac-iron w-full text-center mt-2 z-10">
                            Player characters
                        </div>
                    </div>
                </PrintPage>
            )}
            {displayedSections["Counters"] && (
                <ChunkedPages
                    Component={Clock}
                    items={Object.values(clocks).map((item) => ({
                        ...defaultClockProps,
                        className: undefined,
                        ...item,
                    }))}
                    itemsPerPage={sizePerPageMap.medium}
                    frontFacePrintPageProps={{
                        bleedInMm: 0,
                        contentClassName: "p-[3mm]",
                    }}
                    backFacePrintPageProps={{
                        bleedInMm: 0,
                        contentClassName: "p-[3mm]",
                    }}
                    label="Counters"
                />
            )}
            {displayedSections["Effects"] && (
                <ChunkedPages
                    Component={EffectCard}
                    BackFaceComponent={EffectCardBackFace}
                    items={effectItems}
                    itemsPerPage={sizePerPageMap.small}
                    frontFacePrintPageProps={{
                        bleedInMm: 0,
                        contentClassName: "p-[3mm]",
                    }}
                    backFacePrintPageProps={{
                        bleedInMm: 0,
                        contentClassName: "p-[3mm]",
                    }}
                    label="Effects"
                />
            )}
            {displayedSections["Boxes"] && (
                <>
                    <PrintPage bleedInMm={0} contentClassName="w-full h-full">
                        <PaperCraftBox
                            contentWidth={cardSizes["Mini European"].mm[0] + boxSafetyMargin}
                            contentHeight={cardSizes["Mini European"].mm[1] + boxSafetyMargin}
                            contentDepth={35}
                            classNameVisible="bg-kac-gold-dark"
                            bendStyles={{ borderColor: "#cd831a" }}
                            contentLidOutsideTop={
                                <div className="h-full w-full flex flex-col justify-center items-center ">
                                    <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                                        <div
                                            className={
                                                "w-8/12 aspect-square rounded-full border-[0.2mm] border-kac-gold-darker absolute bg-kac-gold-light"
                                            }
                                        />
                                        <Icon icon="chest" className={"text-kac-gold-darker h-10 relative z-1 mt-2"} />
                                        <div className="font-kacBody text-kac-gold-darker text-xs text-center relative z-1">
                                            Assets
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </PrintPage>
                    <PrintPage bleedInMm={0} contentClassName="w-full h-full">
                        <PaperCraftBox
                            contentWidth={cardSizes["Mini European"].mm[0] + boxSafetyMargin}
                            contentHeight={cardSizes["Mini European"].mm[1] + boxSafetyMargin}
                            contentDepth={35}
                            classNameVisible="bg-kac-skin-light"
                            bendStyles={{ borderColor: "#f7adae" }}
                            contentLidOutsideTop={
                                <div className="h-full w-full flex flex-col justify-center items-center ">
                                    <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                                        <div
                                            className={
                                                "text-kac-blood w-8/12 aspect-square rounded-full border-[0.2mm] border-skin-dark absolute bg-kac-blood-light"
                                            }
                                        />
                                        <Icon
                                            icon="heartBeats"
                                            className={"text-kac-skin-light h-10 relative z-1 mt-2"}
                                        />
                                        <div className="font-kacBody text-kac-skin-light text-xs text-center relative z-1">
                                            Effects
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </PrintPage>
                    <PrintPage bleedInMm={0} contentClassName="w-full h-full">
                        <CardBox
                            contentWidth={cardSizes["Mini European"].mm[0] + boxSafetyMargin}
                            contentHeight={cardSizes["Mini European"].mm[1] + boxSafetyMargin}
                            contentDepth={35}
                            classNamePartVisible="bg-kac-skin-light"
                            bendStyles={{
                                top: { borderColor: "#f7adae" },
                                right: { borderColor: "#f7adae" },
                                bottom: { borderColor: "#f7adae" },
                                left: { borderColor: "#f7adae" },
                            }}
                            cutStyles={{
                                top: { borderColor: "#f7adae" },
                                right: { borderColor: "#f7adae" },
                                bottom: { borderColor: "#f7adae" },
                                left: { borderColor: "#f7adae" },
                            }}
                            contentTop={
                                <div className="h-full w-full flex flex-col justify-center items-center ">
                                    <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                                        <div
                                            className={
                                                "text-kac-blood w-8/12 aspect-square rounded-full border-[0.2mm] border-skin-dark absolute bg-kac-blood-light"
                                            }
                                        />
                                        <Icon
                                            icon="heartBeats"
                                            className={"text-kac-skin-light h-10 relative z-1 mt-2"}
                                        />
                                        <div className="font-kacBody text-kac-skin-light text-xs text-center relative z-1">
                                            Effects
                                        </div>
                                    </div>
                                </div>
                            }
                            contentFront={
                                <div className="h-full w-full flex flex-col justify-center items-center ">
                                    <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                                        <div
                                            className={
                                                "text-kac-blood w-8/12 aspect-square rounded-full border-[0.2mm] border-skin-dark absolute bg-kac-blood-light"
                                            }
                                        />
                                        <Icon
                                            icon="heartBeats"
                                            className={"text-kac-skin-light h-10 relative z-1 mt-2"}
                                        />
                                        <div className="font-kacBody text-kac-skin-light text-xs text-center relative z-1">
                                            Effects
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </PrintPage>
                    <PrintPage bleedInMm={0} contentClassName="w-full h-full">
                        <PaperCraftBox
                            contentWidth={cardSizes["Bridge"].mm[0] + boxSafetyMargin}
                            contentHeight={cardSizes["Bridge"].mm[1] + boxSafetyMargin}
                            contentDepth={25}
                            classNameVisible="bg-kac-monster"
                            bendStyles={{ borderColor: "#1aa62b" }}
                            contentLidOutsideTop={
                                <div className="h-full w-full flex flex-col justify-center items-center ">
                                    <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                                        <div
                                            className={
                                                "w-8/12 aspect-square rounded-full border-[0.2mm] border-kac-monster-dark absolute bg-[#daffd6]"
                                            }
                                        />
                                        <Icon
                                            icon="doubleFaceMask"
                                            className={"text-kac-monster-dark h-10 relative z-1 mt-2"}
                                        />
                                        <div className="font-kacBody text-kac-monster-dark text-xs text-center relative z-1">
                                            Actors
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </PrintPage>
                </>
            )}
        </>
    );
}
