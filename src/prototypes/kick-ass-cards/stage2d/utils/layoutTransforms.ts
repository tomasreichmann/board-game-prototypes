import { LayoutPropsType, TransformType } from "../types";

/**
 * Calculates the transform properties for a card in a grid layout.
 * @param layout - The grid layout properties.
 * @param cardIndex - The index of the card within the layout.
 * @returns Partial<TransformType> with x and y for positioning.
 */
export function getGridCardTransform(layout: LayoutPropsType, cardIndex: number): Partial<TransformType> {
    if (layout.type !== "grid") return {};
    const { x: layoutX = 0, y: layoutY = 0, cellWidth, cellHeight, gapX = 0, gapY = 0, columns: cellsX } = layout;

    const col = cardIndex % cellsX;
    const row = Math.floor(cardIndex / cellsX);

    const x = layoutX + col * (cellWidth + gapX);
    const y = layoutY + row * (cellHeight + gapY);

    return { x, y };
}
