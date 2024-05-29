import { twMerge } from "tailwind-merge";
import ChunkedPages from "./ChunkedPages";
import { getPaperFitCountByFormat } from "../../../../components/print/PrintPage/PrintPage";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import { PrintControlProps } from "./printControlsTypes";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import EffectCard, { EffectCardBackFace } from "../gameComponents/EffectCard";
import effects from "../../data/effects-deck-en";

export type EffectCardsPrintControlsProps = PrintControlProps;

export default function EffectCardsPrintControls({
    className,
    paperSize,
    cardSize,
    pageOrientation,
    pageMarginsMm,
    bleedMm,
    gapMm,
    pageLabelPosition,
}: EffectCardsPrintControlsProps) {
    const [playerCount, setPlayerCount] = useState(1);
    const printMarkerSizeMm = bleedMm > 0 ? 1.5 : 0;
    const items = range(playerCount)
        .map((playerIndex) =>
            effects.map((item) => ({
                ...item,
                slug: `${playerIndex + 1}-${item.slug}`,
                bleedMm,
                size: cardSize,
                className: "relative",
            }))
        )
        .flat()
        .sort((a, b) => a.title.localeCompare(b.title));
    const cardsPerPage = getPaperFitCountByFormat(
        paperSize,
        pageOrientation,
        cardSize,
        "portrait",
        pageMarginsMm,
        bleedMm,
        printMarkerSizeMm
    );

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4">
                <Input
                    label="Player count"
                    type="number"
                    value={playerCount}
                    onChange={(event) => setPlayerCount(event.target.valueAsNumber || 1)}
                    className="w-32"
                />
            </div>
            <ToggleData data={{ cardsPerPage, items }} initialCollapsed className="print:hidden mt-4" />
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
                    <ChunkedPages
                        Component={EffectCard}
                        BackFaceComponent={EffectCardBackFace}
                        items={items}
                        itemsPerPage={cardsPerPage}
                        pageContentProps={{ style: { gap: `${gapMm[1]}mm ${gapMm[0]}mm` } }}
                        frontFacePrintPageProps={{
                            size: paperSize,
                            orientation: pageOrientation,
                            bleedInMm: 0,
                            marginsInMm: pageMarginsMm,
                        }}
                        backFacePrintPageProps={{
                            size: paperSize,
                            orientation: pageOrientation,
                            bleedInMm: 0,
                            marginsInMm: pageMarginsMm,
                        }}
                        label="Effects"
                        labelPosition={pageLabelPosition}
                    />
                </div>
            </Print>
        </div>
    );
}
