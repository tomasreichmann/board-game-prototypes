import { twMerge } from "tailwind-merge";
import { ContentItemType } from "../../services/firestoreAdventureController";
import { defaultMdxComponentMap } from "../content/MdxArticle";
import ErrorMessage, { ErrorBoundaryErrorMessage } from "./ErrorMessage";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import Button from "../controls/Button";
import ToggleData from "../../../../components/DataToggle";
import { useMemo } from "react";

export type ComponentMapType = typeof defaultMdxComponentMap;

export type ContentItemProps = {
    className?: string;
    componentMap?: ComponentMapType;
    removeFaultyContentItem?: () => void;
} & ContentItemType;

const isContentItemProps = (maybeProps: any, componentMap: ComponentMapType): maybeProps is ContentItemProps => {
    return maybeProps && typeof maybeProps === "object" && "type" in maybeProps && maybeProps.type in componentMap;
};

export default function ContentItem({
    className,
    id,
    type,
    props,
    componentMap = defaultMdxComponentMap,
    removeFaultyContentItem,
}: ContentItemProps) {
    const Component = type in componentMap ? (componentMap[type] as React.ComponentType) : undefined;
    const computedProps = useMemo(() => {
        return Object.fromEntries(
            Object.entries(props).map(([key, value]) => {
                if (isContentItemProps(value, componentMap)) {
                    return [
                        key,
                        <ContentItem
                            {...(value as ContentItemProps)}
                            componentMap={componentMap}
                            className={className}
                        />,
                    ];
                }
                const isListOfContentItems =
                    Array.isArray(value) && value.every((item) => isContentItemProps(item, componentMap));
                if (isListOfContentItems) {
                    return [
                        key,
                        (value as ContentItemProps[]).map((item) => (
                            <ContentItem {...item} className={className} componentMap={componentMap} />
                        )),
                    ];
                }
                return [key, value];
            })
        );
    }, [props]);
    return (
        <div className={twMerge("ContentItem", className)}>
            <ErrorBoundary
                ErrorComponent={ErrorBoundaryErrorMessage}
                extraErrorProps={{
                    children: (
                        <>
                            {removeFaultyContentItem && (
                                <Button
                                    onClick={removeFaultyContentItem}
                                    variant="solid"
                                    color="danger"
                                    size="sm"
                                    className="ml-4"
                                >
                                    Remove faulty content item
                                </Button>
                            )}
                            <ToggleData data={{ id, type, props }} />
                        </>
                    ),
                }}
            >
                {Component ? (
                    <Component {...computedProps} />
                ) : (
                    <ErrorMessage heading="⚠ Unknown content type" body={`${id}`}>
                        {removeFaultyContentItem && (
                            <Button onClick={removeFaultyContentItem} variant="solid" color="danger" size="sm">
                                Remove faulty content item
                            </Button>
                        )}
                    </ErrorMessage>
                )}
            </ErrorBoundary>
        </div>
    );
}
