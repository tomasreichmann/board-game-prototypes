import React from "react";
import { twMerge } from "tailwind-merge";
import Card, { CardBody, CardHeader, CardProps } from "./Card";
import { TacticalRoleType } from "../../data/tactical-roles";
import { IconOrImage } from "@/components/Icon/IconOrImage";
import { range } from "lodash";
import twm from "@/utils/twm";
// import "./TacticalRoleOverlay.css";

export type TacticalRoleOverlayProps = React.PropsWithChildren<
    {
        slug?: string;
        deck?: string;
        className?: string;
    } & Partial<TacticalRoleType> &
        Partial<CardProps>
>;

export default function TacticalRoleOverlay({
    className,
    deck,
    name,
    toughness,
    speed,
    actions: attacks = [],
    special,
    children,
    ...restProps
}: TacticalRoleOverlayProps) {
    console.log("special.split(/([.*]?)/)", special?.split(/(\[[^\]]+\])/g));
    const specialFragments = special?.split(/(\[[^\]]+\])/g).filter((fr) => fr !== "") || [];
    const isSpecial = special ? special.length > 0 : false;
    const isLongSpecial = special ? special.length > 40 : false;
    return (
        <Card
            className={twMerge("TacticalRoleOverlay", className)}
            {...restProps}
            backgroundImageUri={null}
            childrenWrapperClassName="gap-1"
        >
            <CardBody
                className="min-h-[40%] basis-auto pb-0"
                icon={undefined}
                childrenClassName="shrink-0 basis-auto flex flex-col align-stretch text-left h-[40%]"
            >
                <h3
                    className={twm(
                        "text-xs font-bold leading-tighter mb-1",
                        special ? "mr-[50%] pr-2 text-right" : "ml-[50%] pl-2"
                    )}
                >
                    {name}
                </h3>
                <div className="text-lg font-bold leading-tight text-center flex flex-row">
                    <div className="flex-1 flex flex-row mr-1">
                        {range(toughness || 0).map((index) => (
                            <div
                                key={index}
                                className={twm(
                                    "flex-1 relative h-6 max-w-6",
                                    index === (toughness || 0) - 1 && "w-6 basis-auto shrink-0"
                                )}
                            >
                                <IconOrImage
                                    icon="/mighty-decks/textIcons/toughness.png"
                                    className="absolute left-0 top-0 h-6 w-6 max-w-none flex-shrink-0 inline-block text-kac-steel-dark"
                                />
                            </div>
                        ))}
                    </div>
                    {speed !== undefined && (
                        <div
                            className={twm(
                                "flex flex-row items-center ml-auto",
                                isSpecial &&
                                    "bg-kac-monster-dark outline outline-4 outline-kac-monster-dark rounded-sm leading-tight"
                            )}
                        >
                            <IconOrImage
                                icon="/mighty-decks/textIcons/speed.png"
                                className="h-6 flex-shrink-0 inline-block text-kac-steel-dark -my-2"
                            />{" "}
                            {speed}
                        </div>
                    )}
                </div>
                <div
                    className={twm(
                        "flex-1 text-xs tracking-tight leading-tight flex flex-col",
                        isSpecial && "justify-end"
                    )}
                >
                    {attacks.map(({ type, effect, splash, range }, attackIndex) => {
                        const typeIcon = `/mighty-decks/textIcons/${type}.png`;
                        return (
                            <div key={attackIndex} className="flex flex-row flex-wrap items-center font-bold ">
                                <IconOrImage icon={typeIcon} className="h-6 flex-shrink-0 inline-block" />
                                {effect.map((effectOrJoin, effectIndex) => {
                                    if (typeof effectOrJoin === "string") {
                                        return (
                                            <span key={effectIndex} className="font-bold">
                                                {effectOrJoin}
                                            </span>
                                        );
                                    }
                                    const { amount, effectType } = effectOrJoin;
                                    const effectTypeIcon = `/mighty-decks/textIcons/${effectType}.png`;
                                    return (
                                        <React.Fragment key={effectIndex}>
                                            {amount && amount > 1 && <>{amount}x</>}
                                            <IconOrImage
                                                icon={effectTypeIcon}
                                                className="h-6 flex-shrink-0 inline-block"
                                            />
                                        </React.Fragment>
                                    );
                                })}
                                {splash && (
                                    <IconOrImage
                                        icon="/mighty-decks/textIcons/splash.png"
                                        className="h-6 flex-shrink-0 inline-block"
                                    />
                                )}
                                {range && (
                                    <>
                                        <IconOrImage
                                            icon="/mighty-decks/textIcons/range.png"
                                            className="h-6 flex-shrink-0 inline-block"
                                        />
                                        {range}
                                    </>
                                )}
                            </div>
                        );
                    })}
                    {special && (
                        <div
                            className={twm(
                                "font-bold tracking-tighter leading-tight",
                                isLongSpecial ? "text-2xs" : "text-xs"
                            )}
                        >
                            {specialFragments.map((text, index) => {
                                const isIcon = text?.startsWith("[") && text.endsWith("]");
                                if (!isIcon) {
                                    return <span key={index}>{text.trim()}</span>;
                                }
                                return (
                                    <IconOrImage
                                        key={index}
                                        icon={`/mighty-decks/textIcons/${text.substring(1, text.length - 1)}.png`}
                                        className={twm(
                                            "inline-block align-center ",
                                            isLongSpecial ? "h-4 -my-1" : "h-5 -my-2"
                                        )}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>

                {children}
            </CardBody>
            <CardHeader
                className={twm("z-10", isSpecial && "flex-row-reverse")}
                cornerIcon="/mighty-decks/textIcons/tactics.png"
                deckClassName={twm(isSpecial && "text-left")}
                deck={deck ?? undefined}
            ></CardHeader>
        </Card>
    );
}
