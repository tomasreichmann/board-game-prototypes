import React from "react";
import clsx from "clsx";
import { ScreenImageContentType } from "../../services/broadcastScreen";

export type ScreenContentImageProps = Omit<ScreenImageContentType, "type" | "id"> & { className?: string };

export default function ScreenContentImage({ className, style, uri, animation }: ScreenContentImageProps) {
    return (
        <div
            className={clsx("w-full h-full bg-no-repeat", animation && "animate-" + animation, className)}
            style={{
                backgroundPosition: "center center",
                ...style,
                backgroundImage: "url(" + uri + ")",
                animationFillMode: "both",
            }}
        />
    );
}
