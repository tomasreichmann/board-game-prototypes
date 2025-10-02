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
    } & Partial<TacticalRoleType> &
        Partial<LayeredCardProps>
>;

const sampleRole = tacticalRolesMap.champion;
const sampleModifier = tacticalModifierMap.alpha;

const TextWithIcons = ({ text, iconProps }: { text: string; iconProps?: Partial<IconOrImageProps<IconProps>> }) => {
    const fragments = text.split(/(\[[^\]]+\])/g).filter((fr) => fr !== "");
    return (
        <>
            {fragments.map((fragment, i) => (
                <React.Fragment key={i}>
                    {fragment.startsWith("[") && fragment.endsWith("]") ? (
                        <IconOrImage
                            {...iconProps}
                            className={twm("inline-block align-center -my-1", iconProps?.className)}
                            icon={`/mighty-decks/textIcons/${fragment.substring(1, fragment.length - 1)}.png`}
                        />
                    ) : (
                        fragment
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

const renderAction = (
    action: NonNullable<TacticalRoleType["actions"]>[number] | null,
    attackIndex: number,
    lineSize?: string,
    iconSize?: string
) => {
    if (!action) return null;
    const { type, effect, splash, range, count } = action;
    const typeIcon = `/mighty-decks/textIcons/${type}.png`;
    return (
        <div key={attackIndex} className={twm("flex flex-row justify-end flex-wrap items-center font-bold", lineSize)}>
            {count && count > 1 && <>{count}x</>}
            <IconOrImage icon={typeIcon} className={twm("flex-shrink-0 inline-block", iconSize)} />
            {effect.map((effectOrJoin, effectIndex) => {
                if (typeof effectOrJoin === "string") {
                    return (
                        <span key={effectIndex} className="font-bold">
                            {effectOrJoin}
                        </span>
                    );
                }
                const { amount, effectType } = effectOrJoin;
                const effectTypeIcon = `/mighty-decks/textIcons/${effectType}.png`;
                return (
                    <React.Fragment key={effectIndex}>
                        {amount && amount > 1 && <>{amount}x</>}
                        <IconOrImage icon={effectTypeIcon} className={twm("flex-shrink-0 inline-block", iconSize)} />
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
    role?: LayeredActorCardProps,
    modifier?: LayeredActorCardProps,
    lineSize: string = "h-5 vertical-align:middle",
    iconSize: string = "h-5"
): LayeredCardProps => {
    const props: LayeredCardProps = {
        imageUri: "/mighty-decks/actors/base/minion-yellow.png",
    };
    const nounEffectLeft: React.ReactNode[] = [];
    const nounEffectRight: React.ReactNode[] = [];
    const iconProps = { className: iconSize };
    if (role) {
        props.noun = role.name;
        props.nounDeck = role.deck;
        props.nounCornerIcon = "/mighty-decks/types/actor.png";
        nounEffectLeft.push(
            <>
                <div key="toughness" className={lineSize}>
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
                {(role.actions ?? [null, null]).map((action, index) => renderAction(action, index, lineSize, iconSize))}
            </>
        );
    }
    if (modifier) {
        props.adjective = modifier.name;
        props.adjectiveDeck = modifier.deck;
        props.adjectiveEffect = modifier.special ? (
            <TextWithIcons
                text={modifier.special}
                iconProps={{ ...iconProps, className: twm(iconProps.className, "mx-[-2px]") }}
            />
        ) : undefined;
        props.adjectiveCornerIcon = "/mighty-decks/types/actor.png";
        nounEffectRight.push(
            <div key="toughnessBonus" className={lineSize}>
                {modifier.toughnessBonus && <TextWithIcons text={modifier.toughnessBonus} iconProps={iconProps} />}
            </div>
        );
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
        <div className="w-full flex flex-row gap-2 flex-grow">
            <div className="flex-grow basis-2/3 text-right">{nounEffectLeft}</div>
            <div className="flex-grow basis-1/3 text-left">{nounEffectRight}</div>
        </div>
    );
    return props;
};

export default function LayeredActorCard({
    className,
    slug,
    name,
    deck,
    toughness,
    toughnessBonus,
    speed,
    special,
    actions,
    actionBonuses,
    count,
    isModifier,
    imageClassName,
    imagePosition,
    imageFit = "contain",
    imageWrapperClassName,
    ImageComponent = Image,
    children,
    ...restProps
}: LayeredActorCardProps) {
    const currentProps = { slug, name, deck, toughness, toughnessBonus, speed, special, actions, actionBonuses, count };
    const [roleProps, modifierProps] = isModifier ? [sampleRole, currentProps] : [currentProps, sampleModifier];
    const props = getLayeredCardProps(roleProps, modifierProps);

    return <LayeredCard className={twm("LayeredActorCard", className)} {...props} {...restProps} />;
}

export type LayeredActorCardBackFaceProps = LayeredCardBackFaceProps;

export const LayeredActorCardBackFace = LayeredCardBackFace;
