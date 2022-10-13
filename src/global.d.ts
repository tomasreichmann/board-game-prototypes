import { OutcomeType } from "./prototypes/dungeon-time/types";

declare module "*outcomes.csv" {
    const value: OutcomeType[];
    export default value;
}

declare module "*.csv" {
    const value: Record<string, string>[];
    export default value;
}
