import { twMerge } from "tailwind-merge";
import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import outcomes from "../../data/outcomeDeck";
import ChunkedPages from "./ChunkedPages";
import OutcomeCard, { OutcomeCardBackFace } from "../gameComponents/OutcomeCard";
import { getPaperFitCountByFormat } from "../../../../components/print/PrintPage/PrintPage";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { flatten, range } from "lodash";
import { PrintControlProps } from "./printControlsTypes";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import EffectCard, { EffectCardBackFace } from "../gameComponents/EffectCard";
import effects from "../../data/effects-deck-en";
import Clock from "../Clock";

export type ClocksCardsPrintControlsProps = PrintControlProps;

export default function ClocksCardsPrintControls({
    className,
    paperSize,
    cardSize,
    pageOrientation,
    pageMarginsMm,
    bleedMm,
    gapMm,
    pageLabelPosition,
}: ClocksCardsPrintControlsProps) {
    const [copyCount, setCopyCount] = useState(1);
    const printMarkerSizeMm = bleedMm > 0 ? 1.5 : 0;
    const items = range(copyCount)
        .map((setIndex) =>
            [4, 4, 6, 6, 8, 8, 10, 12].map((total) => ({
                key: `${setIndex + 1}-${total}`,
                forPrint: true,
                total,
                current: 0,
                bleedMm,
                size: cardSize,
                className: "relative",
            }))
        )
        .flat()
        .sort((a, b) => a.total - b.total);

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
                    value={copyCount}
                    onChange={(event) => setCopyCount(event.target.valueAsNumber || 1)}
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
                        Component={Clock}
                        items={items}
                        itemsPerPage={cardsPerPage}
                        pageContentProps={{ style: { gap: `${gapMm[1]}mm ${gapMm[0]}mm` } }}
                        frontFacePrintPageProps={{
                            size: paperSize,
                            orientation: pageOrientation,
                            bleedInMm: 0,
                            marginsInMm: pageMarginsMm,
                        }}
                        label="Clocks"
                        labelPosition={pageLabelPosition}
                    />
                </div>
            </Print>
        </div>
    );
}
