import { twMerge } from "tailwind-merge";
import { usePrintControlsStore } from "./PaperAndCardControls";
import { paperSizes } from "../../../../components/print/paperSizes";
import SvgBox from "../../../../components/print/SvgBox";
import DataPreview from "../../../../components/DataPreview";
import { useRef, useState } from "react";
import Input from "../controls/Input";
import SvgBoxInsert from "../../../../components/print/SvgBoxInsert";
import Button from "../controls/Button";
import { downloadSvg } from "../../../../utils/svgHelpers";

export type BoxPrintControlsProps = {
    className?: string;
};

export default function BoxPrintControls({ className }: BoxPrintControlsProps) {
    const { defaultCardSize, defaultPaperSize, defaultPageMarginsMm } = usePrintControlsStore();
    const [settings, setSettings] = useState({ showLabels: true });

    const boxSvgRef = useRef<SVGSVGElement>(null);
    const lidSvgRef = useRef<SVGSVGElement>(null);
    const insertSvgRef = useRef<SVGSVGElement>(null);

    const fittingMargin = 1; // mm; space between content and dividers
    const dividerThickness = 1; // mm
    const cardBoardThickness = 1; // mm
    const lidFittingMargin = 1; // mm
    const brochureHeight = paperSizes.A4.mm[0]; // mm; brochure is as tall as the A4 is wide; 210mm
    const brochureWidth = Math.ceil(paperSizes.A4.mm[1] / 3); // mm; brochure is 1/3 of the A4 height

    const contentWidth = brochureHeight + 2 * fittingMargin + 2 * dividerThickness; // mm; must fit a brochure 210x100mm on the back

    const brochuresTotalThickness = 20; // mm; total thickness of all brochures stacked at the back of the box
    const cardStackSpace = 100; // mm; could be 100-120mm
    const contentHeight =
        brochuresTotalThickness + 2 * fittingMargin + 2 * dividerThickness + cardStackSpace + dividerThickness; // mm; must have a space for brochures 20mm, divider and space for stacks of cards cca 100mm
    const contentDepth = 70; // mm; the cards should peek from the box so that you can read the name of the card
    const lidSpacerSize = 30; // mm; the lid should be higher than the box so that it doesn't stick to the box when opened and it gives room for card labels to stick out from the box for better readability
    const cardWidth = 58; // mm
    const laserArea = "74x46";

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="flex flex-col items-center w-full">
                {/* TODO: Download button */}
                <div className="flex flex-row flex-wrap gap-4 ">
                    <Input
                        type="checkbox"
                        label="Show labels"
                        checked={settings.showLabels}
                        onChange={(event) => setSettings({ ...settings, showLabels: event.target.checked })}
                    />
                </div>
                <DataPreview
                    data={{
                        laserArea,
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
                <SvgBox
                    title="Box"
                    ref={boxSvgRef}
                    showLabels={settings.showLabels}
                    contentWidth={contentWidth}
                    contentHeight={contentHeight}
                    contentDepth={contentDepth}
                    paperThickness={cardBoardThickness}
                    // className="rotate-90 scale-[1.35] relative top-[200px] left-[-25px]"
                />
                <Button
                    size={"xs"}
                    onClick={() => {
                        console.log("download", boxSvgRef?.current);
                        if (boxSvgRef?.current) {
                            downloadSvg(boxSvgRef?.current, "box");
                        }
                    }}
                >
                    Download Box
                </Button>
                <SvgBox
                    title="Lid"
                    ref={lidSvgRef}
                    showLabels={settings.showLabels}
                    contentWidth={contentWidth + cardBoardThickness * 6 + lidFittingMargin}
                    contentHeight={contentHeight + cardBoardThickness * 2 + lidFittingMargin}
                    contentDepth={contentDepth}
                    paperThickness={cardBoardThickness}
                    // className="rotate-90 scale-[1.35] relative top-[200px] left-[-25px]"
                />
                <Button
                    size={"xs"}
                    onClick={() => {
                        console.log("download", lidSvgRef?.current);
                        if (lidSvgRef?.current) {
                            downloadSvg(lidSvgRef?.current, "lid");
                        }
                    }}
                >
                    Download Lid
                </Button>
                <SvgBoxInsert
                    title="Insert"
                    ref={insertSvgRef}
                    showLabels={settings.showLabels}
                    contentWidth={contentWidth}
                    contentHeight={contentHeight}
                    contentDepth={contentDepth}
                    lidSpacerSize={lidSpacerSize}
                    paperThickness={cardBoardThickness}
                    fittingMargin={fittingMargin}
                    dividerThickness={dividerThickness}
                    brochureHeight={brochureHeight}
                    brochureWidth={brochureWidth}
                    cardStackSpace={cardStackSpace}
                    brochuresTotalThickness={brochuresTotalThickness}
                    cardWidth={cardWidth}
                />
                <Button
                    size={"xs"}
                    onClick={() => {
                        console.log("download", insertSvgRef?.current);
                        if (insertSvgRef?.current) {
                            downloadSvg(insertSvgRef?.current, "insert");
                        }
                    }}
                >
                    Download Insert
                </Button>
            </div>
        </div>
    );
}
