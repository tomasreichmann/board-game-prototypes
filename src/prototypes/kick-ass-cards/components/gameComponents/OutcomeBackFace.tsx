import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import Icon from "../Icon";
import { twMerge } from "tailwind-merge";

export type OutcomeBackFaceProps = React.PropsWithChildren<{ className?: string } & HTMLAttributes<HTMLDivElement>>;

/**
 * A Paper component that displays the back face of an outcome card.
 *
 * This component is suitable for use as the `BackFaceComponent` prop of the
 * `ChunkedPages` component.
 *
 * @deprecated Use OutcomeCardBackFace in OutcomeCard.tsx
 * @param {OutcomeBackFaceProps} props Props for the component.
 * @returns {JSX.Element} The outcome back face component.
 */
export default function OutcomeBackFace({ className, children }: OutcomeBackFaceProps) {
    return (
        <Paper
            size="Mini US game"
            className={twMerge("OutcomeBackFace bg-white p-3 flex flex-col gap-2 rounded-lg", className)}
        >
            <div className="flex-1 flex flex-col justify-center bg-kac-monster-dark rounded-md">
                <Icon icon="d20" className={clsx("h-16")} />
            </div>
            {children}
        </Paper>
    );
}
