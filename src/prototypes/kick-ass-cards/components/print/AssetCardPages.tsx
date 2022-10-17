import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";
import assets from "../../data/assets.csv";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import AssetCard from "../gameComponents/AssetCard";

const CARDS_PER_PAGE = 4 * 4;
const assetItems = multiplyByCount(assets, "cardCount", defaultCountAdapter);
export default function AssetCardPages() {
    return (
        <>
            {chunk(assetItems, CARDS_PER_PAGE).map((assets, pageIndex) => (
                <PrintPage key={"page-" + pageIndex}>
                    <div className="flex flex-wrap content-center items-center">
                        {assets.map((asset, assetIndex) => (
                            <AssetCard key={asset.slug + "-" + assetIndex} {...asset} className="relative">
                                <PrintMarkerCorners />
                            </AssetCard>
                        ))}
                        <h2 className="text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                            Assets {pageIndex + 1}/{Math.ceil(assetItems.length / CARDS_PER_PAGE)}
                        </h2>
                    </div>
                </PrintPage>
            ))}
            <DataToggle
                data={assetItems}
                initialCollapsed
                className="print:hidden flex flex-col w-full items-start relative"
            />
        </>
    );
}
