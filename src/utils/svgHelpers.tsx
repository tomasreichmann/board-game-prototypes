export const getCrossPath = (centerX: number, centerY: number, size: number) =>
    `M ${centerX - size / 2} ${centerY - size / 2} L ${centerX + size / 2} ${centerY + size / 2} M ${
        centerX - size / 2
    } ${centerY + size / 2} L ${centerX + size / 2} ${centerY - size / 2}`;

export const getRectPath = ({ x, y, width, height }: { x: number; y: number; width: number; height: number }) =>
    `M ${x} ${y} h${width} v${height} h-${width} z`;

export const downloadSvg = (ref: SVGSVGElement, filename: string) => {
    const svgData = new XMLSerializer().serializeToString(ref);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = filename + ".svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};
