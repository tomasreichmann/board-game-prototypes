import React, { SVGProps } from "react";
import clsx from "clsx";
import { PlayerCharacterType } from "../../types";
import CharacterOutline from "../../media/character-outline.svg";
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
                    <div className="text-sm border-dashed">name</div>
                    <h2 className="text-lg font-kacHeading border-b-2 border-dashed">{name}</h2>
                </div>
                <div>
                    <div className="text-sm border-dashed">occupation</div>
                    <h2 className="text-lg font-kacHeading border-b-2 border-dashed">{occupation}</h2>
                </div>
                <div>
                    <div className="text-sm">titles</div>
                    <div className="min-h-4xl">
                        {titles.map((title) => (
                            <h2 key={title} className="text-lg font-kacHeading">
                                {title}
                            </h2>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex-1">
                    <div className="text-sm">specials</div>
                    <div className="min-h-16">
                        {specials.map((special) => (
                            <h2 key={special} className="text-lg font-kacHeading">
                                {special}
                            </h2>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="text-sm border-t-2 border-kac-steel-light pt-1">tricks</div>
                    <div className="min-h-16">
                        {tricks.map((trick) => (
                            <h2 key={trick} className="text-lg font-kacHeading">
                                {trick}
                            </h2>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="text-sm border-t-2 border-kac-steel-light pt-1">wounds</div>
                    <div className="min-h-16">
                        {wounds.map((wound) => (
                            <h2 key={wound} className="text-lg font-kacHeading">
                                {wound}
                            </h2>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex-1">
                    <div className="text-sm border-dashed">assets</div>
                    <div className="min-h-16">
                        {assets.map((asset) => (
                            <h2 key={asset} className="text-lg font-kacHeading">
                                {asset}
                            </h2>
                        ))}
                    </div>
                </div>
                <div className="flex-1 border-t-2 border-kac-steel-light pt-1">
                    <div className="text-sm border-dashed">notes</div>
                    <div className="min-h-16">{notes}</div>
                </div>
            </div>
            {children}
        </div>
    );
}
