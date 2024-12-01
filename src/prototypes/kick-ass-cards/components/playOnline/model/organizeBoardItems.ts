import { twMerge } from "tailwind-merge";
import { PositionProps, PositionType } from "../../../../../components/PerspectiveView/Position";
import { ContentItemProps } from "../components/ContentItem";
import degreesToRadians from "../../../../../utils/degreesToRadians";

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

    return content.map((content, index) => {
        const isSelectedOffset = content.isSelected ? 5 : 0;
        return {
            ...content,
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
    const startRotateZ = rotateZ - edgeRotation / 2;
    const endRotateZ = rotateZ + edgeRotation / 2;
    const rotateZStep = (endRotateZ - startRotateZ) / (contentCount - 1);

    const lastContentWidth = content[contentCount - 1]?.positionProps?.width ?? 0;
    const endX = baseX + width - lastContentWidth;
    const xStep = (endX - baseX) / (contentCount - 1);

    // modifier based on rotateX

    const rotationCoefficientY = Math.cos(degreesToRadians(rotateX));
    const rotationCoefficientZ = Math.sin(degreesToRadians(rotateX));

    return content.map((contentItem, index) => {
        const isSelectedOffset = contentItem.isSelected ? 0.5 : 0;
        const rotateZ = startRotateZ + index * rotateZStep; // remove 0
        const x = baseX + index * xStep;
        const currentCenterOffset =
            (Math.sin((Math.PI / (contentCount - 1)) * index) + isSelectedOffset) * centerOffset;

        const currentStackOffset = index * stackOffset;

        const y = baseY - currentCenterOffset * rotationCoefficientY;
        const z = baseZ - currentCenterOffset * rotationCoefficientZ + currentStackOffset;

        return {
            ...contentItem,
            positionProps: { ...contentItem.positionProps, rotateX, rotateZ, rotateY, x, y, z },
        };
    });
};
