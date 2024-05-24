import { twMerge } from "tailwind-merge";
import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import outcomes from "../../data/outcomeDeck";
import ChunkedPages from "./ChunkedPages";
import OutcomeCard, { OutcomeCardBackFace } from "../gameComponents/OutcomeCard";
import { getPaperFitCountByFormat } from "../../../../components/print/PrintPage/PrintPage";
import ToggleData from "../../../../components/DataToggle";
import { PropsWithChildren, useState } from "react";
import Paper, { PaperProps } from "../../../../components/print/Paper/Paper";
import { range } from "lodash";
import Input from "../controls/Input";

export type TemplatePrintControlsProps = {
    className?: string;
    paperSize: keyof typeof paperSizes;
    cardSize: keyof typeof cardSizes;
    pageOrientation: "portrait" | "landscape";
    pageMarginsMm: [number, number, number, number];
    bleedMm: number;
    gapMm: [number, number];
};

type SampleCardProps = PropsWithChildren<PaperProps>;

const SampleCard = ({ children, slugClassName, bleedClassName, trimClassName, ...restProps }: SampleCardProps) => (
    <Paper
        slugClassName={twMerge("outline outline-[0.1mm] outline-dashed outline-kac-cloth", slugClassName)}
        bleedClassName={twMerge("outline outline-[0.1mm] outline-kac-blood", bleedClassName)}
        trimClassName={twMerge(
            "outline outline-[0.1mm] outline-kac-monster flex flex-col justify-center items-center text-md text-kac-body font-kacBody",
            trimClassName
        )}
        {...restProps}
    >
        {children}
    </Paper>
);

export default function TemplatePrintControls({
    className,
    paperSize,
    cardSize,
    pageOrientation,
    pageMarginsMm,
    bleedMm,
    gapMm,
}: TemplatePrintControlsProps) {
    const [itemCount, setItemCount] = useState(8);
    const [hasBackFace, setHasBackFace] = useState(true);

    const items = range(itemCount).map((item) => ({
        bleedMm,
        size: cardSize,
        children: "Front face #" + item,
    }));
    const cardsPerPage = getPaperFitCountByFormat(
        paperSize,
        pageOrientation,
        cardSize,
        "portrait",
        pageMarginsMm,
        bleedMm,
        bleedMm / 2
    );

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="flex flex-col gap-2 items-end print:hidden mt-4"></div>
            <div className="flex flex-row gap-2 items-end print:hidden mt-4">
                <Input
                    label="Card count"
                    type="number"
                    value={itemCount}
                    className="w-32"
                    onChange={(event) => setItemCount(parseInt(event.target.value))}
                />
                <Input
                    label="Backface"
                    type="checkbox"
                    checked={hasBackFace}
                    onChange={(event) => setHasBackFace(event.target.checked)}
                />
            </div>
            <ToggleData data={{ cardsPerPage, items }} initialCollapsed className="print:hidden mt-4" />
            <ChunkedPages
                Component={SampleCard}
                BackFaceComponent={hasBackFace ? SampleCard : undefined}
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
    );
}
