import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import { ChunkedPagesProps } from "./ChunkedPages";

export type PrintControlProps = {
    className?: string;
    paperSize: keyof typeof paperSizes;
    cardSize: keyof typeof cardSizes;
    pageOrientation: "portrait" | "landscape";
    pageMarginsMm: [number, number, number, number];
    bleedMm: number;
    gapMm: [number, number];
    pageLabelPosition: ChunkedPagesProps<any, any>["labelPosition"];
};
