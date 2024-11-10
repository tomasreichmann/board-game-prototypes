import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { getRectModel } from "../../utils/geometryHelpers";

export type SvgLidBoxProps = React.PropsWithChildren<
    {
        className?: string;
        contentWidth: number;
        contentHeight: number;
        contentDepth: number;
        paperThickness?: number;
        showLabels?: boolean;
    } & React.SVGProps<SVGSVGElement>
>;

export const SvgBox = ({
    contentWidth, // width of bottom
    contentHeight, // height of bottom
    contentDepth, // how tall the box is from the bottom
    paperThickness = 1,
    showLabels = false,
    className,
    children,
    ...restProps
}: SvgLidBoxProps) => {
    const totalWidth = contentWidth + 2 * paperThickness;
    const totalHeight = contentHeight + contentDepth + 2 * paperThickness;
    return (
        <svg
            {...restProps}
            className={twMerge("SvgBox", className)}
            width={totalWidth}
            height={totalHeight}
            viewBox={`${-totalWidth / 2} 0 ${totalWidth} ${totalHeight}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            {children}
        </svg>
    );
};

export default function SvgLidBox2({
    contentWidth, // width of bottom
    contentHeight, // height of bottom
    contentDepth, // how tall the box is from the bottom
    paperThickness = 1,
    showLabels = true,
    className,
    children,
    ...restProps
}: SvgLidBoxProps) {
    const labelColor = "#ff0000";
    const labelStrokeThickness = 0.5;
    const labelStroke = { fill: "none", stroke: labelColor, strokeWidth: labelStrokeThickness };
    const labelTextStyle: React.SVGAttributes<SVGTextElement> = {
        fontSize: 8,
        fill: labelColor,
        textAnchor: "middle",
        dominantBaseline: "middle",
    };

    const backWidth = contentWidth;
    const backHeight = contentDepth;
    const backSide = { x: 0 - contentWidth / 2, y: 0, width: backWidth, height: backHeight };

    const backLeftLipWidth = contentHeight / 2;
    const backLeftLipHeight = backHeight - paperThickness;
    const backLeftLipSide = {
        x: backSide.x - backLeftLipWidth,
        y: backSide.y + paperThickness,
        width: backLeftLipWidth,
        height: backLeftLipHeight,
    };

    const backRightLipWidth = contentHeight / 2;
    const backRightLipHeight = backHeight - paperThickness;
    const backRightLipSide = {
        x: backSide.x + backWidth,
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

    const frontLeftLipWidth = contentHeight / 2;
    const frontLeftLipHeight = frontHeight - paperThickness;
    const frontLeftLipSide = {
        x: frontSide.x - frontLeftLipWidth,
        y: frontSide.y + paperThickness,
        width: frontLeftLipWidth,
        height: frontLeftLipHeight,
    };

    const frontRightLipWidth = contentHeight / 2;
    const frontRightLipHeight = frontHeight - paperThickness;
    const frontRightLipSide = {
        x: frontSide.x + frontWidth,
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

    const totalWidth = (contentWidth / 2 + contentDepth + paperThickness + contentDepth + paperThickness * 4) * 2;
    const totalHeight = backHeight + bottomHeight + frontHeight;

    return (
        <svg
            {...restProps}
            className={twMerge("SvgBox", className)}
            width={totalWidth}
            height={totalHeight}
            viewBox={`${-totalWidth / 2} 0 ${totalWidth} ${totalHeight}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            {showLabels && (
                <>
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
                </>
            )}
            {children}
        </svg>
    );
    /* 
    const bends: string[] = [];
    const bendsWithoutLid: string[] = [];
    const cuts: string[] = [];
    const cutsWithoutLid: string[] = [];
    const curveRadius = Math.min(contentWidth, contentHeight, contentDepth) / 10;
    const lineWidth = 0.1;
    const cutColor = "#ff0000";
    const bendColor = "#ff00ff";
    const debug = ` h 10 h -10 v 10 v -10`;

    bends.push(`M ${-(contentWidth / 2 + paperThickness)},0 v ${contentDepth}`); // front left
    bends.push(`M ${contentWidth / 2 + paperThickness},0 v ${contentDepth}`); // front right
    // bottom
    const bottomTop = contentDepth;
    const bottomWidth = contentWidth + paperThickness * 4;
    bends.push(`M ${-(bottomWidth / 2)},${bottomTop} h ${bottomWidth}`); // bottom top
    // bottom left
    bends.push(`M ${-(bottomWidth / 2)},${bottomTop} v ${contentHeight / 5}`);
    bends.push(`M ${-(bottomWidth / 2)},${bottomTop + (contentHeight / 5) * 2} v ${contentHeight / 5}`);
    bends.push(`M ${-(bottomWidth / 2)},${bottomTop + (contentHeight / 5) * 4} v ${contentHeight / 5}`);
    // left
    bends.push(`M ${-(contentWidth / 2 + contentDepth + paperThickness)},${bottomTop} v ${contentHeight}`);
    bends.push(
        `M ${-(contentWidth / 2 + contentDepth + paperThickness * 3)},${bottomTop + paperThickness} v ${
            contentHeight - paperThickness * 2
        }`
    );
    // bottom right
    bends.push(`M ${bottomWidth / 2},${bottomTop} v ${contentHeight / 5}`);
    bends.push(`M ${bottomWidth / 2},${bottomTop + (contentHeight / 5) * 2} v ${contentHeight / 5}`);
    bends.push(`M ${bottomWidth / 2},${bottomTop + (contentHeight / 5) * 4} v ${contentHeight / 5}`);
    // right
    bends.push(`M ${contentWidth / 2 + contentDepth + paperThickness},${bottomTop} v ${contentHeight}`);
    bends.push(
        `M ${contentWidth / 2 + contentDepth + paperThickness * 3},${bottomTop + paperThickness} v ${
            contentHeight - paperThickness * 2
        }`
    );
    // back
    const backBottom = bottomTop + contentHeight;
    const backWidth = contentWidth + paperThickness * 2;
    bends.push(`M ${-(backWidth / 2)},${backBottom} h ${backWidth}`); // back bottom
    bends.push(`M ${-(backWidth / 2)},${backBottom} v ${contentDepth}`); // back left
    bends.push(`M ${backWidth / 2},${backBottom} v ${contentDepth}`); // back right
    // top
    const topTop = backBottom + contentDepth + paperThickness;
    const topWidth = contentWidth;
    bends.push(`M ${-(topWidth / 2)},${topTop} h ${topWidth}`); // top top
    bends.push(`M ${-topWidth / 2},${topTop} v ${contentHeight}`); // top left
    bends.push(`M ${topWidth / 2},${topTop} v ${contentHeight}`); // top right
    // front
    const frontTop = topTop + contentHeight;
    const frontSideTop = frontTop + paperThickness;
    const frontWidth = contentWidth + paperThickness * 2;
    bends.push(`M ${-(topWidth / 2)},${frontTop} h ${topWidth}`); // front top
    bends.push(`M ${-frontWidth / 2},${frontSideTop} v ${contentDepth}`); // top left
    bends.push(`M ${frontWidth / 2},${frontSideTop} v ${contentDepth}`); // top right

    // holes
    // bottom left
    cuts.push(
        `M ${-(bottomWidth / 2)},${bottomTop + contentHeight / 5} h ${paperThickness * 1.5} v ${contentHeight / 5} h ${
            -paperThickness * 1.5
        } Z`
    );
    cuts.push(
        `M ${-(bottomWidth / 2)},${bottomTop + (contentHeight / 5) * 3} h ${paperThickness * 1.5} v ${
            contentHeight / 5
        } h ${-paperThickness * 1.5} Z`
    );
    // bottom right
    cuts.push(
        `M ${bottomWidth / 2},${bottomTop + contentHeight / 5} h ${-paperThickness * 1.5} v ${contentHeight / 5} h ${
            paperThickness * 1.5
        } Z`
    );
    cuts.push(
        `M ${bottomWidth / 2},${bottomTop + (contentHeight / 5) * 3} h ${-paperThickness * 1.5} v ${
            contentHeight / 5
        } h ${paperThickness * 1.5} Z`
    );

    // circumference
    const sideFlapLength = contentHeight / 2;
    const frontFlapLength = Math.min(contentDepth, contentHeight) / 2;
    const topFlapLength = Math.min(contentDepth, contentHeight) / 2;

    const frontCutout = true;
    const frontCutOffset = 1 / 20;
    // prettier-ignore
    const frontCut = frontCutout
        ? `h ${-contentWidth * frontCutOffset} l ${-contentWidth * frontCutOffset},${contentDepth / 2} h ${(-contentWidth * (1 - frontCutOffset * 4))} l ${-contentWidth * frontCutOffset},${-contentDepth / 2} Z`
        : "Z";
    // prettier-ignore
    cuts.push(
        // left
        `M ${-(contentWidth / 2 + paperThickness)},0 h ${-sideFlapLength} v ${contentDepth - paperThickness} h ${sideFlapLength - paperThickness} l ${paperThickness},${paperThickness}` // front flap
        + ` h ${-contentDepth} l ${-paperThickness * 2},${paperThickness} h ${-contentDepth}` // left top
        + ` v ${contentHeight / 5 - paperThickness} h ${-paperThickness * 2} v ${contentHeight / 5} h ${paperThickness * 2} v ${contentHeight / 5} h ${-paperThickness * 2} v ${contentHeight / 5} h ${paperThickness * 2} v ${contentHeight / 5 - paperThickness}` // left left
        + ` h ${contentDepth} l ${paperThickness * 2},${paperThickness} h ${contentDepth}` // left bottom
        + ` l ${-paperThickness},${paperThickness} h ${-(sideFlapLength - paperThickness)} v ${contentDepth - paperThickness} h ${sideFlapLength} l ${paperThickness},${paperThickness}` // back flap
        + ` l ${-(topFlapLength - curveRadius)},${contentHeight / 5 - curveRadius} l ${-curveRadius},${curveRadius} v ${(contentHeight / 5) * 3} l ${curveRadius},${curveRadius} l ${topFlapLength - curveRadius},${contentHeight / 5 - curveRadius}` // top
        + ` l ${-paperThickness},${paperThickness} h ${-(frontFlapLength - curveRadius)} l ${-curveRadius},${curveRadius} v ${curveRadius} l ${frontFlapLength},${contentDepth - curveRadius * 2}` // front
        // bottom
        + ` h ${contentWidth + paperThickness * 2}`
        // right
        + ` l ${frontFlapLength},${-(contentDepth - curveRadius * 2)} v ${-curveRadius} l ${-curveRadius},${-curveRadius} h ${-(frontFlapLength - curveRadius)} l ${-paperThickness},${-paperThickness} ` // front
        + ` l ${topFlapLength - curveRadius},${-(contentHeight / 5 - curveRadius)} l ${curveRadius},${-curveRadius} v ${-(contentHeight / 5 * 3)} l ${-curveRadius},${-curveRadius} l ${-(topFlapLength - curveRadius)},${-(contentHeight / 5 - curveRadius)}` // top
        + ` l ${paperThickness},${-paperThickness} h ${sideFlapLength} v ${-(contentDepth - paperThickness)} h ${-(sideFlapLength - paperThickness)} l ${-paperThickness},${-paperThickness}` // back flap

        + ` h ${contentDepth} l ${paperThickness * 2},${-paperThickness} h ${contentDepth}` // left bottom
        + ` v ${-(contentHeight / 5 - paperThickness)} h ${paperThickness * 2} v ${-contentHeight / 5} h ${-paperThickness * 2} v ${-contentHeight / 5} h ${paperThickness * 2} v ${-contentHeight / 5} h ${-paperThickness * 2} v ${-(contentHeight / 5 - paperThickness)}` // left left
        + ` h ${-contentDepth} l ${-paperThickness * 2},${-paperThickness} h ${-contentDepth}` // left top
        + ` l ${paperThickness},${-paperThickness} h ${sideFlapLength - paperThickness} v ${-(contentDepth - paperThickness)} h ${-sideFlapLength}` // front flap
        // top
        + frontCut
    );

    // --- Box without lid

    const lidDepthReduction = 20;
    const reducedContentDepth = contentDepth - lidDepthReduction;

    // prettier-ignore
    cutsWithoutLid.push(
        // left
        `M ${-(contentWidth / 2 + paperThickness)},0 h ${-sideFlapLength} v ${reducedContentDepth - paperThickness} h ${sideFlapLength - paperThickness} l ${paperThickness},${paperThickness}` // front flap
        + ` h ${-reducedContentDepth} l ${-paperThickness * 2},${paperThickness} h ${-reducedContentDepth}` // left top
        + ` v ${contentHeight - paperThickness * 2}` // left left
        + ` h ${reducedContentDepth} l ${paperThickness * 2},${paperThickness} h ${reducedContentDepth}` // left bottom
        + ` l ${-paperThickness},${paperThickness} h ${-(sideFlapLength - paperThickness)} v ${reducedContentDepth - paperThickness} h ${sideFlapLength} l ${paperThickness},${paperThickness}` // back flap
        // bottom
        + ` h ${contentWidth}`
        + ` l ${paperThickness},${-paperThickness} h ${sideFlapLength} v ${-(reducedContentDepth - paperThickness)} h ${-(sideFlapLength - paperThickness)} l ${-paperThickness},${-paperThickness}` // back flap

        + ` h ${reducedContentDepth} l ${paperThickness * 2},${-paperThickness} h ${reducedContentDepth}` // left bottom
        + ` v ${-contentHeight + paperThickness * 2}` // left left
        + ` h ${-reducedContentDepth} l ${-paperThickness * 2},${-paperThickness} h ${-reducedContentDepth}` // left top
        + ` l ${paperThickness},${-paperThickness} h ${sideFlapLength - paperThickness} v ${-(reducedContentDepth - paperThickness)} h ${-sideFlapLength}` // front flap
        + `h ${-contentWidth}`
        // top
    );

    bendsWithoutLid.push(`M ${-(contentWidth / 2 + paperThickness)},0 v ${reducedContentDepth}`); // front left
    bendsWithoutLid.push(`M ${contentWidth / 2 + paperThickness},0 v ${reducedContentDepth}`); // front right
    // bottom
    const reducedBottomTop = reducedContentDepth;
    bendsWithoutLid.push(`M ${-(bottomWidth / 2)},${reducedBottomTop} h ${bottomWidth}`); // bottom top
    // bottom left
    bendsWithoutLid.push(`M ${-(bottomWidth / 2)},${reducedBottomTop} v ${contentHeight}`);
    // left
    bendsWithoutLid.push(
        `M ${-(contentWidth / 2 + reducedContentDepth + paperThickness)},${reducedBottomTop} v ${contentHeight}`
    );
    bendsWithoutLid.push(
        `M ${-(contentWidth / 2 + reducedContentDepth + paperThickness * 3)},${reducedBottomTop + paperThickness} v ${
            contentHeight - paperThickness * 2
        }`
    );
    // bottom right
    bendsWithoutLid.push(`M ${bottomWidth / 2},${reducedBottomTop} v ${contentHeight}`);
    // right
    bendsWithoutLid.push(
        `M ${contentWidth / 2 + reducedContentDepth + paperThickness},${reducedBottomTop} v ${contentHeight}`
    );
    bendsWithoutLid.push(
        `M ${contentWidth / 2 + reducedContentDepth + paperThickness * 3},${reducedBottomTop + paperThickness} v ${
            contentHeight - paperThickness * 2
        }`
    );
    // back
    const reducedBackBottom = reducedBottomTop + contentHeight;

    bendsWithoutLid.push(`M ${-(backWidth / 2)},${reducedBackBottom} h ${backWidth}`); // back bottom
    bendsWithoutLid.push(`M ${-(backWidth / 2)},${reducedBackBottom} v ${reducedContentDepth}`); // back left
    bendsWithoutLid.push(`M ${backWidth / 2},${reducedBackBottom} v ${reducedContentDepth}`); // back right
     */
}
