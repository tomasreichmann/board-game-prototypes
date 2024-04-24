import React from "react";
import clsx from "clsx";
import paperSizes from "../paperSizes";

import "./PrintPage.css";
import { PaperProps } from "../Paper/Paper";

export type PrintPageProps = React.PropsWithChildren<{
    className?: string;
    contentClassName?: string;
    size?: keyof typeof paperSizes;
    sizeInMm?: number[];
    marginsInMm?: number[];
    bleedInMm?: number;
    orientation?: PaperProps["orientation"];
}>;

export default function PrintPage({
    className,
    contentClassName,
    size = "A4",
    orientation = "portrait",
    sizeInMm = paperSizes[size].mm,
    marginsInMm = [10, 10, 10, 10],
    bleedInMm = 3,
    children,
}: PrintPageProps) {
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
        <div className={clsx("PrintPage", className)} style={pageStyle}>
            <style>{`
@media print {
  @page {
    size: ${widthMm}mm ${heightMm}mm;
    margin: ${margin};
  }
}
      `}</style>
            <div className={clsx("PrintPage_content", contentClassName)}>{children}</div>
        </div>
    );
}
