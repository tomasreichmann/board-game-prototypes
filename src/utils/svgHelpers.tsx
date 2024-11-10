export const getCrossPath = ({ centerX, centerY, size }: { centerX: number; centerY: number; size: number }) =>
    `M ${centerX - size / 2} ${centerY - size / 2} L ${centerX + size / 2} ${centerY + size / 2} M ${
        centerX - size / 2
    } ${centerY + size / 2} L ${centerX + size / 2} ${centerY - size / 2}`;

export const getRectPath = ({ x, y, width, height }: { x: number; y: number; width: number; height: number }) =>
    `M ${x} ${y} h${width} v${height} h-${width} z`;
