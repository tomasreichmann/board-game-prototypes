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
import { cardSizes } from "../../../../components/print/paperSizes";
import Rect from "../../../../components/print/Rect";

export type BoxPrintControlsProps = {
    className?: string;
};

export default function BoxPrintControls({ className }: BoxPrintControlsProps) {
    const { defaultCardSize, defaultPaperSize, defaultPageMarginsMm } = usePrintControlsStore();
    const [stackColumnCount, setStackColumnCount] = useState(1);
    const [stackRowCount, setStackRowCount] = useState(1);
    const [stackSizeMm, setStackSizeMm] = useState(10);
    const [contentDepthMm, setContentDepthMm] = useState(10);

    const [cardWidthMm, cardHeightMm] = cardSizes[defaultCardSize].mm;

    const cardMarginMm = 1;
    const paperThicknessMm = 40 / 125;

    const cardSlantHeightMm = Math.sqrt(cardHeightMm ** 2 + contentDepthMm ** 2);
    const blockHeight = cardSlantHeightMm + stackSizeMm + cardMarginMm * 2;
    const blockWidth = cardWidthMm + cardMarginMm * 2;

    const contentWidth = stackColumnCount * blockWidth + (stackColumnCount - 1) * paperThicknessMm;
    const contentHeight = stackRowCount * blockHeight + (stackRowCount - 1) * paperThicknessMm;

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4">
                <Input
                    label="Stack columns"
                    type="number"
                    value={stackColumnCount}
                    onChange={(event) => setStackColumnCount(event.target.valueAsNumber || 1)}
                    className="w-32"
                />
                <Input
                    label="Stack rows"
                    type="number"
                    value={stackRowCount}
                    onChange={(event) => setStackRowCount(event.target.valueAsNumber || 1)}
                    className="w-32"
                />
                <Input
                    label="Stack size (mm)"
                    type="number"
                    value={stackSizeMm}
                    onChange={(event) => setStackSizeMm(event.target.valueAsNumber || 1)}
                    className="w-32"
                />
                <Input
                    label="Box Depth (mm)"
                    type="number"
                    value={contentDepthMm}
                    onChange={(event) => setContentDepthMm(event.target.valueAsNumber || 1)}
                    className="w-32"
                />
            </div>
            <ToggleData
                data={{ boxWidth: stackColumnCount, boxHeight: stackRowCount, contentDepth: contentDepthMm }}
                initialCollapsed
                className="print:hidden mt-4"
            />
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
                    <PrintPage size={defaultPaperSize} marginsInMm={defaultPageMarginsMm}>
                        <LidBox
                            contentDepth={contentDepthMm}
                            contentWidth={contentWidth}
                            contentHeight={contentHeight}
                            contentBottom={
                                <div className="w-full h-full relative">
                                    {range(stackRowCount - 1).map((rowIndex) => (
                                        <div
                                            key={rowIndex}
                                            className="absolute left-0 w-full border-b-[0.2mm] border-kac-steel border-dashed"
                                            style={{
                                                top:
                                                    (rowIndex + 1) * blockHeight +
                                                    (rowIndex + 1) * paperThicknessMm +
                                                    "mm",
                                            }}
                                        />
                                    ))}
                                    {range(stackColumnCount - 1).map((columnIndex) => (
                                        <div
                                            key={columnIndex}
                                            className="absolute top-0 h-full border-r-[0.2mm] border-kac-steel border-dashed"
                                            style={{
                                                left:
                                                    (columnIndex + 1) * blockWidth +
                                                    (columnIndex + 1) * paperThicknessMm +
                                                    "mm",
                                            }}
                                        />
                                    ))}
                                </div>
                            }
                        />
                    </PrintPage>
                    <PrintPage size={defaultPaperSize} marginsInMm={defaultPageMarginsMm}>
                        <Rect widthMm={blockWidth} heightMm={stackSizeMm} cutTop cutRight cutLeft />
                        <Rect widthMm={blockWidth} heightMm={cardHeightMm} cutRight cutLeft bendTop />
                        <Rect widthMm={blockWidth} heightMm={contentDepthMm} cutRight cutLeft bendTop cutBottom />
                    </PrintPage>
                </div>
            </Print>
        </div>
    );
}
