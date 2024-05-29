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
import ActorCard, { ActorCardBackFace } from "../gameComponents/ActorCard";

export type ActorCardsPrintControlsProps = PrintControlProps;

export default function ActorCardsPrintControls({
    className,
    paperSize,
    cardSize,
    pageOrientation,
    pageMarginsMm,
    bleedMm,
    gapMm,
    pageLabelPosition,
}: ActorCardsPrintControlsProps) {
    const [copyCount, setCopyCount] = useState(8);
    const printMarkerSizeMm = bleedMm > 0 ? 1.5 : 0;
    const items = range(copyCount).map((copyIndex) => ({
        slug: String(copyIndex),
        bleedMm,
        size: cardSize,
        forPrint: true,
        className: "relative",
    }));
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
                    label="Copy count"
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
                        Component={ActorCard}
                        items={items}
                        itemsPerPage={cardsPerPage}
                        pageContentProps={{ style: { gap: `${gapMm[1]}mm ${gapMm[0]}mm` } }}
                        frontFacePrintPageProps={{
                            size: paperSize,
                            orientation: pageOrientation,
                            bleedInMm: 0,
                            marginsInMm: pageMarginsMm,
                        }}
                        label="Blank Actor Cards"
                        labelPosition={pageLabelPosition}
                    />
                </div>
            </Print>
        </div>
    );
}
