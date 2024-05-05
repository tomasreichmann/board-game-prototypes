import { DragSourceMonitor, useDrop } from "react-dnd";
import { twMerge } from "tailwind-merge";
import {
    ContentItemDnDResultType,
    ContentItemDragObjectType,
    ContentItemDropResultType,
} from "../../services/firestoreController";

export type ContentDropProps = {
    className?: string;
    path: string;
    mode?: "append" | "prepend";
    order: number;
};

export default function ContentDrop({ className, path, mode, order }: ContentDropProps) {
    const [{ canDrop, isOver }, drop] = useDrop<
        ContentItemDragObjectType,
        ContentItemDropResultType,
        { canDrop: boolean; isOver: boolean }
    >(
        () => ({
            accept: "any",
            drop: () => ({ path, mode, order }),

            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [path, mode]
    );
    return (
        <div className={twMerge("relative", className)}>
            <div
                ref={drop}
                className={twMerge(
                    "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full",
                    "border-2 border-dotted border-kac-steel-dark p-2 rounded-md text-center",
                    isOver ? "font-bold" : "font-normal",
                    isOver ? "border-solid" : "border-dotted",
                    canDrop ? "inline-block z-50" : "hidden"
                )}
            >
                &#10515;
            </div>
        </div>
    );
}
