import twm from "@/utils/twm";
import React from "react";

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
    backgroundImageUri?: string;
    backgroundImageClassName?: string;
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
    backBaseContent = baseContent,
    backgroundImageClassName,
    backgroundImageUri,
    width = "2in",
    height = "2in",
    baseWidth = `calc(${width} / 2)`,
    cutBorderStyle = "1px dotted #888",
    baseStyle,
    children,
}: PaperMiniProps) {
    return (
        <div className={twm("PaperMini flex flex-col", className)}>
            {backgroundImageUri && (
                <>
                    <div
                        className={twm("absolute top-0", backgroundImageClassName)}
                        style={{
                            height: `calc(${baseWidth} + ${height})`,
                            width,
                            backgroundImage: `url("${backgroundImageUri}")`,
                            transform: "rotateZ(180deg)",
                            ...baseStyle,
                        }}
                    />
                    <div
                        className={twm("absolute bottom-0", backgroundImageClassName)}
                        style={{
                            height: `calc(${baseWidth} + ${height})`,
                            width,
                            backgroundImage: `url("${backgroundImageUri}")`,
                            ...baseStyle,
                        }}
                    />
                </>
            )}
            <div
                className={twm("z-1 relative", backBaseClassName)}
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
                className={twm("z-1 relative", backImageClassName)}
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
                className={twm("z-1 relative", imageClassName)}
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
                className={twm("z-1 relative", baseClassName)}
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
