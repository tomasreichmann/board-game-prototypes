import React from "react";
import { paperSizes, allSizes, allPaperSizes } from "../paperSizes";

import "./PrintPage.css";
import { PaperProps } from "../Paper/Paper";
import { Button } from "react-daisyui";
import { twMerge } from "tailwind-merge";

export type PrintPageProps = React.PropsWithChildren<{
    className?: string;
    contentClassName?: string;
    size?: keyof typeof allPaperSizes;
    sizeInMm?: number[];
    marginsInMm?: number[];
    bleedInMm?: number;
    orientation?: PaperProps["orientation"];
    showControls?: boolean;
}>;

export const getPaperFitCount = (
    pageSize: number,
    contentSize: number,
    pageMarginStart = 10,
    pageMarginEnd = 10,
    contentBleed = 0,
    spaceForPrintMarker = 0
) => {
    const availableSpace = pageSize - pageMarginStart - pageMarginEnd;
    const itemSpace = contentSize + contentBleed * 2 + spaceForPrintMarker * 2;
    const fitCount = Math.floor(availableSpace / itemSpace);

    return fitCount;
};

export const getPaperFitCountByFormat = (
    paperFormat: keyof typeof allSizes,
    paperOrientation: "portrait" | "landscape",
    contentFormat: keyof typeof allSizes,
    contentOrientation: "portrait" | "landscape",
    pageMarginsMm: [number, number, number, number],
    contentBleedMm: number,
    spaceForPrintMarkerMm = 0
) => {
    const paperSize = allSizes[paperFormat];
    const [paperWidth, paperHeight] = paperOrientation === "portrait" ? paperSize.mm : [...paperSize.mm].reverse();
    const contentSize = allSizes[contentFormat];
    const [contentWidth, contentHeight] =
        contentOrientation === "portrait" ? contentSize.mm : [...contentSize.mm].reverse();
    const horizontalFitCount = getPaperFitCount(
        paperWidth,
        contentWidth,
        pageMarginsMm[0],
        pageMarginsMm[2],
        contentBleedMm,
        spaceForPrintMarkerMm
    );
    const verticalFitCount = getPaperFitCount(
        paperHeight,
        contentHeight,
        pageMarginsMm[1],
        pageMarginsMm[3],
        contentBleedMm,
        spaceForPrintMarkerMm
    );
    console.log({
        paperWidth,
        paperHeight,
        count: horizontalFitCount * verticalFitCount,
    });
    return horizontalFitCount * verticalFitCount;
};

export default function PrintPage({
    className,
    contentClassName,
    size = "A4",
    orientation = "portrait",
    sizeInMm = allPaperSizes[size].mm,
    marginsInMm = [10, 10, 10, 10],
    bleedInMm = 3,
    showControls,
    children,
}: PrintPageProps) {
    const [isHidden, setIsHidden] = React.useState(false);
    const hiddenToggle = showControls && (
        <Button
            className={twMerge("print:hidden", !isHidden && "absolute right-0 top-0")}
            variant="outline"
            size="sm"
            onClick={() => setIsHidden(!isHidden)}
            color="warning"
        >
            {isHidden ? "Show" : "Hide"}
        </Button>
    );
    if (isHidden) {
        return <div className={className}>{hiddenToggle}</div>;
    }
    const widthSizeIndex = orientation === "portrait" ? 0 : 1;
    const heightSizeIndex = orientation === "portrait" ? 1 : 0;
    const widthMm = sizeInMm[widthSizeIndex];
    const heightMm = sizeInMm[heightSizeIndex];
    const pageStyle: React.CSSProperties = {
        "--PrintPage-width": widthMm + "mm",
        "--PrintPage-height": heightMm + "mm",
        "--PrintPage-margin-top": marginsInMm[0] + "mm",
        "--PrintPage-margin-right": marginsInMm[1] + "mm",
        "--PrintPage-margin-bottom": marginsInMm[2] + "mm",
        "--PrintPage-margin-left": marginsInMm[3] + "mm",
        "--PrintPage-bleed": bleedInMm + "mm",
    } as unknown as React.CSSProperties;
    const margin = [0, 1, 2, 3].map((marginIndex) => `${marginsInMm[marginIndex] - bleedInMm}mm`).join(" ");

    return (
        <div className={twMerge("PrintPage", className)} style={pageStyle}>
            {hiddenToggle}
            <style>{`
@media print {
  @page {
    size: ${widthMm}mm ${heightMm}mm;
    margin: ${margin};
  }
}
      `}</style>
            <div className={twMerge("PrintPage_content", contentClassName)}>{children}</div>
        </div>
    );
}
