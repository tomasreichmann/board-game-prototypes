import React from "react";
import clsx from "clsx";

import "./PrintMarker.css";

type PrintMarkerProps = {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    className?: string;
    color?: React.CSSProperties["color"];
};

const PrintMarker = ({
    top,
    right,
    bottom,
    left,
    className,
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
                } as unknown as React.CSSProperties
            }
        >
            <div className="PrintMarker_vertical" />
            <div className="PrintMarker_horizontal" />
        </div>
    );
};

export default PrintMarker;
