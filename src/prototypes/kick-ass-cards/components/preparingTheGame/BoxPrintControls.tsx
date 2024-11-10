import { twMerge } from "tailwind-merge";
import ToggleData from "../../../../components/DataToggle";
import React, { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { usePrintControlsStore } from "./PaperAndCardControls";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import LidBox from "../../../../components/print/LidBox";
import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import Rect from "../../../../components/print/Rect";
import SvgLidBox from "../../../../components/print/SvgLidBox";
import SvgLidBox2 from "../../../../components/print/SvgLidBox2";
import DataPreview from "../../../../components/DataPreview";

export type BoxPrintControlsProps = {
    className?: string;
};

export default function BoxPrintControls({ className }: BoxPrintControlsProps) {
    const { defaultCardSize, defaultPaperSize, defaultPageMarginsMm } = usePrintControlsStore();

    const fittingMargin = 1; // mm; space between content and dividers
    const dividerThickness = 1; // mm
    const cardBoardThickness = 1; // mm
    const brochureHeight = paperSizes.A4.mm[0]; // mm; brochure is as tall as the A4 is wide; 210mm
    const brochureWidth = Math.ceil(paperSizes.A4.mm[1] / 3); // mm; brochure is 1/3 of the A4 height

    const contentWidth = brochureHeight + 2 * fittingMargin + 2 * dividerThickness; // mm; must fit a brochure 210x100mm on the back

    const brochuresTotalThickness = 20; // mm; total thickness of all brochures stacked at the back of the box
    const cardStackSpace = 100; // mm; could be 100-120mm
    const contentHeight =
        brochuresTotalThickness + 2 * fittingMargin + 2 * dividerThickness + cardStackSpace + dividerThickness; // mm; must have a space for brochures 20mm, divider and space for stacks of cards cca 100mm
    const contentDepth = 70; // mm; the cards should peek from the box so that you can read the name of the card

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="flex flex-col items-center w-full">
                {/* TODO: Download button */}
                <DataPreview
                    data={{
                        fittingMargin,
                        dividerThickness,
                        cardBoardThickness,
                        brochureHeight,
                        brochureWidth,
                        contentWidth,
                        contentHeight,
                        contentDepth,
                    }}
                />
                <SvgLidBox2
                    contentWidth={contentWidth}
                    contentHeight={contentHeight}
                    contentDepth={contentDepth}
                    paperThickness={1}
                    // className="rotate-90 scale-[1.35] relative top-[200px] left-[-25px]"
                />
                <SvgLidBox
                    contentWidth={contentWidth}
                    contentHeight={contentHeight}
                    contentDepth={contentDepth}
                    paperThickness={1}
                    className="relative scale-[1.5] translate-y-1/2"
                    // className="rotate-90 scale-[1.35] relative top-[200px] left-[-25px]"
                />
            </div>
        </div>
    );
}
