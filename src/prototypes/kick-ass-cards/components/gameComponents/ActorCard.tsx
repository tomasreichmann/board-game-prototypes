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
                    <div className="text-sm border-dashed flex flex-row justify-between gap-4">
                        <div>
                            <Icon icon="fountainPen" className="h-4 inline-block" />
                            &ensp;name
                        </div>
                        {toughness > 0 && (
                            <div className="text-sm border-dashed justify-end text-kac-blood font-kacHeading flex flex-row">
                                {toughness}&nbsp;
                                <Icon icon="drop" className="h-4" />
                            </div>
                        )}
                    </div>
                    <h2 className={clsx("text-lg font-kacHeading", !name && "border-b-2, border-dashed min-h-8")}>
                        {name}
                    </h2>
                </div>
                {occupation !== null && (
                    <div>
                        <div className="text-sm border-dashed">
                            <Icon icon="toolbox" className="h-4 inline-block" />
                            &ensp;occupation
                        </div>
                        <h2
                            className={clsx(
                                "text-sm font-kacHeading",
                                !occupation && "border-b-2, border-dashed min-h-8"
                            )}
                        >
                            {occupation}
                        </h2>
                    </div>
                )}
                {notes !== null && (
                    <div className="flex-1 border-kac-steel-light pt-1 relative">
                        <div className="text-sm border-dashed text-kac-bone-dark">
                            <Icon icon="scrollQuill" className="h-4 inline-block" />
                            &ensp;notes
                        </div>
                        <div className="min-h-16 flex-1 text-sm">{notes}</div>
                        {notes.length === 0 && (
                            <>
                                <div className="border-b-2 border-dashed absolute top-[2em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[4em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[6em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[8em] left-0 w-full"></div>
                                <div className="border-b-2 border-dashed absolute top-[10em] left-0 w-full"></div>
                            </>
                        )}
                    </div>
                )}
            </div>
            {children}
        </PaperOrDiv>
    );
}
