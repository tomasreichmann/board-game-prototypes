import React from "react";
import PrintMarker from "./PrintMarker";

export default function PrintMarkerCorners({
    color,
}: {
    color?: React.CSSProperties["color"];
}) {
    return (
        <>
            <PrintMarker top left color={color} />
            <PrintMarker top right color={color} />
            <PrintMarker bottom right color={color} />
            <PrintMarker bottom left color={color} />
        </>
    );
}
