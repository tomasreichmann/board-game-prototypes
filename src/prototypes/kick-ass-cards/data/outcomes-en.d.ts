import { OutcomeType } from "../types";

declare module "*outcomes-en.csv" {
    const value: OutcomeType[];
    export default value;
}
