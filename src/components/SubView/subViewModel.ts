export enum PlacementEnum {
    Right,
    Left,
    Top,
    Bottom,
    Center,
}

export type SubViewStateType = {
    uri?: string;
    placement: PlacementEnum;
    isOverlay: boolean;
    showOverlay: boolean;
    width?: number;
    height?: number;
};

export const initialSubViewState: SubViewStateType = {
    uri: undefined,
    placement: PlacementEnum.Right,
    isOverlay: false,
    showOverlay: false,
    width: undefined,
    height: undefined,
};
