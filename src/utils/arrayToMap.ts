export default function arrayToMap<Item, Slug extends Item[keyof Item]>(
    array: Item[],
    slug: Slug
) {
    return array.reduce((map, item) => {
        const key = item[slug as keyof typeof item];
        map[key as string] = item;
        return map;
    }, {} as { [key: string]: Item });
}
