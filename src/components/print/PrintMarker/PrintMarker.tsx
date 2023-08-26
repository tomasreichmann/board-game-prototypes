import React from "react";
import clsx from "clsx";

import "./PrintMarker.css";

type PrintMarkerProps = {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    noTopMarker?: boolean;
    noRightMarker?: boolean;
    noBottomMarker?: boolean;
    noLeftMarker?: boolean;
    className?: string;
    bleedMm?: number;
    bleedTopMm?: number;
    bleedRightMm?: number;
    bleedBottomMm?: number;
    bleedLeftMm?: number;
    offsetMm?: number;
    color?: React.CSSProperties["color"];
};

const PrintMarker = ({
    top,
    right,
    bottom,
    left,
    bleedMm = 0,
    bleedTopMm = bleedMm,
    bleedRightMm = bleedMm,
    bleedBottomMm = bleedMm,
    bleedLeftMm = bleedMm,
    offsetMm = 0,
    className,
    noTopMarker,
    noRightMarker,
    noBottomMarker,
    noLeftMarker,
    color = "black",
}: PrintMarkerProps) => {
    return (
        <div
            className={clsx(
                "PrintMarker",
                className,
                top && "PrintMarker__top",
                right && "PrintMarker__right",
                bottom && "PrintMarker__bottom",
                left && "PrintMarker__left"
            )}
            style={
                {
                    "--PrintMarker-color": color,
                    "--PrintMarker-bleed-top": bleedTopMm + "mm",
                    "--PrintMarker-bleed-right": bleedRightMm + "mm",
                    "--PrintMarker-bleed-bottom": bleedBottomMm + "mm",
                    "--PrintMarker-bleed-left": bleedLeftMm + "mm",
                    "--PrintMarker-offset": offsetMm + "mm",
                } as unknown as React.CSSProperties
            }
        >
            {top && !noTopMarker && <div className="PrintMarker_vertical PrintMarker_vertical__top" />}
            {right && !noRightMarker && <div className="PrintMarker_horizontal PrintMarker_horizontal__right" />}
            {bottom && !noBottomMarker && <div className="PrintMarker_vertical PrintMarker_vertical__bottom" />}
            {left && !noLeftMarker && <div className="PrintMarker_horizontal PrintMarker_horizontal__left" />}
        </div>
    );
};

export default PrintMarker;
