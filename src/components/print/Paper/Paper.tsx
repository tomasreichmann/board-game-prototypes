import React from "react";
import clsx from "clsx";
import { allSizes } from "../paperSizes";

// import "./Paper.css";

export type PaperProps = React.PropsWithChildren<{
    className?: string;
    size: keyof typeof allSizes;
    orientation?: "portrait" | "landscape";
}>;

export const PaperOrDiv = ({ size, ...restProps }: Omit<PaperProps, "size"> & { size?: PaperProps["size"] }) => {
    if (size) {
        return <Paper size={size} {...restProps} />;
    }
    return <div className={restProps.className}>{restProps.children}</div>;
};

export default function Paper({ className, size, orientation = "portrait", children }: PaperProps) {
    const sizeInMm = allSizes[size].mm;
    const [width, height] = orientation === "landscape" ? [...sizeInMm].reverse() : sizeInMm;

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
