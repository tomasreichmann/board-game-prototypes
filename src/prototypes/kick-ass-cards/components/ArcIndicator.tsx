import React from "react";
import { range } from "lodash";
import { PaperOrDiv, PaperProps } from "../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";

export type ArcIndicatorProps = React.PropsWithChildren<{
    className?: string;
    size?: PaperProps["size"];
    total?: number;
    current?: number;
}>;

export default function ArcIndicator({ className, size, total, current = 0, children }: ArcIndicatorProps) {
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "ArcIndicator relative bg-white p-5 flex flex-row gap-5 text-kac-steel-dark min-w-[4cm]",
                className
            )}
        >
            <div className="flex flex-col justify-center items-center w-8/12 mx-auto">
                <div className="relative w-full pt-[100%]">
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
                            <div className="border-2 border-kac-iron rounded-full absolute w-full h-full left-0 top-0"></div>
                        </>
                    )}
                </div>
            </div>

            {children}
        </PaperOrDiv>
    );
}
