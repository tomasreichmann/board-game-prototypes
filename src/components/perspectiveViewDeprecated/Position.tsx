import react, { CSSProperties, HTMLAttributes, useMemo } from "react";
import { twMerge } from "tailwind-merge";

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
export type PositionProps = React.PropsWithChildren<
    {
        x?: number;
        y?: number;
        z?: number;
        width?: number;
        height?: number;
        rotateX?: number;
        rotateY?: number;
        rotateZ?: number;
        alignX?: number | string;
        alignY?: number | string;
        center?: boolean;
        transitionDurationMs?: number;
    } & HTMLAttributes<HTMLDivElement>
>;

function getUnit(size: string): string {
    const unitRegex = /(\d+)(\D+)/;
    const match = unitRegex.exec(size);

    if (match) {
        return match[2];
    }

    return "";
}

const normalizeAlignment = (alignment: number | string) =>
    typeof alignment === "number" ? `${alignment}px` : parseFloat(alignment) * -1 + getUnit(alignment);

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
export const Position = ({ children, ...propsWithoutChildren }: PositionProps) => {
    const {
        className,
        x = 0,
        y = 0,
        z = 0,
        rotateX = 0,
        rotateY = 0,
        rotateZ = 0,
        center,
        alignX = center ? "50%" : 0,
        alignY = center ? "50%" : 0,
        transitionDurationMs = 500,
        style,
        ...restProps
    } = propsWithoutChildren;
    const combinedStyle = useMemo(() => {
        const { transform = "", transition = "", ...restStyle } = style || {};

        // const transitionWithoutDuplicates = transition
        //     .split(/,\s*/)
        //     .filter((fragment) => !fragment.startsWith("transform"))
        //     .join(", ");

        return {
            transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)${
                transform ? " " + transform : ""
            }`,
            /*transition: `transform ${transitionDurationMs}ms ease-in-out, transform-origin ${transitionDurationMs} ease-in-out${
                transitionWithoutDuplicates ? (", " + transitionWithoutDuplicates) : ""
            }`,*/
            transition: `all ${transitionDurationMs}ms ease-in-out`,
            ...restStyle,
        };
    }, [x, y, z, rotateX, rotateY, rotateZ, transitionDurationMs, style]);

    const alignmentStyle = useMemo(() => {
        return {
            transform: `translate(${normalizeAlignment(alignX)}, ${normalizeAlignment(alignY)})`,
            transition: `transform ${transitionDurationMs} ease-in-out, transform-origin ${transitionDurationMs} ease-in-out`,
        };
    }, [alignX, alignY, transitionDurationMs]);

    return (
        <div className={twMerge("Position absolute", className)} style={combinedStyle} {...restProps}>
            <div className="absolute" style={alignmentStyle}>
                {children}
            </div>
        </div>
    );
};
