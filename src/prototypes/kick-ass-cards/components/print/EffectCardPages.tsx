import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";
import effects from "../../data/effects.csv";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import EffectCard from "../gameComponents/EffectCard";

const CARDS_PER_PAGE = 4 * 4;
const effectItems = multiplyByCount(effects, "cardCount", defaultCountAdapter);
export default function EffectCardPages() {
    return (
        <>
            {chunk(effectItems, CARDS_PER_PAGE).map((effects, pageIndex) => (
                <PrintPage key={"page-" + pageIndex}>
                    <div className="flex flex-wrap content-center items-center">
                        {effects.map((asset, assetIndex) => (
                            <EffectCard key={asset.slug + "-" + assetIndex} {...asset} className="relative">
                                <PrintMarkerCorners />
                            </EffectCard>
                        ))}
                        <h2 className="text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                            Effects {pageIndex + 1}/{Math.ceil(effectItems.length / CARDS_PER_PAGE)}
                        </h2>
                    </div>
                </PrintPage>
            ))}
            <DataToggle
                data={effectItems}
                initialCollapsed
                className="print:hidden flex flex-col w-full items-start relative"
            />
        </>
    );
}
