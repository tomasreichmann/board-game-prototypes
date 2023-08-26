import React from "react";
import clsx from "clsx";

import "./PrintMarker.css";

type PrintMarkerProps = {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
    className?: string;
    bleedMm?: number;
    color?: React.CSSProperties["color"];
};

const PrintMarker = ({
    top,
    right,
    bottom,
    left,
    bleedMm = 0,
    className,
    color = "black",
    ...restProps
}: PrintMarkerProps) => {
    const vertical = restProps.vertical || !restProps.horizontal;
    const horizontal = restProps.horizontal || !restProps.vertical;
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
                    "--PrintMarker-bleed": bleedMm + "mm",
                } as unknown as React.CSSProperties
            }
        >
            {top && <div className="PrintMarker_vertical PrintMarker_vertical__top" />}
            {right && <div className="PrintMarker_horizontal PrintMarker_horizontal__right" />}
            {bottom && <div className="PrintMarker_vertical PrintMarker_vertical__bottom" />}
            {left && <div className="PrintMarker_horizontal PrintMarker_horizontal__left" />}
        </div>
    );
};

export default PrintMarker;
