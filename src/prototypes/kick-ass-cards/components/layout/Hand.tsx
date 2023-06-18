import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import useMeasure from "react-use-measure";

export type HandProps = React.PropsWithChildren<{
    className?: string;
    items: JSX.Element[];
}> &
    HTMLAttributes<HTMLDivElement>;

const ARC_DEG = 60 * 0.8;

export default function Hand({ className, items, children, ...restProps }: HandProps) {
    const [ref, { width }] = useMeasure();
    return (
        <div ref={ref} className={twMerge("Hand relative perspective", className)} {...restProps}>
            {items.map((item, itemIndex) => (
                <div
                    key={item.key}
                    style={{
                        rotate: -ARC_DEG / 2 + itemIndex * (ARC_DEG / (items.length - 1)) + "deg",
                        transformOrigin: "0 " + width * 0.8 + "px",
                    }}
                    className="absolute left-1/2 top-[40%] transform-gpu -translate-x-1/2 -translate-y-1/2 transition-all duration-300 drop-shadow hover:translate-z-10 hover:z-10 hover:drop-shadow-xl"
                >
                    {item}
                </div>
            ))}

            {children}
        </div>
    );
}
