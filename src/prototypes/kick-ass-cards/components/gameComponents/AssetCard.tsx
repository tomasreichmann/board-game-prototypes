import React from "react";
import Ajv, { JSONSchemaType } from "ajv";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { AssetType } from "../../types";
import Icon, { IconType, iconMap } from "../Icon";
import RichText from "../RichText";
import Image from "../Image";
import { twMerge } from "tailwind-merge";
import ComponentMetaType from "../generation/ComponentMetaType";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";

type OptionalKeysType = "slug" | "cost" | "count";

export type AssetCardProps = React.PropsWithChildren<
    {
        className?: string;
        size?: PaperProps["size"];
        cornerIcon?: IconType;
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
            // enum: Object.keys(iconMap),
            nullable: true,
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
            // enum: Object.keys(iconMap),
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

const effectSizeClassNameMap: { [key in IconType]?: string } = {
    //SPECIAL: "h-24",
};

const outcomeColorClassNameMap: { [key in IconType]?: string } = {
    bandageRoll: "text-slate-400",
    plainDagger: "text-kac-steel-dark",
    grapple: "text-kac-cloth",
    smokeBomb: "text-kac-iron",
    lockpicks: "text-kac-iron-light",
    humanEar: "text-kac-skin-dark",
    paranoia: "text-kac-cloth",
    dart: "text-kac-cloth-dark",
    crossbow: "text-kac-steel-dark",
    caltrops: "text-kac-steel-dark",
    lanternFlame: "text-kac-gold",
    barrel: "text-kac-bone-dark",
    explosiveMaterials: "text-kac-fire",
    heartBottle: "text-kac-blood-light",
    pestleMortar: "text-kac-curse",
    poisonBottle: "text-kac-monster",
    bigDiamondRing: "text-kac-gold",
    blackBook: "text-kac-bone-dark",
    drinkMe: "text-kac-curse-light",
    key: "text-kac-gold-dark",
    prankGlasses: "text-kac-skin-dark",
    ropeCoil: "text-kac-bone-dark",
    rupee: "text-kac-fire-dark",
    scrollQuill: "text-kac-bone",
    swapBag: "text-kac-bone-dark",
    tiedScroll: "text-kac-bone",
    toolbox: "text-kac-bone-dark",
    magicPotion: "text-kac-bone-dark",
    woodenCrate: "text-kac-bone-dark",
    slingshot: "text-kac-bone-dark",
};

const isIcon = (maybeIcon: string): maybeIcon is IconType => maybeIcon in iconMap;

export default function AssetCard({
    className,
    iconClassName,
    cornerIcon = "chest",
    cornerIconClassName,
    effectClassName,
    slug,
    title,
    icon,
    effect,
    children,
    bleedMm = 0,
    size = "Mini European",
    ...restProps
}: AssetCardProps) {
    const graphics = isIcon(icon) ? (
        <Icon
            icon={icon}
            className={twMerge(
                "max-h-fit",
                outcomeColorClassNameMap[icon] || "text-iron-light",
                effectSizeClassNameMap[icon] || "h-16",
                iconClassName
            )}
        />
    ) : (
        <div className="flex-1 relative flex flex-col items-center justify-center">
            <Image
                className={twMerge("absolute left-0 top-0 h-full w-full max-h-24", iconClassName)}
                objectFit="contain"
                src={icon}
            />
        </div>
    );
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "AssetCard bg-white rounded-lg print:rounded-none flex flex-col items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="flex-1 relative flex flex-col justify-center items-stretch p-3"
                style={{ margin: `${bleedMm}mm` }}
            >
                <div className="flex flex-row items-center gap-2 mb-2">
                    <IconOrImage
                        icon={icon}
                        className={twMerge("h-5", effectClassName || "text-kac-iron-light object-contain")}
                    />
                    <div className="flex-1 text-slate-400 text-xs">{slug}</div>
                    <Icon
                        icon={cornerIcon}
                        className={twMerge("text-kac-gold-dark text-opacity-50 h-4", cornerIconClassName)}
                    />
                </div>

                {graphics}

                <div className="flex flex-col items-center justify-end gap-1 text-kac-iron-light mb-2 mt-2">
                    <div className="font-kacHeading text-kac-iron-light text-sm text-center leading-none">{title}</div>
                </div>
                <div
                    className={twMerge(
                        "text-xs text-center text-kac-iron-light leading-tight min-h-[6em]",
                        effectClassName
                    )}
                >
                    <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{effect}</RichText>
                </div>
                {children}
            </div>
        </PaperOrDiv>
    );
}

export const AssetCardBackFace = ({
    className,
    children,
    size = "Mini European",
    ...restProps
}: Partial<PaperProps>) => {
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "AssetCardBackFace gap-2 rounded-lg print:rounded-none bg-kac-gold-dark flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div className="m-[3mm] relative flex flex-col justify-center items-center flex-1 p-3">
                <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                    <div
                        className={
                            "w-8/12 aspect-square rounded-full border-[0.2mm] border-kac-gold-darker absolute bg-kac-gold-light"
                        }
                    />
                    <Icon icon="chest" className={"text-kac-gold-darker h-10 relative z-1 mt-2"} />
                    <div className="font-kacBody text-kac-gold-darker text-xs text-center relative z-1">Asset</div>
                </div>
                {children}
            </div>
        </PaperOrDiv>
    );
};
