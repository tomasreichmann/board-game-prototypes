import Conditional from "../utils/Conditional";
import { ContentItemProps, contentComponentMap } from "./sharedContentProps";

export default function ContentItem(props: ContentItemProps) {
    const { component, componentMap = contentComponentMap, conditions } = props;
    const componentKey = Object.keys(component)[0] as keyof typeof contentComponentMap;
    const Component = componentMap?.[componentKey] ?? contentComponentMap.DialogIntrospection;
    const componentProps = {
        ...component[componentKey],
        componentMap,
    } as any;
    const hasConditions = (conditions && conditions.length > 0) || false;

    if (hasConditions) {
        return (
            <Conditional conditions={conditions}>
                <Component {...componentProps} />
            </Conditional>
        );
    }
    return <Component {...componentProps} />;
}
