import { twMerge } from "tailwind-merge";
import ToggleData from "../../../../../components/DataToggle";
import Position from "../../../../../components/PerspectiveView/Position";
import Text from "../../content/Text";
import { OutcomeCardFlippable } from "../../gameComponents/OutcomeCard";
import { ContentItemType, ContentItemTypeEnum } from "../model/types";
import ToggleCheckbox from "../../controls/ToggleCheckbox";
import FlippableTest from "./FlippableTest";
import { Fragment, HTMLAttributes, memo } from "react";

import { clamp } from "lodash";
import interpolate from "../../../../../utils/interpolate";
import PlaceholderCard from "../../gameComponents/PlaceholderCard";
import { stripMetaPropsFromContentItem } from "../hooks/useContentItems";

export type ContentItemProps = {
    className?: string;
    isHidden?: boolean;
    castShadow?: boolean;
    isDebugging?: boolean;
} & Omit<
    ContentItemType,
    | "isHighlightedForOwner"
    | "isHighlightedForStoryteller"
    | "isClickableForOwner"
    | "isClickableForStoryteller"
    | "isSelectedForOwner"
    | "isSelectedForStoryteller"
> &
    Pick<HTMLAttributes<HTMLDivElement>, "onClick">;

export type ContentItemComponentProps = {
    isHighlighted?: boolean;
    isClickable?: boolean;
    isSelected?: boolean;
};

const componentMap: { [key in ContentItemTypeEnum]: React.ComponentType<any> } = {
    OutcomeCard: OutcomeCardFlippable,
    PlaceholderCard: PlaceholderCard,
    Pre: ({ isClickable, isHighlighted, isSelected, ...restProps }: any) => <ToggleData {...restProps} />,
    Text: ({ isClickable, isHighlighted, isSelected, ...restProps }: any) => <Text {...restProps} />,
    Div: ({ isClickable, isHighlighted, isSelected, ...restProps }: any) => (
        <div className={twMerge("&_[pointer-events:all]", "hover:border-red-500")} {...restProps} />
    ),
    ToggleCheckbox: ({ isClickable, isHighlighted, isSelected, ...restProps }: any) => (
        <ToggleCheckbox {...restProps} />
    ),
    FlippableTest,
};

export type ShadowProps = ContentItemProps["positionProps"];

export const Shadow = (props: ShadowProps) => {
    const castShadow = props.z > 0;
    const zDelta = props.z;
    const blur = clamp(interpolate(zDelta, 0, 200, 0, 50), 0, 50);
    const opacity = clamp(interpolate(zDelta, 0, 200, 1, 0), 0, 1);
    const isShadowVisible = castShadow;

    const shadowPosition = { ...props, rotateX: 0, rotateY: 0, rotateZ: 0, z: 0 };

    if (!isShadowVisible) return null;

    return (
        <Position {...shadowPosition}>
            <div
                className="transition-all duration-500 ease pointer-events-none"
                style={{
                    filter: `blur(${blur}px)`,
                    backgroundColor: "rgba(0,0,0,0.25)",
                    opacity,
                    borderRadius: 5,
                    width: props.width,
                    height: props.height,
                    /* transform: `scaleX(${props.rotateX ?? 0}) scaleY(${props.rotateY ?? 0}) scaleZ(${
                        props.rotateZ ?? 0
                    }) `, 0-90 deg -> 1-0; 90-180 deg -> 0-1*/
                }}
            />
        </Position>
    );
};

export default memo(function ContentItem({
    id,
    componentProps,
    positionProps,
    type,
    castShadow,
    isDebugging,
    isHidden,
    ...restProps
}: ContentItemProps) {
    const Component = type in componentMap ? componentMap[type as keyof typeof componentMap] : componentMap.Pre;
    // const Component = componentMap.PlaceholderCard;
    return (
        <Fragment key={id}>
            <Position
                {...positionProps}
                key={id + "-position"}
                style={{ ...positionProps.style, ...(isHidden ? { opacity: 0, pointerEvents: "none" } : {}) }}
            >
                {isDebugging && <div className="absolute top-0 left-0 z-10 pointer-events-none">ID: {id}</div>}
                <Component
                    key={id + "-component"}
                    {...stripMetaPropsFromContentItem({ ...restProps, ...componentProps })}
                    className={twMerge(componentProps.className)}
                />
            </Position>
            {castShadow && <Shadow key={id + "-shadow"} {...positionProps} />}
        </Fragment>
    );
});
