import { twMerge } from "tailwind-merge";
import smartDocElementMap, { getDefaultProps } from "./smartDocElementMap";
import { useDrag } from "react-dnd";
import { DragTypeEnum, DropType } from "./smartDocs";
import { ObjectPropertyType } from "../../../../utils/ObjectPropertyType";
import { H6 } from "../content/Text";
import { SmartDocActionTypeEnum, useSmartDoc } from "./useSmartDoc";

export type SmartDocElementProps = React.PropsWithChildren<{
    className?: string;
}> &
    ObjectPropertyType<typeof smartDocElementMap, keyof typeof smartDocElementMap>;

export default function SmartDocElement({ className, children, ...element }: SmartDocElementProps) {
    const { dispatch } = useSmartDoc();
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: DragTypeEnum.Element,
            item: element,
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult<DropType>();
                if (item && dropResult) {
                    console.log("drop", item, dropResult);
                    const { path, mode } = dropResult;
                    dispatch({ type: SmartDocActionTypeEnum.SetContent, path, mode, element });
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            }),
        }),
        [dispatch]
    );
    const { Component, controls, label } = element;
    const props = getDefaultProps(controls);
    return (
        <div
            ref={drag}
            className={twMerge("SmartDocElement border-2 border-kac-steel-dark p-2 rounded-md cursor-grab", className)}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <Component {...props} />
            <H6 className="text-center">{label}</H6>
            {children}
        </div>
    );
}
