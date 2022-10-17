export default function countByProperty<Item, P extends Item[keyof Item]>(
    array: Item[],
    propertyName: P
) {
    return array.reduce((map, item) => {
        const key = item[propertyName as keyof typeof item];
        map[key as string] = (map[key as string] || 0) + 1;
        return map;
    }, {} as { [key: string]: number });
}
