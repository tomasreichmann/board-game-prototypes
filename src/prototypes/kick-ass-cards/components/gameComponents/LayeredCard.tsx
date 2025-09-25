import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { ActorType } from "../../types";
import { PaperProps } from "../../../../components/print/Paper/Paper";
import Image, { ImageProps } from "../Image";
import Icon from "../Icon";
import Card, { CardBody, CardHeader, CardProps } from "./Card";
import { H2 } from "../content/Text";

export type LayeredCardProps = React.PropsWithChildren<
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
        Partial<CardProps>
>;

export default function LayeredCard({
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
    ...restProps
}: LayeredCardProps) {
    return (
        <Card className={twMerge("LayeredCard", className)} {...restProps}>
            <CardHeader
                icon={imageUri ?? undefined}
                className="z-10"
                cornerIcon="/mighty-decks/actor.png"
                deck={deck ?? undefined}
            ></CardHeader>
            Adjective Noun Noun effect Adjective effect
        </Card>
    );
}

export const LayeredCardBackFace = ({ className, children, size = "Bridge", ...restProps }: Partial<PaperProps>) => {
    return (
        <Card
            className={twMerge("LayeredCardBackFace", className)}
            {...restProps}
            backgroundImageUri="/mighty-decks/actor-back-face.png"
        >
            <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                <H2 className="text-kac-cloth-lightest text-2xl text-center relative z-1 drop-shadow-md-heavy">
                    Actor
                </H2>
            </div>
        </Card>
    );
};
