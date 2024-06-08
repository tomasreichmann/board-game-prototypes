import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export type LidBoxProps = React.PropsWithChildren<{
    className?: string;
    classNamePartVisible?: string;
    classNameLabel?: string;
    contentWidth: number;
    contentHeight: number;
    contentDepth: number;
    paperThickness?: number;
    sideLipSize?: number;
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

const diagonalMod = Math.sqrt(2);

export default function LidBox({
    contentWidth,
    contentHeight,
    contentDepth,
    paperThickness = 0.25,
    sideLipSize = Math.min(Math.max(contentDepth / 10, 5), contentDepth),
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
}: LidBoxProps) {
    const cutTopStyle = {
        borderTopWidth: "0.2mm",
        borderTopStyle: "solid",
        borderTopColor: "rgba(0,0,0,0.25)",
        ...cutStyles.top,
    } as CSSProperties;
    const cutRightStyle = {
        borderRightWidth: "0.2mm",
        borderRightStyle: "solid",
        borderRightColor: "rgba(0,0,0,0.25)",
        ...cutStyles.right,
    } as CSSProperties;
    const cutBottomStyle = {
        borderBottomWidth: "0.2mm",
        borderBottomStyle: "solid",
        borderBottomColor: "rgba(0,0,0,0.25)",
        ...cutStyles.bottom,
    } as CSSProperties;
    const cutLeftStyle = {
        borderLeftWidth: "0.2mm",
        borderLeftStyle: "solid",
        borderLeftColor: "rgba(0,0,0,0.25)",
        ...cutStyles.left,
    } as CSSProperties;
    const bendRightStyle = {
        borderRightWidth: "0.2mm",
        borderRightStyle: "dotted",
        borderRightColor: "rgba(0,0,0,0.25)",
        ...bendStyles.right,
    } as CSSProperties;
    const bendBottomStyle = {
        borderBottomWidth: "0.2mm",
        borderBottomStyle: "dotted",
        borderBottomColor: "rgba(0,0,0,0.25)",
        ...bendStyles.bottom,
    } as CSSProperties;
    const bendLeftStyle = {
        borderLeftWidth: "0.2mm",
        borderLeftStyle: "dotted",
        borderLeftColor: "rgba(0,0,0,0.25)",
        ...bendStyles.left,
    } as CSSProperties;

    const leftDiagonalBendElement = (
        <div
            className="LeftDiagonalBend absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 h-0"
            style={{ ...bendBottomStyle, width: diagonalMod * 100 + "%" }}
        />
    );

    const rightDiagonalBendElement = (
        <div
            className="RightDiagonalBend absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 h-0"
            style={{ ...bendBottomStyle, width: diagonalMod * 100 + "%" }}
        />
    );

    return (
        <div className={twMerge("LidBox relative", className)}>
            <div className="flex flex-col items-center">
                <div
                    className={twMerge("FrontSideLip relative flex flex-row justify-center", classNamePartVisible)}
                    style={{
                        width: contentWidth + "mm",
                        height: sideLipSize + "mm",
                        ...cutTopStyle,
                        ...cutLeftStyle,
                        ...cutRightStyle,
                        ...bendBottomStyle,
                    }}
                />
                <div className={twMerge("FrontSide relative flex flex-col justify-center", classNamePartVisible)}>
                    <div
                        className={twMerge("FrontSideContent relative flex flex-row justify-center")}
                        style={{
                            width: contentWidth + "mm",
                            height: contentDepth + "mm",
                            ...bendBottomStyle,
                            ...bendLeftStyle,
                            ...bendRightStyle,
                        }}
                    >
                        <div
                            className="FrontSideLeftCorner flex flex-row justify-center absolute"
                            style={{
                                width: contentDepth + "mm",
                                height: contentDepth + "mm",
                                top: 0,
                                right: "100%",
                                ...cutTopStyle,
                                ...cutLeftStyle,
                                ...bendBottomStyle,
                            }}
                        >
                            {leftDiagonalBendElement}
                        </div>
                        <div
                            className="FrontSideRightCorner flex flex-row justify-center absolute"
                            style={{
                                width: contentDepth + "mm",
                                height: contentDepth + "mm",
                                top: 0,
                                left: "100%",
                                ...cutTopStyle,
                                ...cutRightStyle,
                                ...bendBottomStyle,
                            }}
                        >
                            {rightDiagonalBendElement}
                        </div>
                    </div>
                    {showLabels && <Label className={classNameLabel}>contentFront</Label>}
                    <Content style={{ width: contentWidth + "mm", height: contentDepth + "mm" }}>
                        {contentFront}
                    </Content>
                </div>
                <div className={twMerge("Center relative flex flex-row justify-center", classNamePartVisible)}>
                    <div
                        className={twMerge("LeftSideLip relative flex flex-row justify-center", classNamePartVisible)}
                        style={{
                            width: sideLipSize + "mm",
                            height: contentHeight + "mm",
                            ...cutTopStyle,
                            ...cutLeftStyle,
                            ...cutBottomStyle,
                            ...bendRightStyle,
                        }}
                    />
                    <div
                        className={twMerge("LeftSide relative flex flex-row justify-center", classNamePartVisible)}
                        style={{
                            width: contentDepth + "mm",
                            height: contentHeight + "mm",
                            ...bendRightStyle,
                        }}
                    >
                        <div
                            className={twMerge("LeftBase absolute", classNamePartVisible)}
                            style={{
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: contentDepth + "mm",
                                ...bendBottomStyle,
                            }}
                        />
                        {showLabels && (
                            <Label className={classNameLabel} rotate={-90}>
                                contentLeft
                            </Label>
                        )}
                        <Content style={{ width: contentDepth + "mm", height: contentHeight + "mm" }}>
                            {contentLeft}
                        </Content>
                    </div>
                    <div
                        className={twMerge("BottomSide relative flex flex-row justify-center", classNamePartVisible)}
                        style={{
                            width: contentWidth + "mm",
                            height: contentHeight + "mm",
                            ...bendBottomStyle,
                        }}
                    >
                        {showLabels && <Label className={classNameLabel}>contentBottom</Label>}
                        <Content style={{ width: contentWidth + "mm", height: contentHeight + "mm" }}>
                            {contentBottom}
                        </Content>
                    </div>

                    <div
                        className={twMerge("RightSide relative flex flex-row justify-center", classNamePartVisible)}
                        style={{
                            width: contentDepth + "mm",
                            height: contentHeight + "mm",
                            ...bendLeftStyle,
                        }}
                    >
                        <div
                            className={twMerge("RightBase absolute", classNamePartVisible)}
                            style={{
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: contentDepth + "mm",
                                ...bendBottomStyle,
                            }}
                        />
                        {showLabels && (
                            <Label className={classNameLabel} rotate={90}>
                                contentRight
                            </Label>
                        )}
                        <Content style={{ width: contentDepth + "mm", height: contentHeight + "mm" }}>
                            {contentRight}
                        </Content>
                    </div>
                    <div
                        className={twMerge("RightSideLip relative flex flex-row justify-center", classNamePartVisible)}
                        style={{
                            width: sideLipSize + "mm",
                            height: contentHeight + "mm",
                            ...cutTopStyle,
                            ...bendLeftStyle,
                            ...cutBottomStyle,
                            ...cutRightStyle,
                        }}
                    />
                </div>
                <div className={twMerge("BottomSide relative flex flex-col justify-center", classNamePartVisible)}>
                    <div
                        className={twMerge("BottomSideBase relative flex flex-row justify-center")}
                        style={{
                            width: contentWidth + "mm",
                            height: contentDepth + "mm",
                            ...bendLeftStyle,
                            ...bendRightStyle,
                            ...bendBottomStyle,
                        }}
                    >
                        <div
                            className="BottomSideLeftCorner flex flex-row justify-center absolute"
                            style={{
                                width: contentDepth + "mm",
                                height: contentDepth + "mm",
                                top: 0,
                                right: "100%",
                                ...cutBottomStyle,
                                ...cutLeftStyle,
                            }}
                        >
                            {rightDiagonalBendElement}
                        </div>
                        <div
                            className="BottomSideRightCorner flex flex-row justify-center absolute"
                            style={{
                                width: contentDepth + "mm",
                                height: contentDepth + "mm",
                                top: 0,
                                left: "100%",
                                ...cutRightStyle,
                                ...bendBottomStyle,
                            }}
                        >
                            {leftDiagonalBendElement}
                        </div>
                    </div>

                    {showLabels && (
                        <Label className={classNameLabel} rotate={-180}>
                            contentBack
                        </Label>
                    )}
                    <Content style={{ width: contentHeight + "mm", height: contentDepth + "mm" }} rotate={-180}>
                        {contentBack}
                    </Content>
                </div>
                <div
                    className={twMerge("BottomSideLip relative flex flex-row justify-center", classNamePartVisible)}
                    style={{
                        width: contentWidth + "mm",
                        height: sideLipSize + "mm",
                        ...cutLeftStyle,
                        ...cutRightStyle,
                        ...cutBottomStyle,
                    }}
                />
            </div>
            {children}
        </div>
    );
}
