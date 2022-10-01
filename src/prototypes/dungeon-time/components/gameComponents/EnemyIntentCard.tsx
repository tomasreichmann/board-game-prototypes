import React from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import { EnemyIntentType } from "../../types";
import Icon from "../Icon/Icon";
import RichText from "../RichText";
import { range } from "lodash";
// import "./EnemyIntentCard.css";

export type EnemyIntentCardProps = React.PropsWithChildren<{ className?: string; deck?: string } & EnemyIntentType>;

export default function EnemyIntentCard({
    className,
    slug,
    attack,
    attackMod,
    altAttack,
    altAttackMod,
    defend,
    defendMod,
    move,
    moveMod,
    special,
    children,
}: EnemyIntentCardProps) {
    const iconProps = { className: "h-6 inline-block" };
    return (
        <Paper
            size="Mini European"
            orientation="portrait"
            className={clsx("EnemyIntentCard rounded-sm px-2 pt-2 flex flex-col justify-between", className)}
        >
            <div className="text-slate-400 text-xs w-1/2 leading-3 pr-1">{slug}</div>
            <div className="flex flex-col items-start">
                <div className="bg-fire-5 text-fire-1 h-8 -mx-2 pl-4 pr-2 flex flex-col justify-center items-start text-xs leading-3">
                    <div className="text-left ">
                        {range(attack).map((index) => (
                            <Icon key={index} icon="arrowLeft" {...iconProps} />
                        ))}{" "}
                        <RichText iconProps={iconProps}>{attackMod}</RichText>
                    </div>
                </div>
                <div className="bg-blood-5 text-blood-1 h-8 -mx-2 pl-4 pr-2 flex flex-col justify-center items-start text-xs leading-3">
                    <div className="text-left ">
                        {range(altAttack).map((index) => (
                            <Icon key={index} icon="arrowLeft" {...iconProps} />
                        ))}{" "}
                        <RichText iconProps={iconProps}>{altAttackMod}</RichText>
                    </div>
                </div>
                <div className="bg-lightning-5 text-lightning-1 h-8 -mx-2 pl-4 pr-2 flex flex-col justify-center items-start text-xs leading-3">
                    <div className="text-left ">
                        {range(defend).map((index) => (
                            <Icon key={index} icon="arrowLeft" {...iconProps} />
                        ))}{" "}
                        <RichText iconProps={iconProps}>{defendMod}</RichText>
                    </div>
                </div>
                <div className="bg-acid-5 text-acid-1 h-8 -mx-2 pl-4 pr-2 flex flex-col justify-center items-start text-xs leading-3">
                    <div className="text-left ">
                        {range(move).map((index) => (
                            <Icon key={index} icon="arrowLeft" {...iconProps} />
                        ))}{" "}
                        <RichText iconProps={iconProps}>{moveMod}</RichText>
                    </div>
                </div>
                <div className="bg-curse-5 text-curse-1 h-16 -mx-2 pl-4 pr-2 flex flex-col justify-center items-start text-xs leading-3">
                    <div className="text-left ">
                        {range(special).map((index) => (
                            <Icon key={index} icon="arrowLeft" {...iconProps} />
                        ))}
                    </div>
                </div>
            </div>
            {children}
        </Paper>
    );
}
