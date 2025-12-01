import React, { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { TransformType } from "../types";

export type StageObjectProps = PropsWithChildren<{
    className?: string;
    width: number | string;
    height: number | string;
}> &
    TransformType &
    HTMLAttributes<HTMLDivElement>;

export const StageObject = ({
    className,
    children,
    width,
    height,
    x = 0,
    y = 0,
    z = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    scale = 1,
    ...restProps
}: StageObjectProps) => {
    return (
        <div
            className={twMerge("StageObject absolute", className)}
            style={{
                width,
                height,
                transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
            }}
            {...restProps}
        >
            {children}
        </div>
    );
};
