import React from "react";
import PrintMarker from "./PrintMarker";

export default function PrintMarkerCorners({
    color,
    bleedMm = 0,
}: {
    color?: React.CSSProperties["color"];
    bleedMm?: number;
}) {
    return (
        <>
            <PrintMarker top left color={color} bleedMm={bleedMm} />
            <PrintMarker top right color={color} bleedMm={bleedMm} />
            <PrintMarker bottom right color={color} bleedMm={bleedMm} />
            <PrintMarker bottom left color={color} bleedMm={bleedMm} />
        </>
    );
}
