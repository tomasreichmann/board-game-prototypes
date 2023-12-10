import { useDrop } from "react-dnd";
import { twMerge } from "tailwind-merge";
import { DragTypeEnum } from "./smartDocs";

export type SmartDocContentDropProps = {
    path: string;
    mode?: "append" | "prepend";
};

export default function SmartDocContentDrop({ path, mode }: SmartDocContentDropProps) {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: DragTypeEnum.Element,
        drop: () => ({ path, mode }),

        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    return (
        <div
            ref={drop}
            className="border-2 border-dotted border-kac-steel-dark p-2 rounded-md w-full min-h-8 text-center"
            style={{
                fontWeight: isOver ? "bold" : "normal",
                borderStyle: isOver ? "solid" : "dotted",
                display: canDrop ? "inline-block" : "none",
            }}
        >
            &#10515;
        </div>
    );
}
