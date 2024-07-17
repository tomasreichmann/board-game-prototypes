import React, { CSSProperties, SVGProps } from "react";
import { twMerge } from "tailwind-merge";
import { JSONSchemaType } from "ajv";
import { ActorType } from "../../types";
import CharacterOutline from "../../media/character-outline.svg";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import Image, { ImageProps } from "../Image";
import Icon from "../Icon";
import DiceCounter from "../DiceCounter";
import { cardSizes } from "../../../../components/print/paperSizes";
import ComponentMetaType from "../generation/ComponentMetaType";
import Card, { CardBody, CardHeader } from "./Card";
// import "./ActorCard.css";

const CharacterOutlineImage = CharacterOutline as unknown as React.ComponentType<SVGProps<SVGElement>>;

export type ActorCardProps = React.PropsWithChildren<
    {
        slug?: string;
        deck?: string;
        className?: string;
        imagePosition?: CSSProperties["objectPosition"];
        imageFit?: CSSProperties["objectFit"];
        imageClassName?: string;
        imageWrapperClassName?: string;
        notesClassName?: string;
        forPrint?: boolean;
        hideCounter?: boolean;
        ImageComponent?: React.ComponentType<ImageProps>;
    } & Partial<ActorType> &
        Partial<PaperProps>
>;

export const actorCardSchema: JSONSchemaType<Omit<ActorCardProps, keyof PaperProps | "ImageComponent">> = {
    title: "ActorCard",
    type: "object",
    properties: {
        forPrint: {
            title: "For Print",
            type: "boolean",
            nullable: true,
            default: false,
        },

        slug: {
            title: "Slug",
            type: "string",
            nullable: true,
        },
        deck: {
            title: "Deck",
            type: "string",
            nullable: true,
        },
        name: {
            title: "Name",
            type: "string",
            nullable: true,
        },
        imageUri: {
            title: "Image",
            type: "string",
            nullable: true,
        },
        className: {
            title: "Class Name",
            type: "string",
            nullable: true,
            default: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
        },
        imageClassName: {
            title: "Image Class Name",
            type: "string",
            nullable: true,
        },
        imagePosition: {
            title: "Image Position",
            type: "string",
            nullable: true,
        },
        imageFit: {
            title: "Image Fit",
            type: "string",
            nullable: true,
        },
        imageWrapperClassName: {
            title: "Image Wrapper Class Name",
            type: "string",
            nullable: true,
        },
        occupation: {
            title: "Occupation",
            type: "string",
            nullable: true,
        },
        toughness: {
            title: "Toughness",
            type: "number",
            nullable: true,
        },
        currentToughness: {
            title: "Current Toughness",
            type: "number",
            nullable: true,
        },
        age: {
            title: "Age",
            type: "number",
            nullable: true,
        },
        gender: {
            title: "Gender",
            type: "string",
            nullable: true,
        },

        threat: {
            title: "Threat",
            type: "string",
            nullable: true,
        },
        reward: {
            title: "Reward",
            type: "string",
            nullable: true,
        },
        notes: {
            title: "Notes",
            type: "string",
            nullable: true,
        },
        notesClassName: {
            title: "Notes Class Name",
            type: "string",
            nullable: true,
        },
        hideCounter: {
            title: "Hide Counter",
            type: "boolean",
            nullable: true,
        },
    },
};

export const actorCardMeta: ComponentMetaType<ActorCardProps> = {
    componentName: "ActorCard",
    Component: ActorCard,
    description: "ActorCard",
    generationConfig: {
        props: {
            name: {
                llm: true,
            },
            imageUri: {
                llm: true,
                sd: true,
            },
            occupation: {
                llm: true,
            },
            reward: {
                llm: true,
            },
            threat: {
                llm: true,
            },
            notes: {
                llm: true,
            },
        },
    },
    schema: actorCardSchema as any, // TODO: fix,
};

export default function ActorCard({
    className,
    forPrint,
    name = "",
    deck,
    imageUri,
    imageClassName,
    imagePosition,
    imageFit = "contain",
    imageWrapperClassName,
    occupation = forPrint ? "" : null,
    toughness = 0,
    currentToughness = toughness,
    age,
    threat = forPrint ? "" : null,
    reward = forPrint ? "" : null,
    notes = forPrint ? "" : null,
    notesClassName,
    hideCounter = false,
    ImageComponent = Image,
    children,
    bleedMm = 0,
    size = "Bridge",
    ...restProps
}: ActorCardProps) {
    return (
        <Card className={twMerge("ActorCard", className)} {...restProps}>
            <CardHeader
                icon={imageUri ?? undefined}
                className="z-10"
                cornerIcon="/KAC/actor.png"
                deck={deck ?? undefined}
            ></CardHeader>
            <CardBody
                className="min-h-[40%] basis-auto"
                icon={imageUri ?? undefined}
                childrenClassName="shrink-0 basis-auto flex flex-col align-stretch text-left"
            >
                <div className={"text-sm flex flex-row gap-4 mt-1 mb-1"}>
                    <h2
                        className={twMerge(
                            "flex-1 text-md font-kacLogo leading-none mt-1",
                            toughness > 0 ? "text-left" : "text-center"
                        )}
                    >
                        {name || <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em]" />}
                        {age !== undefined ? ` (${age})` : ""}
                    </h2>
                    {toughness > 0 && (
                        <div className="text-sm border-dashed justify-end leading-none items-start text-kac-blood font-kacLogo flex flex-row">
                            <span className="mt-1">{toughness}&nbsp;</span>
                            <Icon icon="drop" className="h-5" />
                        </div>
                    )}
                </div>
                {occupation !== null && (
                    <h3 className="text-xs leading-tight flex flex-row gap-2">
                        <Icon icon="toolbox" className="h-5 flex-shrink-0 inline-block text-kac-steel-dark" />
                        {occupation ? (
                            <p className="flex-grow mt-1 text-left">{occupation}</p>
                        ) : (
                            <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] " />
                        )}
                    </h3>
                )}
                {threat !== null && (
                    <div className="text-xs text-kac-blood font-kacBody leading-tight flex flex-row gap-3">
                        <Icon icon="deathSkull" className="h-4 mt-1 flex-shrink-0 inline-block" />
                        {threat ? (
                            <p className="flex-grow text-xs font-kacBody mt-1 text-left">{threat}</p>
                        ) : (
                            <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em]" />
                        )}
                    </div>
                )}
                {reward !== null && (
                    <div className="text-xs text-kac-gold-darker font-kacBody leading-tight flex flex-row gap-3">
                        <Icon icon="chest" className="h-4 mt-1 flex-shrink-0 inline-block" />
                        {reward ? (
                            <p className="flex-grow text-xs font-kacBody mt-1 text-left">{reward}</p>
                        ) : (
                            <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em]" />
                        )}
                    </div>
                )}
                {notes !== null && (
                    <div className="border-kac-steel-light pt-1 relative flex flex-col overflow-hidden mt-1">
                        <div className="text-xs border-dashed text-kac-bone-dark leading-tight">
                            <Icon icon="scrollQuill" className="h-4 mr-3 inline-block" />
                            {notes.length > 0 ? (
                                <div className={twMerge("inline", notesClassName)}>{notes}</div>
                            ) : (
                                <>
                                    <div className="border-b-[0.2mm] border-kac-steel border-dashed ml-7"></div>
                                    <div className="border-b-[0.2mm] border-kac-steel border-dashed mt-[2em]"></div>
                                    <div className="border-b-[0.2mm] border-kac-steel border-dashed mt-[2em]"></div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export const ActorCardBackFace = ({ className, children, size = "Bridge", ...restProps }: Partial<PaperProps>) => {
    return (
        <Card
            className={twMerge("ActorCardBackFace", className)}
            {...restProps}
            backgroundImageUri="/KAC/actor-back-face.png"
        >
            <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                <div className="text-kac-cloth-lightest text-xs text-center relative z-1 font-kacLogo tracking-widest uppercase drop-shadow-md-heavy">
                    Actor
                </div>
            </div>
        </Card>
    );
};
