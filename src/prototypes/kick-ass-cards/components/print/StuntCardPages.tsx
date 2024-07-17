import tricks from "../../data/stunts-en.csv";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import StuntCard, { StuntCardBackFace } from "../gameComponents/StuntCard";
import ChunkedPages from "./ChunkedPages";

const CARDS_PER_PAGE = 2 * 4;
const allStunts = multiplyByCount(tricks, "count", defaultCountAdapter).map((item) => ({
    ...item,
    bleedMm: 3,
    size: "54x86",
    className: "relative",
}));
console.log(allStunts);

export default function StuntCardPages() {
    return (
        <ChunkedPages
            Component={StuntCard}
            BackFaceComponent={StuntCardBackFace}
            items={allStunts}
            itemsPerPage={CARDS_PER_PAGE}
            frontFacePrintPageProps={{
                marginsInMm: [7, 10, 7, 10],
                orientation: "landscape",
                bleedInMm: 0,
            }}
            backFacePrintPageProps={{
                marginsInMm: [7, 10, 7, 10],
                orientation: "landscape",
                bleedInMm: 0,
            }}
            label="Stunts"
        />
    );
}
