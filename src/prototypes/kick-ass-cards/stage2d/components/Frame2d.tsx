import twm from "@/utils/twm";
import React, { HTMLAttributes, PropsWithChildren } from "react";

export type Frame2dProps = PropsWithChildren<{
    className?: string;
    width: number | string;
    height: number | string;
    panX?: number; // in pixels
    panY?: number; // in pixels
    rotateX?: number; // in degrees
    rotateY?: number; // in degrees
    rotateZ?: number; // in degrees
    scale?: number; // unitless
}> &
    HTMLAttributes<HTMLDivElement>;

export const Frame2d = ({
    className,
    children,
    width,
    height,
    panX = 0,
    panY = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    scale = 1,
    ...restProps
}: Frame2dProps) => {
    return (
        <div className={twm("Frame2d relative overflow-hidden", className)} style={{ width, height }} {...restProps}>
            <div
                className="absolute"
                style={{
                    transform: `translateX(${panX}px) translateY(${panY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </div>
        </div>
    );
};
