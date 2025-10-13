import React from "react";
import { twMerge } from "tailwind-merge";
import { StuntType } from "../../types";
import RichText from "../RichText";
import Card, { CardBody, CardHeader, CardProps } from "./Card";
import { H2, H3 } from "../content/Text";
import { LayeredCardBackFace, LayeredCardBackFaceProps } from "./LayeredCard";
import twm from "@/utils/twm";

export type StuntCardProps = React.PropsWithChildren<
    Partial<CardProps> &
        Omit<StuntType, "count"> & {
            classNames?: {
                title?: string;
                effect?: string;
            };
        }
>;

export default function StuntCard({
    className,
    classNames = {},
    size = "Mini European",
    icon: imageUri,
    slug,
    deck,
    title,
    icon,
    requirements,
    effect,
    backgroundImageUri = "/mighty-decks/background/paper-custom-with-image-shadow.png",
    children,
    ...restProps
}: StuntCardProps) {
    return (
        <Card className={twMerge("LayeredCard", className)} backgroundImageUri={backgroundImageUri} {...restProps}>
            <div className="relative h-[24px]">
                <CardHeader
                    icon={imageUri ?? undefined}
                    className="z-10 relative"
                    cornerIcon="/mighty-decks/types/stunt.png"
                    deck={deck ?? undefined}
                />
            </div>
            <CardBody
                childrenClassName="h-64 gap-2 flex flex-col shrink-0 min-h-min"
                icon={imageUri ?? undefined}
                iconClassName="h-24"
            >
                <H3 className={twMerge("leading-none text-kac-iron-light text-center h-[1em]", classNames.title)}>
                    {title}
                </H3>
                <div
                    className={twMerge(
                        "text-xs text-center text-kac-iron-light text-balance h-[9em] leading-tight tracking-tight flex flex-col justify-start items-center gap-2",
                        classNames.effect
                    )}
                >
                    <div className="font-bold text-kac-blood text-balance">
                        {requirements && (
                            <RichText commonComponentProps={{ className: "inline-block mt-1 -mb-1" }}>
                                {requirements}
                            </RichText>
                        )}
                    </div>
                    {effect && (
                        <div className="text-balance">
                            <RichText commonComponentProps={{ className: "inline-block -my-1" }}>{effect}</RichText>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
export const StuntCardBackFace = ({
    className,
    label = "Stunt",
    labelClassName,
    size = "54x86",
    iconUri = "/mighty-decks/types/stunt.png",
    backgroundImageUri = "/mighty-decks/background/card-backface2.png",
    ...restProps
}: Partial<LayeredCardBackFaceProps>) => {
    return (
        <LayeredCardBackFace
            {...restProps}
            size={size}
            label={label}
            labelClassName={twm("text-[#f9e8aa]", labelClassName)}
            iconUri={iconUri}
            backgroundImageUri={backgroundImageUri}
        />
    );
};
