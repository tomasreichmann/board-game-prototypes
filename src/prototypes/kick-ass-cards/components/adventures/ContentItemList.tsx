import { twMerge } from "tailwind-merge";
import {
    ContentItemDnDResultType,
    ContentItemDragObjectType,
    ContentItemDropResultType,
    ContentItemType,
} from "../../services/firestoreController";
import { defaultMdxComponentMap } from "../content/MdxArticle";
import { useMemo } from "react";
import { H5 } from "../content/Text";
import { useDrag } from "react-dnd";
import safeStringify from "../../../../utils/safeStringify";
import contentFormSchemas from "./contentFormSchemas";

export type ContentItemListProps = {
    className?: string;
    componentMap?: { [key: string]: React.ComponentType<any> };
    onDrop?: (result: ContentItemDnDResultType) => void;
};

const simpleContentTypes: ContentItemType["type"][] = ["Mdx", "Text", "Image", "Alert"] as const;
const layoutContentTypes: ContentItemType["type"][] = ["List", "Columns", "Hand", "Spread"] as const;
const componentContentTypes: ContentItemType["type"][] = [
    "Actor",
    "Asset",
    "Clock",
    "Effect",
    "Outcome",
    "PaperMini",
    "Player",
];

export type ContentItemLabelProps = {
    type: ContentItemType["type"];
    onDrop?: ContentItemListProps["onDrop"];
};

export function ContentItemLabel({ type, onDrop }: ContentItemLabelProps) {
    const [{ isDragging }, drag] = useDrag<
        ContentItemDragObjectType,
        ContentItemDropResultType,
        { isDragging: boolean; handlerId: string | symbol | null }
    >(
        () => ({
            type: "any",
            item: { type },
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult<ContentItemDnDResultType>(); // TODO Target type
                if (item && dropResult) {
                    console.log("ContentItemLabel drop", item, dropResult);
                    onDrop?.({ ...item, ...dropResult });
                    // dispatch({ type: SmartDocActionTypeEnum.SetContent, path, mode, element });
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
        <div ref={drag} className="cursor-grab">
            <H5
                className={twMerge(
                    "px-4 py-2 bg-kac-steel rounded-md text-center",
                    type in contentFormSchemas ? "bg-kac-bone" : ""
                )}
                color="body"
            >
                {type}
            </H5>
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
            { label: "Other" },
        ].forEach(({ label, types = keysLeft }) => {
            const group: JSX.Element[] = [];
            (types as ContentItemType["type"][]).forEach((type) => {
                if (keysLeft.includes(type)) {
                    group.push(<ContentItemLabel key={type} type={type} onDrop={onDrop} />);
                    keysLeft = keysLeft.filter((key) => key !== type);
                }
            });
            if (group.length > 0) {
                groupContent.push(
                    <div key={label} className="flex flex-col gap-2">
                        <H5>{label}</H5>
                        <div className="flex flex-row flex-wrap gap-2">{group}</div>
                    </div>
                );
            }
        });
        return groupContent;
    }, [componentMap]);

    return <div className={twMerge("ContentItemList flex flex-col gap-4", className)}>{groupContent}</div>;
}
