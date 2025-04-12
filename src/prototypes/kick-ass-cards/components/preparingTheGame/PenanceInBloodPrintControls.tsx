import { twMerge } from "tailwind-merge";
import { useState } from "react";
import Input from "../controls/Input";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps } from "./printControlUtils";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import ColorBars from "../../../../components/print/PrintMarker/ColorBars";
import CounterCard, { CounterCardBackFace } from "../gameComponents/CounterCard";
import ActorCard, { ActorCardBackFace } from "../gameComponents/ActorCard";
import { usePrintControlsStore } from "./PaperAndCardControls";
import { AssetCardBackFace } from "../gameComponents/AssetCard";

export type PenanceInBloodPrintControlsProps = {
    className?: string;
};

export default function PenanceInBloodPrintControls({ className }: PenanceInBloodPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const { defaultBleedMm, defaultCardSize, flipSecondHalf } = usePrintControlsStore();
    const cardProps = {
        bleedMm: defaultBleedMm,
        size: defaultCardSize,
    };
    const cardPropsSecondHalf = {
        bleedMm: defaultBleedMm,
        size: defaultCardSize,
        style: {
            rotate: flipSecondHalf ? "180deg" : "0deg",
        },
    };

    const mergedChunkedPagesProps = {
        ...chunkedPagesProps,
        frontFacePrintPageProps: {
            ...chunkedPagesProps.frontFacePrintPageProps,
            className: twMerge(
                chunkedPagesProps.frontFacePrintPageProps?.className,
                "[&:nth-child(even)>div>div]:flex-row-reverse"
            ),
        },
    };
    const {
        label,
        labelPosition,
        showColorBars,
        frontFacePrintPageProps,
        backFacePrintPageProps,
        frontFacePageContentProps = mergedChunkedPagesProps.pageContentProps,
        backFacePageContentProps = mergedChunkedPagesProps.pageContentProps,
        frontFacePageContentClassName = mergedChunkedPagesProps.pageContentClassName,
        backFacePageContentClassName = mergedChunkedPagesProps.pageContentClassName,
    } = mergedChunkedPagesProps;
    const [copyCount, setCopyCount] = useState(1);

    const totalPages = 4;
    const labelClassName = twMerge(
        "text-xs font-kacHeading text-kac-iron w-full text-center z-10 absolute",
        labelPosition === "bottom" && "bottom-[3mm] print:bottom-[3mm]",
        labelPosition === "top" && "top-[3mm] print:top-[3mm]",
        labelPosition === "left" &&
            "left-[3mm] print:left-[3mm] top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 w-auto",
        labelPosition === "right" &&
            "right-[3mm] print:right-[3mm] top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 w-auto"
    );
    const { children: frontChildren, ...frontFacePrintPagePropsRest } = frontFacePrintPageProps ?? {};
    const { children: backChildren, ...backFacePrintPagePropsRest } = backFacePrintPageProps ?? {};

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4">
                <Input
                    label="Copy count"
                    type="number"
                    value={copyCount}
                    onChange={(event) => setCopyCount(event.target.valueAsNumber || 1)}
                    className="w-32"
                />
            </div>
            <Print
                className="flex flex-col-reverse gap-2"
                buttonProps={{
                    className: "self-center flex flex-row items-center",
                    children: (
                        <>
                            <Icon icon="print" className="w-6 h-6" />
                            &ensp;Print all pages
                        </>
                    ),
                }}
            >
                <div className="flex flex-col items-center w-full">
                    <PrintPage {...frontFacePrintPagePropsRest}>
                        <div
                            {...frontFacePageContentProps}
                            className={twMerge(
                                "relative flex-1 flex flex-wrap content-start items-center justify-center",
                                frontFacePageContentProps?.className,
                                frontFacePageContentClassName
                            )}
                        >
                            <ActorCard
                                {...cardProps}
                                imageUri="/mighty-decks/encounters/penance_in_blood/brother_pavel_actor.png"
                                name="Brother Pavel"
                                notes="A man as strong as an ox"
                                toughness={6}
                                threat="Attacks in melee with a mace for 2&nbsp;Injuries, or a sweep hitting everyone in the zone for 1&nbsp;Injury."
                                reward="Keys to the monastery"
                                deck="Hussite Stories"
                            />
                            <CounterCard
                                {...cardProps}
                                icon="/mighty-decks/heartbeat.png"
                                title="Patient's Health"
                                note="The patient is slowly dying (-1&nbsp;per round)."
                                threat="It may already be too late for the patient"
                                total={12}
                                current={12}
                                deck="Hussite Stories"
                            />
                            <CounterCard
                                {...cardProps}
                                icon="/mighty-decks/counters/drop.png"
                                title="Dispose of Waste"
                                threat="The waste is disgusting, and weak willpower causes Distress."
                                total={4}
                                current={4}
                                deck="Hussite Stories"
                            />
                            <CounterCard
                                {...cardProps}
                                icon="/mighty-decks/blood.png"
                                title="Clean the Waiting Room"
                                threat="Hard to tell what happened here, but there’s blood everywhere. Risk of slipping and Injury."
                                total={4}
                                current={4}
                                deck="Hussite Stories"
                            />
                            <CounterCard
                                {...cardPropsSecondHalf}
                                icon="/mighty-decks/counters/danger.png"
                                title="Bury the Corpses"
                                threat="Clumsy handling of the corpse causes boils to burst. Risk of plague infection: Doom."
                                total={4}
                                current={4}
                                deck="Hussite Stories"
                            />
                            <ActorCard
                                {...cardPropsSecondHalf}
                                imageUri="/mighty-decks/actors/medieval/dog.png"
                                name="Fluffy Dog"
                                occupation="Loyal and well-trained dog"
                                toughness={2}
                                threat="Attacks in melee for 1&nbsp;Injury."
                                reward="Joins the party if freed"
                                deck="Hussite Stories"
                            />
                            <ActorCard
                                {...cardPropsSecondHalf}
                                imageUri="/mighty-decks/encounters/penance_in_blood/sister_tereza_actor.png"
                                name="Sister Tereza"
                                toughness={3}
                                threat="Defends herself by throwing poisonous potions, causing 1&nbsp;Distress to everyone in the zone."
                                reward="2x Bandages"
                                deck="Hussite Stories"
                            />
                            <ActorCard
                                {...cardPropsSecondHalf}
                                imageUri="/mighty-decks/encounters/penance_in_blood/abbot_actor.png"
                                name="Abbot Radomír"
                                occupation="Miraculous healer"
                                toughness={4}
                                reward="Scalpel, Prayer Book, Herbal Remedy"
                                deck="Hussite Stories"
                            />

                            <div className={labelClassName}>
                                {label} 1/{totalPages}
                                {showColorBars ? <ColorBars /> : undefined}
                            </div>
                            {frontChildren}
                        </div>
                    </PrintPage>
                    <PrintPage {...backFacePrintPagePropsRest}>
                        <div
                            {...backFacePageContentProps}
                            className={twMerge(
                                "relative flex-1 flex flex-row-reverse flex-wrap content-start items-center justify-center",
                                backFacePageContentProps?.className,
                                backFacePageContentClassName
                            )}
                        >
                            <ActorCardBackFace {...cardProps} />
                            <CounterCardBackFace {...cardProps} />
                            <CounterCardBackFace {...cardProps} />
                            <CounterCardBackFace {...cardProps} />
                            <ActorCardBackFace {...cardPropsSecondHalf} />
                            <ActorCardBackFace {...cardPropsSecondHalf} />
                            <ActorCardBackFace {...cardPropsSecondHalf} />
                            <CounterCardBackFace {...cardPropsSecondHalf} />
                            <div className={labelClassName}>
                                {label} Back Face 2/{totalPages}
                                {showColorBars ? <ColorBars /> : undefined}
                            </div>
                            {backChildren}
                        </div>
                    </PrintPage>

                    <PrintPage {...frontFacePrintPagePropsRest}>
                        <div
                            {...frontFacePageContentProps}
                            className={twMerge(
                                "relative flex-1 flex flex-wrap content-start items-center justify-center",
                                frontFacePageContentProps?.className,
                                frontFacePageContentClassName
                            )}
                        >
                            <ActorCard
                                {...cardProps}
                                imageUri="/mighty-decks/counters/morale.png"
                                name="Minions"
                                threat="Attack various characters for 1&nbsp;Injury with anything they can get their hands on per point of Toughness."
                                toughness={8}
                                deck="Hussite Stories"
                            />
                            <ActorCard
                                {...cardProps}
                                imageUri="/mighty-decks/actors/wolf.png"
                                name="Terrifying Animals"
                                toughness={4}
                                threat="Attack various characters for 1&nbsp;Injury by biting per point of Toughness."
                                reward="Poison"
                                deck="Hussite Stories"
                            />
                            <ActorCard
                                {...cardProps}
                                imageUri="/mighty-decks/encounters/penance_in_blood/wounded.png"
                                name="Patients"
                                threat="Attack various characters for 1&nbsp;Injury with anything they can get their hands on per every SECOND point of Toughness."
                                reward="2x Bandages, 2x Herbs"
                                toughness={8}
                                deck="Hussite Stories"
                            />

                            <div className={labelClassName}>
                                {label} 3/{totalPages}
                                {showColorBars ? <ColorBars /> : undefined}
                            </div>
                            {frontChildren}
                        </div>
                    </PrintPage>
                    <PrintPage {...backFacePrintPagePropsRest}>
                        <div
                            {...backFacePageContentProps}
                            className={twMerge(
                                "relative flex-1 flex flex-row-reverse flex-wrap content-start items-center justify-center",
                                backFacePageContentProps?.className,
                                backFacePageContentClassName
                            )}
                        >
                            <ActorCardBackFace {...cardProps} />
                            <ActorCardBackFace {...cardProps} />
                            <ActorCardBackFace {...cardProps} />
                            <AssetCardBackFace {...cardProps} />
                            <AssetCardBackFace {...cardPropsSecondHalf} />
                            <AssetCardBackFace {...cardPropsSecondHalf} />
                            <AssetCardBackFace {...cardPropsSecondHalf} />
                            <AssetCardBackFace {...cardPropsSecondHalf} />
                            <div className={labelClassName}>
                                {label} Back Face 4/{totalPages}
                                {showColorBars ? <ColorBars /> : undefined}
                            </div>
                            {backChildren}
                        </div>
                    </PrintPage>
                </div>
            </Print>
        </div>
    );
}
