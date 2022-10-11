import { ErrorResponse } from "use-google-sheets/dist/types";
import { ContentType } from "../types";
import rulesDataAdapter from "../adapters/rulesDataAdapter";
import useSheetData from "./useSheetData";

export const useChangelog = (): {
    data: ContentType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    if (!sheetData.data) {
        return { ...sheetData, data: undefined };
    }
    const rulesSheet = sheetData.data.find((item: { id: string }) => item.id === "changelog");

    const data = rulesSheet ? rulesDataAdapter(rulesSheet.data as Record<string, string>[]) : undefined;
    return { ...sheetData, data };
};
