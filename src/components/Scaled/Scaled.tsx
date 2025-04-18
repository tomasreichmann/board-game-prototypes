import twm from "@/utils/twm";
import React, { ReactNode, CSSProperties, useRef, useLayoutEffect, useState, HTMLAttributes } from "react";

export type ScaledProps = {
    className?: string;
    scale: number; // Scaling factor (e.g., 0.5 for 50% size)
    children: ReactNode; // Children to be scaled
} & HTMLAttributes<HTMLDivElement>;

const Scaled: React.FC<ScaledProps> = ({ className, scale, children, style = {}, ...restProps }) => {
    const contentRef = useRef<HTMLDivElement>(null); // Ref to measure the size of children
    const [size, setSize] = useState<{ width: number; height: number } | null>(null);

    useLayoutEffect(() => {
        if (contentRef.current) {
            const { width, height } = contentRef.current.getBoundingClientRect();
            setSize({ width, height }); // Measure the size of the children
        }
    }, [children]); // Recalculate size if children change

    const containerStyle: CSSProperties = {
        ...style,
        width: size ? size.width : "auto", // Set container width to scaled size
        height: size ? size.height : "auto", // Set container height to scaled size
    };

    const contentStyle: CSSProperties = {
        transform: `scale(${scale})`, // Scale the children
        transformOrigin: "top left", // Scale from the top-left corner
        position: "absolute", // Remove the wrapper from the flow
        top: 0,
        left: 0,
    };

    return (
        <div className={twm("relative", className)} style={containerStyle} {...restProps}>
            <div ref={contentRef} style={contentStyle}>
                {children}
            </div>
        </div>
    );
};

export default Scaled;