import React from "react";
import { JSONSchemaType } from "ajv";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { AssetType } from "../../types";
import { IconType } from "../Icon";
import RichText from "../RichText";
import { twMerge } from "tailwind-merge";
import ComponentMetaType from "../generation/ComponentMetaType";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import { allSizes } from "../../../../components/print/paperSizes";
import Card from "./Card";
import { H2 } from "../content/Text";

type OptionalKeysType = "slug" | "cost" | "count";

export type AssetCardProps = React.PropsWithChildren<
    {
        className?: string;
        size?: PaperProps["size"];
        cornerIcon?: string;
        cornerIconClassName?: string;
        effectClassName?: string;
        iconClassName?: string;
    } & Omit<AssetType, OptionalKeysType> &
        Partial<Pick<AssetType, OptionalKeysType> & Partial<PaperProps>>
>;

export const assetCardSchema: JSONSchemaType<Omit<AssetCardProps, keyof PaperProps>> = {
    title: "AssetCard",
    type: "object",
    properties: {
        cornerIcon: {
            title: "Corner Icon",
            type: "string",
            nullable: true,
        },
        className: {
            title: "class Name",
            type: "string",
            nullable: true,
            default: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
        },
        cornerIconClassName: {
            title: "Corner Icon Class Name",
            type: "string",
            nullable: true,
        },
        effectClassName: {
            title: "Effect Class Name",
            type: "string",
            nullable: true,
        },
        iconClassName: {
            title: "Icon Class Name",
            type: "string",
            nullable: true,
        },
        slug: {
            title: "Slug",
            type: "string",
            nullable: true,
        },
        title: {
            title: "Title",
            type: "string",
        },
        icon: {
            title: "Icon",
            type: "string",
        },
        effect: {
            title: "Effect",
            type: "string",
        },
        cost: {
            title: "Cost",
            type: "integer",
            nullable: true,
        },
        deck: {
            title: "Deck",
            type: "string",
            nullable: true,
        },
        count: {
            title: "Count",
            type: "integer",
            nullable: true,
        },
    },
    required: ["title"],
};

export const assetCardMeta: ComponentMetaType<AssetCardProps> = {
    componentName: "AssetCard",
    Component: AssetCard,
    description: "AssetCard",
    generationConfig: {
        props: {
            title: {
                llm: true,
            },
            icon: {
                llm: true,
                sd: true,
            },
            effect: {
                llm: true,
            },
        },
    },
    schema: assetCardSchema as JSONSchemaType<AssetCardProps>,
};

export default function AssetCard({
    className,
    iconClassName,
    cornerIcon = "/mighty-decks/backpack.png",
    cornerIconClassName,
    effectClassName,
    slug,
    title,
    icon,
    effect,
    children,
    size = "Mini European",
    deck,
    ...restProps
}: AssetCardProps) {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;
    const isSmSize = allSizes[size].mm[1] < 70;
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "AssetCard bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch font-kacBody",
                className
            )}
            {...restProps}
        >
            <div
                className="relative flex-1 flex flex-col justify-center items-stretch"
                style={{
                    margin: `-${bleedTopMm}mm -${bleedRightMm}mm -${bleedBottomMm}mm -${bleedLeftMm}mm`,
                    padding: `${bleedTopMm}mm ${bleedRightMm}mm ${bleedBottomMm}mm ${bleedLeftMm}mm`,
                }}
            >
                <img
                    src="/mighty-decks/paper.png"
                    alt=""
                    className="absolute left-0 top-0 w-full h-full object-cover max-w-none"
                />
                <div className="flex-1 relative flex flex-col justify-center items-stretch p-3 gap-2 z-10">
                    <div className="flex flex-row items-center gap-1">
                        <IconOrImage icon={icon} className="h-6 text-kac-steel-dark" />
                        {/* <div className="flex-1 text-kac-iron-light text-center text-xs invisible">{slug}</div> */}
                        <div className="flex-1 text-kac-bone-dark text-right text-xs leading-none">{deck}</div>
                        <IconOrImage
                            icon={cornerIcon}
                            className={twMerge("text-kac-bone-dark text-opacity-50 h-4", cornerIconClassName)}
                        />
                    </div>
                    <div className="flex-1 basis-[60%] flex flex-col items-center justify-end gap-2">
                        <div className="flex-1 relative self-stretch mx-[10%] my-[5%]">
                            <IconOrImage icon={icon} className="absolute w-full h-full object-contain drop-shadow-lg" />
                        </div>
                        <H2
                            className={twMerge("text-kac-gold-darker text-center mb-1 leading-none")}
                            size={isSmSize ? "xl" : "2xl"}
                        >
                            {title}
                        </H2>
                    </div>
                    <div
                        className={twMerge(
                            "flex-1 basis-[40%] text-xs text-center min-h-[6em] text-kac-iron-light text-balance",
                            isSmSize && "text-[0.6rem]",
                            "leading-tight tracking-tight"
                        )}
                    >
                        <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{effect}</RichText>
                    </div>
                    {children}
                </div>
            </div>
        </PaperOrDiv>
    );
}

export const AssetCardBackFace = ({ icon, deck, ...restProps }: Partial<AssetCardProps>) => {
    return (
        <Card {...restProps} backgroundImageUri="/mighty-decks/asset-back-face.png">
            <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                <H2 className="text-kac-gold-light text-2xl text-center relative z-1 drop-shadow-md-heavy">Asset</H2>
            </div>
        </Card>
    );
};
