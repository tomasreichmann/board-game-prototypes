import React from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import { ActionType } from "../../types";
import Icon from "../Icon/Icon";
import effectToIcon from "../../utils/effectToIcon";
// import "./ActionCard.css";

export type ActionCardProps = React.PropsWithChildren<
    { className?: string } & ActionType
>;

export default function ActionCard({
    className,
    effects,
    description,
    children,
}: ActionCardProps) {
    return (
        <Paper
            size="US game"
            className={clsx(
                "ActionCard bg-white rounded-sm p-5 flex flex-col justify-between",
                className
            )}
        >
            <div className="h-32 flex flex-row flex-wrap gap-4 items-center justify-center text-center">
                {effects.map((effect, effectIndex) => (
                    <Icon
                        key={effectIndex}
                        icon={effectToIcon(effect)}
                        className="h-16"
                    />
                ))}
            </div>
            <div className="text-sm text-center">{description}</div>
            {children}
        </Paper>
    );
}
