import { PerspectiveViewStateType } from "./perspectiveViewModel";

export enum PerspectiveViewActionTypeEnum {
    Update = "Update",
    Updater = "Updater",
    Refocus = "Refocus",
}

export enum FocusModeEnum {
    Cover = "Cover",
    Contain = "Contain",
}

// This is a very rough approximation. Perspective, z and rotateY and rotateZ are not taken into account.
const getPanAndScale = (
    mode: FocusModeEnum,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    frameWidth: number,
    frameHeight: number,
    perspective: number,
    rotateX: number,
    rotateY: number,
    rotateZ: number
) => {
    const scaleFnc = mode === FocusModeEnum.Cover ? Math.min : Math.max;
    const rotationAdjustedHeight = Math.cos(rotateX * (Math.PI / 180)) * height;
    const magicConstant = 1.75; // No idea why it works
    const zScaleFactor = 1 + z / perspective;
    const scale = scaleFnc(frameWidth / width, frameHeight / rotationAdjustedHeight) / magicConstant;
    console.log("getPanAndScale", {
        mode,
        x,
        y,
        width,
        height,
        rotationAdjustedHeight,
        frameWidth,
        frameHeight,
        z,
        zScaleFactor,
    });
    const result = {
        x: -(x - (frameWidth - width) / 2),
        y: -(y - (frameHeight - rotationAdjustedHeight) / 2),
        scale,
    };

    return result;
};

export type PerspectiveViewActionType =
    | {
          type: PerspectiveViewActionTypeEnum.Update;
          payload: Partial<PerspectiveViewStateType>;
      }
    | {
          type: PerspectiveViewActionTypeEnum.Updater;
          payload: (state: PerspectiveViewStateType) => Partial<PerspectiveViewStateType>;
      }
    | {
          type: PerspectiveViewActionTypeEnum.Refocus;
          payload: {
              mode: FocusModeEnum;
              focusWidth: number;
              focusHeight: number;
              stageWidth: number;
              stageHeight: number;
              x: number;
              y: number;
              z: number;
              rotateX: number;
              rotateY: number;
              rotateZ: number;
              depthOfField: number;
              perspective: number;
          };
      };

export default function perspectiveViewReducer(
    state: PerspectiveViewStateType,
    action: PerspectiveViewActionType
): PerspectiveViewStateType {
    // console.log(action);
    if (action.type === PerspectiveViewActionTypeEnum.Update) {
        return {
            ...state,
            ...action.payload,
        };
    }
    if (action.type === PerspectiveViewActionTypeEnum.Updater) {
        return {
            ...state,
            ...action.payload(state),
        };
    }
    if (action.type === PerspectiveViewActionTypeEnum.Refocus) {
        const lens = { ...state.lens };
        let isUpdatedLens = false;
        if (action.payload.depthOfField !== lens.depthOfField) {
            lens.depthOfField = action.payload.depthOfField;
            isUpdatedLens = true;
        }
        if (action.payload.perspective !== lens.perspective) {
            lens.perspective = action.payload.perspective;
            isUpdatedLens = true;
        }
        const centerPan = getPanAndScale(
            action.payload.mode,
            action.payload.x,
            action.payload.y,
            action.payload.z,
            action.payload.focusWidth,
            action.payload.focusHeight,
            state.frame.width,
            state.frame.height,
            lens.perspective,
            action.payload.rotateX,
            action.payload.rotateY,
            action.payload.rotateZ
        );
        return {
            ...state,
            stage: {
                ...state.stage,
                width: action.payload.stageWidth ?? state.stage.width,
                height: action.payload.stageHeight ?? state.stage.height,
                z: action.payload.z,
                rotateX: -action.payload.rotateX,
                rotateY: -action.payload.rotateY,
                rotateZ: -action.payload.rotateZ,
                ...centerPan,
            },
            lens: isUpdatedLens ? lens : state.lens,
        };
    }
    return state;
}
