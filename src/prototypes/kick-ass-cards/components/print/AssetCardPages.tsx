import assets from "../../data/assets-en.csv";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import AssetCard, { AssetCardBackFace } from "../gameComponents/AssetCard";
import ChunkedPages from "./ChunkedPages";

const CARDS_PER_PAGE = 2 * 4;
const assetItems = multiplyByCount(assets, "count", defaultCountAdapter)
    .map((item) => ({
        ...item,
        bleedMm: 3,
        className: "relative",
        size: "54x86",
    }))
    .filter((item) => item.deck !== "sci-fi");
export default function AssetCardPages() {
    return (
        <ChunkedPages
            Component={AssetCard}
            BackFaceComponent={AssetCardBackFace}
            items={assetItems}
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
            label="Assets"
        />
    );
}
