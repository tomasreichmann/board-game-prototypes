import React, { SVGProps } from "react";
import clsx from "clsx";
import Icon from "./Icon";
import { range } from "lodash";
import { PaperOrDiv, PaperProps } from "../../../components/print/Paper/Paper";
// import "./Clock.css";

export type ClockProps = React.PropsWithChildren<{
    className?: string;
    size?: PaperProps["size"];
    title?: string;
    reward?: string;
    threat?: string;
    total?: number;
    current?: number;
}>;

export default function Clock({
    className,
    size,
    title = "",
    reward,
    threat,
    total,
    current = 0,
    children,
}: ClockProps) {
    return (
        <PaperOrDiv
            size={size}
            className={clsx(
                "Clock relative bg-white p-5 flex flex-row gap-5 text-kac-steel-dark min-w-[4cm]",
                className
            )}
        >
            <div className="relative flex-1 flex flex-col gap-2">
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
                <div>
                    <div className="text-sm border-dashed -mt-3">
                        <Icon icon="fountainPen" className="h-4 inline-block" />
                        &ensp;title
                    </div>
                    <h2 className={clsx("text-md font-kacHeading", !title && "border-b-2 border-dashed min-h-8")}>
                        {title}
                    </h2>
                </div>
                {threat && (
                    <div>
                        <div className="text-sm border-dashed text-kac-blood">
                            <Icon icon="deathSkull" className="h-4 inline-block" />
                            &ensp;threat
                        </div>
                        <p
                            className={clsx(
                                "text-sm font-kacBody text-kac-blood",
                                !threat && "border-b-2 border-dashed min-h-6"
                            )}
                        >
                            {threat}
                        </p>
                    </div>
                )}
                {reward && (
                    <div>
                        <div className="text-sm border-dashed text-kac-gold-dark">
                            <Icon icon="chest" className="h-4 inline-block" />
                            &ensp;reward
                        </div>
                        <p
                            className={clsx(
                                "text-sm font-kacBody text-kac-gold-dark",
                                !reward && "border-b-2 border-dashed min-h-6"
                            )}
                        >
                            {reward}
                        </p>
                    </div>
                )}
            </div>

            {children}
        </PaperOrDiv>
    );
}
