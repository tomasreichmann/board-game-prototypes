import { useDrop } from "react-dnd";
import { twMerge } from "tailwind-merge";
import { ContentItemDragObjectType, ContentItemDropResultType } from "../../services/firestoreController";

export type ContentDropProps = {
    className?: string;
    path: string;
    mode?: "append" | "prepend" | "insert";
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
            drop: () => {
                console.log("drop", { path, mode, order });
                return { path, mode, order };
            },

            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [path, mode, order]
    );
    return (
        <div className={twMerge("relative", className)}>
            <div
                ref={drop}
                className={twMerge(
                    /* "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full", */
                    "border-2 border-dotted border-kac-monster p-2 rounded-md text-center text-kac-monster bg-kac-monster-light/10",
                    isOver ? "font-bold border-solid bg-kac-monster-light/25" : "font-normal border-dotted ",
                    canDrop ? "z-50" : "opacity-0"
                )}
            >
                &#10515;
            </div>
        </div>
    );
}
