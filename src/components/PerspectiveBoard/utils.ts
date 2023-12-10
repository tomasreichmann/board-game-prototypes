import { BoardContentItemType } from "./perspectiveBoardModel";

export const getScaleFromZ = (z: number, perspective: number) => {
    return 1 - z / perspective;
};

export const moveContentTo = (
    content: BoardContentItemType,
    { x = content.position.x, y = content.position.y, z = content.position.z }: { x?: number; y?: number; z?: number }
) => {
    return {
        ...content,
        position: {
            ...content.position,
            x,
            y,
            z,
        },
    };
};

export const moveContentBy = (
    content: BoardContentItemType,
    { x = 0, y = 0, z = 0 }: { x?: number; y?: number; z?: number }
) => {
    return {
        ...content,
        position: {
            ...content.position,
            x: content.position.x + x,
            y: content.position.y + y,
            z: content.position.z + z,
        },
    };
};
