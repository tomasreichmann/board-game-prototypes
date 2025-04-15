declare module "*outcomes-en.csv" {
    import { OutcomeType } from "../types";
    const value: (OutcomeType & {count: string})[];
    export default value;
}
