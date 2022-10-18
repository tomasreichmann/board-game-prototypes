import React, { SVGProps } from "react";
import clsx from "clsx";
import { PlayerCharacterType } from "../../types";
import CharacterOutline from "../../media/character-outline.svg";
import Icon from "../Icon";
// import "./PlayerCharacterCard.css";

const CharacterOutlineImage = CharacterOutline as unknown as React.ComponentType<SVGProps<SVGElement>>;

export type PlayerCharacterCardProps = React.PropsWithChildren<{ className?: string } & PlayerCharacterType>;

export default function PlayerCharacterCard({
    className,
    name = "",
    occupation = "",
    specials = [],
    tricks = [],
    titles = [],
    wounds = [],
    assets = [],
    notes = "",
    children,
}: PlayerCharacterCardProps) {
    const iconProps = { className: "h-5 inline-block -my-1" };
    return (
        <div
            className={clsx(
                "PlayerCharacterCard relative bg-white p-5 flex flex-row gap-5 text-kac-steel-dark",
                className
            )}
        >
            <div className="flex-1 flex flex-col gap-2">
                <div className="relative h-1/3 rounded flex flex-col text-kac-steel-light border-2 border-kac-steel">
                    <CharacterOutlineImage className="h-full w-full " style={{}} />
                </div>
                <div>
                    <div className="text-sm border-dashed">
                        <Icon icon="fountainPen" className="h-4 inline-block" />
                        &ensp;name
                    </div>
                    <h2 className="text-lg font-kacHeading border-b-2 border-dashed min-h-8">{name}</h2>
                </div>
                <div>
                    <div className="text-sm border-dashed">
                        <Icon icon="toolbox" className="h-4 inline-block" />
                        &ensp;occupation
                    </div>
                    <h2 className="text-lg font-kacHeading border-b-2 border-dashed min-h-8">{occupation}</h2>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="text-sm">
                        <Icon icon="checkedShield" className="h-4 inline-block" />
                        &ensp;titles
                    </div>
                    <div className="flex-1 min-h-4xl relative">
                        {titles.map((title) => (
                            <h2 key={title} className="text-lg font-kacHeading">
                                {title}
                            </h2>
                        ))}
                        <div className="border-b-2 border-dashed absolute top-[2em] left-0 w-full"></div>
                        <div className="border-b-2 border-dashed absolute top-[4em] left-0 w-full"></div>
                        <div className="border-b-2 border-dashed absolute top-[6em] left-0 w-full"></div>
                        <div className="border-b-2 border-dashed absolute top-[8em] left-0 w-full"></div>
                        <div className="border-b-2 border-dashed absolute top-[10em] left-0 w-full"></div>
                        <div className="border-b-2 border-dashed absolute top-[12em] left-0 w-full"></div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex-1 flex flex-col">
                    <div className="text-sm text-kac-fire">
                        <Icon icon="mightyForce" className="h-4 inline-block" />
                        &ensp;specials
                    </div>
                    <div className="min-h-16 flex-1 relative">
                        {specials.map((special) => (
                            <h2 key={special} className="text-lg font-kacHeading">
                                {special}
                            </h2>
                        ))}
                        {specials.length === 0 && (
                            <>
                                <div className="border-b-2 border-dashed absolute top-[2em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[4em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[6em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[8em] left-0 w-full"></div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex-1 flex flex-col ">
                    <div className="text-sm border-t-2 text-kac-cloth border-kac-steel-light pt-1">
                        <Icon icon="pointyHat" className="h-4 inline-block" />
                        &ensp;tricks
                    </div>
                    <div className="min-h-16 flex-1 relative">
                        {tricks.map((trick) => (
                            <h2 key={trick} className="text-lg font-kacHeading">
                                {trick}
                            </h2>
                        ))}
                        {tricks.length === 0 && (
                            <>
                                <div className="border-b-2 border-dashed absolute top-[2em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[4em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[6em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[8em] left-0 w-full"></div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex-1 flex flex-col ">
                    <div className="text-sm border-t-2 border-kac-steel-light pt-1 text-kac-blood">
                        <Icon icon="drop" className="h-4 inline-block" />
                        &ensp;wounds
                    </div>
                    <div className="min-h-16 flex-1 relative">
                        {wounds.map((wound) => (
                            <h2 key={wound} className="text-lg font-kacHeading">
                                {wound}
                            </h2>
                        ))}
                        {wounds.length === 0 && (
                            <>
                                <div className="border-b-2 border-dashed absolute top-[2em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[4em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[6em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[8em] left-0 w-full"></div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex-1">
                    <div className="text-sm border-dashed text-kac-gold-dark">
                        <Icon icon="chest" className="h-4 inline-block" />
                        &ensp;assets
                    </div>
                    <div className="min-h-16 flex-1 relative">
                        {assets.map((asset) => (
                            <h2 key={asset} className="text-lg font-kacHeading">
                                {asset}
                            </h2>
                        ))}
                        {assets.length === 0 && (
                            <>
                                <div className="border-b-2 border-dashed absolute top-[2em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[4em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[6em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[8em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[10em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[12em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[14em] left-0 w-full"></div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex-1 border-t-2 border-kac-steel-light pt-1 relative">
                    <div className="text-sm border-dashed text-kac-bone-dark">
                        <Icon icon="scrollQuill" className="h-4 inline-block" />
                        &ensp;notes
                    </div>
                    <div className="min-h-16 flex-1 ">{notes}</div>
                    {notes.length === 0 && (
                        <>
                            <div className="border-b-2 border-dashed absolute top-[2em] left-0 w-full"></div>
                            <div className="border-b-2 border-dashed absolute top-[4em] left-0 w-full"></div>
                            <div className="border-b-2 border-dashed absolute top-[6em] left-0 w-full"></div>
                            <div className="border-b-2 border-dashed absolute top-[8em] left-0 w-full"></div>
                            <div className="border-b-2 border-dashed absolute top-[10em] left-0 w-full"></div>
                            <div className="border-b-2 border-dashed absolute top-[12em] left-0 w-full"></div>
                            <div className="border-b-2 border-dashed absolute top-[14em] left-0 w-full"></div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}
