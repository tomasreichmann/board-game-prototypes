import { twMerge } from "tailwind-merge";
import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import ChunkedPages from "./ChunkedPages";
import { getPaperFitCountByFormat } from "../../../../components/print/PrintPage/PrintPage";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import WgBusinessCard, { WgBusinessCardBackFace } from "../gameComponents/WgBusinessCard";
import Print from "../../../../components/print/Print";

export type WgBusinessCardsPrintControlsProps = {
    className?: string;
    paperSize: keyof typeof paperSizes;
    cardSize: keyof typeof cardSizes;
    pageOrientation: "portrait" | "landscape";
    pageMarginsMm: [number, number, number, number];
    bleedMm: number;
    gapMm: [number, number];
};

export default function WgBusinessCardsPrintControls({
    className,
    paperSize,
    cardSize,
    pageOrientation,
    pageMarginsMm,
    bleedMm,
    gapMm,
}: WgBusinessCardsPrintControlsProps) {
    const [itemCount, setItemCount] = useState(8);
    const [item, setItem] = useState({
        name: "Tomáš Reichmann",
        role: "Game UI Team Lead",
        product: "World of Tanks",
        company: "Wargaming Prague, s.r.o",
        email: "t_reichmann@wargaming.net",
        phone: "+420 604 955 416",
        url: "worldoftanks.com",
    });
    const printMarkerSizeMm = bleedMm > 0 ? 1.5 : 0;
    const items = range(itemCount).map((itemIndex) => ({
        ...item,
        slug: itemIndex,
        bleedMm,
        size: cardSize,
        className: "relative",
    }));
    const cardsPerPage = getPaperFitCountByFormat(
        paperSize,
        pageOrientation,
        cardSize,
        "portrait",
        pageMarginsMm,
        bleedMm,
        printMarkerSizeMm
    );

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4 flex flex-row flex-wrap gap-4">
                <Input
                    label="item count"
                    type="number"
                    value={itemCount}
                    onChange={(event) => setItemCount(event.target.valueAsNumber)}
                    className="w-32"
                />
                <Input
                    label="name"
                    type="text"
                    value={item.name}
                    onChange={(event) => setItem((item) => ({ ...item, name: event.target.value }))}
                    className="w-32"
                />
                <Input
                    label="role"
                    type="text"
                    value={item.role}
                    onChange={(event) => setItem((item) => ({ ...item, role: event.target.value }))}
                    className="w-32"
                />
                <Input
                    label="product"
                    type="text"
                    value={item.product}
                    onChange={(event) => setItem((item) => ({ ...item, product: event.target.value }))}
                    className="w-32"
                />
                <Input
                    label="company"
                    type="text"
                    value={item.company}
                    onChange={(event) => setItem((item) => ({ ...item, company: event.target.value }))}
                    className="w-32"
                />
                <Input
                    label="email"
                    type="text"
                    value={item.email}
                    onChange={(event) => setItem((item) => ({ ...item, email: event.target.value }))}
                    className="w-32"
                />
                <Input
                    label="phone"
                    type="text"
                    value={item.phone}
                    onChange={(event) => setItem((item) => ({ ...item, phone: event.target.value }))}
                    className="w-32"
                />
                <Input
                    label="url"
                    type="text"
                    value={item.url}
                    onChange={(event) => setItem((item) => ({ ...item, url: event.target.value }))}
                    className="w-32"
                />
            </div>
            <ToggleData data={{ cardsPerPage, items }} initialCollapsed className="print:hidden mt-4" />
            <Print>
                <ChunkedPages
                    Component={WgBusinessCard}
                    BackFaceComponent={WgBusinessCardBackFace}
                    items={items}
                    itemsPerPage={cardsPerPage}
                    pageContentProps={{ style: { gap: `${gapMm[1]}mm ${gapMm[0]}mm` } }}
                    frontFacePrintPageProps={{
                        size: paperSize,
                        orientation: pageOrientation,
                        bleedInMm: 0,
                        marginsInMm: pageMarginsMm,
                    }}
                    backFacePrintPageProps={{
                        size: paperSize,
                        orientation: pageOrientation,
                        bleedInMm: 0,
                        marginsInMm: pageMarginsMm,
                    }}
                    label="WG Business Card"
                />
            </Print>
        </div>
    );
}
