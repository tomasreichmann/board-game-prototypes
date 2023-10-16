import LSVOccupationsCsRaw from "./LSV-occupations-cs.csv";

const LSVOccupationsCs = LSVOccupationsCsRaw.map((item) => ({
    ...item,
    femaleWeight: Number(item.femaleWeight),
    maleWeight: Number(item.maleWeight),
}));

export default LSVOccupationsCs;
