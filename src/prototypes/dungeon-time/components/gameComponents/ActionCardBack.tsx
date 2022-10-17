import React from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import { ActionType } from "../../types";
import Icon from "../Icon";
// import "./ActionCard.css";
import splashUri from "../../media/splash-1.png";

export type ActionCardProps = React.PropsWithChildren<{ className?: string }>;

export default function ActionCardBack({ className, children }: ActionCardProps) {
    return (
        <Paper
            size="US game"
            className={clsx(
                "ActionCardBack bg-white p-2 flex flex-col gap-2 items-stretch rounded-lg shadow-lg border-[1px] border-slate-300",
                className
            )}
        >
            <div className="relative bg-lightning-1 flex-1 rounded-md flex flex-col gap-2 justify-center items-center">
                <Icon className="h-20 text-white z-10" icon="MELEE" />
                <img
                    src={splashUri}
                    alt=""
                    className="absolute left-0 right-0 top-0 bottom-0 h-full object-cover z-0 mix-blend-multiply object-center"
                />
            </div>
            {children}
        </Paper>
    );
}
