import ContentItem from "./ContentItem";
import { ContentItemProps, SharedContentProps } from "./sharedContentProps";

export default function NormalizedChildren(props: SharedContentProps) {
    if (typeof props.children === "object") {
        if (Array.isArray(props.children)) {
            return (
                <>
                    {props.children.map((child, index) => (
                        <ContentItem key={index} {...child} />
                    ))}
                </>
            );
        }
        return <ContentItem {...(props.children as ContentItemProps)} />;
    }
    /*if (typeof props.children === "string") {
        return <AnimateText>{props.children}</AnimateText>;
    }*/
    return <>{props.children}</>;
}
