import { ConsumableType } from "../types";
import camelCaseObjectKeys from "../utils/camelCaseObjectKeys";

export default function battleEncountersDataAdapter(
    sheetData: Record<string, string>[]
): ConsumableType[] {
    return sheetData
        .map(
            (dataItem) =>
                camelCaseObjectKeys(dataItem) as Record<
                    keyof ConsumableType,
                    any
                >
        )
        .map((dataItem) => {
            return {
                ...dataItem,
                cost: parseInt(dataItem.cost, 10),
                cardCount: parseInt(dataItem.cardCount, 10),
            } as ConsumableType;
        });
}
