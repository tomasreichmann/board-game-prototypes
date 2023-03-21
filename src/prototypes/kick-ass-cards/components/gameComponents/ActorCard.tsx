import React, { CSSProperties, SVGProps } from "react";
import clsx from "clsx";
import { PlayerCharacterType } from "../../types";
import CharacterOutline from "../../media/character-outline.svg";
import Icon from "../Icon";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import Image, { ImageProps } from "../Image";
// import "./ActorCard.css";

const CharacterOutlineImage = CharacterOutline as unknown as React.ComponentType<SVGProps<SVGElement>>;

export type ActorCardProps = React.PropsWithChildren<
    {
        className?: string;
        size?: PaperProps["size"];
        imagePosition?: CSSProperties["backgroundPosition"];
        notesClassName?: string;
        ImageComponent?: React.ComponentType<ImageProps>;
    } & PlayerCharacterType
>;

export default function ActorCard({
    className,
    imagePosition,
    size,
    name = "",
    imageUri,
    occupation = "",
    toughness = 0,
    notesClassName = "inline text-sm",
    notes = "",
    ImageComponent = Image,
    children,
}: ActorCardProps) {
    return (
        <PaperOrDiv
            size={size}
            className={clsx("ActorCard relative bg-white p-5 flex flex-column gap-5 text-kac-steel-dark", className)}
        >
            <div className="flex-1 basis-auto flex flex-col gap-2">
                <div className="relative rounded flex-grow flex flex-col text-kac-steel-light border-2 border-kac-steel max-h-[33%]">
                    {imageUri ? (
                        <ImageComponent
                            src={imageUri}
                            className="w-full h-full rounded-sm"
                            objectFit="cover"
                            objectPosition={imagePosition}
                        />
                    ) : (
                        <CharacterOutlineImage style={{}} className="h-full w-full" />
                    )}
                </div>
                <div>
                    <div className="text-sm flex flex-row gap-4">
                        <h2 className="flex-1 text-lg font-kacHeading leading-tight flex flex-row gap-2">
                            <Icon icon="fountainPen" className="h-5 flex-shrink-0 inline-block text-kac-steel" />
                            {name || <div className="border-b-2 border-dashed mt-[2em]" />}
                        </h2>
                        {toughness > 0 && (
                            <div className="text-sm border-dashed justify-end text-kac-blood font-kacHeading flex flex-row">
                                {toughness}&nbsp;
                                <Icon icon="drop" className="h-4" />
                            </div>
                        )}
                    </div>
                    {occupation !== null && (
                        <h2 className="text-sm flex flex-row gap-2">
                            <Icon icon="toolbox" className="h-4 mr-1 flex-shrink-0 inline-block text-kac-steel" />
                            {occupation || <div className="border-b-2 border-dashed mt-[2em] " />}
                        </h2>
                    )}
                </div>
                {notes !== null && (
                    <div className="flex-1 border-kac-steel-light pt-1 relative flex flex-col overflow-hidden">
                        <div className="text-sm border-dashed text-kac-bone-dark">
                            <Icon icon="scrollQuill" className="h-4 mr-1 inline-block " />
                            {notes.length > 0 ? (
                                <div className={notesClassName}>{notes}</div>
                            ) : (
                                <>
                                    <div className="border-b-2 border-dashed ml-7"></div>
                                    <div className="border-b-2 border-dashed mt-[2em]"></div>
                                    <div className="border-b-2 border-dashed mt-[2em]"></div>
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
