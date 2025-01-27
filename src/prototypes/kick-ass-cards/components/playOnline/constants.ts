import { cardSizes } from "../../../../components/print/paperSizes";
import mmToPx from "../../../../utils/mmToPx";

export const isClickableClassName =
    "isClickable cursor-pointer outline outline-2 outline-kac-gold-dark hover:outline-4 hover:brightness-105";
export const isHighlightedClassName = "isHighlighted outline outline-2 outline-kac-gold";
export const isSelectedClassName = "isSelected outline outline-4 outline-kac-monster-dark brightness-110";

const [outcomeCardSizeWidthMm, outcomeCardSizeHeightMm] = cardSizes["Mini European"].mm;
export const outcomeCardSize = {
    width: mmToPx(outcomeCardSizeWidthMm),
    height: mmToPx(outcomeCardSizeHeightMm),
};

export const cardMargin = 40;
