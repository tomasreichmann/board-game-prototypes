import { range } from "lodash";

export const defaultCountAdapter = <T extends { slug: string }>(item: T, itemIndex: number, countIndex: number): T => ({
    ...item,
    slug: item.slug + "-" + countIndex,
});

export default function multiplyByCount<P extends string, T extends { [key in P]: number }>(
    list: T[],
    countKey: P,
    adapter: (item: T, itemIndex: number, countIndex: number) => T
) {
    return list.reduce((list, item, itemIndex) => {
        list.push(...range(item[countKey]).map((countIndex) => adapter(item, itemIndex, countIndex)));
        return list;
    }, [] as T[]);
}
