import { range } from "lodash";

export const defaultCountAdapter = <T extends { slug: string }>(item: T, itemIndex: number, countIndex: number): T => ({
    ...item,
    slug: item.slug + "-" + countIndex,
});

export default function multiplyByCount<P extends string, T extends { [key in P]?: number }>(
    list: T[],
    countKey: P,
    adapter: (item: T, itemIndex: number, countIndex: number) => T
) {
    return list.reduce((list, item, itemIndex) => {
        const countValue = ((countKey in item) as { [key in P]: number }) && item[countKey];
        const count = countValue !== undefined ? countValue : 1;

        list.push(...range(count).map((countIndex) => adapter(item, itemIndex, countIndex)));
        return list;
    }, [] as T[]);
}
