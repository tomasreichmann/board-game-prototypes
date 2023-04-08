import React from "react";
import Icon from "./Icon";
import { PaperOrDiv, PaperProps } from "../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";

export type DiceCounterProps = React.PropsWithChildren<{
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    currentClassName?: string;
    size?: PaperProps["size"];
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

export default function DiceCounter({
    className,
    iconClassName = "max-h-20 h-full",
    textClassName = "text-center",
    currentClassName = "text-kac-blood",
    size,
    total,
    current = 0,
    children,
}: DiceCounterProps) {
    const icon = (total in countIconMap && countIconMap[total as keyof typeof countIconMap]) || ("dx" as const);
    return (
        <PaperOrDiv size={size} className={twMerge("DiceCounter flex bg-white text-sm font-kacHeading", className)}>
            <div className="relative flex-1 flex flex-col gap-2 justify-center items-center">
                <Icon icon={icon} className={iconClassName} />
                {icon === "dx" && (
                    <div
                        className={twMerge(
                            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg",
                            textClassName
                        )}
                    >
                        <span className={currentClassName}>{current}</span>&nbsp;/&nbsp;{total}
                    </div>
                )}
                {icon !== "dx" && (
                    <p className={textClassName}>
                        <span className={currentClassName}>{current}</span>&nbsp;/&nbsp;{total}
                    </p>
                )}
            </div>
            {children}
        </PaperOrDiv>
    );
}
