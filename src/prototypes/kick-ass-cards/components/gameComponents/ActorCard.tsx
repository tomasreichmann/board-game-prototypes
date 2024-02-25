import React, { CSSProperties, SVGProps } from "react";
import { ActorType } from "../../types";
import CharacterOutline from "../../media/character-outline.svg";
import Icon from "../Icon";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import Image, { ImageProps } from "../Image";
import { twMerge } from "tailwind-merge";
import DiceCounter from "../DiceCounter";
// import "./ActorCard.css";

const CharacterOutlineImage = CharacterOutline as unknown as React.ComponentType<SVGProps<SVGElement>>;

export type ActorCardProps = React.PropsWithChildren<
    {
        className?: string;
        size?: PaperProps["size"];
        imagePosition?: CSSProperties["objectPosition"];
        imageClassName?: string;
        imageWrapperClassName?: string;
        notesClassName?: string;
        forPrint?: boolean;
        ImageComponent?: React.ComponentType<ImageProps>;
    } & Partial<ActorType>
>;

export default function ActorCard({
    className,
    imagePosition,
    forPrint,
    size = forPrint ? "US game" : undefined,
    name = "",
    imageUri,
    imageClassName,
    imageWrapperClassName,
    occupation = forPrint ? "" : null,
    toughness = 0,
    currentToughness = toughness,
    notesClassName,
    age,
    threat = forPrint ? "" : null,
    reward = forPrint ? "" : null,
    notes = forPrint ? "" : null,
    ImageComponent = Image,
    children,
}: ActorCardProps) {
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "ActorCard relative bg-white p-5 flex flex-column gap-5 text-kac-steel-dark rounded-lg",
                className
            )}
        >
            <div className="flex-1 flex flex-col gap-1">
                <div
                    className={twMerge(
                        "imageWrapperClassName",
                        "flex-1 relative rounded flex flex-col text-kac-steel-light border-2 border-kac-steel h-16 z-10",
                        imageWrapperClassName
                    )}
                >
                    {imageUri ? (
                        <ImageComponent
                            src={imageUri}
                            className={twMerge("imageClassName", "w-full h-full rounded-sm", imageClassName)}
                            objectFit="cover"
                            objectPosition={imagePosition}
                        />
                    ) : (
                        <CharacterOutlineImage style={{}} className="h-full w-full text-kac-steel-light" />
                    )}
                    {toughness > 0 && (
                        <DiceCounter
                            current={currentToughness}
                            total={toughness}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent drop-shadow-sm opacity-50 text-white h-20"
                            iconClassName="h-3/4 max-h-20"
                            currentClassName="text-red-300"
                        />
                    )}
                </div>
                <div className={"text-sm flex flex-row gap-4 mt-1 mb-1"}>
                    <h2
                        className={twMerge(
                            "flex-1 text-md font-kacHeading leading-none mt-1",
                            toughness > 0 ? "text-left" : "text-center"
                        )}
                    >
                        {name || <div className="flex-1 border-b-2 border-dashed mt-[2em]" />}
                        {age !== undefined ? ` (${age})` : ""}
                    </h2>
                    {toughness > 0 && (
                        <div className="text-sm border-dashed justify-end text-kac-blood font-kacHeading flex flex-row">
                            {toughness}&nbsp;
                            <Icon icon="drop" className="h-5" />
                        </div>
                    )}
                </div>
                {occupation !== null && (
                    <h3 className="text-xs leading-tight flex flex-row gap-2">
                        <Icon icon="toolbox" className="h-5 flex-shrink-0 inline-block text-kac-steel-dark" />
                        {occupation ? (
                            <p className="flex-grow mt-1">{occupation}</p>
                        ) : (
                            <div className="flex-1 border-b-2 border-dashed mt-[2em] " />
                        )}
                    </h3>
                )}
                {threat !== null && (
                    <div className="text-xs text-kac-blood font-kacBody leading-tight flex flex-row gap-3">
                        <Icon icon="deathSkull" className="h-4 mt-1 flex-shrink-0 inline-block" />
                        {threat ? (
                            <p className="flex-grow text-xs font-kacBody mt-1">{threat}</p>
                        ) : (
                            <div className="flex-1 border-b-2 border-dashed mt-[2em]" />
                        )}
                    </div>
                )}
                {reward !== null && (
                    <div className="text-xs text-kac-gold-dark font-kacBody leading-tight flex flex-row gap-3">
                        <Icon icon="chest" className="h-4 mt-1 flex-shrink-0 inline-block" />
                        {reward ? (
                            <p className="flex-grow text-xs font-kacBody mt-1">{reward}</p>
                        ) : (
                            <div className="flex-1 border-b-2 border-dashed mt-[2em]" />
                        )}
                    </div>
                )}
                {notes !== null && (
                    <div className="border-kac-steel-light pt-1 relative flex flex-col overflow-hidden">
                        <div className="text-xs border-dashed text-kac-bone-dark leading-tight">
                            <Icon icon="scrollQuill" className="h-4 mr-3 inline-block" />
                            {notes.length > 0 ? (
                                <div className={twMerge("inline", notesClassName)}>{notes}</div>
                            ) : (
                                <>
                                    <div className="border-b-2 border-dashed ml-7"></div>
                                    <div className="border-b-2 border-dashed mt-[2em]"></div>
                                    <div className="border-b-2 border-dashed mt-[2em]"></div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {children}
        </PaperOrDiv>
    );
}
