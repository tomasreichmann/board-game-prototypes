import { twMerge } from "tailwind-merge";
import { ContentItemType } from "../../services/firestoreController";
import { defaultMdxComponentMap } from "../content/MdxArticle";
import ErrorMessage, { ErrorBoundaryErrorMessage } from "./ErrorMessage";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import Button from "../content/Button";
import ToggleData from "../../../../components/DataToggle";

export type ContentItemProps = {
    className?: string;
    componentMap?: { [key: string]: React.ComponentType<any> };
    removeFaultyContentItem?: () => void;
} & ContentItemType;

export default function ContentItem({
    className,
    id,
    type,
    props,
    componentMap = defaultMdxComponentMap,
    removeFaultyContentItem,
}: ContentItemProps) {
    const Component = type in componentMap ? componentMap[type] : undefined;
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
                    <Component {...props} />
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
