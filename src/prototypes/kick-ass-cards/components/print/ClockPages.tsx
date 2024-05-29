import { range } from "lodash";
import { getPaperFitCountByFormat } from "../../../../components/print/PrintPage/PrintPage";
import Clock from "../Clock";
import ChunkedPages from "./ChunkedPages";

const CARDS_PER_PAGE = 12;

const items = range(CARDS_PER_PAGE).map((cardIndex) => {
    const total = [4, 6, 8, 12].at(cardIndex % 4) as number;
    return {
        key: cardIndex,
        forPrint: true,
        total,
        current: 0,
        size: "54x86" as const,
    };
});

const cardsPerPage = getPaperFitCountByFormat("A4", "portrait", "54x86", "portrait", [9, 9, 9, 9], 0, 0);

export default function ClockPages() {
    return <ChunkedPages items={items} itemsPerPage={cardsPerPage} Component={Clock} />;
}
