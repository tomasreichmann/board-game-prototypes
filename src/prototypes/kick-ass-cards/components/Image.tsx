import React from "react";
import clsx from "clsx";

export type ImageProps = { className?: string; src: string; style?: React.CSSProperties };

export default function Image({ className, style = {}, src }: ImageProps) {
    return (
        <div
            className={clsx("bg-no-repeat min-h-[300px]", className)}
            style={{
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundImage: "url(" + src + ")",
                animationFillMode: "both",
                ...style,
            }}
        />
    );
}
