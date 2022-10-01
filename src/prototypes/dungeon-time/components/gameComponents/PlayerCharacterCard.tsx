import React from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import { PlayerCharacterType } from "../../types";
import Icon, { IconType } from "../Icon/Icon";
import RichText from "../RichText";
// import "./PlayerCharacterCard.css";

export type PlayerCharacterCardProps = React.PropsWithChildren<{ className?: string } & PlayerCharacterType>;

export default function PlayerCharacterCard({
    className,
    slug,
    name,
    role,
    flavor,
    gameplay,
    icon,
    imageUri,
    flavorText,
    toughness,
    speed,
    handSize,
    passive,
    special,
    startingDeckSlug,
    startingDeck,
    children,
}: PlayerCharacterCardProps) {
    const iconProps = { className: "h-5 inline-block -my-1" };
    return (
        <Paper
            size="Trump"
            className={clsx("PlayerCharacterCard bg-white rounded-sm p-5 flex flex-col gap-2", className)}
        >
            <div>
                <div className="text-slate-400 text-center text-xs">{slug}</div>
                <div className="flex flex-row justify-between text-sm font-dtHeading gap-2">
                    <div className="text-lightning-3">
                        <Icon icon="TOUGHNESS" className="h-6 inline-block" />
                        {toughness}
                    </div>
                    <div className="text-acid-1">
                        <Icon icon="MOVE" className="h-6 inline-block" />
                        {speed}
                    </div>
                    <div className="text-blood-1">
                        <Icon icon="cardRandom" className="h-6 inline-block" />
                        {handSize}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
                <Icon icon={icon} className={clsx("h-20 max-h-fit")} />
                <div className="text-md text-lightning-2 font-dtHeading text-center">{name}</div>
            </div>
            <div className="text-xs text-center italic">{gameplay}</div>
            <div>
                <div className="bg-slate-100 text-slate-1 -mx-2 px-4 py-2 flex flex-col justify-center items-end text-xs leading-3 font-bold">
                    <div className="text-center">
                        <RichText iconProps={iconProps}>{passive}</RichText>
                    </div>
                </div>
                <div className="bg-curse-5 text-blood-1 -mx-2 px-4 py-2 flex flex-row justify-between items-start text-xs leading-3">
                    <Icon icon="SPECIAL" className="h-5 -my-1 inline-block text-curse-1" />
                    <div className="flex-1 shrink text-right">
                        <RichText iconProps={iconProps}>{special}</RichText>
                    </div>
                </div>
            </div>
            {children}
        </Paper>
    );
}
