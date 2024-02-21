import assets from "../../data/assets-en.csv";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import AssetCard, { AssetCardBackFace } from "../gameComponents/AssetCard";
import ChunkedPages from "./ChunkedPages";

const CARDS_PER_PAGE = 4 * 4;
const assetItems = multiplyByCount(assets, "cardCount", defaultCountAdapter).map((item) => ({
    ...item,
    bleedMm: 3,
    className: "relative -m-[3mm]",
}));
export default function AssetCardPages() {
    return (
        <ChunkedPages
            Component={AssetCard}
            BackFaceComponent={AssetCardBackFace}
            items={assetItems}
            itemsPerPage={CARDS_PER_PAGE}
            frontFacePrintPageProps={{
                bleedInMm: 0,
                contentClassName: "p-[3mm]",
            }}
            backFacePrintPageProps={{
                bleedInMm: 0,
                contentClassName: "p-[3mm]",
            }}
            label="Assets"
        />
    );
}
