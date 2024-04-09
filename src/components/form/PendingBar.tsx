import { twMerge } from "tailwind-merge";

export const bgColorOptions = {
    primary: ["bg-kac-gold", "bg-kac-gold-light", "bg-kac-gold-dark"],
    info: ["bg-kac-cloth", "bg-kac-cloth-light", "bg-kac-cloth-dark"],
    success: ["bg-kac-monster", "bg-kac-monster-light", "bg-kac-monster-dark"],
    warning: ["bg-kac-fire", "bg-kac-fire-light", "bg-kac-fire-dark"],
    danger: ["bg-kac-blood", "bg-kac-blood-light", "bg-kac-blood-dark"],
    "kac-steel": ["bg-kac-steel", "bg-kac-steel-light", "bg-kac-steel-dark"],
    "kac-iron": ["bg-kac-iron", "bg-kac-iron-light", "bg-kac-iron-dark"],
    "kac-blood": ["bg-kac-blood", "bg-kac-blood-light", "bg-kac-blood-dark"],
    "kac-fire": ["bg-kac-fire", "bg-kac-fire-light", "bg-kac-fire-dark"],
    "kac-bone": ["bg-kac-bone", "bg-kac-bone-light", "bg-kac-bone-dark"],
    "kac-skin": ["bg-kac-skin", "bg-kac-skin-light", "bg-kac-skin-dark"],
    "kac-gold": ["bg-kac-gold", "bg-kac-gold-light", "bg-kac-gold-dark"],
    "kac-cloth": ["bg-kac-cloth", "bg-kac-cloth-light", "bg-kac-cloth-dark"],
    "kac-curse": ["bg-kac-curse", "bg-kac-curse-light", "bg-kac-curse-dark"],
    "kac-monster": ["bg-kac-monster", "bg-kac-monster-light", "bg-kac-monster-dark"],
};

const DARK = 2;
const LIGHT = 1;
const DEFAULT = 0;

export type PendingBarProps = React.HTMLAttributes<HTMLSpanElement> & {
    completeClassName?: string;
    current?: number;
    total?: number;
    color?: keyof typeof bgColorOptions;
    active?: boolean;
};

export default function PendingBar({
    className,
    completeClassName,
    current = 0,
    total = 0,
    color = "success",
    active,
    ...restProps
}: PendingBarProps) {
    const percentComplete = total > 0 ? (current / total) * 100 : 100;
    const bgColors = bgColorOptions[color] || bgColorOptions.success;
    return (
        <div
            className={twMerge(
                "h-2 w-full relative transition-all",
                bgColors[LIGHT],
                className,
                percentComplete === 100 && completeClassName
            )}
            {...restProps}
        >
            <div
                className={twMerge("h-full transition-all", bgColors[DEFAULT], active && "animate-pulse")}
                style={{ width: `${percentComplete}%` }}
            ></div>
        </div>
    );
}
