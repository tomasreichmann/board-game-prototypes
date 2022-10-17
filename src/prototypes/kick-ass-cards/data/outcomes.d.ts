import { OutcomeType } from "../types";

declare module "*outcomes.csv" {
    const value: OutcomeType[];
    export default value;
}
