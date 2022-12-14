import React from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import { ConsumableType } from "../../types";
import Icon from "../Icon";
import RichText from "../RichText";
// import "./ConsumableCard.css";

export type ConsumableCardProps = React.PropsWithChildren<{ className?: string } & ConsumableType>;

export default function ConsumableCard({ className, name, icon, slug, effect, cost, children }: ConsumableCardProps) {
    const iconProps = { className: "h-6 inline-block" };

    return (
        <Paper size="US game" className={clsx("ConsumableCard bg-white px-2 pt-2 flex flex-col gap-2", className)}>
            <div className="text-slate-400 text-center text-xs">{slug}</div>
            <div className="flex flex-row justify-between items-center">
                <div className="font-dtHeading text-sm text-acid-1">Consumable</div>
                <div className="text-md font-dtHeading text-right text-fire-3">
                    {cost}&ensp;
                    <Icon icon="COIN" {...iconProps} />
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end gap-1">
                <Icon icon={icon} className="w-full max-h-24 text-lightning-1" />
                <div className="font-dtHeading text-blood-1 text-md text-center">{name}</div>
            </div>

            <div className="flex-1 max-h-24 text-center text-md italic">
                {effect && <RichText iconProps={{ className: "h-6 inline-block -my-1" }}>{effect}</RichText>}
            </div>
            {children}
        </Paper>
    );
}
