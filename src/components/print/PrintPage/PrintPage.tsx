import React from "react";
import clsx from "clsx";
import paperSizes from "../paperSizes";

import "./PrintPage.css";

export type PrintPageProps = React.PropsWithChildren<{
    className?: string;
    contentClassName?: string;
    size?: keyof typeof paperSizes;
    sizeInMm?: number[];
    marginsInMm?: number[];
    bleedInMm?: number;
}>;

export default function PrintPage({
    className,
    contentClassName,
    size = "A4",
    sizeInMm = paperSizes[size].mm,
    marginsInMm = [10, 10, 10, 10],
    bleedInMm = 3,
    children,
}: PrintPageProps) {
    const pageStyle: React.CSSProperties = {
        "--PrintPage-width": sizeInMm[0] + "mm",
        "--PrintPage-height": sizeInMm[1] + "mm",
        "--PrintPage-margin-top": marginsInMm[0] + "mm",
        "--PrintPage-margin-right": marginsInMm[1] + "mm",
        "--PrintPage-margin-bottom": marginsInMm[2] + "mm",
        "--PrintPage-margin-left": marginsInMm[3] + "mm",
        "--PrintPage-bleed": bleedInMm + "mm",
    } as unknown as React.CSSProperties;
    return (
        <div className={clsx("PrintPage", className)} style={pageStyle}>
            <style>{`
@media print {
  @page {
    size: ${sizeInMm[0]}mm ${sizeInMm[1]}mm;
    margin: ${marginsInMm[0] - bleedInMm}mm ${marginsInMm[1] - bleedInMm}mm ${
                marginsInMm[2] - bleedInMm
            }mm ${marginsInMm[3] - bleedInMm}mm;
  }
}
      `}</style>
            <div className={clsx("PrintPage_content", contentClassName)}>
                {children}
            </div>
        </div>
    );
}
