import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export type LidBoxProps = React.PropsWithChildren<
    {
        className?: string;
        contentWidth: number;
        contentHeight: number;
        contentDepth: number;
        paperThickness?: number;
        showLabels?: boolean;
    } & React.SVGProps<SVGSVGElement>
>;

/* const Content = ({
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
); */

/* const Label = ({
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
); */

export default function SvgLidBox({
    contentWidth,
    contentHeight,
    contentDepth,
    paperThickness = 1,
    showLabels = false,
    className,
    children,
    ...restProps
}: LidBoxProps) {
    const bends: string[] = [];
    const cuts: string[] = [];
    const curveRadius = Math.min(contentWidth, contentHeight, contentDepth) / 10;
    const lineWidth = 0.1;
    const cutColor = "#ff0000";
    const bendColor = "#ff00ff";

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
        ? `h ${-contentWidth * frontCutOffset} l ${-contentWidth * frontCutOffset},${contentDepth / 2} h ${(-contentWidth * (1 - frontCutOffset*4))} l ${ -contentWidth  * frontCutOffset },${-contentDepth / 2} Z`
        : "Z";
    // prettier-ignore
    cuts.push(
        // left
        `M ${-(contentWidth / 2 + paperThickness)},0 h ${-sideFlapLength} v ${contentDepth - paperThickness} h ${ sideFlapLength - paperThickness } l ${paperThickness},${paperThickness}` // front flap
        +` h ${-contentDepth} l ${-paperThickness * 2},${paperThickness} h ${-contentDepth}` // left top
        +` v ${contentHeight / 5 - paperThickness} h ${-paperThickness * 2} v ${contentHeight / 5} h ${ paperThickness * 2 } v ${contentHeight / 5} h ${-paperThickness * 2} v ${contentHeight / 5} h ${paperThickness * 2} v ${ contentHeight / 5 - paperThickness }` // left left
        +` h ${contentDepth} l ${paperThickness * 2},${paperThickness} h ${contentDepth}` // left bottom
        +` l ${-paperThickness},${paperThickness} h ${-(sideFlapLength - paperThickness)} v ${contentDepth - paperThickness} h ${ sideFlapLength } l ${paperThickness},${paperThickness}` // back flap
        + ` l ${-(topFlapLength - curveRadius)},${ contentHeight / 5 - curveRadius } l ${-curveRadius},${curveRadius} v ${(contentHeight / 5) * 3} l ${curveRadius},${curveRadius} l ${ topFlapLength - curveRadius },${contentHeight / 5 - curveRadius}` // top
        + ` l ${-paperThickness},${paperThickness} h ${-( frontFlapLength - curveRadius )} l ${-curveRadius},${curveRadius} v ${curveRadius} l ${frontFlapLength},${ contentDepth - curveRadius*2 }` // front
        // bottom
        + ` h ${contentWidth + paperThickness * 2}`
        // right
        + ` l ${frontFlapLength},${-(contentDepth - curveRadius*2)} v ${-curveRadius} l ${-curveRadius},${-curveRadius} h ${-(frontFlapLength - curveRadius)} l ${-paperThickness},${-paperThickness} ` // front
        + ` l ${ topFlapLength - curveRadius },${-(contentHeight / 5 - curveRadius)} l ${curveRadius},${-curveRadius} v ${-(contentHeight / 5 * 3)} l ${-curveRadius},${-curveRadius} l ${-(topFlapLength - curveRadius)},${-(contentHeight / 5 - curveRadius) }` // top
        +` l ${paperThickness},${-paperThickness} h ${ sideFlapLength } v ${-(contentDepth - paperThickness)} h ${-(sideFlapLength - paperThickness)} l ${-paperThickness},${-paperThickness}` // back flap
        
        + ` h ${contentDepth} l ${paperThickness * 2},${-paperThickness} h ${contentDepth}` // left bottom
        + ` v ${-(contentHeight / 5 - paperThickness)} h ${paperThickness * 2} v ${-contentHeight / 5} h ${-paperThickness * 2} v ${-contentHeight / 5} h ${ paperThickness * 2 } v ${-contentHeight / 5} h ${-paperThickness * 2} v ${-(contentHeight / 5 - paperThickness)}` // left left
        + ` h ${-contentDepth} l ${-paperThickness * 2},${-paperThickness} h ${-contentDepth}` // left top
        + ` l ${paperThickness},${-paperThickness} h ${ sideFlapLength - paperThickness } v ${-(contentDepth - paperThickness)} h ${-sideFlapLength}` // front flap
        // top
        + frontCut
    );

    const totalWidth = (contentWidth / 2 + contentDepth + paperThickness + contentDepth + paperThickness * 4) * 2;
    const totalHeight = frontTop + contentDepth + paperThickness;

    return (
        <svg
            className={twMerge("SvgLidBox", className)}
            width={totalWidth}
            height={totalHeight}
            viewBox={`${-totalWidth / 2} 0 ${totalWidth} ${totalHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            {...restProps}
        >
            {bends.map((bend, index) => (
                <path
                    key={"bend" + index}
                    className="bend"
                    fill="none"
                    stroke={bendColor}
                    strokeWidth={lineWidth}
                    d={bend}
                />
            ))}
            {cuts.map((cut, index) => (
                <path
                    key={"cut" + index}
                    className="cut"
                    fill="none"
                    stroke={cutColor}
                    strokeWidth={lineWidth}
                    d={cut}
                />
            ))}
            {/* <path
                className="rect"
                fill="none"
                stroke={bendColor}
                strokeWidth={lineWidth}
                d={`M ${-totalWidth / 2} 0 h ${totalWidth} v ${totalHeight} h ${-totalWidth} Z`}
            /> */}
        </svg>
    );
}
