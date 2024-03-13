import effects from "../../data/effects-en.csv";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import EffectCard, { EffectCardBackFace } from "../gameComponents/EffectCard";
import ChunkedPages from "./ChunkedPages";

const CARDS_PER_PAGE = 4 * 4;
const allEffects = multiplyByCount(effects, "count", defaultCountAdapter).map((item) => ({
    ...item,
    bleedMm: 3,
    className: "relative -m-[3mm]",
}));
export default function EffectCardPages() {
    return (
        <ChunkedPages
            Component={EffectCard}
            BackFaceComponent={EffectCardBackFace}
            items={allEffects}
            itemsPerPage={CARDS_PER_PAGE}
            frontFacePrintPageProps={{
                bleedInMm: 0,
                contentClassName: "p-[3mm]",
            }}
            backFacePrintPageProps={{
                bleedInMm: 0,
                contentClassName: "p-[3mm]",
            }}
            label="Effects"
        />
    );
}
