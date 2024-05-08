import { twMerge } from "tailwind-merge";
import {
    ContentItemDnDResultType,
    ContentItemDragObjectType,
    ContentItemDropResultType,
    ContentItemType,
} from "../../services/firestoreController";
import { defaultMdxComponentMap } from "../content/MdxArticle";
import { useMemo } from "react";
import Text, { H5, H6 } from "../content/Text";
import { useDrag } from "react-dnd";
import contentFormSchemas from "./contentFormSchemas";
import Toggle from "../../../../components/Toggle";

export type ContentItemListProps = {
    className?: string;
    componentMap?: { [key: string]: React.ComponentType<any> };
    onDrop?: (result: ContentItemDnDResultType) => void;
};

const simpleContentTypes: ContentItemType["type"][] = ["Mdx", "Text", "Image"] as const;
const layoutContentTypes: ContentItemType["type"][] = [
    "Heading",
    "List",
    "Columns",
    "Aside",
    "Hand",
    "Spread",
    "Paper",
    "Toggle",
] as const;
const componentContentTypes: ContentItemType["type"][] = ["Actor", "Asset", "Clock", "Effect", "Outcome", "PaperMini"];
const deprecatedContentTypes: ContentItemType["type"][] = ["Player", "p", "li", "img", "Alert"];

const contentTypeDescriptionMap = {
    Mdx: "Rich text content in (MDX)[https://mdxjs.com/] format",
    Text: "Simple text content like headings and paragraph text",
    Image: "Shareable Image",
    Actor: "Card for an PCs and NPCs",
    Asset: "Card for an item like object",
    Clock: "Card for tracking threats and goals",
    Effect: "Card for character effects like Wound or Boost",
    Outcome: "Card for outcomes like Success or Fumble",
    PaperMini: "Foldable paper-craft mini",
    List: "layout for a list of any content items",
    Heading: "layout for a heading with a title and an image",
    Columns: "layout for side by side content",
    Aside: "layout for content on the side",
    Hand: "layout for items in an arc",
    Spread: "layout for items in a spread",
    Paper: "layout in a standard paper or card size",
    Toggle: "layout for collapsible content",

    Player: "DEPRECATED Player character card",
    p: "DEPRECATED layout for paragraph text",
    li: "DEPRECATED layout for list items",
    img: "DEPRECATED layout for images",
    Alert: "DEPRECATED DaisyUI Box content for warnings and information",
} as const;

export type ContentItemLabelProps = {
    type: ContentItemType["type"];
    description?: string;
    onDrop?: ContentItemListProps["onDrop"];
};

export function ContentItemLabel({ type, description, onDrop }: ContentItemLabelProps) {
    const [{ isDragging: isDraggingNewContent }, drag] = useDrag<
        ContentItemDragObjectType,
        ContentItemDropResultType,
        { isDragging: boolean; handlerId: string | symbol | null }
    >(
        () => ({
            type: "any",
            item: { type, id: "unknown", order: 0, props: {}, name: "new" },
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult<ContentItemDnDResultType>(); // TODO Target type
                if (item && dropResult) {
                    console.log("ContentItemLabel drop", item, dropResult);
                    onDrop?.({ ...item, ...dropResult });
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            }),
        }),
        [type]
    );

    return (
        <div
            ref={drag}
            className={twMerge(
                "relative cursor-grab pl-8 pr-4 py-2 bg-kac-steel rounded-md leading-tight",
                type in contentFormSchemas ? "bg-kac-bone" : ""
            )}
        >
            <div className="absolute top-0 left-0 w-4 h-full rounded-w flex flex-col justify-center items-center bg-white/20">
                ⋮ 
            </div>
            <H6 color="body">{type}</H6>
            {description && (
                <Text variant="body" size="xs">
                    {description}
                </Text>
            )}
        </div>
    );
}

export default function ContentItemList({
    className,
    componentMap = defaultMdxComponentMap,
    onDrop,
}: ContentItemListProps) {
    const groupContent = useMemo(() => {
        let keysLeft = Object.keys(componentMap);
        const groupContent: JSX.Element[] = [];
        [
            { label: "Simple", types: simpleContentTypes },
            { label: "Layout", types: layoutContentTypes },
            { label: "Components", types: componentContentTypes },
            { label: "Deprecated", types: deprecatedContentTypes },
            { label: "Other" },
        ].forEach(({ label, types = keysLeft }) => {
            const group: JSX.Element[] = [];
            (types as ContentItemType["type"][]).forEach((type) => {
                if (keysLeft.includes(type)) {
                    group.push(
                        <ContentItemLabel
                            key={type}
                            type={type}
                            description={contentTypeDescriptionMap[type]}
                            onDrop={onDrop}
                        />
                    );
                    keysLeft = keysLeft.filter((key) => key !== type);
                }
            });
            if (group.length > 0) {
                const contentElement = (
                    <div key={label} className="flex flex-col gap-2">
                        <H5>{label}</H5>
                        <div className="flex flex-row flex-wrap gap-2">{group}</div>
                    </div>
                );
                if (label === "Deprecated") {
                    groupContent.push(
                        <Toggle initialCollapsed buttonContent="Deprecated" key={label}>
                            {contentElement}
                        </Toggle>
                    );
                } else {
                    groupContent.push(contentElement);
                }
            }
        });
        return groupContent;
    }, [componentMap]);

    return <div className={twMerge("ContentItemList flex flex-col gap-4", className)}>{groupContent}</div>;
}
