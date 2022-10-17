import { IconType } from "../components/Icon";
import { ActionDeckType, PlayerCharacterType } from "../types";
import camelCaseObjectKeys from "../../../utils/camelCaseObjectKeys";

export default function playerCharactersDataAdapter(
    playerCharactersData: Record<string, string>[],
    actionDeckMap: { [key: string]: ActionDeckType }
): PlayerCharacterType[] {
    return playerCharactersData.map((playerCharacter) => {
        const { slug, toughness, speed, handSize, startingDeckSlug, icon, ...restData } = camelCaseObjectKeys(
            playerCharacter
        ) as Record<keyof PlayerCharacterType, string>;
        return {
            ...restData,
            slug,
            icon: icon as IconType,
            toughness: parseInt(toughness, 10),
            speed: parseInt(speed, 10),
            handSize: parseInt(handSize, 10),
            startingDeck: actionDeckMap[startingDeckSlug],
            startingDeckSlug,
        };
    });
}
