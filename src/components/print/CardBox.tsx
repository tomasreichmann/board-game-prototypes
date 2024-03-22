import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export type CardBoxProps = React.PropsWithChildren<{
    className?: string;
    classNamePartVisible?: string;
    classNameLabel?: string;
    contentWidth: number;
    contentHeight: number;
    contentDepth: number;
    paperThickness?: number;
    lidFoldLength?: number;
    bendStyles?: {
        top?: React.CSSProperties;
        right?: React.CSSProperties;
        bottom?: React.CSSProperties;
        left?: React.CSSProperties;
    };
    cutStyles?: {
        top?: React.CSSProperties;
        right?: React.CSSProperties;
        bottom?: React.CSSProperties;
        left?: React.CSSProperties;
    };
    showLabels?: boolean;
    contentLeft?: React.ReactNode;
    contentFront?: React.ReactNode;
    contentTop?: React.ReactNode;
    contentRight?: React.ReactNode;
    contentBottom?: React.ReactNode;
    contentBack?: React.ReactNode;
}>;

const Content = ({
    children,
    rotate,
    className,
    style = {},
    ...restProps
}: React.PropsWithChildren<{ rotate?: number } & React.HTMLAttributes<HTMLDivElement>>) => (
    <div
        {...restProps}
        className={twMerge("absolute left-1/2 top-1/2", className)}
        style={{
            translate: "-50% -50%",
            rotate: rotate ? `${rotate}deg` : undefined,
            transformOrigin: "50% 50%",
            ...style,
        }}
    >
        {children}
    </div>
);

const Label = ({
    children,
    rotate,
    className,
    style = {},
    ...restProps
}: React.PropsWithChildren<{ rotate?: number } & React.HTMLAttributes<HTMLDivElement>>) => (
    <div
        {...restProps}
        className={twMerge(
            "absolute left-1/2 top-1/2 flex flex-col justify-center items-center text-[10px] font-sans text-black",
            className
        )}
        style={{
            translate: "-50% -50%",
            rotate: rotate ? `${rotate}deg` : undefined,
            transformOrigin: "50% 50%",
            ...style,
        }}
    >
        {children}
    </div>
);

export default function CardBox({
    contentWidth,
    contentHeight,
    contentDepth,
    paperThickness = 0.25,
    lidFoldLength = 15,
    showLabels = false,
    className,
    classNamePartVisible,
    bendStyles = {},
    cutStyles = {},
    classNameLabel,
    contentLeft,
    contentFront,
    contentTop,
    contentRight,
    contentBottom,
    contentBack,
    children,
}: CardBoxProps) {
    const cutTopStyle = {
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "rgba(0,0,0,0.25)",
        ...cutStyles.top,
    } as CSSProperties;
    const cutRightStyle = {
        borderRightWidth: "1px",
        borderRightStyle: "solid",
        borderRightColor: "rgba(0,0,0,0.25)",
        ...cutStyles.right,
    } as CSSProperties;
    const cutBottomStyle = {
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "rgba(0,0,0,0.25)",
        ...cutStyles.bottom,
    } as CSSProperties;
    const cutLeftStyle = {
        borderLeftWidth: "1px",
        borderLeftStyle: "solid",
        borderLeftColor: "rgba(0,0,0,0.25)",
        ...cutStyles.left,
    } as CSSProperties;
    const bendRightStyle = {
        borderRightWidth: "1px",
        borderRightStyle: "dotted",
        borderRightColor: "rgba(0,0,0,0.25)",
        ...bendStyles.right,
    } as CSSProperties;
    const bendBottomStyle = {
        borderBottomWidth: "1px",
        borderBottomStyle: "dotted",
        borderBottomColor: "rgba(0,0,0,0.25)",
        ...bendStyles.bottom,
    } as CSSProperties;
    const bendLeftStyle = {
        borderLeftWidth: "1px",
        borderLeftStyle: "dotted",
        borderLeftColor: "rgba(0,0,0,0.25)",
        ...bendStyles.left,
    } as CSSProperties;

    return (
        <div className={twMerge("CardBox relative", className)}>
            <div className="flex flex-col items-center">
                <div
                    className={twMerge("Right relative flex flex-row justify-center", classNamePartVisible)}
                    style={{
                        width: contentHeight + "mm",
                        height: contentDepth + "mm",
                        ...cutTopStyle,
                        ...bendBottomStyle,
                    }}
                >
                    <div
                        className="RightBottomFlap flex flex-row justify-center absolute"
                        style={{
                            width: contentWidth * 0.25 + "mm",
                            height: contentDepth - paperThickness * 4 + "mm",
                            right: "100%",
                            top: paperThickness * 2 + "mm",
                            borderBottomLeftRadius: "50%",
                            ...cutTopStyle,
                            ...cutLeftStyle,
                            ...cutBottomStyle,
                        }}
                    />
                    <div
                        className="RightTopFlap flex flex-row justify-center absolute"
                        style={{
                            width: contentWidth * 0.25 + "mm",
                            height: contentDepth - paperThickness * 4 + "mm",
                            left: "100%",
                            top: paperThickness * 2 + "mm",
                            borderTopRightRadius: "50%",
                            ...cutTopStyle,
                            ...cutRightStyle,
                            ...cutBottomStyle,
                        }}
                    />
                    {showLabels && (
                        <Label className={classNameLabel} rotate={-180}>
                            contentRight
                        </Label>
                    )}
                    <Content rotate={-180} style={{ width: contentHeight + "mm", height: contentDepth + "mm" }}>
                        {contentRight}
                    </Content>
                </div>
                <div
                    className={twMerge("Back relative flex flex-row justify-center", classNamePartVisible)}
                    style={{
                        width: contentHeight + "mm",
                        height: contentWidth + "mm",
                        ...cutLeftStyle,
                        ...bendBottomStyle,
                    }}
                >
                    {/* For easier opening of the lid */}
                    {/* <div
                        className="BackBend absolute top-0 right-0 bottom-0"
                        style={{
                            ...cutTopStyle,
                            ...bendRightStyle,
                            ...cutBottomStyle,
                        }}
                    /> */}
                    <div
                        className={twMerge("Top flex flex-row justify-center absolute", classNamePartVisible)}
                        style={{
                            width: contentDepth + "mm",
                            height: contentWidth + "mm",
                            left: "100%",
                            top: 0,
                            ...bendLeftStyle,
                            ...cutTopStyle,
                            ...bendRightStyle,
                            ...cutBottomStyle,
                        }}
                    >
                        {showLabels && (
                            <Label className={classNameLabel} rotate={-90}>
                                contentTop
                            </Label>
                        )}
                        <Content rotate={-90} style={{ width: contentWidth + "mm", height: contentDepth + "mm" }}>
                            {contentTop}
                        </Content>

                        <div
                            className={twMerge("TopLidLipLeft absolute", classNamePartVisible)}
                            style={{
                                top: 0,
                                left: "100%",
                                width: lidFoldLength + "mm",
                                height: lidFoldLength / 2 + "mm",
                                borderTopRightRadius: lidFoldLength / 2 + "mm",
                                ...cutTopStyle,
                                ...cutRightStyle,
                                ...cutLeftStyle,
                            }}
                        />
                        <div
                            className={twMerge("TopLidLipCenter absolute", classNamePartVisible)}
                            style={{
                                top: lidFoldLength / 2 + "mm",
                                bottom: lidFoldLength / 2 + "mm",
                                left: "100%",
                                width: lidFoldLength + "mm",
                                ...cutRightStyle,
                                ...bendLeftStyle,
                            }}
                        />
                        <div
                            className={twMerge("TopLidLipRight absolute", classNamePartVisible)}
                            style={{
                                bottom: 0,
                                left: "100%",
                                width: lidFoldLength + "mm",
                                height: lidFoldLength / 2 + "mm",
                                borderBottomRightRadius: lidFoldLength / 2 + "mm",
                                ...cutRightStyle,
                                ...cutBottomStyle,
                                ...cutLeftStyle,
                            }}
                        />
                    </div>
                    {showLabels && (
                        <Label className={classNameLabel} rotate={90}>
                            contentBack
                        </Label>
                    )}
                    <Content rotate={90} style={{ width: contentWidth + "mm", height: contentHeight + "mm" }}>
                        {contentBack}
                    </Content>
                </div>
                <div
                    className={twMerge("Left relative flex flex-row justify-center", classNamePartVisible)}
                    style={{ width: contentHeight + "mm", height: contentDepth + "mm", ...bendBottomStyle }}
                >
                    <div
                        className="LeftBottomFlap flex flex-row justify-center absolute"
                        style={{
                            width: contentWidth * 0.25 + "mm",
                            height: contentDepth - paperThickness * 4 + "mm",
                            right: "100%",
                            top: paperThickness * 2 + "mm",
                            borderTopLeftRadius: "50%",
                            ...cutTopStyle,
                            ...cutLeftStyle,
                            ...cutBottomStyle,
                        }}
                    />
                    <div
                        className="LeftTopFlap flex flex-row justify-center absolute"
                        style={{
                            width: contentWidth * 0.25 + "mm",
                            height: contentDepth - paperThickness * 4 + "mm",
                            left: "100%",
                            top: paperThickness * 2 + "mm",
                            borderBottomRightRadius: "50%",
                            ...cutTopStyle,
                            ...cutRightStyle,
                            ...cutBottomStyle,
                        }}
                    />
                    {showLabels && <Label className={classNameLabel}>contentLeft</Label>}
                    <Content style={{ width: contentHeight + "mm", height: contentDepth + "mm" }}>
                        {contentLeft}
                    </Content>
                </div>
                <div
                    className={twMerge("Front relative flex flex-row justify-center", classNamePartVisible)}
                    style={{
                        width: contentHeight + "mm",
                        height: contentWidth + "mm",
                        ...cutRightStyle,
                        ...bendBottomStyle,
                    }}
                >
                    <div
                        className={twMerge("Bottom flex flex-row justify-center absolute", classNamePartVisible)}
                        style={{
                            width: contentDepth + "mm",
                            height: contentWidth + "mm",
                            right: "100%",
                            top: 0,
                            ...bendLeftStyle,
                            ...cutTopStyle,
                            ...bendRightStyle,
                            ...cutBottomStyle,
                        }}
                    >
                        {showLabels && (
                            <Label className={classNameLabel} rotate={90}>
                                contentBottom
                            </Label>
                        )}
                        <Content rotate={90} style={{ width: contentWidth + "mm", height: contentDepth + "mm" }}>
                            {contentBottom}
                        </Content>

                        <div
                            className={twMerge("BottomLidLipLeft absolute", classNamePartVisible)}
                            style={{
                                top: 0,
                                right: "100%",
                                width: lidFoldLength + "mm",
                                height: lidFoldLength / 2 + "mm",
                                borderTopLeftRadius: lidFoldLength / 2 + "mm",
                                ...cutTopStyle,
                                ...cutRightStyle,
                                ...cutLeftStyle,
                            }}
                        />
                        <div
                            className={twMerge("BottomLidLipCenter absolute", classNamePartVisible)}
                            style={{
                                top: lidFoldLength / 2 + "mm",
                                bottom: lidFoldLength / 2 + "mm",
                                right: "100%",
                                width: lidFoldLength + "mm",
                                ...bendRightStyle,
                                ...cutLeftStyle,
                            }}
                        />
                        <div
                            className={twMerge("BottomLidLipRight absolute", classNamePartVisible)}
                            style={{
                                bottom: 0,
                                right: "100%",
                                width: lidFoldLength + "mm",
                                height: lidFoldLength / 2 + "mm",
                                borderBottomLeftRadius: lidFoldLength / 2 + "mm",
                                ...cutRightStyle,
                                ...cutBottomStyle,
                                ...cutLeftStyle,
                            }}
                        />
                    </div>
                    {showLabels && (
                        <Label className={classNameLabel} rotate={90}>
                            contentFront
                        </Label>
                    )}
                    <Content rotate={90} style={{ width: contentWidth + "mm", height: contentHeight + "mm" }}>
                        {contentFront}
                    </Content>
                </div>
                <div
                    className={twMerge("Glue relative flex flex-row justify-center", classNamePartVisible)}
                    style={{
                        width: contentHeight + "mm",
                        height: contentDepth + "mm",
                        borderBottomLeftRadius: "10mm 100%",
                        borderBottomRightRadius: "10mm 100%",
                        ...cutBottomStyle,
                        ...cutRightStyle,
                        ...cutLeftStyle,
                    }}
                >
                    {showLabels && <Label className={classNameLabel}>glue</Label>}
                </div>
            </div>
            {children}
        </div>
    );
}
