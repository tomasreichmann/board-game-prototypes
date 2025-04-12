import React, { CSSProperties, HTMLAttributes } from "react";
import { allSizes } from "../paperSizes";
import { twMerge } from "tailwind-merge";
import PrintMarkerCorners from "../PrintMarker/PrintMarkerCorners";

export type PaperProps = React.PropsWithChildren<{
    className?: string;
    slugClassName?: string;
    bleedClassName?: string;
    trimClassName?: string;
    size: keyof typeof allSizes | "custom";
    sizeInMm?: [number, number];
    orientation?: "portrait" | "landscape";
    bleedMm?: number;
    bleedTopMm?: number;
    bleedRightMm?: number;
    bleedBottomMm?: number;
    bleedLeftMm?: number;
    cropMarkSizeMm?: number;
    style?: CSSProperties;
}>;

export const PaperOrDiv = ({ size, ...restProps }: Omit<PaperProps, "size"> & { size?: PaperProps["size"] }) => {
    if (size) {
        return <Paper size={size} {...restProps} />;
    }
    return (
        <div {...restProps} className={restProps.className}>
            {restProps.children}
        </div>
    );
};

export default function Paper({
    className,
    slugClassName,
    bleedClassName,
    trimClassName,
    size,
    orientation = "portrait",
    bleedMm = 0,
    bleedTopMm = bleedMm,
    bleedRightMm = bleedMm,
    bleedBottomMm = bleedMm,
    bleedLeftMm = bleedMm,
    cropMarkSizeMm = Math.max(bleedTopMm, bleedRightMm, bleedBottomMm, bleedLeftMm) / 2,
    style,
    sizeInMm: sizeInMmProp,
    children,
}: PaperProps) {
    if ((size === "custom" ? !sizeInMmProp : !allSizes[size])) {
        throw new Error(`Unknown paper size: ${size}`);
    }
    const sizeInMm = size === "custom" ? sizeInMmProp! : allSizes[size].mm;
    const [width, height] = orientation === "landscape" ? [...sizeInMm].reverse() : sizeInMm;

    const trimWidth = width;
    const trimHeight = height;
    const bleedWidth = width + bleedLeftMm + bleedRightMm;
    const bleedHeight = height + bleedTopMm + bleedBottomMm;
    const slugWidth = width + bleedLeftMm + bleedRightMm + cropMarkSizeMm * 2;
    const slugHeight = height + bleedTopMm + bleedBottomMm + cropMarkSizeMm * 2;

    const hasBleed = bleedBottomMm > 0 || bleedTopMm > 0 || bleedLeftMm > 0 || bleedRightMm > 0;
    const hasSlug = cropMarkSizeMm > 0;

    const trimElement = (
        <div
            className={twMerge(
                "Paper:TrimArea relative flex flex-col justify-stretch",
                trimClassName,
                !hasSlug && !hasBleed && className
            )}
            style={{
                width: trimWidth + "mm",
                height: trimHeight + "mm",
                ...(!hasSlug && !hasBleed ? style : {}),
            }}
        >
            {children}
        </div>
    );

    const bleedElement = hasBleed ? (
        <div
            className={twMerge("Paper:BleedArea relative", bleedClassName, !hasSlug && className)}
            style={{
                width: bleedWidth + "mm",
                height: bleedHeight + "mm",
                padding: `${bleedTopMm}mm ${bleedRightMm}mm ${bleedBottomMm}mm ${bleedLeftMm}mm`,
                ...(!hasSlug ? style : {}),
            }}
        >
            {trimElement}
            {cropMarkSizeMm > 0 && (
                <PrintMarkerCorners
                    bleedTopMm={bleedTopMm}
                    bleedRightMm={bleedRightMm}
                    bleedBottomMm={bleedBottomMm}
                    bleedLeftMm={bleedLeftMm}
                />
            )}
        </div>
    ) : (
        trimElement
    );

    return cropMarkSizeMm > 0 ? (
        <div
            className={twMerge("Paper:SlugArea", slugClassName, className)}
            style={{
                width: slugWidth + "mm",
                height: slugHeight + "mm",
                padding: cropMarkSizeMm + "mm",
                ...style,
            }}
        >
            {bleedElement}
        </div>
    ) : (
        <>{bleedElement}</>
    );
}
