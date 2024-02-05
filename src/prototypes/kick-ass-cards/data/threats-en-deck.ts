import multiplyByCount, { defaultCountAdapter } from "../../../utils/multiplyByCount";
import threatsDataRaw from "./threats-en.csv";

const threatsData = multiplyByCount(threatsDataRaw, "count", defaultCountAdapter);

export default threatsData;
