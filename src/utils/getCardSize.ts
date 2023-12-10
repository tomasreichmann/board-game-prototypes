import { cardSizes } from "../components/print/paperSizes";
import mmToPx from "./mmToPx";

type sizeType = (typeof cardSizes)[keyof typeof cardSizes];

const unitMap = {
    mm: ({ mm: [width, height] }: sizeType, dpi?: number) => ({ width, height }),
    in: ({ inches: [width, height] }: sizeType, dpi?: number) => ({ width, height }),
    px: ({ mm: [width, height] }: sizeType, dpi?: number) => ({
        width: mmToPx(width, dpi),
        height: mmToPx(height, dpi),
    }),
};

export default function getCardSize(
    cardSize: keyof typeof cardSizes,
    unit = "mm" as keyof typeof unitMap,
    dpi?: number
): { width: number; height: number } {
    const size = cardSizes[cardSize];
    return unitMap[unit](size, dpi);
}
