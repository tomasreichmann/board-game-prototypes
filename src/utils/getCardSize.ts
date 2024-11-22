import { cardSizes } from "../components/print/paperSizes";
import mmToPx from "./mmToPx";

type sizeType = (typeof cardSizes)[keyof typeof cardSizes];

const unitMap = {
    mm: ({ mm: [width, height] }: sizeType) => ({ width, height }),
    in: ({ inches: [width, height] }: sizeType) => ({ width, height }),
    px: ({ mm: [width, height] }: sizeType) => ({
        width: mmToPx(width),
        height: mmToPx(height),
    }),
};

export default function getCardSize(
    cardSize: keyof typeof cardSizes,
    unit = "mm" as keyof typeof unitMap
): { width: number; height: number } {
    const size = cardSizes[cardSize];
    return unitMap[unit](size);
}
