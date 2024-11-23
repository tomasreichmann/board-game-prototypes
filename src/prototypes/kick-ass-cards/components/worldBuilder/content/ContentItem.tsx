import React, { ComponentProps, useEffect } from "react";
import Position from "../../../../../components/PerspectiveView/Position";
import DataPreview from "../../../../../components/DataPreview";
import ActorCard, { ActorCardEditable } from "./ActorCard";
import TraitCard from "./TraitCard";
import { ContentItemProps } from "../../../../../components/PerspectiveBoard/PerspectiveBoard";
import useDragDelta from "../../../../../hooks/useDragDelta";
import { getScaleFromZ } from "../../../../../components/PerspectiveBoard/utils";
import { usePerspectiveBoard } from "../../../../../components/PerspectiveBoard/PerspectiveBoardProvider";
import { usePerspectiveView } from "../../../../../components/PerspectiveView/PerspectiveViewProvider";
import { PerspectiveViewActionTypeEnum } from "../../../../../components/PerspectiveView/perspectiveViewReducer";
import { PerspectiveBoardActionTypeEnum } from "../../../../../components/PerspectiveBoard/perspectiveBoardReducer";

export type ComponentDefinitionType<ComponentName extends keyof typeof componentMap> = {
    componentName: ComponentName;
    props: ComponentProps<(typeof componentMap)[ComponentName]>;
};

const componentMap = {
    ActorCard,
    ActorCardEditable,
    TraitCard,
    default: ({ componentName, ...props }: { [key: string]: any }) => (
        <div className="flex flex-col gap-">
            <div className="font-bold text-red-600">Unknown component {componentName}</div>
            <DataPreview data={props} />
        </div>
    ),
};

const isKnownComponentName = (componentName: string): componentName is keyof typeof componentMap =>
    componentName in componentMap;

export default function ContentItem({ componentName, id, props, draggable, ...positionProps }: ContentItemProps) {
    const Component = isKnownComponentName(componentName) ? componentMap[componentName] : componentMap.default;

    const { dispatch: boardDispatch } = usePerspectiveBoard();
    const { state: viewState } = usePerspectiveView();

    const { events, delta } = useDragDelta({ isDisabled: !draggable });

    const dragDeltaScale = getScaleFromZ(viewState.stage.z, viewState.lens.perspective);

    useEffect(() => {
        if ((delta.x === 0 && delta.y === 0) || !draggable) {
            return;
        }
        boardDispatch({
            type: PerspectiveBoardActionTypeEnum.Drag,
            payload: {
                componentId: id,
                delta: {
                    x: delta.x * dragDeltaScale,
                    y: delta.y * dragDeltaScale,
                },
            },
        });
    }, [delta, draggable]);

    const componentProps = {
        ...props,
        ...(Component === componentMap.default ? { componentName } : {}),
    } as any;

    return (
        <Position id={id} key={id} {...positionProps} {...events}>
            <Component {...componentProps} />
        </Position>
    );
}
