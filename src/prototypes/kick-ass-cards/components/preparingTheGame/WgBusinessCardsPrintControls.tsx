import { twMerge } from "tailwind-merge";
import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import ChunkedPages, { ChunkedPagesProps } from "../print/ChunkedPages";
import { getPaperFitCountByFormat } from "../../../../components/print/PrintPage/PrintPage";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import WgBusinessCard, { WgBusinessCardBackFace } from "../gameComponents/WgBusinessCard";
import Print from "../../../../components/print/Print";
import { usePrintControlsStore } from "./PaperAndCardControls";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";

export type WgBusinessCardsPrintControlsProps = {
    className?: string;
};

export default function WgBusinessCardsPrintControls({ className }: WgBusinessCardsPrintControlsProps) {
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

    const chunkedPagesProps = useChunkedPagesProps();
    console.log("chunkedPagesProps", chunkedPagesProps);

    const items = useItemAdapter(
        range(itemCount).map((itemIndex) => ({
            ...item,
            slug: itemIndex,
            className: "relative",
        }))
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
            <ToggleData data={{ items, chunkedPagesProps }} initialCollapsed className="print:hidden mt-4" />
            <Print>
                <ChunkedPages
                    Component={WgBusinessCard}
                    BackFaceComponent={WgBusinessCardBackFace}
                    items={items}
                    {...chunkedPagesProps}
                    label="WG Business Card"
                />
            </Print>
        </div>
    );
}
