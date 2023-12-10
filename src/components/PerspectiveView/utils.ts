export const getCenterPan = (width: number, height: number, viewportWidth: number, viewportHeight: number) => {
    return {
        x: (width - viewportWidth) / 2,
        y: (height - viewportHeight) / 2,
    };
};
