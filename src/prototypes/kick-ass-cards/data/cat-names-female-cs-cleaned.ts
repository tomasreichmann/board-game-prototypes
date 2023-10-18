import raw from "./cat-names-female-cs.csv";

const catNamesFemaleCs = raw.map((item) => ({
    ...item,
    weight: Number(item.weight),
}));

export default catNamesFemaleCs;
