import React, { useMemo } from "react";

export interface EasingGraphProps {
    /** The easing function to visualize. It should map [0,1] → [0,1]. */
    easing: (t: number) => number;
    /** Optional: number of samples (default 200) */
    samples?: number;
    /** Width and height of the SVG (default 300×150) */
    width?: number;
    height?: number;
    /** Optional label to display under the graph */
    label?: string;
}

/**
 * Renders an SVG curve of an easing function over time.
 * X axis = t (0→1), Y axis = easing(t).
 */
export const EasingGraph: React.FC<EasingGraphProps> = ({
    easing,
    samples = 200,
    width = 300,
    height = 150,
    label,
}) => {
    const path = useMemo(() => {
        const points: [number, number][] = [];
        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            const y = 1 - easing(t); // invert vertically for graph orientation
            points.push([t * width, y * height]);
        }
        const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
        return d;
    }, [easing, samples, width, height]);

    return (
        <div className="flex flex-col items-center gap-2 select-none">
            <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="bg-gray-900 rounded-lg">
                {/* Axes */}
                <line x1={0} y1={height} x2={width} y2={height} stroke="#444" strokeWidth={1} />
                <line x1={0} y1={0} x2={0} y2={height} stroke="#444" strokeWidth={1} />

                {/* Curve */}
                <path d={path} fill="none" stroke="#00ffff" strokeWidth={2} />
            </svg>

            {label && <div className="text-gray-400 text-sm">{label}</div>}
        </div>
    );
};
