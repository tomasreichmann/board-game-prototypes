import { twMerge } from "tailwind-merge";
import ToggleData from "../../../../components/DataToggle";
import Position from "../../../../components/PerspectiveView/Position";
import Text from "../content/Text";
import { OutcomeCardFlippable } from "../gameComponents/OutcomeCard";
import { ContentItemType, ContentItemTypeEnum } from "./types";
import ToggleCheckbox from "../controls/ToggleCheckbox";
import FlippableTest from "./FlippableTest";
import { HTMLAttributes, memo } from "react";
import interpolate from "../../../../utils/interpolate";
import { clamp } from "lodash";

export type ContentItemProps = {
    className?: string;
} & ContentItemType &
    Pick<HTMLAttributes<HTMLDivElement>, "onClick">;

const componentMap: { [key in ContentItemTypeEnum]: React.ComponentType<any> } = {
    OutcomeCard: OutcomeCardFlippable,
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
    componentProps,
    positionProps,
    type,
    castShadow,
    ...restProps
}: ContentItemProps) {
    const Component = type in componentMap ? componentMap[type as keyof typeof componentMap] : componentMap.Pre;

    return (
        <>
            <Position {...positionProps}>
                <Component {...(restProps as any)} {...componentProps} className={twMerge(componentProps.className)} />
            </Position>
            {castShadow && <Shadow {...positionProps} />}
        </>
    );
});
