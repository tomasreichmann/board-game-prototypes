import react, { CSSProperties, HTMLAttributes, useMemo } from "react";
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
    } & HTMLAttributes<HTMLDivElement>
>;

const gridStyle: CSSProperties = {
    backgroundSize: "40px 40px",
    backgroundImage: "radial-gradient(circle, #fff 1px, rgba(0, 0, 0, 0) 1px)",
    left: "-200vw",
    right: "-200vw",
    top: "-200vh",
    bottom: "-200vh",
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
        showGrid,
        ...restProps
    } = propsWithoutChildren;
    const style = useMemo(() => {
        return {
            transformOrigin: `${targetX}px ${targetY}px ${-targetZ}px`,
            transform: `translateX(${-targetX}px) translateY(${-targetY}px) translateZ(${-targetZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        };
    }, [targetX, targetY, targetZ, rotateX, rotateY, rotateZ, width, height]);

    return (
        <div
            ref={ref}
            className={twMerge("PerspectiveView", styles.PerspectiveView, "overflow-hidden", className)}
            style={{ perspective: 600 }}
            {...restProps}
        >
            <div className="absolute w-0 h-0 left-1/2 top-1/2" style={style}>
                {showGrid && (
                    <div className="absolute border-2 border-black bg-slate-800 bg-center" style={gridStyle}>
                        <div className="absolute left-1/2 top-1/2 h-[80px] w-[2px] ml-[-1px] mt-[-40px] bg-white opacity-25" />
                        <div className="absolute left-1/2 top-1/2 h-[2px] w-[80px] ml-[-40px] mt-[-1px] bg-white opacity-25" />
                    </div>
                )}
                {children}
            </div>

            <ToggleData
                data={{ ...propsWithoutChildren, width, height }}
                className="absolute right-2 bottom-2 flex flex-col-reverse items-end gap-2 -mb-2"
            />
        </div>
    );
};
