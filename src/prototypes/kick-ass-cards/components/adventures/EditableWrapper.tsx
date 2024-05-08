import { twMerge } from "tailwind-merge";
import Text from "../content/Text";
import { PropsWithChildren } from "react";
import ButtonWithConfirmation from "../content/ButtonWithConfirmation";
import { ConnectDragSource } from "react-dnd";

export type EditableWrapperProps = PropsWithChildren<{
    className?: string;
    onToggleEdit?: () => void;
    onDelete?: () => void;
    dragRef?: ConnectDragSource;
    isSelected: boolean;
    name: string;
}>;

export default function EditableWrapper({
    className,
    isSelected,
    onToggleEdit,
    onDelete,
    dragRef,
    name,
    children,
}: EditableWrapperProps) {
    return (
        <div
            className={twMerge(
                "relative flex flex-col p-1 group min-w-32 outline outline-kac-curse/10",
                className,
                isSelected
                    ? "outline-kac-curse bg-kac-curse-light/20"
                    : "hover:outline hover:outline-kac-curse/50 hover:bg-kac-curse-light/10"
            )}
        >
            <div
                ref={dragRef}
                className={twMerge(
                    "absolute left-0 bottom-full px-2 py-1 bg-kac-curse opacity-0 group-hover:opacity-50",
                    isSelected && "opacity-100 group-hover:opacity-100",
                    dragRef && "cursor-grab"
                )}
            >
                <Text variant="body" size="sm" color="white">
                    {dragRef && <>⋮ </>}
                    {name}
                </Text>
            </div>
            {onDelete && (
                <ButtonWithConfirmation
                    type="button"
                    variant="solid"
                    onClick={onDelete}
                    color="warning"
                    size="sm"
                    className={twMerge(
                        "absolute right-0 bottom-full rounded-b-none opacity-0 group-hover:opacity-50 hover:outline-0 focus:outline-0 transition-none",
                        isSelected && "opacity-100 group-hover:opacity-100"
                    )}
                    confirmProps={{ className: "hover:outline-0 focus:outline-0" }}
                    confirmText="You sure?"
                >
                    Delete
                </ButtonWithConfirmation>
            )}
            <button
                onClick={onToggleEdit}
                className="appearance-none bg-transparent cursor-pointer border-0 hover:border-0 p-0 flex flex-col text-left min-w-4 min-h-4"
            >
                {children}
            </button>
        </div>
    );
}
