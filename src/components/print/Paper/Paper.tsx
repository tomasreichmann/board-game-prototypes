import React, { CSSProperties } from "react";
import clsx from "clsx";
import { allSizes } from "../paperSizes";

// import "./Paper.css";

export type PaperProps = React.PropsWithChildren<{
    className?: string;
    size: keyof typeof allSizes;
    orientation?: "portrait" | "landscape";
    bleedMm?: number;
    bleedTopMm?: number;
    bleedRightMm?: number;
    bleedBottomMm?: number;
    bleedLeftMm?: number;
    style?: CSSProperties;
}>;

export const PaperOrDiv = ({ size, ...restProps }: Omit<PaperProps, "size"> & { size?: PaperProps["size"] }) => {
    if (size) {
        return <Paper size={size} {...restProps} />;
    }
    return <div className={restProps.className}>{restProps.children}</div>;
};

export default function Paper({
    className,
    size,
    orientation = "portrait",
    bleedMm = 0,
    bleedTopMm = bleedMm,
    bleedRightMm = bleedMm,
    bleedBottomMm = bleedMm,
    bleedLeftMm = bleedMm,
    style,
    children,
}: PaperProps) {
    const sizeInMm = allSizes[size].mm;
    const [width, height] = orientation === "landscape" ? [...sizeInMm].reverse() : sizeInMm;

    return (
        <div
            className={clsx("Paper", className)}
            style={{
                width: width + bleedLeftMm + bleedRightMm + "mm",
                height: height + bleedTopMm + bleedBottomMm + "mm",
                ...style,
            }}
        >
            {children}
        </div>
    );
}
