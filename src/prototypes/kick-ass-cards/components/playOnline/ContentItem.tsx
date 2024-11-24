import { twMerge } from "tailwind-merge";
import ToggleData from "../../../../components/DataToggle";
import Position from "../../../../components/PerspectiveView/Position";
import Text from "../content/Text";
import { OutcomeCardFlippable } from "../gameComponents/OutcomeCard";
import { ContentItemType, ContentItemTypeEnum } from "./types";
import ToggleCheckbox from "../controls/ToggleCheckbox";
import FlippableTest from "./FlippableTest";

export type ContentItemProps = {
    className?: string;
} & ContentItemType;

const componentMap: { [key in ContentItemTypeEnum]: React.ComponentType<any> } = {
    OutcomeCard: OutcomeCardFlippable,
    Pre: (props: any) => <ToggleData {...props} />,
    Text: (props: any) => <Text {...props} />,
    Div: (props: any) => <div className={twMerge("&_[pointer-events:all]", "hover:border-red-500")} {...props} />,
    ToggleCheckbox: (props: any) => <ToggleCheckbox {...props} />,
    FlippableTest,
};

export default function ContentItem({ componentProps, positionProps, type, ...restProps }: ContentItemProps) {
    const Component = type in componentMap ? componentMap[type as keyof typeof componentMap] : componentMap.Pre;
    return (
        <Position {...positionProps}>
            <Component {...(restProps as any)} {...componentProps} />
        </Position>
    );
}
