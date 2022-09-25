import React from "react";
import clsx from "clsx";
import Paper from "../../../components/print/Paper/Paper";
import { EnemyType } from "../types";
import Icon from "./Icon/Icon";
import RichText from "./RichText";
// import "./EnemyCard.css";

export type EnemyCardProps = React.PropsWithChildren<
    { className?: string } & EnemyType
>;

export default function EnemyCard({
    className,
    slug,
    name,
    type,
    icon,
    imageUri,
    flavourText,
    attack,
    altAttack,
    defend,
    move,
    special,
    passive,
    hitPoints,
    challenge,
    children,
}: EnemyCardProps) {
    const iconProps = { className: "h-6 inline-block" };
    return (
        <Paper
            size="Trump"
            className={clsx(
                "EnemyCard bg-white rounded-sm px-2 pt-2 flex flex-col",
                className
            )}
        >
            <div className="text-slate-400 text-center text-xs">{slug}</div>
            <div className="flex-1 shrink my-2 flex flex-row gap-2">
                <div className="w-32 min-w-16">
                    <Icon icon={icon} className="w-full" />
                    {hitPoints > 0 && (
                        <div className="text-lg font-dtHeading text-center">
                            {hitPoints}&nbsp;HP
                        </div>
                    )}
                </div>
                <div>
                    <div className="font-dtHeading text-blood-1 text-md">
                        {name}
                    </div>
                    <div className="text-xs leading-3 italic text-justify">
                        {flavourText}
                    </div>
                </div>
            </div>
            <div className="bg-slate-100 text-slate-1 h-8 -mx-2 px-4 flex flex-col justify-center items-end text-xs leading-3 font-bold">
                <div className="text-center">
                    <RichText iconProps={iconProps}>{passive}</RichText>
                </div>
            </div>
            <div className="bg-fire-5 text-fire-1 h-8 -mx-2 px-4 flex flex-col justify-center items-end text-xs leading-3">
                <div className="text-right">
                    <RichText iconProps={iconProps}>{attack}</RichText>
                </div>
            </div>
            <div className="bg-blood-5 text-blood-1 h-8 -mx-2 px-4 flex flex-col justify-center items-end text-xs leading-3">
                <div className="text-right">
                    <RichText iconProps={iconProps}>{altAttack}</RichText>
                </div>
            </div>
            <div className="bg-lightning-5 text-lightning-1 h-8 -mx-2 px-4 flex flex-col justify-center items-end text-xs leading-3">
                <div className="text-right">
                    <RichText iconProps={iconProps}>{defend}</RichText>
                </div>
            </div>
            <div className="bg-acid-5 text-acid-1 h-8 -mx-2 px-4 flex flex-col justify-center items-end text-xs leading-3">
                <div className="text-right">
                    <RichText iconProps={iconProps}>{move}</RichText>
                </div>
            </div>
            <div className="bg-curse-5 text-blood-1 h-16 -mx-2 px-4 flex flex-col justify-center items-end text-xs leading-3">
                <div className="text-right">
                    <RichText iconProps={iconProps}>{special}</RichText>
                </div>
            </div>
            {children}
        </Paper>
    );
}
