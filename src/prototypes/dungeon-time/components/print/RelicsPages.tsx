import { chunk } from "lodash";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import RelicCard from "../gameComponents/RelicCard";
import DataToggle from "../../../../components/DataToggle";
import { useRelics } from "../../hooks/useRelics";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";

const CARDS_PER_PAGE = 3 * 3;

export default function RelicsPages() {
    const { data } = useRelics();
    const relics = data ? multiplyByCount(data, "cardCount", defaultCountAdapter) : [];
    const totalPages = Math.ceil(relics.length / CARDS_PER_PAGE);
    return (
        <>
            {chunk(relics, CARDS_PER_PAGE).map((relics, pageIndex) => (
                <PrintPage key={"enemy-cards-page-" + pageIndex}>
                    <div className="flex flex-wrap content-center items-center">
                        {relics.map((enemy) => (
                            <RelicCard key={enemy.slug} {...enemy} className="relative">
                                <PrintMarkerCorners />
                            </RelicCard>
                        ))}
                        <h2 className="text-2xl font-dtHeading text-blood-3 w-full text-center">
                            Relics {pageIndex + 1}/{totalPages}
                        </h2>
                    </div>
                </PrintPage>
            ))}
            <div className="w-full">
                <DataToggle data={relics} initialCollapsed />
            </div>
        </>
    );
}
