export const getDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const getRectModel = (x1: number, y1: number, width: number, height: number) => {
    return {
        x: x1,
        y: y1,
        width,
        height,
        topLeft: { x: x1, y: y1 },
        topRight: { x: x1 + width, y: y1 },
        bottomLeft: { x: x1, y: y1 + height },
        bottomRight: { x: x1 + width, y: y1 + height },
        center: { x: x1 + width / 2, y: y1 + height / 2 },
    };
};
