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
import SvgLidBox from "../../../../components/print/SvgLidBox";

export type BoxPrintControlsProps = {
    className?: string;
};

export default function BoxPrintControls({ className }: BoxPrintControlsProps) {
    const { defaultCardSize, defaultPaperSize, defaultPageMarginsMm } = usePrintControlsStore();
    const [stackColumnCount, setStackColumnCount] = useState(2);
    const [stackRowCount, setStackRowCount] = useState(2);
    const [stackSizeMm, setStackSizeMm] = useState(10);
    const [contentDepthMm, setContentDepthMm] = useState(20);

    const [cardWidthMm, cardHeightMm] = cardSizes[defaultCardSize].mm;

    const cardMarginMm = 1;
    const paperThicknessMm = 40 / 125;

    const cardSlantHeightMm = Math.sqrt(cardHeightMm * cardHeightMm - contentDepthMm * contentDepthMm);
    const blockHeight = cardSlantHeightMm + stackSizeMm + cardMarginMm * 2;
    const blockWidth = cardWidthMm + cardMarginMm * 2;

    const contentWidth = stackColumnCount * blockWidth + (stackColumnCount - 1) * paperThicknessMm;
    const contentHeight = stackRowCount * blockHeight;

    const lidWidth = 267;
    const lidDepth = 94.7;
    const lidHeight = 82.1;
    const boxWidth = 262;
    const boxDepth = 89.9;
    const boxHeight = 82.1;

    const svgBoxWidth = 180;
    const svgBoxHeight = 120;
    const svgBoxDepth = 100;

    const sizeMultiplier = 5;

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4">
                <Input
                    label="Stack columns"
                    type="number"
                    value={stackColumnCount}
                    onChange={(event) => setStackColumnCount(event.target.valueAsNumber ?? 1)}
                    className="w-32"
                />
                <Input
                    label="Stack rows"
                    type="number"
                    value={stackRowCount}
                    onChange={(event) => setStackRowCount(event.target.valueAsNumber ?? 1)}
                    className="w-32"
                />
                <Input
                    label="Stack size (mm)"
                    type="number"
                    value={stackSizeMm}
                    onChange={(event) => setStackSizeMm(event.target.valueAsNumber ?? 1)}
                    className="w-32"
                />
                <Input
                    label="Box Depth (mm)"
                    type="number"
                    value={contentDepthMm}
                    onChange={(event) => setContentDepthMm(event.target.valueAsNumber ?? 1)}
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
                    <PrintPage size="A4">
                        <SvgLidBox
                            contentWidth={svgBoxWidth}
                            contentHeight={svgBoxHeight}
                            contentDepth={svgBoxDepth}
                            paperThickness={1}
                            // className="rotate-90 scale-[1.35] relative top-[200px] left-[-25px]"
                        />
                    </PrintPage>
                </div>
            </Print>
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
                        <div className="flex flex-wrap ">
                            <Rect widthMm={lidWidth} heightMm={lidDepth} cutTop cutLeft cutRight cutBottom>
                                Lid top
                            </Rect>
                            <Rect widthMm={lidWidth} heightMm={lidHeight} cutTop cutLeft cutRight cutBottom>
                                Lid front, bottom
                            </Rect>
                            <Rect widthMm={lidDepth} heightMm={lidHeight} cutTop cutLeft cutRight cutBottom>
                                Lid left, right
                            </Rect>
                        </div>
                    </PrintPage>
                    <PrintPage size={defaultPaperSize} marginsInMm={defaultPageMarginsMm}>
                        <LidBox
                            contentDepth={contentDepthMm}
                            contentWidth={contentWidth}
                            contentHeight={contentHeight}
                            sideLipSize={contentDepthMm}
                        />
                    </PrintPage>
                    <PrintPage size={defaultPaperSize} marginsInMm={defaultPageMarginsMm}>
                        <div className="flex flex-row">
                            {range(stackColumnCount).map((columnIndex) => {
                                const isFirstColumn = columnIndex === 0;
                                return (
                                    <div key={columnIndex}>
                                        {range(stackRowCount).map((rowIndex) => {
                                            const isLastRow = rowIndex === stackRowCount - 1;
                                            const isFirstRow = rowIndex === 0;
                                            return (
                                                <div key={rowIndex}>
                                                    <Rect
                                                        widthMm={blockWidth}
                                                        heightMm={stackSizeMm}
                                                        cutTop={isFirstRow}
                                                        bendTop={!isFirstRow}
                                                        cutRight
                                                        cutLeft={isFirstColumn}
                                                    />
                                                    <Rect
                                                        widthMm={blockWidth}
                                                        heightMm={cardHeightMm}
                                                        cutRight
                                                        cutLeft={isFirstColumn}
                                                        bendTop
                                                    />
                                                    <Rect
                                                        widthMm={blockWidth}
                                                        heightMm={contentDepthMm}
                                                        cutRight
                                                        cutLeft={isFirstColumn}
                                                        bendTop
                                                        cutBottom={isLastRow}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </PrintPage>
                    <PrintPage size={defaultPaperSize} marginsInMm={defaultPageMarginsMm}>
                        <div className="flex flex-row">
                            {range(stackColumnCount).map((columnIndex) => {
                                const isFirstColumn = columnIndex === 0;
                                const isLastColumn = columnIndex === stackColumnCount - 1;
                                return (
                                    <div className="flex flex-row">
                                        <Rect
                                            widthMm={blockWidth}
                                            heightMm={blockHeight * stackRowCount}
                                            cutTop
                                            cutBottom
                                            bendRight={!isLastColumn}
                                            cutRight={isLastColumn}
                                            cutLeft={isFirstColumn}
                                        />
                                        {!isLastColumn && (
                                            <>
                                                <Rect
                                                    widthMm={contentDepthMm}
                                                    heightMm={blockHeight * stackRowCount}
                                                    cutTop
                                                    cutBottom
                                                    bendRight
                                                />
                                                <Rect
                                                    widthMm={contentDepthMm}
                                                    heightMm={blockHeight * stackRowCount}
                                                    cutTop
                                                    cutBottom
                                                    bendRight
                                                />
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </PrintPage>
                </div>
            </Print>
        </div>
    );
}
