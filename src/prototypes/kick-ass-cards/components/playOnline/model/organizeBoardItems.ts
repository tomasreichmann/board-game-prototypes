import { twMerge } from "tailwind-merge";
import { PositionProps, PositionType } from "../../../../../components/PerspectiveView/Position";
import { ContentItemProps } from "../components/ContentItem";
import degreesToRadians from "../../../../../utils/degreesToRadians";
import { range } from "lodash";
import { ContentItemTypeEnum } from "../types";

export type OrganizeDeckOptionsType = {
    stackShift?: number;
};

const defaultDeckStackShift = 2;

export const organizeDeck = (
    content: ContentItemProps[],
    basePosition: Required<Pick<PositionType, "x" | "y" | "z">> & Partial<PositionProps>,
    options?: OrganizeDeckOptionsType
): ContentItemProps[] => {
    const { stackShift = defaultDeckStackShift } = options || {};
    const { x, y, z, className, ...restBaseProps } = basePosition;

    return content.map((content, index, allItems) => {
        const isSelectedOffset = content.isSelected ? 5 : 0;
        const isLast = index === allItems.length - 1;
        return {
            ...content,
            castShadow: isLast,
            positionProps: {
                ...restBaseProps,
                ...content.positionProps,
                x,
                y,
                z: z + (index + isSelectedOffset) * stackShift,
            },
        };
    });
};

export type OrganizeDiscardOptionsType = {
    stackShift?: number;
    rotationList?: number[];
};

const defaultDiscardStackShift = 2;
const defaultDiscardRotationList = range(10).map(() => Math.floor(-15 + 30 * Math.random()));

export const organizeDiscard = (
    content: ContentItemProps[],
    basePosition: Required<Pick<PositionType, "x" | "y" | "z">> & Partial<PositionProps>,
    options?: OrganizeDiscardOptionsType
): ContentItemProps[] => {
    const { stackShift = defaultDiscardStackShift, rotationList = defaultDiscardRotationList } = options || {};
    const { x, y, z, className, ...restBaseProps } = basePosition;

    return content.map((content, index) => {
        const isSelectedOffset = content.isSelected ? 5 : 0;
        const isPlaceholder = content.type === ContentItemTypeEnum.PlaceholderCard;
        return {
            ...content,
            positionProps: {
                ...restBaseProps,
                ...content.positionProps,
                rotateZ:
                    (content.positionProps.rotateZ ?? 0) +
                    (isPlaceholder ? 0 : rotationList[index % rotationList.length]),
                x,
                y,
                z: z + (index + isSelectedOffset) * stackShift,
            },
        };
    });
};

export type OrganizeHandOptionsType = {
    edgeRotation?: number;
    centerOffset?: number;
    stackOffset?: number; // how much should each consecutive card shift up
};
const defaultHandEdgeRotation = 15;
const defaultHandCenterOffset = 30;
const defaultHandStackShift = defaultDeckStackShift;

const getContentWidth = (content: ContentItemProps[]) =>
    content.reduce((acc, content) => acc + (content?.positionProps?.width ?? 0), 0);

export const organizeHand = (
    content: ContentItemProps[],
    basePosition: Required<Pick<PositionType, "x" | "y" | "z" | "width" | "height">> & Partial<PositionType>,
    options?: OrganizeHandOptionsType
): ContentItemProps[] => {
    const {
        x: baseX = 0,
        y: baseY = 0,
        z: baseZ = 0,
        height = content[0]?.positionProps?.height ?? 0,
        rotateX = 0,
        rotateY = 0,
        rotateZ = 0,
    } = basePosition;
    const {
        edgeRotation = defaultHandEdgeRotation,
        centerOffset = defaultHandCenterOffset,
        stackOffset = defaultHandStackShift,
    } = options || {};

    const width = basePosition.width ?? getContentWidth(content);

    const contentCount = content.length;
    const startRotateZ = contentCount > 1 ? rotateZ - edgeRotation / 2 : 0;
    const endRotateZ = contentCount > 1 ? rotateZ + edgeRotation / 2 : 0;
    const rotateZStep = contentCount > 1 ? (endRotateZ - startRotateZ) / (contentCount - 1) : 0;

    const lastContentWidth = content[contentCount - 1]?.positionProps?.width ?? 0;
    const endX = baseX + width - lastContentWidth;
    const xStep = contentCount > 1 ? (endX - baseX) / (contentCount - 1) : 0;

    // modifier based on rotateX

    const rotationCoefficientY = Math.cos(degreesToRadians(rotateX));
    const rotationCoefficientZ = Math.sin(degreesToRadians(rotateX));

    return content.map((contentItem, index) => {
        const isSelectedOffset = contentItem.isSelected ? 0.5 : 0;
        const rotateZ = startRotateZ + (contentCount > 1 ? index * rotateZStep : 0); // remove 0
        const x = baseX + (contentCount > 1 ? index * xStep : 0);
        const currentCenterOffset =
            (contentCount > 1 ? Math.sin((Math.PI / (contentCount - 1)) * index) : 0) + isSelectedOffset;
        const currentStackOffset = index * stackOffset;

        const y = baseY - currentCenterOffset * rotationCoefficientY;
        const z = baseZ - currentCenterOffset * rotationCoefficientZ + currentStackOffset;

        return {
            ...contentItem,
            positionProps: { ...contentItem.positionProps, rotateX, rotateZ, rotateY, x, y, z },
        };
    });
};
