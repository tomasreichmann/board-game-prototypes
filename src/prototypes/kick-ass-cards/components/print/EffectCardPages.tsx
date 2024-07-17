import effects from "../../data/effects-en.csv";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import EffectCard, { EffectCardBackFace } from "../gameComponents/EffectCard";
import ChunkedPages from "./ChunkedPages";

const CARDS_PER_PAGE = 2 * 4;
const allEffects = multiplyByCount(effects, "count", defaultCountAdapter).map((item) => ({
    ...item,
    bleedMm: 3,
    size: "54x86",
    className: "relative",
}));
export default function EffectCardPages() {
    return (
        <ChunkedPages
            Component={EffectCard}
            BackFaceComponent={EffectCardBackFace}
            items={allEffects}
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
            label="Effects"
        />
    );
}
