import { twMerge } from "tailwind-merge";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import Card, { CardHeader } from "../gameComponents/Card";
import { PaperProps } from "../../../../components/print/Paper/Paper";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import ColorBars from "../../../../components/print/PrintMarker/ColorBars";
import CounterCard, { CounterCardBackFace } from "../gameComponents/CounterCard";
import ActorCard, { ActorCardBackFace } from "../gameComponents/ActorCard";
import { usePrintControlsStore } from "./PaperAndCardControls";
import AssetCard from "../gameComponents/AssetCard";

import { assetMap as assets } from "../../data/assets-en-deck";

export type StinyKlasteraPrintControlsProps = {
    className?: string;
};

type ImageCardProps = {
    imageUri: string;
    size?: PaperProps["size"];
} & Omit<PaperProps, "size">;

export default function StinyKlasteraPrintControls({ className }: StinyKlasteraPrintControlsProps) {
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
                                imageUri="/KAC/encounters/stiny_klastera/brother_pavel_actor.png"
                                name="Bratr Pavel"
                                notes="Chlap jak hora"
                                toughness={6}
                                threat="Útočí na blízko palicí za 2&nbsp;Zranění, nebo švihem na všechny v zóně za 1&nbsp;Zranění."
                                reward="Klíče od kláštera"
                                deck="Příběhy Husitů"
                            />
                            <CounterCard
                                {...cardProps}
                                icon="/KAC/heartbeat.png"
                                title="Zdraví pacienta"
                                note="Pacient pomalu umírá (-1&nbsp;za kolo)."
                                threat="Pro pacienta může být už pozdě"
                                total={12}
                                current={12}
                                deck="Příběhy Husitů"
                            />
                            <CounterCard
                                {...cardProps}
                                icon="/KAC/counters/drop.png"
                                title="Vynést splašky"
                                threat="Splašky jsou nechutné a slabá vůle způsobí Utrpení (Distress)"
                                total={4}
                                current={4}
                                deck="Příběhy Husitů"
                            />
                            <CounterCard
                                {...cardProps}
                                icon="/KAC/blood.png"
                                title="Vytřít čekárnu"
                                threat="Těžko říct, co se tu stalo, ale krev je všude. Hrozí uklouznutí Zranění (Injury)"
                                total={4}
                                current={4}
                                deck="Příběhy Husitů"
                            />
                            <CounterCard
                                {...cardPropsSecondHalf}
                                icon="/KAC/counters/danger.png"
                                title="Pohřbít mrtvoly"
                                threat="Neohrabaná manipulace s mrtvolou způsobí praskání boláků. Hrozí nakažení morem: Zkáza (Doom)"
                                total={4}
                                current={4}
                                deck="Příběhy Husitů"
                            />
                            <ActorCard
                                {...cardPropsSecondHalf}
                                imageUri="/KAC/actors/medieval/dog.png"
                                name="Huňatý pes"
                                occupation="Loyální a dobře vycvyčený pes"
                                toughness={2}
                                threat="Útočí na blízko za 1&nbsp;Zranění."
                                reward="Přidá se k družíně, když ho vysvobodí"
                                deck="Příběhy Husitů"
                            />
                            <ActorCard
                                {...cardPropsSecondHalf}
                                imageUri="/KAC/encounters/stiny_klastera/sister_tereza_actor.png"
                                name="Sestra Terezie"
                                toughness={3}
                                threat="Brání se házením jedovatých lektvarů za 1&nbsp;Utrpení všem v zóně"
                                reward="2x Obvazy"
                                deck="Příběhy Husitů"
                            />
                            <ActorCard
                                {...cardPropsSecondHalf}
                                imageUri="/KAC/encounters/stiny_klastera/abbot_actor.png"
                                name="Opat Radomír"
                                occupation="Zázračný léčitel"
                                toughness={4}
                                reward="Skalpel, Modlitební knížka, Herbal Remedy"
                                deck="Příběhy Husitů"
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
                                imageUri="/KAC/counters/morale.png"
                                name="Přisluhovači"
                                threat="Útočí na různé postavy za 1&nbsp;Zranění čímkoliv, co jim padne do ruky za každý bod Odolnosti"
                                toughness={8}
                                deck="Příběhy Husitů"
                            />
                            <ActorCard
                                {...cardProps}
                                imageUri="/KAC/actors/wolf.png"
                                name="Děsivá zvířata"
                                toughness={4}
                                threat="Útočí na různé postavy za 1&nbsp;Zranění kousnutím za každý bod Odolnosti"
                                reward="Jed"
                                deck="Příběhy Husitů"
                            />
                            <ActorCard
                                {...cardProps}
                                imageUri="/KAC/encounters/stiny_klastera/wounded.png"
                                name="Nebozí pacienti"
                                threat="Útočí na různé postavy za 1&nbsp;Zranění čímkoliv, co jim padne do ruky za každý DRUHÝ bod Odolnosti"
                                reward="2x Obvazy, 2x Byliny"
                                toughness={8}
                                deck="Příběhy Husitů"
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
