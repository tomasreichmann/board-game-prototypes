import { useCallback } from "react";
import { StageObjectProps } from "../components/StageObject";
import { LayoutsMapType } from "../types";
import { getGridCardTransform } from "../utils/layoutTransforms";

export const useLayoutManager = <LayoutIds extends string>(layouts: LayoutsMapType<LayoutIds>) => {
    const getCardTransform = useCallback(
        (layoutId: LayoutIds, cardIndex: number): Partial<StageObjectProps> => {
            const layout = layouts[layoutId];
            if (!layout) {
                console.warn(`Layout with id "${layoutId}" not found.`);
                return {};
            }

            switch (layout.type) {
                case "grid":
                    return getGridCardTransform(layout, cardIndex);
                default:
                    return {};
            }
        },
        [layouts] // Dependency array ensures function is stable if layouts object is stable
    );

    return { getCardTransform };
};
