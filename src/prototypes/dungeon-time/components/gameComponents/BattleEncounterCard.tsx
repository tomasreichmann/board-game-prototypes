import React from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import { BattleEncounterType } from "../../types";
import Icon from "../Icon";
import RichText from "../RichText";
// import "./BattleEncounterCard.css";

export type BattleEncounterCardProps = React.PropsWithChildren<{ className?: string } & BattleEncounterType>;

export default function BattleEncounterCard({
    className,
    name,
    description,
    slug,
    icon,
    enemyIntentDeck,
    enemiesForPlayerCount1,
    enemiesForPlayerCount2,
    enemiesForPlayerCount3,
    enemiesForPlayerCount4,
    enemiesForPlayerCount5,
    reward,
    children,
}: BattleEncounterCardProps) {
    return (
        <Paper size="Trump" className={clsx("BattleEncounterCard bg-white px-2 pt-2 flex flex-col gap-2", className)}>
            <div className="text-slate-400 text-center text-xs">{slug}</div>
            <div className="flex flex-col items-center justify-center ">
                <Icon icon={icon} className="w-full max-h-16" />
                <div className="font-dtHeading text-blood-1 text-md text-center">{name}</div>
            </div>
            <div className="flex-1 text-sm italic text-center leading-4">{description}</div>
            <div className="text-sm font-dtHeading text-center">
                <Icon icon={enemyIntentDeck.icon} className="h-4 inline-block" />
                &ensp;
                {enemyIntentDeck.name}
            </div>
            <div className="font-dtHeading text-sm text-center text-blood-1 -mb-1 pt-1 border-t-2 border-t-slate-300">
                Enemies per number of players
            </div>
            <div className="flex flex-row flex-wrap justify-around gap-x-2">
                {[
                    enemiesForPlayerCount1,
                    enemiesForPlayerCount2,
                    enemiesForPlayerCount3,
                    enemiesForPlayerCount4,
                    enemiesForPlayerCount5,
                ].map((enemies, enemiesIndex) => (
                    <div className="text-sm" key={enemiesIndex}>
                        <span className="font-dtHeading text-blood-3">{enemiesIndex + 1}:</span>
                        {enemies.map((enemy, enemyIndex) => (
                            <Icon key={enemyIndex} icon={enemy.icon} className="h-5 inline-block" />
                        ))}
                    </div>
                ))}
            </div>

            <div className="text-center leading-4 font-dtHeading text-sm mb-2">
                <div className="flex flex-1 w-full flex-row gap-2 mb-1">
                    <div className="flex-1 border-t-2 border-t-slate-300 mt-2"></div>
                    <Icon className="h-4 text-fire-3" icon="chest" />
                    <div className="flex-1 border-t-2 border-t-slate-300 mt-2"></div>
                </div>
                <div className="text-acid-1">
                    {reward && (
                        <RichText
                            iconProps={{
                                className: "h-4 inline-block",
                            }}
                            aliasProps={{ COIN: { className: "h-4 inline-block text-fire-3" } }}
                        >
                            {reward}
                        </RichText>
                    )}
                </div>
            </div>
            {children}
        </Paper>
    );
}
