import React, { SVGProps } from "react";
import clsx from "clsx";
import Icon from "./Icon";
import { range } from "lodash";
// import "./PapercraftBox.css";

export type PaperCraftBoxProps = React.PropsWithChildren<{
    className?: string;
    classNameVisible?: string;
    contentWidth: number;
    contentHeight: number;
    contentDepth: number;
    paperThickness?: number;
    bendStyles?: React.CSSProperties;
    isInside?: boolean;
    showLabels?: boolean;
    contentBoxOutsideBack?: React.ReactNode;
    contentBoxOutsideLeft?: React.ReactNode;
    contentBoxOutsideRight?: React.ReactNode;
    contentBoxOutsideFront?: React.ReactNode;
    contentBoxOutsideBottom?: React.ReactNode;
    contentBoxInsideBack?: React.ReactNode;
    contentBoxInsideLeft?: React.ReactNode;
    contentBoxInsideRight?: React.ReactNode;
    contentBoxInsideFront?: React.ReactNode;
    contentBoxInsideBottom?: React.ReactNode;
    contentLidOutsideTop?: React.ReactNode;
    contentLidOutsideFront?: React.ReactNode;
    contentLidOutsideTopFlapLeft?: React.ReactNode;
    contentLidOutsideTopFlapRight?: React.ReactNode;
    contentLidOutsideFrontFlapLeft?: React.ReactNode;
    contentLidOutsideFrontFlapRight?: React.ReactNode;
    contentLidInsideTop?: React.ReactNode;
    contentLidInsideFront?: React.ReactNode;
    contentLidInsideTopFlapLeft?: React.ReactNode;
    contentLidInsideTopFlapRight?: React.ReactNode;
    contentLidInsideFrontFlapLeft?: React.ReactNode;
    contentLidInsideFrontFlapRight?: React.ReactNode;
}>;

const Content = ({ children }: React.PropsWithChildren<{}>) => (
    <div className="absolute left-0 top-0 right-0 bottom-0">{children}</div>
);

const Label = ({ children, rotate }: React.PropsWithChildren<{ rotate?: boolean }>) => (
    <div
        className={
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-[8px] text-black" +
            (rotate ? " -rotate-90" : "")
        }
    >
        {children}
    </div>
);

export default function PaperCraftBox({
    contentWidth,
    contentHeight,
    contentDepth,
    paperThickness = 0.25,
    isInside = false,
    showLabels = false,
    className,
    classNameVisible,
    bendStyles = {},
    contentBoxOutsideBack,
    contentBoxOutsideLeft,
    contentBoxOutsideRight,
    contentBoxOutsideFront,
    contentBoxOutsideBottom,
    contentBoxInsideBack,
    contentBoxInsideLeft,
    contentBoxInsideRight,
    contentBoxInsideFront,
    contentBoxInsideBottom,
    contentLidOutsideTop,
    contentLidOutsideFront,
    contentLidOutsideTopFlapLeft,
    contentLidOutsideTopFlapRight,
    contentLidOutsideFrontFlapLeft,
    contentLidOutsideFrontFlapRight,
    contentLidInsideTop,
    contentLidInsideFront,
    contentLidInsideTopFlapLeft,
    contentLidInsideTopFlapRight,
    contentLidInsideFrontFlapLeft,
    contentLidInsideFrontFlapRight,
    children,
}: PaperCraftBoxProps) {
    const cutTopStyle = { borderTop: "1px dotted black" };
    const cutRightStyle = { borderRight: "1px dotted black" };
    const cutBottomStyle = { borderBottom: "1px dotted black" };
    const cutLeftStyle = { borderLeft: "1px dotted black" };
    const bendInsideStyle = showLabels
        ? { borderStyle: "dashed", borderColor: "lightgrey" }
        : { borderColor: "transparent", ...bendStyles };
    const verticalBendInside = (
        <div className="self-stretch" style={{ borderRightWidth: paperThickness + "mm", ...bendInsideStyle }}></div>
    );

    const boxInsideBackFlapLeft = (
        <div
            className="relative"
            style={{
                height: contentDepth + "mm",
                width: contentHeight / 2 + "mm",
                ...cutTopStyle,
                ...cutLeftStyle,
                ...cutBottomStyle,
            }}
        >
            {showLabels && <Label>{isInside ? "boxInsideBackFlapLeft" : "boxOutsideBackFlapLeft"}</Label>}
        </div>
    );
    const boxInsideBack = (
        <div
            className={clsx("relative", classNameVisible)}
            style={{ height: contentDepth + "mm", width: contentWidth + "mm", ...cutTopStyle }}
        >
            {showLabels && <Label>{isInside ? "boxInsideBack" : "boxOutsideBack"}</Label>}
            {isInside ? contentBoxInsideBack : contentBoxOutsideBack}
        </div>
    );
    const boxInsideBackFlapRight = (
        <div
            className="relative"
            style={{
                height: contentDepth + "mm",
                width: contentHeight / 2 + "mm",
                ...cutTopStyle,
                ...cutRightStyle,
                ...cutBottomStyle,
            }}
        >
            {showLabels && <Label>{isInside ? "boxInsideBackFlapRight" : "boxOutsideBackFlapRight"}</Label>}
        </div>
    );

    const boxInsideBackBend = (
        <div style={{ borderTopWidth: paperThickness + "mm", width: contentWidth + "mm", ...bendInsideStyle }} />
    );

    const boxLeftInsidePlug = (
        <div
            className={clsx("relative", classNameVisible)}
            style={{
                height: contentHeight / 2 + "mm",
                width: paperThickness * 2 + "mm",
                borderTopLeftRadius: paperThickness + "mm",
                borderBottomLeftRadius: paperThickness + "mm",
                ...cutTopStyle,
                ...cutLeftStyle,
                ...cutBottomStyle,
            }}
        />
    );

    const boxLeftInsideOuter = (
        <div
            className={"relative flex flex-col justify-between items-start" + (isInside ? "" : " " + classNameVisible)}
            style={{ height: contentHeight + "mm", width: contentDepth + "mm", ...cutTopStyle, ...cutBottomStyle }}
        >
            <div style={{ height: contentHeight / 4 + "mm", ...cutLeftStyle }}></div>
            {showLabels && <Label rotate>{isInside ? "boxLeftHiddenOuter" : "boxLeftOutside"}</Label>}
            {!isInside && <Content>{contentBoxInsideLeft}</Content>}
            <div style={{ height: contentHeight / 4 + "mm", ...cutLeftStyle }}></div>
        </div>
    );
    const boxLeftInsideInner = (
        <div
            className={"relative" + (isInside ? "" : " " + classNameVisible)}
            style={{ height: contentHeight + "mm", width: contentDepth + "mm", ...cutTopStyle, ...cutBottomStyle }}
        >
            {!isInside && <Content>{contentBoxOutsideLeft}</Content>}
            {showLabels && <Label rotate>{isInside ? "boxLeftHiddenInner" : "boxLeftInside"}</Label>}
        </div>
    );

    const boxBottomInsideBendLeft = (
        <div
            style={{
                height: contentHeight + "mm",
                borderRightWidth: paperThickness * 3 + "mm",
                ...bendInsideStyle,
                ...cutTopStyle,
                ...cutBottomStyle,
            }}
        ></div>
    );

    const boxBottomLeftCutout = (
        <div
            style={{
                height: contentHeight / 2 + paperThickness + "mm",
                width: paperThickness * 2 + "mm",
                borderRadius: paperThickness + "mm",
                backgroundColor: "black",
            }}
        ></div>
    );

    const boxBottomRightCutout = boxBottomLeftCutout;

    const boxBottomInside = (
        <div
            className={clsx("relative flex flex-row justify-between items-center", classNameVisible)}
            style={{ height: contentHeight + "mm", width: contentWidth + "mm" }}
        >
            {boxBottomLeftCutout}
            <div className="relative">
                {showLabels && <Label>{isInside ? "boxBottomInside" : "boxBottomOutside"}</Label>}
            </div>
            <Content>{isInside ? contentBoxInsideBottom : contentBoxOutsideBottom}</Content>
            {boxBottomRightCutout}
        </div>
    );

    const boxBottomInsideBendRight = boxBottomInsideBendLeft;

    const boxRightInsideOuter = (
        <div
            className={"relative flex flex-col justify-between items-end" + (isInside ? "" : " " + classNameVisible)}
            style={{
                height: contentHeight + "mm",
                width: contentDepth + "mm",
                ...cutTopStyle,
                ...cutBottomStyle,
            }}
        >
            <div style={{ height: contentHeight / 4 + "mm", ...cutRightStyle }}></div>
            {showLabels && <Label rotate>{isInside ? "boxRightHiddenOuter" : "boxRightInside"}</Label>}
            {!isInside && <Content>{contentBoxInsideRight}</Content>}
            <div style={{ height: contentHeight / 4 + "mm", ...cutRightStyle }}></div>
        </div>
    );
    const boxRightInsideInner = (
        <div
            className={"relative" + (isInside ? "" : " " + classNameVisible)}
            style={{
                height: contentHeight + "mm",
                width: contentDepth + "mm",
                ...cutTopStyle,
                ...cutBottomStyle,
            }}
        >
            {showLabels && <Label rotate>{isInside ? "boxRightHiddenInner" : "boxRightOutside"}</Label>}
            {!isInside && <Content>{contentBoxOutsideRight}</Content>}
        </div>
    );

    const boxRightInsidePlug = (
        <div
            className={clsx("relative", classNameVisible)}
            style={{
                height: contentHeight / 2 + "mm",
                width: paperThickness * 2 + "mm",
                borderTopRightRadius: paperThickness + "mm",
                borderBottomRightRadius: paperThickness + "mm",
                ...cutTopStyle,
                ...cutRightStyle,
                ...cutBottomStyle,
            }}
        ></div>
    );

    const boxInsideFrontBend = boxInsideBackBend;

    const boxInsideFrontFlapLeft = boxInsideBackFlapLeft;
    const boxInsideFront = (
        <div
            className={clsx("relative", classNameVisible)}
            style={{ height: contentDepth + "mm", width: contentWidth + "mm" }}
        >
            {showLabels && <Label>{isInside ? "boxInsideFront" : "boxOutsideFront"}</Label>}
            {<Content>{isInside ? contentBoxInsideFront : contentBoxOutsideFront}</Content>}
        </div>
    );
    const boxInsideFrontFlapRight = boxInsideBackFlapRight;

    const lidInsideTopFlapLeft = (
        <div
            className={clsx("relative", classNameVisible)}
            style={{
                height: contentHeight + "mm",
                width: Math.min(contentHeight, contentDepth) / 2 + "mm",
                borderTopLeftRadius: Math.min(contentHeight, contentDepth) / 2 + "mm",
                borderBottomLeftRadius: Math.min(contentHeight, contentDepth) / 2 + "mm",
                ...cutTopStyle,
                ...cutLeftStyle,
                ...cutBottomStyle,
            }}
        >
            {showLabels && <Label rotate>{isInside ? "lidInsideTopFlapLeft" : "lidOutsideTopFlapLeft"}</Label>}
            {<Content>{isInside ? contentLidInsideTopFlapLeft : contentLidOutsideTopFlapLeft}</Content>}
        </div>
    );
    const lidTopInsideBendLeft = (
        <div
            style={{
                height: contentHeight + "mm",
                borderRightWidth: paperThickness + "mm",
                ...bendInsideStyle,
                ...cutTopStyle,
                ...cutBottomStyle,
            }}
        ></div>
    );
    const lidTopInside = (
        <div
            className={clsx("relative flex flex-row justify-between", classNameVisible)}
            style={{ height: contentHeight + "mm", width: contentWidth + "mm" }}
        >
            {showLabels && <Label>{isInside ? "lidTopInside" : "lidTopOutside"}</Label>}
            {<Content>{isInside ? contentLidInsideTop : contentLidOutsideTop}</Content>}
        </div>
    );
    const lidTopInsideBendRight = lidTopInsideBendLeft;
    const lidInsideTopFlapRight = (
        <div
            className={clsx("relative", classNameVisible)}
            style={{
                height: contentHeight + "mm",
                width: Math.min(contentHeight, contentDepth) / 2 + "mm",
                borderTopRightRadius: Math.min(contentHeight, contentDepth) / 2 + "mm",
                borderBottomRightRadius: Math.min(contentHeight, contentDepth) / 2 + "mm",
                ...cutTopStyle,
                ...cutRightStyle,
                ...cutBottomStyle,
            }}
        >
            {showLabels && <Label rotate>{isInside ? "lidInsideTopFlapRight" : "lidOutsideTopFlapRight"}</Label>}
            {contentLidInsideTopFlapRight}
        </div>
    );

    const lidInsideFrontBend = boxInsideBackBend;

    const lidInsideFrontFlapLeft = (
        <div
            className={clsx("relative", classNameVisible)}
            style={{
                height: contentDepth + "mm",
                width: Math.min(contentHeight, contentDepth) / 2 + "mm",
                borderTopLeftRadius: Math.min(contentHeight, contentDepth) / 2 + "mm",
                borderBottomLeftRadius: Math.min(contentHeight, contentDepth) / 2 + "mm",
                ...cutTopStyle,
                ...cutLeftStyle,
                ...cutBottomStyle,
            }}
        >
            {showLabels && <Label rotate>{isInside ? "lidInsideFrontFlapLeft" : "lidOutsideFrontFlapLeft"}</Label>}

            {contentLidInsideFrontFlapLeft}
        </div>
    );
    const lidInsideFront = (
        <div
            className={clsx("relative", classNameVisible)}
            style={{ height: contentDepth + "mm", width: contentWidth + "mm", ...cutBottomStyle }}
        >
            {showLabels && <Label>{isInside ? "lidInsideFront" : "lidOutsideFront"}</Label>}
            {contentLidInsideFront}
        </div>
    );
    const lidInsideFrontFlapRight = (
        <div
            className={clsx("relative", classNameVisible)}
            style={{
                height: contentDepth + "mm",
                width: Math.min(contentHeight, contentDepth) / 2 + "mm",
                borderTopRightRadius: Math.min(contentHeight, contentDepth) / 2 + "mm",
                borderBottomRightRadius: Math.min(contentHeight, contentDepth) / 2 + "mm",
                ...cutTopStyle,
                ...cutRightStyle,
                ...cutBottomStyle,
            }}
        >
            {showLabels && <Label rotate>{isInside ? "lidInsideFrontFlapRight" : "lidOutsideFrontFlapRight"}</Label>}

            {contentLidInsideFrontFlapRight}
        </div>
    );

    return (
        <div className={clsx("PaperCraftBox relative", className)}>
            <div className="flex flex-col items-center">
                <div className="relative flex flex-row justify-center">
                    {boxInsideBackFlapLeft}
                    {verticalBendInside}
                    {boxInsideBack}
                    {verticalBendInside}
                    {boxInsideBackFlapRight}
                </div>
                {boxInsideBackBend}
                <div className="flex flex-row justify-center items-center">
                    {boxLeftInsidePlug}
                    {boxLeftInsideOuter}
                    {boxBottomInsideBendLeft}
                    {boxLeftInsideInner}
                    {boxBottomInsideBendLeft}
                    {boxBottomInside}
                    {boxBottomInsideBendRight}
                    {boxRightInsideInner}
                    {boxBottomInsideBendRight}
                    {boxRightInsideOuter}
                    {boxRightInsidePlug}
                </div>
                {boxInsideFrontBend}
                <div className="flex flex-row justify-center">
                    {boxInsideFrontFlapLeft}
                    {verticalBendInside}
                    {boxInsideFront}
                    {verticalBendInside}
                    {boxInsideFrontFlapRight}
                </div>
                {boxInsideFrontBend}
                <div className="flex flex-row justify-center items-center">
                    {lidInsideTopFlapLeft}
                    {lidTopInsideBendLeft}
                    {lidTopInside}
                    {lidTopInsideBendRight}
                    {lidInsideTopFlapRight}
                </div>
                {lidInsideFrontBend}
                <div className="relative flex flex-row justify-center">
                    {lidInsideFrontFlapLeft}
                    {verticalBendInside}
                    {lidInsideFront}
                    {verticalBendInside}
                    {lidInsideFrontFlapRight}
                </div>
            </div>
            {children}
        </div>
    );
}
