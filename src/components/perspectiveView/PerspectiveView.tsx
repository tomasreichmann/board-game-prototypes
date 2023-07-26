import react, { CSSProperties, HTMLAttributes, useCallback, useMemo } from "react";
import useMeasure from "react-use-measure";
import { twMerge } from "tailwind-merge";
import ToggleData from "../DataToggle";
import styles from "./PerspectiveView.module.css";

export type PerspectiveViewProps = React.PropsWithChildren<
    {
        targetX?: number;
        targetY?: number;
        targetZ?: number;
        rotateX?: number;
        rotateY?: number;
        rotateZ?: number;
        showGrid?: boolean;
        scale?: number;
        onWrapperMouseMove?: (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => void;
    } & HTMLAttributes<HTMLDivElement>
>;

const gridStyle: CSSProperties = {
    left: "-200vw",
    right: "-200vw",
    top: "-200vh",
    bottom: "-200vh",
};
const gridShadowStyle: CSSProperties = {
    backgroundSize: "40px 40px",
    backgroundImage: "radial-gradient(circle, #fff 1px, rgba(0, 0, 0, 0) 1px)",
    backgroundPosition: "center center",
    filter: "drop-shadow(1px 1px 1px black)",
};

export const PerspectiveView = ({ children, ...propsWithoutChildren }: PerspectiveViewProps) => {
    const [ref, { width, height }] = useMeasure();
    const {
        className,
        targetX = width / 2,
        targetY = height / 2,
        targetZ = 0,
        rotateX = 0,
        rotateY = 0,
        rotateZ = 0,
        scale = 1,
        showGrid,
        onWrapperMouseMove,
        ...restProps
    } = propsWithoutChildren;
    const style = useMemo(() => {
        return {
            transformOrigin: `${targetX}px ${targetY}px ${-targetZ}px`,
            transform: `translateX(${-targetX}px) translateY(${-targetY}px) translateZ(${-targetZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
        };
    }, [targetX, targetY, targetZ, rotateX, rotateY, rotateZ, width, height, scale]);

    const onMouseMove = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const { clientX, clientY } = event;
            if (
                onWrapperMouseMove &&
                "getBoundingClientRect" in event.target &&
                typeof event.target.getBoundingClientRect === "function"
            ) {
                const componentRect = event.target.getBoundingClientRect();
                const x = clientX - componentRect.left;
                const y = clientY - componentRect.top;

                onWrapperMouseMove(x, y, event);
            }
        },
        [onWrapperMouseMove]
    );

    return (
        <div
            ref={ref}
            className={twMerge("PerspectiveView", styles.PerspectiveView, "overflow-hidden", className)}
            style={{ perspective: 600 }}
            onMouseMove={onWrapperMouseMove && onMouseMove}
            {...restProps}
        >
            <div className="absolute w-0 h-0 left-1/2 top-1/2" style={style}>
                {showGrid && (
                    <div className="absolute bg-center opacity-75" style={gridStyle}>
                        <div className="absolute left-0 top-0 w-full h-full" style={gridShadowStyle} />
                        <div className="absolute left-1/2 top-1/2 h-[80px] w-[2px] ml-[-1px] mt-[-40px] bg-white opacity-25" />
                        <div className="absolute left-1/2 top-1/2 h-[2px] w-[80px] ml-[-40px] mt-[-1px] bg-white opacity-25" />
                    </div>
                )}
                {children}
            </div>

            <ToggleData
                data={{ ...propsWithoutChildren, width, height }}
                initialCollapsed
                className="absolute right-2 bottom-2 flex flex-col-reverse items-end gap-2 -mb-2"
            />
        </div>
    );
};
