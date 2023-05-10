import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import DataToggle from "../../../../components/DataToggle";
import tricks from "../../data/stunts-en.csv";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import StuntCard from "../gameComponents/StuntCard";

const CARDS_PER_PAGE = 4 * 4;
const stuntItems = multiplyByCount(tricks, "cardCount", defaultCountAdapter);
export default function StuntCardPages() {
    return (
        <>
            {chunk(stuntItems, CARDS_PER_PAGE).map((effects, pageIndex) => (
                <PrintPage key={"page-" + pageIndex}>
                    <div className="flex flex-wrap content-center items-center">
                        {effects.map((asset, assetIndex) => (
                            <StuntCard key={asset.slug + "-" + assetIndex} {...asset} className="relative">
                                <PrintMarkerCorners />
                            </StuntCard>
                        ))}
                        <h2 className="text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                            Stunts {pageIndex + 1}/{Math.ceil(stuntItems.length / CARDS_PER_PAGE)}
                        </h2>
                    </div>
                </PrintPage>
            ))}
            <DataToggle
                data={stuntItems}
                initialCollapsed
                className="print:hidden flex flex-col w-full items-start relative"
            />
        </>
    );
}
