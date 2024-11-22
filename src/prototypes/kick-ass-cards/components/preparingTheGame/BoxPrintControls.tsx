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
import SvgBoxInsertWood from "../../../../components/print/SvgBoxInsertWood";

export type BoxPrintControlsProps = {
    className?: string;
};

export default function BoxPrintControls({ className }: BoxPrintControlsProps) {
    const { defaultCardSize, defaultPaperSize, defaultPageMarginsMm } = usePrintControlsStore();
    const [settings, setSettings] = useState({
        showLabels: true,
        showPrintCut: true,
        brochureHeight: 210, // mm; paperSizes.A4.mm[0]; // mm; brochure is as tall as the A4 is wide; 210mm
        brochuresTotalThickness: 20, // mm; total thickness of all brochures stacked at the back of the box
        brochureWidth: 100, // Math.ceil(paperSizes.A4.mm[1] / 3); // mm; brochure is 1/3 of the A4 height
        cardBoardThickness: 1, // mm; thickness of the box material
        cardStackSpace: 100, // mm; space for stacked cards when slanted; could be 100-120mm
        cardWidth: 58, // mm; cardSizes.Bridge.mm[0];
        dividerThickness: 1, // mm; thickness of the insert material
        fittingMargin: 1, // mm; space between content and dividers
        lidFittingMargin: 1, // mm; space between box and lid
        lidSpacerSize: 30, // mm; the lid should be higher than the box so that it doesn't stick to the box when opened and it gives room for card labels to stick out from the box for better readability
        verticalSpaceForCards: 100, // mm; height of the card divider (cca 98mm) + 2 * fitting margin
        verticalJointSegments: 5, // number of alternating segments of vertical joints
    });

    const {
        showLabels,
        showPrintCut,
        brochureHeight,
        brochuresTotalThickness,
        brochureWidth,
        cardBoardThickness,
        cardStackSpace,
        cardWidth,
        dividerThickness,
        fittingMargin,
        lidFittingMargin,
        lidSpacerSize,
        verticalSpaceForCards,
        verticalJointSegments,
    } = settings;

    const boxSvgRef = useRef<SVGSVGElement>(null);
    const lidSvgRef = useRef<SVGSVGElement>(null);
    const insertSvgRef = useRef<SVGSVGElement>(null);
    const insertWoodSvgRef = useRef<SVGSVGElement>(null);

    const contentWidth = brochureHeight + 2 * fittingMargin + 2 * dividerThickness; // mm; must fit a brochure 210x100mm on the back

    const contentHeight =
        brochuresTotalThickness + 2 * fittingMargin + 2 * dividerThickness + cardStackSpace + dividerThickness; // mm; must have a space for brochures 20mm, divider and space for stacks of cards cca 100mm
    const contentDepth = verticalSpaceForCards - lidSpacerSize; // mm; the cards should peek from the box so that you can read the name of the card
    const laserArea = "74x46";

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="flex flex-col items-center w-full">
                {/* TODO: Download button */}
                <div className="flex-1 self-stretch flex flex-row gap-4 items-end flex-wrap my-4 leading-none">
                    <Input
                        label="Show labels"
                        type="checkbox"
                        checked={showLabels}
                        onChange={(event) => setSettings({ ...settings, showLabels: event.target.checked })}
                        className="w-32"
                    />
                    <Input
                        label="Show print cut"
                        type="checkbox"
                        checked={showPrintCut}
                        onChange={(event) => setSettings({ ...settings, showPrintCut: event.target.checked })}
                        className="w-32"
                    />
                    <Input
                        label="Fitting margin"
                        type="number"
                        description="mm; space between content and dividers"
                        value={fittingMargin}
                        min={0}
                        onChange={(event) => setSettings({ ...settings, fittingMargin: Number(event.target.value) })}
                        className="w-32"
                    />
                    <Input
                        label="Brochure height"
                        type="number"
                        description="mm; height of the brochure"
                        value={brochureHeight}
                        min={0}
                        onChange={(event) => setSettings({ ...settings, brochureHeight: Number(event.target.value) })}
                        className="w-32"
                    />
                    <Input
                        label="Brochure width"
                        type="number"
                        description="mm; width of the brochure"
                        value={brochureWidth}
                        min={0}
                        onChange={(event) => setSettings({ ...settings, brochureWidth: Number(event.target.value) })}
                        className="w-32"
                    />
                    <Input
                        label="Brochures total thickness"
                        type="number"
                        description="mm; total thickness of all brochures stacked at the back of the box"
                        value={brochuresTotalThickness}
                        min={0}
                        onChange={(event) =>
                            setSettings({ ...settings, brochuresTotalThickness: Number(event.target.value) })
                        }
                        className="w-32"
                    />
                    <Input
                        label="Card board thickness"
                        type="number"
                        description="mm; thickness of the box cardboard"
                        value={cardBoardThickness}
                        min={0}
                        onChange={(event) =>
                            setSettings({ ...settings, cardBoardThickness: Number(event.target.value) })
                        }
                        className="w-32"
                    />
                    <Input
                        label="Card stack space"
                        type="number"
                        description="mm; space for stacked cards including slant and margin"
                        value={cardStackSpace}
                        min={0}
                        onChange={(event) => setSettings({ ...settings, cardStackSpace: Number(event.target.value) })}
                        className="w-32"
                    />
                    <Input
                        label="Card width"
                        type="number"
                        description="mm; width of the card"
                        value={cardWidth}
                        min={0}
                        onChange={(event) => setSettings({ ...settings, cardWidth: Number(event.target.value) })}
                        className="w-32"
                    />
                    <Input
                        label="Vertical Space for Cards"
                        type="number"
                        description="mm; height of the card divider (cca 98mm) + 2 * fitting margin;"
                        value={verticalSpaceForCards}
                        min={0}
                        onChange={(event) =>
                            setSettings({ ...settings, verticalSpaceForCards: Number(event.target.value) })
                        }
                        className="w-32"
                    />
                    <Input
                        label="Divider thickness"
                        type="number"
                        description="mm; thickness of the insert dividers"
                        value={dividerThickness}
                        min={0}
                        onChange={(event) => setSettings({ ...settings, dividerThickness: Number(event.target.value) })}
                        className="w-32"
                    />
                    <Input
                        label="Lid fitting margin"
                        type="number"
                        description="mm; space between lid and box"
                        value={lidFittingMargin}
                        min={0}
                        onChange={(event) => setSettings({ ...settings, lidFittingMargin: Number(event.target.value) })}
                        className="w-32"
                    />
                    <Input
                        label="Lid spacer size"
                        type="number"
                        description="mm; space between lid and box"
                        value={lidSpacerSize}
                        min={0}
                        onChange={(event) => setSettings({ ...settings, lidSpacerSize: Number(event.target.value) })}
                        className="w-32"
                    />
                    <Input
                        label="Vertical Joint Segments"
                        type="number"
                        description="number of alternating segments of vertical joints"
                        value={verticalJointSegments}
                        min={0}
                        onChange={(event) =>
                            setSettings({ ...settings, verticalJointSegments: Number(event.target.value) })
                        }
                        className="w-32"
                    />
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
                </div>
                <SvgBox
                    title="Box"
                    ref={boxSvgRef}
                    showLabels={settings.showLabels}
                    showPrintCut={showPrintCut}
                    contentWidth={contentWidth}
                    contentHeight={contentHeight}
                    contentDepth={contentDepth}
                    paperThickness={cardBoardThickness}
                    // className="rotate-90 scale-[1.35] relative top-[200px] left-[-25px]"
                />
                <Button
                    className="mb-4"
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
                    showPrintCut={showPrintCut}
                    showLabels={settings.showLabels}
                    contentWidth={contentWidth + cardBoardThickness * 6 + lidFittingMargin}
                    contentHeight={contentHeight + cardBoardThickness * 2 + lidFittingMargin}
                    contentDepth={contentDepth}
                    paperThickness={cardBoardThickness}
                    // className="rotate-90 scale-[1.35] relative top-[200px] left-[-25px]"
                />
                <Button
                    className="mb-4"
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
                    className="mb-4"
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
                <SvgBoxInsertWood
                    title="Insert Wood"
                    ref={insertWoodSvgRef}
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
                    verticalJointSegments={verticalJointSegments}
                />
                <Button
                    className="mb-4"
                    size={"xs"}
                    onClick={() => {
                        console.log("download", insertSvgRef?.current);
                        if (insertSvgRef?.current) {
                            downloadSvg(insertSvgRef?.current, "insert wood");
                        }
                    }}
                >
                    Download Insert Wood
                </Button>
            </div>
        </div>
    );
}
