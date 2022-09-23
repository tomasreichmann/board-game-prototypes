import React from "react";
import clsx from "clsx";
import { allSizes } from "../paperSizes";

// import "./Paper.css";

export type PaperProps = React.PropsWithChildren<{
    className?: string;
    size: keyof typeof allSizes;
    orientation?: "portrait" | "landscape";
}>;

export default function Paper({
    className,
    size,
    orientation = "portrait",
    children,
}: PaperProps) {
    const sizeInMm = allSizes[size].mm;
    const [width, height] =
        orientation === "landscape" ? [...sizeInMm].reverse() : sizeInMm;

    return (
        <div
            className={clsx("Paper", className)}
            style={{
                width: width + "mm",
                height: height + "mm",
            }}
        >
            {children}
        </div>
    );
}
