import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { PaperProps } from "../../../../components/print/Paper/Paper";
import Image, { ImageProps } from "../Image";
import Card, { CardBody, CardHeader, CardProps } from "./Card";
import { H2, H3 } from "../content/Text";
import twm from "@/utils/twm";

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
        classNames?: {
            noun?: string;
            adjective?: string;
            nounEffect?: string;
            adjectiveEffect?: string;
            imageOverlay?: string;
        };
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
    classNames = {},
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
    backgroundImageUri = "/mighty-decks/background/paper-custom-with-image-shadow.png",
    imageWrapperClassName,
    ImageComponent = Image,
    children,
    ...restProps
}: LayeredCardProps) {
    return (
        <Card className={twMerge("LayeredCard", className)} backgroundImageUri={backgroundImageUri} {...restProps}>
            <div className="relative h-[24px]">
                {(imageUri || nounCornerIcon || nounDeck) && (
                    <CardHeader
                        icon={imageUri ?? undefined}
                        className="z-10 relative"
                        cornerIcon={nounCornerIcon ?? undefined}
                        deck={nounDeck ?? undefined}
                    />
                )}
                <div className="absolute top-full left-0 right-0 h-[24px] -rotate-90 origin-right translate-x-[-4px] translate-y-[-8px]">
                    <CardHeader
                        icon={undefined}
                        className="z-10 "
                        cornerIcon={adjectiveCornerIcon ?? undefined}
                        deck={adjectiveDeck ?? undefined}
                    />
                </div>
            </div>
            <CardBody
                childrenClassName="h-64 gap-2 flex flex-col shrink-0 min-h-min"
                icon={imageUri ?? undefined}
                iconClassName="h-24"
                iconContent={
                    imageOverlayUri ? (
                        <ImageComponent
                            src={imageOverlayUri}
                            className={twm("absolute h-full w-full", classNames.imageOverlay)}
                            objectFit="contain"
                            style={{
                                maskImage:
                                    "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 10%)",
                            }}
                        />
                    ) : undefined
                }
            >
                <H3 className={twMerge("leading-none text-kac-iron-light text-center h-[1em]", classNames.adjective)}>
                    {adjective}
                </H3>
                <H3 className={twMerge("leading-none text-kac-iron-light text-center h-[1em]", classNames.noun)}>
                    {noun}
                </H3>
                <div
                    className={twMerge(
                        "text-xs text-center text-kac-iron-light text-balance h-[5em] leading-tight tracking-tight flex flex-col justify-end items-center",
                        classNames.nounEffect
                    )}
                >
                    {nounEffect}
                </div>
                <div
                    className={twMerge(
                        "text-xs text-center text-kac-iron-light text-balance h-[2.5em] leading-tight tracking-tight",
                        classNames.adjectiveEffect
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
    iconUri?: string;
    label?: React.ReactNode;
    labelClassName?: string;
} & Partial<PaperProps>;

export const LayeredCardBackFace = ({
    className,
    label,
    labelClassName,
    size = "Bridge",
    iconUri = "/mighty-decks/types/asset.png",
    backgroundImageUri = "/mighty-decks/background/card-backface2.png",
    ...restProps
}: LayeredCardBackFaceProps) => {
    return (
        <Card
            className={twMerge("LayeredCardBackFace", className)}
            {...restProps}
            backgroundImageUri={backgroundImageUri}
        >
            <Image
                src={iconUri}
                className="absolute bottom-[35%] h-[50%] left-0 right-0"
                objectFit="contain"
                objectPosition="center center"
            />
            <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                <H2
                    className={twm(
                        "text-kac-cloth-lightest text-2xl text-center relative z-1 drop-shadow-md-heavy",
                        labelClassName
                    )}
                    style={{
                        textShadow: `0px 2px 0 black`,
                    }}
                >
                    {label}
                </H2>
            </div>
        </Card>
    );
};
