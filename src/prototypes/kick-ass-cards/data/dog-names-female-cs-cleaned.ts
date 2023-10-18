import raw from "./dog-names-female-cs.csv";

const dogNamesFemaleCs = raw.map((item) => ({
    ...item,
    weight: Number(item.weight),
}));

export default dogNamesFemaleCs;
