import { ErrorResponse } from "use-google-sheets/dist/types";
import { PlayerCharacterType } from "../types";
import arrayToMap from "../../../utils/arrayToMap";
import playerCharactersDataAdapter from "../adapters/playerCharactersDataAdapter";
import { useActionDecks } from "./useActions";
import useSheetData from "./useSheetData";

export const usePlayerCharacters = (): {
    data: PlayerCharacterType[] | undefined;
    loading: boolean;
    error: null | ErrorResponse;
} => {
    const sheetData = useSheetData();
    const { data: actionDecks } = useActionDecks();
    if (!sheetData.data || !actionDecks) {
        return { ...sheetData, data: undefined };
    }
    const playerCharactersSheet = sheetData.data.find((item: { id: string }) => item.id === "player characters");

    const actionDeckMap = arrayToMap(actionDecks, "slug");

    const data = playerCharactersSheet
        ? playerCharactersDataAdapter(playerCharactersSheet.data as Record<string, string>[], actionDeckMap)
        : undefined;
    return { ...sheetData, data };
};
