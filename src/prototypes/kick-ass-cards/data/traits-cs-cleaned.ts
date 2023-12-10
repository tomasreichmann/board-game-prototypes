import traitsDataRaw from "./traits-cs.csv";

const traitsData = traitsDataRaw.map((item) => ({
    ...item,
    positiveRating: Number(item.positiveRating),
    frequency: Number(item.frequency),
}));

export default traitsData;
