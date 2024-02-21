import tricks from "../../data/stunts-en.csv";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import StuntCard, { StuntCardBackFace } from "../gameComponents/StuntCard";
import ChunkedPages from "./ChunkedPages";

const CARDS_PER_PAGE = 4 * 4;
const allStunts = multiplyByCount(tricks, "cardCount", defaultCountAdapter).map((item) => ({
    ...item,
    bleedMm: 3,
    className: "relative -m-[3mm]",
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
                bleedInMm: 0,
                contentClassName: "p-[3mm]",
            }}
            backFacePrintPageProps={{
                bleedInMm: 0,
                contentClassName: "p-[3mm]",
            }}
            label="Stunts"
        />
    );
}
