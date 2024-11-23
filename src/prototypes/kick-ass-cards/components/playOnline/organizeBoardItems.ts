import { PositionType } from "../../../../components/PerspectiveView/Position";
import { ContentItemProps } from "./ContentItem";

export type OrganizeDeckOptionsType = {
    stackShift?: number;
};

const defaultDeckStackShift = 2;

export const organizeDeck = (
    content: ContentItemProps[],
    basePosition: Required<Pick<PositionType, "x" | "y" | "z">> & Partial<PositionType>,
    options?: OrganizeDeckOptionsType
): ContentItemProps[] => {
    const { stackShift = defaultDeckStackShift } = options || {};
    const { x, y, z } = basePosition;
    return content.map((content, index) => ({
        ...content,
        positionProps: { ...content.positionProps, x, y, z: z + index * stackShift },
    }));
};

export type OrganizeHandOptionsType = {
    edgeRotation?: number;
    centerOffset?: number;
};
const defaultHandEdgeRotation = 15;
const defaultHandCenterOffset = 30;

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
    const { edgeRotation = defaultHandEdgeRotation, centerOffset = defaultHandCenterOffset } = options || {};

    const width = basePosition.width ?? getContentWidth(content);

    const contentCount = content.length;
    const startRotateZ = rotateZ - edgeRotation / 2;
    const endRotateZ = rotateZ + edgeRotation / 2;
    const rotateZStep = (endRotateZ - startRotateZ) / (contentCount - 1);

    const lastContentWidth = content[contentCount - 1]?.positionProps?.width ?? 0;
    const endX = baseX + width - lastContentWidth;
    const xStep = (endX - baseX) / (contentCount - 1);

    const rotationCoefficient = 0.4;

    return content.map((content, index) => {
        const rotateZ = startRotateZ + index * rotateZStep;
        const x = baseX + index * xStep;
        const y = baseY - Math.sin((Math.PI / (contentCount - 1)) * index) * centerOffset * (1 - rotationCoefficient);
        const z = baseZ + Math.sin((Math.PI / (contentCount - 1)) * index) * centerOffset * rotationCoefficient;
        // const y = baseY;
        return {
            ...content,
            positionProps: { ...content.positionProps, rotateX, rotateZ, rotateY, x, y, z },
        };
    });
};
