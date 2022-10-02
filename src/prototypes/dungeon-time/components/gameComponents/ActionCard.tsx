import React from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import { ActionType } from "../../types";
import Icon, { IconType } from "../Icon/Icon";
import effectColorClassNameMap from "../../utils/effectColorClassNameMap";
import RichText from "../RichText";
// import "./ActionCard.css";

export type ActionCardProps = React.PropsWithChildren<{ className?: string } & ActionType>;

const effectSizeClassNameMap: { [key in IconType]?: string } = {
    SPECIAL: "h-24",
};

export default function ActionCard({
    className,
    slug,
    deck,
    effects,
    description,
    upgradeOptions = [],
    children,
}: ActionCardProps) {
    return (
        <Paper size="US game" className={clsx("ActionCard bg-white p-5 flex flex-col gap-2", className)}>
            <div>
                <div className="text-slate-400 text-center text-xs">{slug}</div>
                {deck && <div className="text-acid-1 font-dtHeading text-center text-sm">{deck.name}</div>}
            </div>
            <div className="relative flex-1 flex-shrink flex flex-row flex-wrap gap-2 items-center justify-center content-center text-center">
                {effects.map((effect, effectIndex) => (
                    <Icon
                        key={effectIndex}
                        icon={effect}
                        className={clsx(
                            "max-h-fit",
                            effectColorClassNameMap[effect],
                            effectSizeClassNameMap[effect] || "h-14"
                        )}
                    />
                ))}
            </div>
            <div className="text-xs text-center">
                <RichText iconProps={{ className: "h-5 inline-block -my-1" }}>{description}</RichText>
            </div>
            {upgradeOptions.length > 0 && (
                <div className="pt-3">
                    <div className="flex flex-1 w-full flex-row gap-2 mb-1">
                        <div className="flex-1 border-t-2 border-t-slate-400 mt-2"></div>
                        <Icon className="h-4 text-lightning-3" icon="cardExchange" />
                        <div className="flex-1 border-t-2 border-t-slate-400 mt-2"></div>
                    </div>
                    <div className="flex-1 flex flex-wrap flex-row gap-x-1 gap-y-1 justify-around">
                        {upgradeOptions.map((upgradeOption) => (
                            <div className="flex flex-row border-2 px-1 border-slate-300 rounded-full">
                                {upgradeOption.effects.map((effect, effectIndex) => (
                                    <Icon
                                        key={effectIndex}
                                        icon={effect}
                                        className={clsx("h-3", effectColorClassNameMap[effect])}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {children}
        </Paper>
    );
}
