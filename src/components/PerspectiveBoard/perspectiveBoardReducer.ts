import React from "react";
import {
    BoardContentItemTypeEnum,
    HandItemType,
    PerspectiveBoardStateType,
    BoardPositionItemType,
    SpreadItemType,
    ComponentDefinitionType,
    BoardContentItemType,
} from "./perspectiveBoardModel";

export enum PerspectiveBoardActionTypeEnum {
    Update = "Update",
    Drag = "Drag",
    Updater = "Updater",
    ContentUpdater = "ContentUpdater",
}

export type PerspectiveBoardActionType =
    | {
          type: PerspectiveBoardActionTypeEnum.Update;
          payload: Partial<PerspectiveBoardStateType>;
      }
    | {
          type: PerspectiveBoardActionTypeEnum.Updater;
          payload: (state: PerspectiveBoardStateType) => Partial<PerspectiveBoardStateType>;
      }
    | {
          type: PerspectiveBoardActionTypeEnum.Drag;
          payload: {
              componentId: string;
              delta: {
                  x: number;
                  y: number;
              };
          };
      }
    | {
          type: PerspectiveBoardActionTypeEnum.ContentUpdater;
          payload: {
              componentId: string;
              updater: (
                  component: ComponentDefinitionType,
                  content: BoardContentItemType,
                  state: PerspectiveBoardStateType
              ) => Partial<ComponentDefinitionType>;
          };
      };

const calculateHandPositions = (handContent: HandItemType): BoardPositionItemType[] => {
    return calculateSpreadPositions({ ...handContent, type: BoardContentItemTypeEnum.Spread });
};

const calculateSpreadPositions = ({ position, components }: SpreadItemType): BoardPositionItemType[] => {
    if (components.length === 0) {
        return [];
    }
    // const widths = components.map((component) => component.width);
    // const totalWidth = widths.reduce((a, b) => a + b, 0);
    const lastPosition = position.width - components[components.length - 1].width;
    let runningWidth = 0;
    const positions: BoardPositionItemType[] = components.map((component) => {
        const x = position.x + (runningWidth + component.width) / lastPosition;
        runningWidth += component.width;
        return {
            ...position,
            x,
            ...component,
        };
    });

    return positions;
};

const calculateItems = (state: PerspectiveBoardStateType): PerspectiveBoardStateType => {
    return {
        ...state,
        positionItems: state.content.reduce((items, item) => {
            if (item.type === BoardContentItemTypeEnum.Single) {
                items.push({
                    ...item.position,
                    ...item.component,
                });
            } else if (item.type === BoardContentItemTypeEnum.Hand) {
                items.push(...calculateHandPositions(item));
            }
            return items;
        }, [] as BoardPositionItemType[]),
    };
};

const findContentItemIndexByComponentId = (state: PerspectiveBoardStateType, id: string) => {
    return state.content.findIndex((contentItem) => {
        if (contentItem.type === BoardContentItemTypeEnum.Single) {
            return contentItem.component.id === id;
        }
        return contentItem.components.find((component) => component.id === id);
    });
};

export default function perspectiveBoardReducer(
    state: PerspectiveBoardStateType,
    action: PerspectiveBoardActionType
): PerspectiveBoardStateType {
    // console.log(action);
    if (action.type === PerspectiveBoardActionTypeEnum.Update) {
        return calculateItems({
            ...state,
            ...action.payload,
        });
    }
    if (action.type === PerspectiveBoardActionTypeEnum.Updater) {
        return calculateItems({
            ...state,
            ...action.payload(state),
        });
    }
    if (action.type === PerspectiveBoardActionTypeEnum.Drag) {
        const { componentId, delta } = action.payload;
        const contentIndex = findContentItemIndexByComponentId(state, componentId);
        if (contentIndex === -1) {
            console.warn("Component not found", componentId);
            return state;
        }
        return calculateItems({
            ...state,
            content: [
                ...state.content.slice(0, contentIndex),
                {
                    ...state.content[contentIndex],
                    position: {
                        ...state.content[contentIndex].position,
                        x: state.content[contentIndex].position.x + delta.x,
                        y: state.content[contentIndex].position.y + delta.y,
                    },
                },
                ...state.content.slice(contentIndex + 1),
            ],
        });
    }
    if (action.type === PerspectiveBoardActionTypeEnum.ContentUpdater) {
        const { componentId, updater } = action.payload;
        const contentIndex = findContentItemIndexByComponentId(state, componentId);
        if (contentIndex === -1) {
            console.warn("Component not found", componentId);
            return state;
        }
        const matchingContentItem = state.content[contentIndex];

        const newContentItem =
            "component" in matchingContentItem
                ? {
                      ...matchingContentItem,
                      component: {
                          ...matchingContentItem.component,
                          ...updater(matchingContentItem.component, matchingContentItem, state),
                      },
                  }
                : {
                      ...matchingContentItem,
                      components: matchingContentItem.components.map((component) => {
                          if (component.id === componentId) {
                              return {
                                  ...component,
                                  ...updater(component, matchingContentItem, state),
                              };
                          }
                          return component;
                      }),
                  };
        return calculateItems({
            ...state,
            content: [
                ...state.content.slice(0, contentIndex),
                newContentItem,
                ...state.content.slice(contentIndex + 1),
            ],
        });
    }
    return state;
}
