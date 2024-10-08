import React from "react";
import Icon from "./Icon";
import { PaperOrDiv, PaperProps } from "../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import { H3 } from "./content/Text";

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
        <PaperOrDiv size={size} className={twMerge("DiceCounter flex", className)}>
            <div className="relative flex-1 flex flex-col gap-2 justify-center items-center">
                <div className="flex-1 relative self-stretch">
                    <Icon
                        icon={icon}
                        className={twMerge(
                            "absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2",
                            iconClassName
                        )}
                    />
                </div>
                {icon === "dx" && (
                    <H3
                        className={twMerge(
                            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            textClassName
                        )}
                        color="body"
                    >
                        <span className={currentClassName}>{current}</span>&nbsp;/&nbsp;{total}
                    </H3>
                )}
                {icon !== "dx" && (
                    <H3 className={textClassName} color="body">
                        <span className={currentClassName}>{current}</span>&nbsp;/&nbsp;{total}
                    </H3>
                )}
            </div>
            {children}
        </PaperOrDiv>
    );
}
