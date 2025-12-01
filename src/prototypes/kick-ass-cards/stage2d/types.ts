/**
 * Defines the common set of transform properties that can be manipulated by layouts.
 */
export type TransformType = {
    x?: number;
    y?: number;
    z?: number;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    scale?: number;
};

export type GridLayoutPropsType = TransformType & {
    type: "grid";
    cellWidth: number;
    cellHeight: number;
    gapX?: number;
    gapY?: number;
    columns: number;
    rows: number;
};

// We can add more layout types here later, e.g., DeckLayoutProps
// export interface DeckLayoutProps { type: 'deck', ... }

export type LayoutPropsType = GridLayoutPropsType; // | DeckLayoutProps;

export type LayoutsMapType<LayoutIds extends string> = {
    [layoutId in LayoutIds]: LayoutPropsType;
};
