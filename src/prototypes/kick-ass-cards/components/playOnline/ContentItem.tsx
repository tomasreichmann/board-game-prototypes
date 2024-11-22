import ToggleData from "../../../../components/DataToggle";
import { OutcomeCardFlippable } from "../gameComponents/OutcomeCard";
import { ContentItemType } from "./types";

export type ContentItemProps = {
    className?: string;
} & ContentItemType;

const componentMap = {
    OutcomeCard: OutcomeCardFlippable,
    Pre: (props: any) => <ToggleData {...props} />,
};

export default function ContentItem({ componentProps, elementProps, type, ...restProps }: ContentItemProps) {
    const Component = type in componentMap ? componentMap[type as keyof typeof componentMap] : componentMap.Pre;
    return (
        <Component
            {...(restProps as any)}
            {...componentProps}
            style={{
                width: elementProps?.width,
                height: elementProps?.height,
            }}
        />
    );
}
