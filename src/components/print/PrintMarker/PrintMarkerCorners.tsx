import React from "react";
import PrintMarker from "./PrintMarker";

export type PrintMarkerCornersProps = {
    color?: React.CSSProperties["color"];
    bleedMm?: number;
    bleedTopMm?: number;
    bleedRightMm?: number;
    bleedBottomMm?: number;
    bleedLeftMm?: number;
};

export default function PrintMarkerCorners({
    color,
    bleedMm = 0,
    bleedTopMm = bleedMm,
    bleedRightMm = bleedMm,
    bleedBottomMm = bleedMm,
    bleedLeftMm = bleedMm,
}: PrintMarkerCornersProps) {
    return (
        <>
            <PrintMarker
                top
                left
                color={color}
                bleedTopMm={bleedTopMm}
                bleedRightMm={bleedRightMm}
                bleedBottomMm={bleedBottomMm}
                bleedLeftMm={bleedLeftMm}
            />
            <PrintMarker
                top
                right
                color={color}
                bleedTopMm={bleedTopMm}
                bleedRightMm={bleedRightMm}
                bleedBottomMm={bleedBottomMm}
                bleedLeftMm={bleedLeftMm}
            />
            <PrintMarker
                bottom
                right
                color={color}
                bleedTopMm={bleedTopMm}
                bleedRightMm={bleedRightMm}
                bleedBottomMm={bleedBottomMm}
                bleedLeftMm={bleedLeftMm}
            />
            <PrintMarker
                bottom
                left
                color={color}
                bleedTopMm={bleedTopMm}
                bleedRightMm={bleedRightMm}
                bleedBottomMm={bleedBottomMm}
                bleedLeftMm={bleedLeftMm}
            />
        </>
    );
}
