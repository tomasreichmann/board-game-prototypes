import { ContentType } from "../types";

export default function groupContentItems(contentItems: ContentType[]) {
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
            const wrapperItem: ContentType = { component: wrapperComponent, children: groupContentItems(sequence) };
            // push wrapper to result
            result.push(wrapperItem);
        } else {
            result.push(item);
        }
    }
    return result;
}
