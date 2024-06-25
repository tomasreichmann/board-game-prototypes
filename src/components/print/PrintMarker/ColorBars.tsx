import React, { CSSProperties } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { range } from "lodash";

// import "./ColorBars.css";

type ColorBarsProps = {
    className?: string;
    steps?: number;
    size?: CSSProperties["width"];
    vertical?: boolean;
};
const cmykToHue = [180, 300, 60, 0];
const cmykToSaturation = [100, 100, 100, 0];
const cmykToLightness = [50, 50, 50, 0];
const ColorBars = ({ className, steps = 5, size = "3mm", vertical = false }: ColorBarsProps) => {
    return (
        <div className={twMerge("ColorBars flex gap-2", vertical ? "flex-col" : "flex-row", className)}>
            {[0, 1, 2, 3].map((currentColorIndex) => (
                <div
                    key={currentColorIndex}
                    className={twMerge(
                        "border-2 border-white flex gap-1",
                        vertical ? "flex-col-reverse" : "flex-row-reverse"
                    )}
                >
                    {range(steps).map((step) => {
                        const alpha = Math.round(((steps - step) / steps) * 100);

                        return (
                            <div
                                key={step}
                                className={twMerge("w-full h-1 bg-white", vertical ? "w-1 h-full" : "h-1 w-full")}
                                style={{
                                    backgroundColor: `hsla(${cmykToHue[currentColorIndex]} ${cmykToSaturation[currentColorIndex]}%, ${cmykToLightness[currentColorIndex]}%, ${alpha}%)`,
                                    width: size,
                                    height: size,
                                }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ColorBars;
