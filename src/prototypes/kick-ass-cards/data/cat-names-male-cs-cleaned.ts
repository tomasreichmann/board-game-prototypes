import raw from "./cat-names-male-cs.csv";

const catNamesMaleCs = raw.map((item) => ({
    ...item,
    weight: Number(item.weight),
}));

export default catNamesMaleCs;
