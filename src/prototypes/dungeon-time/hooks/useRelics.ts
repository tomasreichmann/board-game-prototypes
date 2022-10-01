import { ErrorResponse } from "use-google-sheets/dist/types";
import { RelicType } from "../types";
import consumablesDataAdapter from "../adapters/consumablesDataAdapter";
import useSheetData from "./useSheetData";

export const useRelics = (): {
    data: RelicType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    if (!sheetData.data) {
        return { ...sheetData, data: undefined };
    }
    const minorRelicsSheet = sheetData.data.find((item: { id: string }) => item.id === "minor relics");
    const majorRelicsSheet = sheetData.data.find((item: { id: string }) => item.id === "major relics");

    const data = [] as RelicType[];

    if (minorRelicsSheet) {
        data?.push(
            ...consumablesDataAdapter(minorRelicsSheet.data as Record<string, string>[]).map(
                (item) => ({ ...item, type: "minor" } as RelicType)
            )
        );
    }
    if (majorRelicsSheet) {
        data?.push(
            ...consumablesDataAdapter(majorRelicsSheet.data as Record<string, string>[]).map(
                (item) => ({ ...item, type: "major" } as RelicType)
            )
        );
    }

    return { ...sheetData, data: data.length > 0 ? data : undefined };
};
