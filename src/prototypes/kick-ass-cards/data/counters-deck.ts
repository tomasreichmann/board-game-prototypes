import counterData from "./counters.csv";

export type CounterType = {
    slug: string;
    title: string;
    icon: string;
    deck: string;
    count: number;
};

const counters: CounterType[] = counterData.map(({ count, ...item }) => ({
    ...item,
    count: Number(count),
}));

export const countersMap = counters.reduce((map, item) => {
    map[item.slug] = item;
    return map;
}, {} as { [key: string]: CounterType });

export default counters;
