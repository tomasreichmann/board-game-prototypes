import React from "react";
import Icon from "./Icon";
import { PaperOrDiv, PaperProps } from "../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import DiceCounter from "./DiceCounter";

export type ClockProps = React.PropsWithChildren<{
    className?: string;
    size?: PaperProps["size"];
    forPrint?: boolean;
    title?: string | null;
    reward?: string | null;
    threat?: string | null;
    total: number;
    current?: number;
}>;

const countIconMap = {
    4: "d4",
    6: "d6",
    8: "d8",
    10: "d10",
    12: "d12",
    20: "d20",
} as const;

export default function Clock({
    className,
    size,
    forPrint,
    title = forPrint ? "" : null,
    reward = forPrint ? "" : null,
    threat = forPrint ? "" : null,
    total,
    current = 0,
    children,
}: ClockProps) {
    const icon = (total in countIconMap && countIconMap[total as keyof typeof countIconMap]) || ("dx" as const);
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "Clock p-5 flex flex-col gap-5 text-kac-steel-dark min-w-[4cm] bg-white relative",
                className
            )}
        >
            <div className="relative flex-1 flex flex-col gap-2">
                <DiceCounter current={current} total={total} className="flex-1 text-kac-steel" />
                {title !== null && (
                    <h2 className="text-sm font-kacHeading leading-tight flex flex-row gap-2">
                        <Icon icon="fountainPen" className="h-5 mt-1 flex-shrink-0 inline-block text-kac-steel-dark" />
                        {title || <div className="flex-1 border-b-2 border-dashed mt-[2em]" />}
                    </h2>
                )}
                {threat !== null && (
                    <div className="text-sm text-kac-blood font-kacBody leading-tight flex flex-row gap-2">
                        <Icon icon="deathSkull" className="h-5 flex-shrink-0 inline-block" />
                        {threat ? (
                            <p className="flex-grow text-sm font-kacBody">{threat}</p>
                        ) : (
                            <div className="flex-1 border-b-2 border-dashed mt-[2em]" />
                        )}
                    </div>
                )}
                {reward !== null && (
                    <div className="text-sm text-kac-gold-dark font-kacBody leading-tight flex flex-row gap-2">
                        <Icon icon="chest" className="h-5 flex-shrink-0 inline-block text-sm" />
                        {reward ? (
                            <p className="flex-grow text-sm font-kacBody">{reward}</p>
                        ) : (
                            <div className="flex-1 border-b-2 border-dashed mt-[2em]" />
                        )}
                    </div>
                )}
            </div>

            {children}
        </PaperOrDiv>
    );
}
