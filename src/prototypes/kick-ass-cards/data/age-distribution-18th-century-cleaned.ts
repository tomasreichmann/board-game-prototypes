import ageDistributionRaw from "./age-distribution-18th-century.csv";

const ageDistributionData = ageDistributionRaw.map((item) => ({
    ...item,
    fromAge: Number(item.fromAge),
    toAge: Number(item.toAge),
    percentage: Number(item.percentage.slice(0, -1)),
}));

export default ageDistributionData;
