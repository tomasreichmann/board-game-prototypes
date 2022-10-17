import { ContentType } from "../types";
import camelCaseObjectKeys from "../../../utils/camelCaseObjectKeys";

const groupRules = (contentItems: ContentType[]) => {
    const itemsToParse = [...contentItems];
    const result = [];
    let safeGuard = 1000;
    while (safeGuard-- && itemsToParse.length > 0) {
        const item = itemsToParse.shift();
        if (!item?.component) {
            continue;
        }
        if (item.component?.includes(">")) {
            const itemComponents = item.component?.split(">");
            const wrapperComponent = itemComponents[0];
            // remove first component level
            const sequence = [{ ...item, component: itemComponents.slice(1).join(">") }];
            // find sequence of same first level components
            while (safeGuard-- && itemsToParse[0]?.component?.split(">")[0] === wrapperComponent) {
                // remove sequence from itemsToParse
                const nextItem = itemsToParse.shift();
                // remove first component level
                // group children
                sequence.push({ ...nextItem, component: nextItem?.component?.split(">").slice(1).join(">") as string });
            }
            // create a wrapper
            // assign children to wrapper
            const wrapperItem: ContentType = { component: wrapperComponent, children: groupRules(sequence) };
            // push wrapper to result
            result.push(wrapperItem);
        } else {
            result.push(item);
        }
    }
    return result;
};

export default function rulesDataAdapter(stagesData: Record<string, string>[]): ContentType[] {
    return groupRules(
        stagesData.map((playerCharacter) => {
            const { children, imageUri, component, className } = camelCaseObjectKeys(playerCharacter) as Record<
                string,
                string
            >;
            return {
                children,
                imageUri,
                component,
                className,
            };
        })
    );
}
