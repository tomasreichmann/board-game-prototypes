import { twMerge } from "tailwind-merge";
import NormalizedChildren from "./NormalizedChildren";
import { SharedContentProps } from "./sharedContentProps";
import useGameContext from "../model/GameContext";
import { DialogActionGameActionType } from "../reducer/gameReducer";

export type DialogActionProps = {
    className?: string;
    style?: React.CSSProperties;
    action?: DialogActionGameActionType;
} & SharedContentProps;

export default function DialogAction({ className, style, children, action, ...restProps }: DialogActionProps) {
    const { dispatch } = useGameContext();

    const content = (
        <>
            ▶&ensp;<NormalizedChildren {...restProps}>{children}</NormalizedChildren>{" "}
            <span className="font-normal">(&gt; #{action?.changeNodeId})</span>
        </>
    );
    // todo dispatch action on click
    if (action?.isSelected === true) {
        return (
            <div
                className={twMerge(
                    "font-mmHeading font-bold text-amber-100 scale-125 origin-left transform-gpu transition-transform duration-200 self-start",
                    className
                )}
                style={style}
            >
                {content}
            </div>
        );
    }
    if (action?.isSelected === false) {
        return (
            <div
                className={twMerge(
                    "font-mmHeading font-bold text-amber-100 origin-left transform-gpu transition-transform duration-200 self-start",
                    className
                )}
                style={style}
            >
                {content}
            </div>
        );
    }

    if (!action) {
        return null;
    }

    return (
        <button
            className={twMerge(
                "font-mmHeading font-bold text-amber-100 hover:scale-125 focus:scale-125 text-left bg-transparent focus:outline-0 focus:border-0 p-0 outline-0 border-0 origin-left transform-gpu transition-transform duration-200 self-start",
                className
            )}
            style={style}
            onClick={() => action && dispatch(action)}
        >
            {content}
        </button>
    );
}
