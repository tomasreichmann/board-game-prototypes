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
        slug?: string;
        className?: string;
        imagePosition?: CSSProperties["objectPosition"];
        imageClassName?: string;
        imageWrapperClassName?: string;
        notesClassName?: string;
        forPrint?: boolean;
        hideCounter?: boolean;
        ImageComponent?: React.ComponentType<ImageProps>;
    } & Partial<ActorType> &
        Partial<PaperProps>
>;

export default function ActorCard({
    className,
    imagePosition,
    forPrint,
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
    hideCounter = false,
    ImageComponent = Image,
    children,
    bleedMm = 0,
    size = "Bridge",
    ...restProps
}: ActorCardProps) {
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "ActorCard relative bg-white text-kac-steel-dark rounded-lg print:rounded-none flex flex-col items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="flex-1 relative flex flex-col justify-center items-stretch p-3"
                style={{ margin: `${bleedMm}mm` }}
            >
                <div
                    className={twMerge(
                        "flex-1 relative rounded flex flex-col border-2 border-kac-steel h-16 z-10",
                        imageWrapperClassName
                    )}
                >
                    {imageUri ? (
                        <ImageComponent
                            src={imageUri}
                            className={twMerge("absolute w-full h-full rounded-sm", imageClassName)}
                            objectFit="cover"
                            objectPosition={imagePosition}
                        />
                    ) : (
                        <CharacterOutlineImage style={{}} className="h-full w-full text-kac-steel-light" />
                    )}
                    {toughness > 0 && !hideCounter && (
                        <DiceCounter
                            current={currentToughness}
                            total={toughness}
                            className="absolute right-2 bottom-2 bg-transparent opacity-80 text-kac-steel-light drop-shadow-[0_0_1px_rgba(0,0,0,1)] h-20"
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
                {children}
            </div>
        </PaperOrDiv>
    );
}

export const ActorCardBackFace = ({ className, children, size = "Bridge", ...restProps }: Partial<PaperProps>) => {
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "ActorCardBackFace gap-2 rounded-lg print:rounded-none bg-kac-monster flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div className="m-[3mm] relative flex flex-col justify-center items-center flex-1 p-3">
                <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                    <div
                        className={
                            "w-8/12 aspect-square rounded-full border-[0.2mm] border-kac-monster-dark absolute bg-kac-gold-light"
                        }
                    />
                    <Icon icon="doubleFaceMask" className={"text-kac-monster-dark h-10 relative z-1 mt-2"} />
                    <div className="font-kacBody text-kac-monster-dark text-xs text-center relative z-1">Actor</div>
                </div>
                {children}
            </div>
        </PaperOrDiv>
    );
};
