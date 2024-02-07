declare module "*threats-en.csv" {
    import { ThreatType, WithCount } from "../types";
    export default threats as WithCount<ThreatType>[];
}
