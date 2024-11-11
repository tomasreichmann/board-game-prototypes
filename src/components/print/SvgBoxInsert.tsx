import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { getRectModel } from "../../utils/geometryHelpers";
import { SvgBoxProps } from "./SvgBox";

export type SvgBoxInsertProps = React.PropsWithChildren<
    {
        className?: string;
        contentWidth: number;
        contentHeight: number;
        contentDepth: number;
        lidSpacerSize: number;
        cardStackSpace: number;
        paperThickness: number;
        showLabels?: boolean;
        fittingMargin: number;
        dividerThickness: number;
        brochureHeight: number;
        brochureWidth: number;
        brochuresTotalThickness: number;
        cardWidth: number;
        title?: string;
    } & React.SVGProps<SVGSVGElement>
>;

export default forwardRef<SVGSVGElement, SvgBoxInsertProps>(function SvgBoxInsert(
    {
        contentWidth, // width of bottom
        contentHeight, // height of bottom
        contentDepth, // how tall the box is from the bottom
        lidSpacerSize, // how much does od the box is visible, when lid is closed
        cardStackSpace, // space for stacked cards - height of card stack + slant + margin
        fittingMargin,
        dividerThickness,
        brochureHeight,
        brochureWidth,
        brochuresTotalThickness,
        cardWidth,
        paperThickness,
        showLabels = true,
        className,
        children,
        title = "Box",
        ...restProps
    }: SvgBoxInsertProps,
    ref
) {
    const labelColor = "#ff00ff80";
    const labelStrokeThickness = 0.5;
    const labelStroke = { fill: "none", stroke: labelColor, strokeWidth: labelStrokeThickness };
    const labelTextStyle: React.SVGAttributes<SVGTextElement> = {
        fontSize: 8,
        fill: labelColor,
        textAnchor: "middle",
        dominantBaseline: "middle",
    };

    const bendStyle = { fill: "none", stroke: "#0000ff", strokeWidth: 0.5 };
    const cutStyle = { fill: "none", stroke: "#ff0000", strokeWidth: 0.5 };

    const bends: string[] = [];
    const cuts: string[] = [];
    const areaMap: { [key: string]: { x: number; y: number; width: number; height: number } } = {};

    const lidSpacerLeft = {
        x: 0,
        y: 0,
        width: contentHeight - 2 * paperThickness,
        height: lidSpacerSize,
    };
    areaMap["lidSpacerLeft"] = lidSpacerLeft;

    const lidSpacerFront = {
        x: lidSpacerLeft.x + lidSpacerLeft.width,
        y: 0,
        width: contentWidth - 2 * paperThickness,
        height: lidSpacerSize,
    };
    areaMap["lidSpacerFront"] = lidSpacerFront;

    const lidSpacerRight = {
        x: lidSpacerFront.x + lidSpacerFront.width,
        y: 0,
        width: contentHeight - 2 * paperThickness,
        height: lidSpacerSize,
    };
    areaMap["lidSpacerRight"] = lidSpacerRight;

    const lidSpacerBack = {
        x: lidSpacerRight.x + lidSpacerRight.width,
        y: 0,
        width: contentWidth - 2 * paperThickness,
        height: lidSpacerSize,
    };
    areaMap["lidSpacerBack"] = lidSpacerBack;

    const lidSpacerCut = [
        `M ${lidSpacerLeft.x},${lidSpacerLeft.y}`,
        `L ${lidSpacerLeft.x},${lidSpacerLeft.y + lidSpacerLeft.height}`,
        `L ${lidSpacerBack.x + lidSpacerBack.width},${lidSpacerBack.y + lidSpacerBack.height}`,
        `L ${lidSpacerBack.x + lidSpacerBack.width},${lidSpacerBack.y}`,
        `Z`,
    ].join(" ");
    cuts.push(lidSpacerCut);
    const lidSpacerBends = [
        `M ${lidSpacerFront.x},${lidSpacerFront.y} v ${lidSpacerFront.height}`,
        `M ${lidSpacerRight.x},${lidSpacerRight.y} v ${lidSpacerRight.height}`,
        `M ${lidSpacerBack.x},${lidSpacerBack.y} v ${lidSpacerBack.height}`,
    ].join(" ");
    bends.push(lidSpacerBends);

    const brochureInsertY = lidSpacerSize + paperThickness;
    const brochureInsertLeft = {
        x: 0,
        y: brochureInsertY,
        width: brochuresTotalThickness + 2 * fittingMargin,
        height: contentDepth,
    };
    areaMap["brochureInsertLeft"] = brochureInsertLeft;

    const brochureInsertCenter = {
        x: brochureInsertLeft.x + brochureInsertLeft.width,
        y: brochureInsertY,
        width: contentWidth,
        height: contentDepth,
    };
    areaMap["brochureInsertCenter"] = brochureInsertCenter;

    const brochureInsertRight = {
        x: brochureInsertCenter.x + brochureInsertCenter.width,
        y: brochureInsertY,
        width: brochuresTotalThickness + 2 * fittingMargin,
        height: contentDepth,
    };
    areaMap["brochureInsertRight"] = brochureInsertRight;

    const brochureCut = [
        `M ${brochureInsertLeft.x},${brochureInsertLeft.y}`,
        `L ${brochureInsertLeft.x},${brochureInsertLeft.y + brochureInsertLeft.height}`,
        `L ${brochureInsertRight.x + brochureInsertRight.width},${brochureInsertRight.y + brochureInsertRight.height}`,
        `L ${brochureInsertRight.x + brochureInsertRight.width},${brochureInsertRight.y}`,
        `Z`,
    ].join(" ");
    cuts.push(brochureCut);
    const brochureBends = [
        `M ${brochureInsertCenter.x},${brochureInsertCenter.y} v ${brochureInsertCenter.height}`,
        `M ${brochureInsertRight.x},${brochureInsertRight.y} v ${brochureInsertRight.height}`,
    ].join(" ");
    bends.push(brochureBends);

    const createCardInsert = (x: number, y: number, index: number) => {
        const cardInsertY = y;
        const cardInsertLeft = {
            x,
            y: cardInsertY,
            width: cardStackSpace,
            height: contentDepth,
        };
        areaMap["cardInsertLeft_" + index] = cardInsertLeft;
        const cardInsertFront = {
            x: cardInsertLeft.x + cardInsertLeft.width,
            y: cardInsertY,
            width: cardWidth + 2 * fittingMargin,
            height: contentDepth,
        };
        areaMap["cardInsertFront_" + index] = cardInsertFront;
        const cardInsertRight = {
            x: cardInsertFront.x + cardInsertFront.width,
            y: cardInsertY,
            width: cardStackSpace,
            height: contentDepth,
        };
        areaMap["cardInsertRight_" + index] = cardInsertRight;
        const cardInsertBack = {
            x: cardInsertRight.x + cardInsertRight.width,
            y: cardInsertY,
            width: cardWidth + 2 * fittingMargin,
            height: contentDepth,
        };
        areaMap["cardInsertBack_" + index] = cardInsertBack;
        const cardCut = [
            `M ${cardInsertLeft.x},${cardInsertLeft.y}`,
            `L ${cardInsertLeft.x},${cardInsertLeft.y + cardInsertLeft.height}`,
            `L ${cardInsertBack.x + cardInsertBack.width},${cardInsertBack.y + cardInsertBack.height}`,
            `L ${cardInsertBack.x + cardInsertBack.width},${cardInsertBack.y}`,
            `Z`,
        ].join(" ");
        cuts.push(cardCut);
        const cardBends = [
            `M ${cardInsertFront.x},${cardInsertFront.y} v ${cardInsertFront.height}`,
            `M ${cardInsertRight.x},${cardInsertRight.y} v ${cardInsertRight.height}`,
            `M ${cardInsertBack.x},${cardInsertBack.y} v ${cardInsertBack.height}`,
        ].join(" ");
        bends.push(cardBends);
    };
    const cardInsertWidth = cardStackSpace * 2 + cardWidth * 2 + 2 * fittingMargin * 2;
    createCardInsert(brochureInsertRight.x + brochureInsertRight.width + paperThickness, brochureInsertLeft.y, 0);
    createCardInsert(0, brochureInsertLeft.y + brochureInsertLeft.height + paperThickness, 1);
    createCardInsert(cardInsertWidth, brochureInsertLeft.y + brochureInsertLeft.height + paperThickness, 2);

    const totalWidth = lidSpacerBack.x + lidSpacerBack.width + paperThickness;
    const totalHeight = areaMap.cardInsertBack_2.y + areaMap.cardInsertBack_2.height + paperThickness;

    return (
        <svg
            {...restProps}
            ref={ref}
            className={twMerge("SvgBox", className)}
            width={totalWidth}
            height={totalHeight}
            viewBox={`0 0 ${totalWidth} ${totalHeight}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            {showLabels && (
                <>
                    <text
                        x={paperThickness}
                        y={paperThickness}
                        {...labelTextStyle}
                        textAnchor="start"
                        dominantBaseline="hanging"
                    >
                        {title} ({totalWidth} x {totalHeight})
                    </text>

                    {Object.entries(areaMap).map(([name, rect], i) => (
                        <React.Fragment key={i}>
                            <rect {...rect} {...labelStroke} />
                            <text {...getRectModel(rect.x, rect.y, rect.width, rect.height).center} {...labelTextStyle}>
                                {name}
                            </text>
                        </React.Fragment>
                    ))}
                </>
            )}
            {bends.map((d, bendIndex) => (
                <path key={bendIndex} d={d} {...bendStyle} />
            ))}
            {cuts.map((d, cutIndex) => (
                <path key={cutIndex} d={d} {...cutStyle} />
            ))}
            {children}
        </svg>
    );
});
