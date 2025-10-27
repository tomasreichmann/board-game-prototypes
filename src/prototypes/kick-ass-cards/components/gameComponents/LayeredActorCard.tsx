import React, { CSSProperties } from "react";
import Image, { ImageProps } from "../Image";
import twm from "@/utils/twm";
import LayeredCard, { LayeredCardBackFace, LayeredCardBackFaceProps, LayeredCardProps } from "./LayeredCard";
import { TacticalRoleType, tacticalModifierMap, tacticalRolesMap } from "../../data/tactical-roles";
import { IconOrImage, IconOrImageProps } from "@/components/Icon/IconOrImage";
import { IconProps } from "../Icon";

export type LayeredActorCardProps = React.PropsWithChildren<
    {
        slug?: string;
        className?: string;
        imagePosition?: CSSProperties["objectPosition"];
        imageFit?: CSSProperties["objectFit"];
        imageClassName?: string;
        imageWrapperClassName?: string;
        ImageComponent?: React.ComponentType<ImageProps>;
        role?: TacticalRoleType;
        modifier?: TacticalRoleType;
    } & Partial<LayeredCardProps>
>;

const sampleRole = tacticalRolesMap.champion;
const sampleModifier = tacticalModifierMap.alpha;

const TextWithIcons = ({ text, iconProps }: { text: string; iconProps?: Partial<IconOrImageProps<IconProps>> }) => {
    const fragments = text.split(/(\[[^\]]+\])/g).filter((fr) => fr !== "");
    return (
        <>
            {fragments.map((fragment, fragmentIndex) => {
                // icon can have a number at the end to indicate multiples like [stuck2]
                const iconNameMatch = fragment.match(/^\[([a-zA-Z_]+)(\d*)\]$/);
                if (iconNameMatch) {
                    const [iconName, iconCountString = "1"] = iconNameMatch.slice(1);
                    console.log("iconNameMatch", iconNameMatch, iconName, iconCountString);
                    const iconCount = parseInt(iconCountString || "1", 10);
                    if (isNaN(iconCount) || iconCount < 1) return null;
                    const icon = `/mighty-decks/textIcons/${iconName}.png`;
                    return (
                        <React.Fragment key={fragmentIndex}>
                            {Array.from({ length: iconCount }).map((_, iconIndex) => {
                                const isFirst = iconIndex === 0;
                                const isLast = iconIndex === iconCount - 1;
                                const leftMargin = isFirst ? "" : "ml-[-4px]";
                                const rightMargin = isLast ? "" : "mr-[-4px]";
                                return (
                                    <IconOrImage
                                        key={iconIndex}
                                        {...iconProps}
                                        className={twm(
                                            "inline-block align-center",
                                            iconProps?.className,
                                            leftMargin,
                                            rightMargin
                                        )}
                                        icon={icon}
                                    />
                                );
                            })}
                        </React.Fragment>
                    );
                }
                return (
                    <React.Fragment key={fragmentIndex}>
                        {fragment.startsWith("[") && fragment.endsWith("]") ? (
                            <IconOrImage
                                {...iconProps}
                                className={twm("inline-block align-center", iconProps?.className)}
                                icon={`/mighty-decks/textIcons/${fragment.substring(1, fragment.length - 1)}.png`}
                            />
                        ) : (
                            fragment
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
};

const getIconTextLength = (text: string) => {
    // get all icons
    const matches = text.split(/(\[[^\]]+\])/g).filter((fr) => fr !== "");
    return matches.reduce((length, fragment) => {
        const iconNameMatch = fragment.match(/^\[([a-zA-Z_]+)(\d*)\]$/);
        if (iconNameMatch) {
            const [_, iconCountString = "1"] = iconNameMatch.slice(1);
            const iconCount = parseInt(iconCountString || "1", 10);
            if (isNaN(iconCount) || iconCount < 1) return length;
            return length + iconCount;
        }
        return length + fragment.length * 0.25;
    }, 0);
};

const renderAction = (
    action: NonNullable<TacticalRoleType["actions"]>[number] | null,
    actionIndex: number,
    iconProps: Partial<IconOrImageProps<IconProps>> = {},
    lineSize?: string,
    iconSize?: string
) => {
    if (!action) return null;
    if (typeof action === "string") {
        return (
            <div key={actionIndex} className={twm("flex flex-row justify-end flex-wrap items-center", lineSize)}>
                <TextWithIcons
                    text={action}
                    iconProps={
                        getIconTextLength(action) > 5
                            ? { ...iconProps, className: twm(iconProps.className, "mx-[-2px]") }
                            : iconProps
                    }
                />
            </div>
        );
    }
    const { type, effect, splash, range, count } = action;
    const typeIcon = `/mighty-decks/textIcons/${type}.png`;
    return (
        <div key={actionIndex} className={twm("flex flex-row justify-end flex-wrap items-center", lineSize)}>
            {count && count > 1 && <>{count}x</>}
            <IconOrImage icon={typeIcon} className={twm("flex-shrink-0 inline-block", iconSize)} />
            {effect.map((effectOrJoin, effectIndex) => {
                if (typeof effectOrJoin === "string") {
                    return <span key={effectIndex}>{effectOrJoin}</span>;
                }
                const { amount, effectType } = effectOrJoin;
                const effectTypeIcon = `/mighty-decks/textIcons/${effectType}.png`;
                return (
                    <React.Fragment key={effectIndex}>
                        {Array.from({ length: amount }).map((_, iconIndex) => {
                            const isFirst = iconIndex === 0;
                            const isLast = iconIndex === amount - 1;
                            const leftMargin = isFirst ? "" : "ml-[-4px]";
                            const rightMargin = isLast ? "" : "mr-[-4px]";
                            return (
                                <IconOrImage
                                    key={iconIndex}
                                    icon={effectTypeIcon}
                                    className={twm("flex-shrink-0 inline-block", leftMargin, rightMargin, iconSize)}
                                />
                            );
                        })}
                    </React.Fragment>
                );
            })}
            {splash && (
                <IconOrImage
                    icon="/mighty-decks/textIcons/splash.png"
                    className={twm("flex-shrink-0 inline-block", iconSize)}
                />
            )}
            {range && (
                <>
                    <IconOrImage
                        icon="/mighty-decks/textIcons/range.png"
                        className={twm("flex-shrink-0 inline-block", iconSize)}
                    />
                    {range}
                </>
            )}
        </div>
    );
};

const getLayeredCardProps = (
    role?: TacticalRoleType,
    modifier?: TacticalRoleType,
    lineSize: string = "h-5 flex flex-row items-center",
    iconSize: string = "h-5"
): LayeredCardProps => {
    const props: LayeredCardProps = {};
    const nounEffectLeft: React.ReactNode[] = [];
    const nounEffectRight: React.ReactNode[] = [];
    const iconProps = { className: iconSize };
    if (role) {
        props.noun = role.name;
        props.nounDeck = role.deck;
        props.nounCornerIcon = "/mighty-decks/types/actor.png";
        nounEffectLeft.push(
            <>
                <div key="toughness" className={twm(lineSize, "justify-end")}>
                    {role.toughness && (
                        <TextWithIcons
                            text={role.toughness}
                            iconProps={
                                role.toughness.split("[").length - 1 > 5
                                    ? { ...iconProps, className: twm(iconProps.className, "ml-[-2px]") }
                                    : iconProps
                            }
                        />
                    )}
                </div>
                {(role.actions ?? [null, null]).map((action, index) =>
                    renderAction(action, index, iconProps, lineSize, iconSize)
                )}
            </>
        );
    }
    if (modifier) {
        props.adjective = modifier.name;
        props.adjectiveDeck = modifier.deck;
        props.adjectiveEffect = modifier.special ? (
            <span className="font-[600]">
                <TextWithIcons
                    text={modifier.special}
                    iconProps={{ ...iconProps, className: twm(iconProps.className, "mx-[-2px]") }}
                />
            </span>
        ) : undefined;
        props.adjectiveCornerIcon = "/mighty-decks/types/actor.png";
        nounEffectRight.push(
            <div key="toughnessBonus" className={lineSize}>
                {modifier.toughnessBonus && <TextWithIcons text={modifier.toughnessBonus} iconProps={iconProps} />}
            </div>
        );
        props.imageOverlayUri = modifier.imageOverlayUri;
        nounEffectRight.push(
            <>
                {(modifier.actionBonuses ?? [null, null]).map((actionBonus, index) =>
                    actionBonus ? (
                        <div key={"bonus-" + index} className={lineSize}>
                            <TextWithIcons
                                key={index}
                                text={actionBonus}
                                iconProps={{ ...iconProps, className: twm(iconProps.className, "mx-[-2px]") }}
                            />
                        </div>
                    ) : (
                        <div key={"no-bonus-" + index} className={lineSize} />
                    )
                )}
            </>
        );
    }
    props.nounEffect = (
        <div className="w-full flex flex-row gap-2 flex-grow font-[600]">
            <div className="flex-grow basis-2/3 text-right">{nounEffectLeft}</div>
            <div className="flex-grow basis-1/3 text-left">{nounEffectRight}</div>
        </div>
    );
    return props;
};

export default function LayeredActorCard({
    className,
    classNames = {},
    slug,
    imageUri,
    role,
    modifier,
    children,
    ...restProps
}: LayeredActorCardProps) {
    const props = getLayeredCardProps(role, modifier);

    return (
        <LayeredCard
            imageUri={imageUri}
            className={twm("LayeredActorCard", className)}
            classNames={{ imageOverlay: "scale-[150%] translate-y-[-18%]", ...classNames }}
            {...props}
            {...restProps}
        />
    );
}

export type LayeredActorCardBackFaceProps = LayeredCardBackFaceProps;

export const LayeredActorCardBackFace = LayeredCardBackFace;
