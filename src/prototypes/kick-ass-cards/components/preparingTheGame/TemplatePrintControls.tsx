import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { PropsWithChildren, useState } from "react";
import Paper, { PaperProps } from "../../../../components/print/Paper/Paper";
import { range } from "lodash";
import Input from "../controls/Input";
import Text, { H2 } from "../content/Text";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { usePrintControlsStore } from "./PaperAndCardControls";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";

export type TemplatePrintControlsProps = { className?: string };

type SampleCardProps = PropsWithChildren<PaperProps>;

const SampleCard = ({ children, slugClassName, bleedClassName, trimClassName, ...restProps }: SampleCardProps) => (
    <Paper
        slugClassName={twMerge("outline outline-[0.2mm] outline-dashed outline-kac-cloth", slugClassName)}
        bleedClassName={twMerge("outline outline-[0.2mm] outline-kac-blood", bleedClassName)}
        trimClassName={twMerge(
            "outline outline-[0.2mm] outline-kac-monster flex flex-col justify-center items-center text-md text-kac-body font-kacBody",
            trimClassName
        )}
        {...restProps}
    >
        {children}
    </Paper>
);

export default function TemplatePrintControls({ className }: TemplatePrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();

    const [itemCount, setItemCount] = useState(8);
    const [hasBackFace, setHasBackFace] = useState(true);

    const items = useItemAdapter(
        range(itemCount).map((item) => ({
            children: "Front face #" + item,
        }))
    );

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="flex flex-col gap-2 items-stretch print:hidden mt-4 max-w-xl">
                <H2>Print template</H2>
                <Text>Use this template to calibrate your printer.</Text>
                <Text>
                    Ideally, you want to match the margins of your printer so that you get maximum space without
                    cropping the print. Start with equal margins like 10mm and then measure what are the exact margins
                    on the printed paper. Having the same margins on the printed paper is crucial to matching the front
                    and back faces while printing on both sides.
                </Text>
                <Text>
                    <span className="inline-block size-4 outline outline-dashed outline-kac-cloth align-middle" />
                    &emsp;This line shows the area for each card including space for print marks.
                    <br />
                    <span className="inline-block size-4 outline outline-kac-blood align-middle" />
                    &emsp;This line shows the area for bleed. We expand background graphics outside the actual card
                    format to make sure that we don't have white strips on the side after cutting the card.
                    <br />
                    <span className="inline-block size-4 outline outline-kac-monster align-middle" />
                    &emsp;This line shows the actual card size after trimming.
                    <br />
                    <span className="inline-block relative size-4 outline align-middle">
                        <PrintMarkerCorners bleedMm={1} />
                    </span>
                    &emsp;The corner markers show lines to trim.
                </Text>
            </div>
            <div className="flex flex-row gap-4 items-end flex-wrap print:hidden mt-4">
                <Input
                    label="Card count"
                    className="w-32"
                    type="number"
                    value={itemCount}
                    onChange={(event) => setItemCount(parseInt(event.target.value))}
                />
                <Input
                    label="Backface"
                    className="w-auto"
                    type="checkbox"
                    checked={hasBackFace}
                    onChange={(event) => setHasBackFace(event.target.checked)}
                />
                <ToggleData data={items} initialCollapsed className="print:hidden mt-4 flex-1" previewClassName="" />
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
                    <ChunkedPages
                        Component={SampleCard}
                        BackFaceComponent={hasBackFace ? SampleCard : undefined}
                        items={items}
                        {...chunkedPagesProps}
                        getBackFaceProps={(props) => {
                            const {
                                bleedMm = 0,
                                bleedTopMm = bleedMm,
                                bleedRightMm = bleedMm,
                                bleedBottomMm = bleedMm,
                                bleedLeftMm = bleedMm,
                            } = props;
                            return {
                                ...props,
                                children: (
                                    <div
                                        className="bg-kac-steel/50 flex-1 self-stretch flex flex-col justify-center items-center"
                                        style={{
                                            margin: `${-bleedTopMm}mm ${-bleedRightMm}mm ${-bleedBottomMm}mm ${-bleedLeftMm}mm`,
                                        }}
                                    >
                                        {String(props.children).replace("Front face", "Back face")}
                                    </div>
                                ),
                            };
                        }}
                        label="Sample"
                    />
                </div>
            </Print>
        </div>
    );
}
