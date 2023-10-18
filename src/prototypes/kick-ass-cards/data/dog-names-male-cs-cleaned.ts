import raw from "./dog-names-male-cs.csv";

const dogNamesMaleCs = raw.map((item) => ({
    ...item,
    weight: Number(item.weight),
}));

export default dogNamesMaleCs;
