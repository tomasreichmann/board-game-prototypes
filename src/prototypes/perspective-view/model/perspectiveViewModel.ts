export type PerspectiveViewStateType = {
    cursor: {
        x: number;
        y: number;
    };
    frame: {
        width: number;
        height: number;
    };
    stage: {
        x: number;
        y: number;
        z: number;
        width: number;
        height: number;
        scale: number;
    };
    frameStyle: React.CSSProperties;
    stageStyle: React.CSSProperties;
};

export const initialPerspectiveViewState: PerspectiveViewStateType = {
    cursor: {
        x: 0,
        y: 0,
    },
    frame: {
        width: -1,
        height: -1,
    },
    stage: {
        x: 0,
        y: 0,
        z: 0,
        width: -1,
        height: -1,
        scale: 1,
    },
    frameStyle: {},
    stageStyle: {},
};
