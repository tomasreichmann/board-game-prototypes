import { twMerge } from "tailwind-merge";
import ToggleData from "../../../../components/DataToggle";
import Position from "../../../../components/PerspectiveView/Position";
import Text from "../content/Text";
import { OutcomeCardFlippable } from "../gameComponents/OutcomeCard";
import { ContentItemType, ContentItemTypeEnum } from "./types";
import ToggleCheckbox from "../controls/ToggleCheckbox";
import FlippableTest from "./FlippableTest";
import { HTMLAttributes, memo } from "react";

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

export default memo(function ContentItem({ componentProps, positionProps, type, ...restProps }: ContentItemProps) {
    const Component = type in componentMap ? componentMap[type as keyof typeof componentMap] : componentMap.Pre;
    return (
        <Position {...positionProps}>
            <Component {...(restProps as any)} {...componentProps} className={twMerge(componentProps.className)} />
        </Position>
    );
});
