import { ErrorResponse } from "use-google-sheets/dist/types";
import { ActionType } from "../types";
import useSheetData from "./useSheetData";

export const useActions = (): {
    data: ActionType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    console.log("sheetData", sheetData);
    if (!sheetData.data) {
        return { ...sheetData, data: undefined };
    }
    const actions = sheetData.data.find(
        (item: { id: string }) => item.id === "actions"
    );
    const data = actions
        ? actions.data.map((action: { [key: string]: string }) => {
              return {
                  slug: action.slug,
                  effects: action.effects.split(/\s+/),
                  description: action.description,
                  upgradeSlots: parseInt(action["upgrade slots"], 10),
                  upgradeOptionSlugs: action["upgrade option slugs"]
                      .split(/\s+/)
                      .map((slug) => slug.trim()),
                  utilityValue: action["upgrade option slugs"]
                      .split(/\s+/)
                      .map((slug) => slug.trim()),
                  comments: action["comments"] || undefined,
              };
          })
        : undefined;
    return { ...sheetData, data };
};
