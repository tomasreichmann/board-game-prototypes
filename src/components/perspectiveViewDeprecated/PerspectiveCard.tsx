import react, { CSSProperties, HTMLAttributes, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Position, PositionProps } from "./Position";
import ToggleData from "../DataToggle";
import degreesToRadians from "../../utils/degreesToRadians";

export type PerspectiveCardProps = React.PropsWithChildren<
    {
        front: React.ReactNode;
        back: React.ReactNode;
        shadow?: boolean;
        shadowPositionX?: number;
        shadowPositionY?: number;
        shadowPositionZ?: number;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
        shadowOffsetZ?: number;
        shadowBlurChange?: number;
        shadowOpacityStart?: number;
        shadowOpacityChange?: number;
        shadowColor?: string;
        shadowRadius?: string;
    } & PositionProps
>;

export const PerspectiveCard = ({ front, back, children, shadow, ...propsWithoutChildren }: PerspectiveCardProps) => {
    const {
        className,
        x = 0,
        y = 0,
        z = 0,
        rotateX = 0,
        rotateY = 0,
        rotateZ = 0,
        center,
        alignX = center ? "50%" : 0,
        alignY = center ? "50%" : 0,
        transitionDurationMs = 500,
        shadowOffsetX = 0,
        shadowOffsetY = 0,
        shadowOffsetZ,
        shadowPositionX = shadowOffsetX !== undefined ? x + shadowOffsetX : x,
        shadowPositionY = shadowOffsetY !== undefined ? y + shadowOffsetY : y,
        shadowPositionZ = shadowOffsetZ !== undefined ? z + shadowOffsetZ : -0.1,
        shadowBlurChange = 0.1,
        shadowOpacityStart = 0.35,
        shadowOpacityChange = -0.001,
        shadowColor = "rgba(0,0,0,0.5)",
        shadowRadius = "8px",
        ...restProps
    } = propsWithoutChildren;

    const positionProps = {
        x,
        y,
        z,
        alignX,
        alignY,
        rotateX,
        rotateY,
        rotateZ,
        transitionDurationMs,
    };

    const backStyle: CSSProperties = {
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translateZ(-1px) rotateZ(-180deg) rotateX(-180deg)`,
    };

    const zDifference = z - shadowPositionZ;

    const shadowProps = {
        x: shadowPositionX,
        y: shadowPositionY,
        z: shadowPositionZ,
        alignX,
        alignY,
        transitionDurationMs,
    };

    const shadowStyle: CSSProperties = {
        width: "100%",
        height: "100%",
        borderRadius: shadowRadius,
        opacity: Math.max(shadowOpacityStart + shadowOpacityChange * z, 0),
        filter: `blur(${Math.max(zDifference * shadowBlurChange, 2)}px) brightness(0)`,
        transform: `scaleX(${Math.cos(degreesToRadians(rotateY))}) scaleY(${Math.cos(
            degreesToRadians(rotateX)
        )}) scaleZ(${Math.cos(degreesToRadians(rotateZ))}) rotateZ(${rotateZ}deg)`,
        transition: `filter ${transitionDurationMs}ms ease-in-out, opacity ${transitionDurationMs}ms ease-in-out, transform ${transitionDurationMs}ms ease-in-out`,
    };

    return (
        <>
            <div className={twMerge("PerspectiveCard", className)} {...restProps}>
                <Position {...positionProps} key="front">
                    {front}
                    <div style={backStyle}>{back}</div>
                </Position>
                {shadow && (
                    <Position key="shadow" {...shadowProps} style={shadowStyle}>
                        {front}
                    </Position>
                )}
            </div>
        </>
    );
};
