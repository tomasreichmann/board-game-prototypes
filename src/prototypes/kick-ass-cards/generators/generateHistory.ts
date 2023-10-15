import { Culture } from "./schemes/cultureScheme";

export type GenerateHistoryOptions = {
    eventCount?: number;
    initialPeoples?: Culture[];
};

const generateHistory = ({ eventCount = 10, initialPeoples = [] }: GenerateHistoryOptions = {}) => {
    const peoples: Culture[] = [];
    const countries = [];
    const events = [];

    return {
        peoples,
    };
};
export default generateHistory;

export const example = generateHistory({});

console.log(example);
