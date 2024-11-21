import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { getRectModel } from "../../utils/geometryHelpers";

export type SvgBoxProps = React.PropsWithChildren<
    {
        className?: string;
        contentWidth: number;
        contentHeight: number;
        contentDepth: number;
        paperThickness?: number;
        showLabels?: boolean;
        showPrintCut?: boolean;
        printOverhang?: number;
        title?: string;
    } & React.SVGProps<SVGSVGElement>
>;

export default forwardRef<SVGSVGElement, SvgBoxProps>(function SvgBox(
    {
        contentWidth, // width of bottom
        contentHeight, // height of bottom
        contentDepth, // how tall the box is from the bottom
        paperThickness = 1,
        showLabels = true,
        showPrintCut = false,
        printOverhang = 10, // mm; how much the print extends over the edge of the box cut
        className,
        children,
        title = "Box",
        ...restProps
    }: SvgBoxProps,
    ref: React.ForwardedRef<SVGSVGElement>
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
    const printCutStyle = { fill: "none", stroke: "#00ff00", strokeWidth: 0.5 };

    const backWidth = contentWidth;
    const backHeight = contentDepth;
    const backSide = { x: 0 - contentWidth / 2, y: 0, width: backWidth, height: backHeight };

    const backLeftLipWidth = contentHeight / 2 - paperThickness;
    const backLeftLipHeight = backHeight - 2 * paperThickness;
    const backLeftLipSide = {
        x: backSide.x - backLeftLipWidth - paperThickness,
        y: backSide.y + paperThickness,
        width: backLeftLipWidth,
        height: backLeftLipHeight,
    };

    const backRightLipWidth = contentHeight / 2 - paperThickness;
    const backRightLipHeight = backHeight - 2 * paperThickness;
    const backRightLipSide = {
        x: backSide.x + backWidth + paperThickness,
        y: backSide.y + paperThickness,
        width: backRightLipWidth,
        height: backRightLipHeight,
    };

    const bottomWidth = contentWidth + paperThickness * 4; // two lips on each side fold inside the box
    const bottomHeight = contentHeight;
    const bottomSide = { x: 0 - bottomWidth / 2, y: backHeight, width: bottomWidth, height: bottomHeight };

    const frontWidth = contentWidth;
    const frontHeight = contentDepth;
    const frontSide = { x: 0 - frontWidth / 2, y: backHeight + bottomHeight, width: frontWidth, height: frontHeight };

    const frontLeftLipWidth = contentHeight / 2 - paperThickness;
    const frontLeftLipHeight = frontHeight - 2 * paperThickness;
    const frontLeftLipSide = {
        x: frontSide.x - frontLeftLipWidth - paperThickness,
        y: frontSide.y + paperThickness,
        width: frontLeftLipWidth,
        height: frontLeftLipHeight,
    };

    const frontRightLipWidth = contentHeight / 2 - paperThickness;
    const frontRightLipHeight = frontHeight - 2 * paperThickness;
    const frontRightLipSide = {
        x: frontSide.x + frontWidth + paperThickness,
        y: frontSide.y + paperThickness,
        width: frontRightLipWidth,
        height: frontRightLipHeight,
    };

    const leftOuterWidth = contentDepth + paperThickness;
    const leftOuterHeight = bottomHeight;
    const leftOuterSide = {
        x: bottomSide.x - leftOuterWidth,
        y: bottomSide.y,
        width: leftOuterWidth,
        height: leftOuterHeight,
    };

    const leftInnerWidth = contentDepth - paperThickness;
    const leftInnerHeight = bottomHeight - paperThickness * 2;
    const leftInnerSide = {
        x: leftOuterSide.x - 2 * paperThickness - leftInnerWidth,
        y: leftOuterSide.y + paperThickness,
        width: leftInnerWidth,
        height: leftInnerHeight,
    };

    const rightOuterWidth = contentDepth + paperThickness;
    const rightOuterHeight = bottomHeight;
    const rightOuterSide = {
        x: bottomSide.x + bottomWidth,
        y: bottomSide.y,
        width: rightOuterWidth,
        height: rightOuterHeight,
    };

    const rightInnerWidth = contentDepth - paperThickness;
    const rightInnerHeight = bottomHeight - paperThickness * 2;
    const rightInnerSide = {
        x: rightOuterSide.x + rightOuterWidth + 2 * paperThickness,
        y: rightOuterSide.y + paperThickness,
        width: rightInnerWidth,
        height: rightInnerHeight,
    };

    const totalWidth =
        rightInnerSide.x +
        rightInnerSide.width -
        leftInnerSide.x +
        paperThickness
    const totalHeight = frontSide.y + frontSide.height + paperThickness + (showPrintCut ? printOverhang * 2 : 0);

    const bends: string[] = [];
    const cuts: string[] = [];

    const circumferenceCut: string[] = [];
    circumferenceCut.push(
        `M ${backSide.x},${backSide.y}`,
        `L ${backLeftLipSide.x + backLeftLipSide.width},${backLeftLipSide.y}`,
        `L ${backLeftLipSide.x},${backLeftLipSide.y}`,
        `L ${backLeftLipSide.x},${backLeftLipSide.y + backLeftLipSide.height}`,
        `L ${backLeftLipSide.x + backLeftLipSide.width},${backLeftLipSide.y + backLeftLipSide.height}`,
        `L ${backSide.x},${backSide.y + backSide.height}`,
        `L ${bottomSide.x},${bottomSide.y}`,
        `L ${leftOuterSide.x + leftOuterSide.width},${leftOuterSide.y}`,
        `L ${leftOuterSide.x},${leftOuterSide.y}`,
        `L ${leftInnerSide.x + leftInnerSide.width},${leftInnerSide.y}`,
        `L ${leftInnerSide.x},${leftInnerSide.y}`,
        `L ${leftInnerSide.x},${leftInnerSide.y + leftInnerSide.height}`,
        `L ${leftInnerSide.x + leftInnerSide.width},${leftInnerSide.y + leftInnerSide.height}`,
        `L ${leftOuterSide.x},${leftOuterSide.y + leftOuterSide.height}`,
        `L ${bottomSide.x},${bottomSide.y + bottomSide.height}`,
        `L ${frontSide.x},${frontSide.y}`,
        `L ${frontLeftLipSide.x + frontLeftLipSide.width},${frontLeftLipSide.y}`,
        `L ${frontLeftLipSide.x},${frontLeftLipSide.y}`,
        `L ${frontLeftLipSide.x},${frontLeftLipSide.y + frontLeftLipSide.height}`,
        `L ${frontLeftLipSide.x + frontLeftLipSide.width},${frontLeftLipSide.y + frontLeftLipSide.height}`,
        `L ${frontSide.x},${frontSide.y + frontSide.height}`,
        `L ${frontSide.x + frontSide.width},${frontSide.y + frontSide.height}`,
        `L ${frontRightLipSide.x},${frontRightLipSide.y + frontRightLipSide.height}`,
        `L ${frontRightLipSide.x + frontRightLipSide.width},${frontRightLipSide.y + frontRightLipSide.height}`,
        `L ${frontRightLipSide.x + frontRightLipSide.width},${frontRightLipSide.y}`,
        `L ${frontRightLipSide.x},${frontRightLipSide.y}`,
        `L ${frontSide.x + frontSide.width},${frontSide.y}`,
        `L ${rightOuterSide.x},${rightOuterSide.y + rightOuterSide.height}`,
        `L ${rightOuterSide.x + rightOuterSide.width},${rightOuterSide.y + rightOuterSide.height}`,
        `L ${rightInnerSide.x},${rightInnerSide.y + rightInnerSide.height}`,
        `L ${rightInnerSide.x + rightInnerSide.width},${rightInnerSide.y + rightInnerSide.height}`,
        `L ${rightInnerSide.x + rightInnerSide.width},${rightInnerSide.y}`,
        `L ${rightInnerSide.x},${rightInnerSide.y}`,
        `L ${rightOuterSide.x + rightOuterSide.width},${rightOuterSide.y}`,
        `L ${rightOuterSide.x},${rightOuterSide.y}`,
        `L ${backSide.x + backSide.width},${backSide.y + backSide.height}`,
        `L ${backRightLipSide.x},${backRightLipSide.y + backRightLipSide.height}`,
        `L ${backRightLipSide.x + backRightLipSide.width},${backRightLipSide.y + backRightLipSide.height}`,
        `L ${backRightLipSide.x + backRightLipSide.width},${backRightLipSide.y}`,
        `L ${backRightLipSide.x},${backRightLipSide.y}`,
        `L ${backSide.x + backSide.width},${backSide.y}`,
        `Z`
    );
    cuts.push(circumferenceCut.join(" "));
    bends.push(`M ${backSide.x},${backSide.y} v${backSide.height}`);
    bends.push(`M ${backSide.x},${backSide.y + backSide.height} h${backSide.width}`);
    bends.push(`M ${backSide.x + backSide.width},${backSide.y} v${backSide.height}`);
    bends.push(`M ${bottomSide.x},${bottomSide.y} v${bottomSide.height}`);
    bends.push(`M ${bottomSide.x},${bottomSide.y + bottomSide.height} h${bottomSide.width}`);
    bends.push(`M ${bottomSide.x + bottomSide.width},${bottomSide.y} v${bottomSide.height}`);
    bends.push(`M ${leftOuterSide.x},${leftOuterSide.y} v${leftOuterSide.height}`);
    bends.push(`M ${leftInnerSide.x + leftInnerSide.width},${leftInnerSide.y} v${leftInnerSide.height}`);
    bends.push(`M ${rightOuterSide.x + rightOuterSide.width},${rightOuterSide.y} v${rightOuterSide.height}`);
    bends.push(`M ${rightInnerSide.x},${rightInnerSide.y} v${rightInnerSide.height}`);
    bends.push(`M ${frontSide.x},${frontSide.y} v${frontSide.height}`);
    bends.push(`M ${frontSide.x + frontSide.width},${frontSide.y} v${frontSide.height}`);

    const printCut = [
        `M ${backSide.x},${backSide.y - printOverhang}`,
        `v${printOverhang}`,
        `h${-printOverhang}`,
        `v${backSide.height - printOverhang}`,
        `l${printOverhang},${printOverhang}`,
        `H${leftOuterSide.x - printOverhang - 2 * paperThickness}`,
        `v${leftOuterSide.height}`,
        `H${frontSide.x}`,
        `l${-printOverhang},${printOverhang}`,
        `v${frontSide.height - printOverhang}`,
        `h${printOverhang}`,
        `v${printOverhang}`,
        `h${frontSide.width}`,
        `v${-printOverhang}`,
        `h${printOverhang}`,
        `v${-frontSide.height + printOverhang}`,
        `l${-printOverhang},${-printOverhang}`,
        `H${rightOuterSide.x + rightOuterSide.width + printOverhang + 2 * paperThickness}`,
        `v${-rightOuterSide.height}`,
        `H${backSide.x + backSide.width}`,
        `l${printOverhang},${-printOverhang}`,
        `v${-backSide.height + printOverhang}`,
        `h${-printOverhang}`,
        `v${-printOverhang}`,
        `Z`,
    ].join(" ");

    const viewBox = [
        -totalWidth / 2 - (showPrintCut ? printOverhang : 0),
        0 - (showPrintCut ? printOverhang : 0),
        totalWidth,
        totalHeight,
    ].join(" ");

    return (
        <svg
            {...restProps}
            ref={ref}
            className={twMerge("SvgBox", className)}
            width={totalWidth}
            height={totalHeight}
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
        >
            {showLabels && (
                <>
                    <text
                        x={-totalWidth / 2 + paperThickness}
                        y={paperThickness}
                        {...labelTextStyle}
                        textAnchor="start"
                        dominantBaseline="hanging"
                    >
                        {title} ({totalWidth} x {totalHeight})
                    </text>

                    <rect {...backSide} {...labelStroke} />
                    <text
                        {...getRectModel(backSide.x, backSide.y, backSide.width, backSide.height).center}
                        {...labelTextStyle}
                    >
                        back
                    </text>

                    <rect {...backLeftLipSide} {...labelStroke} />
                    <text
                        {...getRectModel(
                            backLeftLipSide.x,
                            backLeftLipSide.y,
                            backLeftLipSide.width,
                            backLeftLipSide.height
                        ).center}
                        {...labelTextStyle}
                    >
                        backLeftLip
                    </text>

                    <rect {...backRightLipSide} {...labelStroke} />
                    <text
                        {...getRectModel(
                            backRightLipSide.x,
                            backRightLipSide.y,
                            backRightLipSide.width,
                            backRightLipSide.height
                        ).center}
                        {...labelTextStyle}
                    >
                        backRightLip
                    </text>

                    <rect {...bottomSide} {...labelStroke} />
                    <text
                        {...getRectModel(bottomSide.x, bottomSide.y, bottomSide.width, bottomSide.height).center}
                        {...labelTextStyle}
                    >
                        bottom
                    </text>

                    <rect {...leftOuterSide} {...labelStroke} />
                    <text
                        {...getRectModel(leftOuterSide.x, leftOuterSide.y, leftOuterSide.width, leftOuterSide.height)
                            .center}
                        {...labelTextStyle}
                    >
                        leftOuter
                    </text>
                    <rect {...leftInnerSide} {...labelStroke} />
                    <text
                        {...getRectModel(leftInnerSide.x, leftInnerSide.y, leftInnerSide.width, leftInnerSide.height)
                            .center}
                        {...labelTextStyle}
                    >
                        leftInner
                    </text>

                    <rect {...rightOuterSide} {...labelStroke} />
                    <text
                        {...getRectModel(
                            rightOuterSide.x,
                            rightOuterSide.y,
                            rightOuterSide.width,
                            rightOuterSide.height
                        ).center}
                        {...labelTextStyle}
                    >
                        rightOuter
                    </text>

                    <rect {...rightInnerSide} {...labelStroke} />
                    <text
                        {...getRectModel(
                            rightInnerSide.x,
                            rightInnerSide.y,
                            rightInnerSide.width,
                            rightInnerSide.height
                        ).center}
                        {...labelTextStyle}
                    >
                        rightInner
                    </text>

                    <rect {...frontSide} {...labelStroke} />
                    <text
                        {...getRectModel(frontSide.x, frontSide.y, frontSide.width, frontSide.height).center}
                        {...labelTextStyle}
                    >
                        front
                    </text>

                    <rect {...frontLeftLipSide} {...labelStroke} />
                    <text
                        {...getRectModel(
                            frontLeftLipSide.x,
                            frontLeftLipSide.y,
                            frontLeftLipSide.width,
                            frontLeftLipSide.height
                        ).center}
                        {...labelTextStyle}
                    >
                        frontLeftLip
                    </text>

                    <rect {...frontRightLipSide} {...labelStroke} />
                    <text
                        {...getRectModel(
                            frontRightLipSide.x,
                            frontRightLipSide.y,
                            frontRightLipSide.width,
                            frontRightLipSide.height
                        ).center}
                        {...labelTextStyle}
                    >
                        frontRightLip
                    </text>
                    {showPrintCut && (
                        <text
                            x={backSide.x + paperThickness * 2}
                            y={backSide.y + paperThickness * 2}
                            fontSize={labelTextStyle.fontSize}
                            dominantBaseline="hanging"
                            fill={printCutStyle.stroke}
                        >
                            printCut (
                            {rightOuterSide.x +
                                rightOuterSide.width +
                                printOverhang +
                                2 * paperThickness -
                                (leftOuterSide.x - printOverhang - 2 * paperThickness)}
                            x{frontSide.y + frontSide.height + printOverhang - (backSide.y - printOverhang)})
                        </text>
                    )}
                </>
            )}
            {bends.map((d, bendIndex) => (
                <path key={bendIndex} d={d} {...bendStyle} />
            ))}
            {cuts.map((d, cutIndex) => (
                <path key={cutIndex} d={d} {...cutStyle} />
            ))}
            {showPrintCut && <path d={printCut} {...printCutStyle} />}
            {children}
        </svg>
    );
});
