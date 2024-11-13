import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { getRectModel } from "../../utils/geometryHelpers";
import { SvgBoxProps } from "./SvgBox";

export type SvgBoxInsertWoodProps = React.PropsWithChildren<
    {
        title?: string;
        showLabels?: boolean;
        className?: string;
        contentWidth: number;
        contentHeight: number;
        contentDepth: number;
        lidSpacerSize: number;
        cardStackSpace: number;
        paperThickness: number;
        fittingMargin: number;
        dividerThickness: number;
        brochureHeight: number;
        brochureWidth: number;
        brochuresTotalThickness: number;
        cardWidth: number;
        verticalJointSegments?: number;
    } & React.SVGProps<SVGSVGElement>
>;

export default forwardRef<SVGSVGElement, SvgBoxInsertWoodProps>(function SvgBoxInsertWood(
    {
        title = "Box",
        showLabels = true,
        contentWidth, // width of bottom
        contentHeight, // height of bottom
        contentDepth, // how tall the box is from the bottom
        lidSpacerSize, // how much does od the box is visible, when lid is closed
        cardStackSpace, // space for stacked cards - height of card stack + slant + margin
        fittingMargin, // space around cards and between dividers and box
        dividerThickness,
        brochureHeight,
        brochureWidth,
        brochuresTotalThickness,
        cardWidth,
        paperThickness,
        verticalJointSegments = 5,
        className,
        children,
        ...restProps
    }: SvgBoxInsertWoodProps,
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

    const jointLength = Math.floor(contentDepth / verticalJointSegments);

    const createRectShape = (x: number, y: number, width: number, height: number) => {
        return [`M ${x},${y}`, `L ${x},${y + height}`, `L ${x + width},${y + height}`, `L ${x + width},${y}`, `Z`].join(
            " "
        );
    };

    const createJointColumn = (x: number, y: number, height: number, isEven: boolean) => {
        const holeCount = Math.floor(height / jointLength);

        const breakPositions = Array(holeCount)
            .fill(null)
            .map((_, index) => {
                return index * jointLength;
            });

        breakPositions.forEach((position, positionIndex) => {
            const hasCut = positionIndex % 2 === (isEven ? 0 : 1);
            if (hasCut) {
                const cut = createRectShape(x, y + position, dividerThickness, jointLength);
                cuts.push(cut);
            }
        });
    };

    const createHorizontalInsert = (x: number, y: number, postfix: string) => {
        const minimalStackSize = 10;
        const insert = {
            x,
            y,
            width: contentWidth - 2 * dividerThickness - fittingMargin, // fitting margin to make sure the dividers can slide into the box
            height: contentDepth,
        };
        areaMap["horizontal_" + postfix] = insert;

        const shapeCut = [
            `M ${insert.x},${insert.y}`,
            `L ${insert.x},${insert.y + insert.height}`,
            `L ${insert.x + insert.width},${insert.y + insert.height}`,
            `L ${insert.x + insert.width},${insert.y}`,
            `Z`,
        ].join(" ");
        cuts.push(shapeCut);
        const cardSpaceShift = dividerThickness + cardWidth + 2 * fittingMargin;
        const jointColumnCount = Math.floor((insert.width - minimalStackSize) / cardSpaceShift) + 1;

        const jointColumnPositions = Array(jointColumnCount)
            .fill(null)
            .map((_, index) => cardSpaceShift * index);

        jointColumnPositions.forEach((positionX) => {
            createJointColumn(insert.x + positionX, insert.y, insert.height, false);
        });
        if (jointColumnPositions.at(-1) || 0 > insert.width - minimalStackSize) {
        }
    };
    createHorizontalInsert(0, 0, "top");
    createHorizontalInsert(areaMap.horizontal_top.x + areaMap.horizontal_top.width + dividerThickness, 0, "bottom");

    const createFirstVerticalInsert = (x: number, y: number) => {
        const insert = {
            x,
            y,
            width: brochuresTotalThickness + dividerThickness + cardStackSpace - fittingMargin, // fitting margin to make sure the dividers can slide into the box
            height: contentDepth,
        };
        areaMap["vertical_first"] = insert;

        const shapeCut = [
            `M ${insert.x},${insert.y}`,
            `L ${insert.x},${insert.y + insert.height}`,
            `L ${insert.x + insert.width},${insert.y + insert.height}`,
            `L ${insert.x + insert.width},${insert.y}`,
            `Z`,
        ].join(" ");
        cuts.push(shapeCut);
        createJointColumn(insert.x + brochuresTotalThickness, insert.y, insert.height, true);
        createJointColumn(insert.x + insert.width - dividerThickness, insert.y, insert.height, true);
    };

    createFirstVerticalInsert(
        areaMap.horizontal_top.x,
        areaMap.horizontal_bottom.y + areaMap.horizontal_bottom.height + dividerThickness
    );

    const createVerticalInsert = (x: number, y: number, postfix: string) => {
        const insert = {
            x,
            y,
            width: dividerThickness + cardStackSpace - fittingMargin, // fitting margin to make sure the dividers can slide into the box
            height: contentDepth,
        };
        areaMap["vertical_" + postfix] = insert;

        const shapeCut = [
            `M ${insert.x},${insert.y}`,
            `L ${insert.x},${insert.y + insert.height}`,
            `L ${insert.x + insert.width},${insert.y + insert.height}`,
            `L ${insert.x + insert.width},${insert.y}`,
            `Z`,
        ].join(" ");
        cuts.push(shapeCut);
        createJointColumn(insert.x, insert.y, insert.height, true);
        createJointColumn(insert.x + insert.width - dividerThickness, insert.y, insert.height, true);
    };

    createVerticalInsert(
        areaMap.vertical_first.x + areaMap.vertical_first.width + dividerThickness,
        areaMap.horizontal_bottom.y + areaMap.horizontal_bottom.height + dividerThickness,
        "2"
    );
    createVerticalInsert(areaMap.vertical_2.x + areaMap.vertical_2.width + dividerThickness, areaMap.vertical_2.y, "3");
    createVerticalInsert(areaMap.vertical_3.x + areaMap.vertical_3.width + dividerThickness, areaMap.vertical_3.y, "4");

    const totalWidth =
        areaMap.horizontal_bottom.x + areaMap.horizontal_bottom.width + dividerThickness - areaMap.horizontal_top.x;
    const totalHeight = areaMap.vertical_2.y + areaMap.vertical_2.height + dividerThickness;

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
