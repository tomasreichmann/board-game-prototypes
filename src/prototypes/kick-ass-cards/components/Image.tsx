import React from "react";
import { twMerge } from "tailwind-merge";

export type ImageProps = React.PropsWithChildren<{
    className?: string;
    src?: string;
    style?: React.CSSProperties;
    objectFit?: React.CSSProperties["objectFit"];
    objectPosition?: React.CSSProperties["objectPosition"];
}>;

export default function Image({ className, objectFit, objectPosition, style, src, children }: ImageProps) {
    return (
        <div className={twMerge("relative overflow-hidden", className)} style={style}>
            <img src={src} alt="" style={{ objectFit, objectPosition }} className="h-full w-full" />
            {children}
        </div>
    );
}
