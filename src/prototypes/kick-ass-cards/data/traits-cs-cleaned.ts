import traitsDataRaw from "./traits-cs.csv";

const traitsData = traitsDataRaw.map((item) => ({
    ...item,
    positiveRating: Number(item.positiveRating),
}));

export default traitsData;
