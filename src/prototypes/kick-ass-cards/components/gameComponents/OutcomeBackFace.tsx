import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import Icon from "../Icon";
import { twMerge } from "tailwind-merge";

export type OutcomeBackFaceProps = React.PropsWithChildren<{ className?: string } & HTMLAttributes<HTMLDivElement>>;

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
