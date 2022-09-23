import { ActionType } from "../types";

export default function actionDataAdapter(
    actionData: { [key: string]: string }[]
): ActionType[] {
    return actionData.map((action) => {
        return {
            slug: action.slug,
            effects: action.effects.split(/\s+/),
            description: action.description,
            upgradeSlots: parseInt(action["upgrade slots"], 10),
            upgradeOptionSlugs: action["upgrade option slugs"]
                .split(/\s+/)
                .map((slug) => slug.trim()),
            utilityValue: parseFloat(action["utility value"]),
            comments: action.comments || undefined,
        };
    });
}
