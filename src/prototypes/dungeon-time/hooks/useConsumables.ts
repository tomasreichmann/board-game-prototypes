import { ErrorResponse } from "use-google-sheets/dist/types";
import { ConsumableType } from "../types";
import consumablesDataAdapter from "./consumablesDataAdapter";
import useSheetData from "./useSheetData";

export const useConsumables = (): {
    data: ConsumableType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    if (!sheetData.data) {
        return { ...sheetData, data: undefined };
    }
    const sheet = sheetData.data.find(
        (item: { id: string }) => item.id === "consumables"
    );
    const data = sheet
        ? consumablesDataAdapter(sheet.data as Record<string, string>[])
        : undefined;
    return { ...sheetData, data };
};
