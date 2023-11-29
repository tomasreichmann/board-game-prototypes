export type PerspectiveViewStateType = {
    cursor: {
        x: number;
        y: number;
    };
    lens: {
        depthOfField: number;
        perspective: number;
    };
    frame: {
        width: number;
        height: number;
    };
    stage: {
        x: number;
        y: number;
        z: number;
        rotateX: number;
        rotateY: number;
        rotateZ: number;
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
    lens: {
        depthOfField: 200,
        perspective: 1000,
    },
    frame: {
        width: -1,
        height: -1,
    },
    stage: {
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        width: -1,
        height: -1,
        scale: 1,
    },
    frameStyle: {},
    stageStyle: {},
};
