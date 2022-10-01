import { IconType } from "../components/Icon/Icon";
import { EncounterType, StageType } from "../types";
import camelCaseObjectKeys from "../utils/camelCaseObjectKeys";

export default function stagesDataAdapter(
    stagesData: Record<string, string>[],
    encounterMap: { [key: string]: EncounterType }
): StageType[] {
    return stagesData.map((playerCharacter) => {
        const {
            slug,
            name,
            icon,
            type,
            tier,
            stageIndex,
            optionIndex,
            environment,
            encounterSlug,
            nextStageSlugs,
            nextStageSlug1,
            nextStageSlug2,
            nextStageSlug3,
        } = camelCaseObjectKeys(playerCharacter) as Record<string, string>;
        return {
            slug,
            name,
            icon: icon as IconType,
            type,
            tier: parseInt(tier, 10),
            stageIndex: parseInt(stageIndex, 10),
            optionIndex: parseInt(optionIndex, 10),
            environment,
            encounterSlug,
            encounter: encounterMap[encounterSlug],
            nextStageSlugs: nextStageSlugs
                .trim()
                .split(/\s+/)
                .filter((slug) => slug.length > 0),
            nextStageSlug1,
            nextStageSlug2,
            nextStageSlug3,
        };
    });
}
