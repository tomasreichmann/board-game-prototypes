import React, { SVGProps } from "react";
import clsx from "clsx";
import Icon from "./Icon";
import { range } from "lodash";
// import "./Clock.css";

export type ClockProps = React.PropsWithChildren<{
    className?: string;
    title?: string;
    total?: number;
    current?: number;
}>;

export default function Clock({ className, title = "", total, current = 0, children }: ClockProps) {
    return (
        <div
            className={clsx(
                "Clock relative bg-white p-5 flex flex-row gap-5 text-kac-steel-dark min-w-[4cm]",
                className
            )}
        >
            <div className="flex-1 flex flex-col gap-2">
                <div className="relative w-full aspect-square flex flex-col border-2 border-kac-iron rounded-full">
                    {total && (
                        <>
                            {range(((current / total) * 360) / 90).map((quarterIndex) => {
                                const angleLeft = Math.min((current / total) * 360 - quarterIndex * 90, 90);

                                return (
                                    <div
                                        className={`absolute left-1/2 top-1/2 h-1/2 w-1/2 [transform-origin:left_top] rounded-[0_0_100%_0] overflow-hidden`}
                                        style={{ rotate: quarterIndex * 90 + 90 + "deg" }}
                                    >
                                        <div
                                            className={`absolute left-0 top-0 h-full w-full bg-kac-steel [transform-origin:left_top] transition-all`}
                                            style={{ rotate: (90 - angleLeft) * -1 + "deg" }}
                                        ></div>
                                    </div>
                                );
                            })}

                            {range(0, total).map((fraction) => {
                                return (
                                    <div
                                        className={`absolute left-1/2 top-1/2 h-1/2 border-l-2 border-kac-iron [transform-origin:center_top] ml-[-1px]`}
                                        style={{ rotate: fraction * (360 / total) + "deg" }}
                                    ></div>
                                );
                            })}
                        </>
                    )}
                </div>
                <div>
                    <div className="text-sm border-dashed -mt-3">
                        <Icon icon="fountainPen" className="h-4 inline-block" />
                        &ensp;title
                    </div>
                    <h2 className="text-lg font-kacHeading border-b-2 border-dashed min-h-8">{title}</h2>
                </div>
            </div>

            {children}
        </div>
    );
}
