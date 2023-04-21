import React from "react";
import { twMerge } from "tailwind-merge";

export type SpreadProps = React.PropsWithChildren<{
    className?: string;
    horizontalMarginPercent?: number;
    items: JSX.Element[];
}>;

export default function Spread({ className, items, children, horizontalMarginPercent = 15 }: SpreadProps) {
    return (
        <div className={twMerge("Spread [perspective:600px] flex flex-row", className)}>
            {items.map((item, itemIndex) => (
                <div
                    key={item.key}
                    style={{
                        left:
                            (items.length > 1
                                ? horizontalMarginPercent +
                                  ((100 - horizontalMarginPercent * 2) / (items.length - 1)) * itemIndex
                                : 50) + "%",
                    }}
                    className="absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 transition-all duration-300 drop-shadow hover:translate-z-[20px] hover:z-10 hover:drop-shadow-xl"
                >
                    {item}
                </div>
            ))}

            {children}
        </div>
    );
}
