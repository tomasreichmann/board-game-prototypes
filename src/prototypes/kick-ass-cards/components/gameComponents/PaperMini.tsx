import React, { SVGProps } from "react";
import clsx from "clsx";
import { PlayerCharacterType } from "../../types";
import CharacterOutline from "../../media/character-outline.svg";
import Icon from "../Icon";
// import "./PaperMini.css";

export type PaperMiniProps = React.PropsWithChildren<{
    imageUri: string;
    imageStyle?: React.CSSProperties;
    backImageUri?: string;
    backImageStyle?: React.CSSProperties;
    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];
    baseWidth?: React.CSSProperties["width"];
    baseStyle?: React.CSSProperties;
    cutBorderStyle?: React.CSSProperties["border"];
    baseContent?: React.ReactNode;
    backBaseContent?: React.ReactNode;
    className?: string;
    imageClassName?: string;
    backImageClassName?: string;
    baseClassName?: string;
    backBaseClassName?: string;
}>;

export default function PaperMini({
    className,
    imageUri,
    imageStyle = {},
    imageClassName,
    backImageClassName = imageClassName,
    baseClassName,
    backBaseClassName = baseClassName,
    backImageUri = imageUri,
    backImageStyle = { ...imageStyle, transform: "scaleY(-1)" },
    baseContent,
    backBaseContent,
    width = "2in",
    height = "2in",
    baseWidth = `calc(${width} / 2)`,
    cutBorderStyle = "1px dotted #888",
    baseStyle,
    children,
}: PaperMiniProps) {
    return (
        <div className={clsx("PaperMini flex flex-col", className)}>
            <div
                className={backBaseClassName}
                style={{
                    height: baseWidth,
                    width,
                    borderBottom: cutBorderStyle,
                    borderLeft: cutBorderStyle,
                    borderRight: cutBorderStyle,
                    borderBottomLeftRadius: baseWidth,
                    borderBottomRightRadius: baseWidth,
                    transform: "rotateZ(180deg)",
                    ...baseStyle,
                }}
            >
                {backBaseContent}
            </div>
            <div
                className={backImageClassName}
                style={{
                    height,
                    width,
                    borderLeft: cutBorderStyle,
                    borderRight: cutBorderStyle,
                    backgroundSize: "cover",
                    backgroundImage: `url("${backImageUri}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "bottom center",
                    ...backImageStyle,
                }}
            />
            <div
                className={imageClassName}
                style={{
                    height,
                    width,
                    borderLeft: cutBorderStyle,
                    borderRight: cutBorderStyle,
                    backgroundSize: "cover",
                    backgroundImage: `url("${imageUri}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "bottom center",
                    ...imageStyle,
                }}
            />
            <div
                className={baseClassName}
                style={{
                    height: baseWidth,
                    width,
                    borderBottom: cutBorderStyle,
                    borderLeft: cutBorderStyle,
                    borderRight: cutBorderStyle,
                    borderBottomLeftRadius: baseWidth,
                    borderBottomRightRadius: baseWidth,
                    ...baseStyle,
                }}
            >
                {baseContent}
            </div>

            {children}
        </div>
    );
}
