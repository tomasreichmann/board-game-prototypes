import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { PaperProps } from "../../../../components/print/Paper/Paper";
import Image, { ImageProps } from "../Image";
import Card, { CardBody, CardHeader, CardProps } from "./Card";
import { H2, H3 } from "../content/Text";

export type LayeredCardDataType = {
    noun?: React.ReactNode;
    nounEffect?: React.ReactNode;
    nounDeck?: string;
    nounCornerIcon?: string;
    adjective?: React.ReactNode;
    adjectiveEffect?: React.ReactNode;
    adjectiveDeck?: string;
    adjectiveCornerIcon?: string;
    imageUri?: CSSProperties["backgroundImage"];
    imageOverlayUri?: CSSProperties["backgroundImage"];
    backFaceProps?: LayeredCardBackFaceProps;
};

export type LayeredCardProps = React.PropsWithChildren<
    {
        slug?: string;
        className?: string;
        imagePosition?: CSSProperties["objectPosition"];
        imageFit?: CSSProperties["objectFit"];
        imageClassName?: string;
        imageWrapperClassName?: string;
        ImageComponent?: React.ComponentType<ImageProps>;
    } & LayeredCardDataType &
        Partial<CardProps>
>;

export default function LayeredCard({
    className,
    noun = " ",
    nounEffect = " ",
    nounDeck = " ",
    nounCornerIcon,
    adjective = " ",
    adjectiveEffect = " ",
    adjectiveDeck,
    adjectiveCornerIcon,
    imageUri,
    imageOverlayUri,
    imageClassName,
    imagePosition,
    imageFit = "contain",
    imageWrapperClassName,
    ImageComponent = Image,
    children,
    ...restProps
}: LayeredCardProps) {
    return (
        <Card className={twMerge("LayeredCard", className)} {...restProps}>
            <CardHeader
                icon={imageUri ?? undefined}
                className="z-10 relative h-[24px]"
                cornerIcon={nounCornerIcon ?? undefined}
                deck={nounDeck ?? undefined}
            ></CardHeader>
            <CardHeader
                icon={undefined}
                className="z-10 absolute top-8 left-0 right-0"
                cornerIcon={adjectiveCornerIcon ?? undefined}
                deck={adjectiveDeck ?? undefined}
            ></CardHeader>
            <CardBody
                childrenClassName="h-64 gap-2 flex flex-col shrink-0 min-h-min"
                icon={imageUri ?? undefined}
                iconClassName="h-24"
                iconContent={
                    imageOverlayUri ? (
                        <ImageComponent src={imageOverlayUri} className="absolute h-full w-full" objectFit="contain" />
                    ) : undefined
                }
            >
                <H3 className={twMerge("leading-none text-kac-iron-light text-center h-[1em]")}>{adjective}</H3>
                <H3 className={twMerge("leading-none text-kac-iron-light text-center h-[1em]")}>{noun}</H3>
                <div
                    className={twMerge(
                        "text-xs text-center text-kac-iron-light text-balance h-[5em] leading-tight tracking-tight flex flex-col justify-end items-center"
                    )}
                >
                    {nounEffect}
                </div>
                <div
                    className={twMerge(
                        "text-xs text-center text-kac-iron-light text-balance h-[2.5em] leading-tight tracking-tight"
                    )}
                >
                    {adjectiveEffect}
                </div>
            </CardBody>
        </Card>
    );
}

export type LayeredCardBackFaceProps = {
    backgroundImageUri?: string;
    label?: React.ReactNode;
} & Partial<PaperProps>;

export const LayeredCardBackFace = ({
    className,
    label,
    size = "Bridge",
    backgroundImageUri,
    ...restProps
}: LayeredCardBackFaceProps) => {
    return (
        <Card
            className={twMerge("LayeredCardBackFace", className)}
            {...restProps}
            backgroundImageUri={backgroundImageUri}
        >
            <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                <H2 className="text-kac-cloth-lightest text-2xl text-center relative z-1 drop-shadow-md-heavy">
                    {label}
                </H2>
            </div>
        </Card>
    );
};
