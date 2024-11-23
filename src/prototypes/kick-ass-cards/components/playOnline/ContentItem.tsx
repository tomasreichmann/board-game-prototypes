import ToggleData from "../../../../components/DataToggle";
import Position from "../../../../components/PerspectiveView/Position";
import Text from "../content/Text";
import { OutcomeCardFlippable } from "../gameComponents/OutcomeCard";
import { ContentItemType } from "./types";

export type ContentItemProps = {
    className?: string;
} & ContentItemType;

const componentMap = {
    OutcomeCard: OutcomeCardFlippable,
    Pre: (props: any) => <ToggleData {...props} />,
    Text: (props: any) => <Text {...props} />,
};

export default function ContentItem({ componentProps, positionProps, type, ...restProps }: ContentItemProps) {
    const Component = type in componentMap ? componentMap[type as keyof typeof componentMap] : componentMap.Pre;
    return (
        <Position {...positionProps}>
            <Component {...(restProps as any)} {...componentProps} />
        </Position>
    );
}
