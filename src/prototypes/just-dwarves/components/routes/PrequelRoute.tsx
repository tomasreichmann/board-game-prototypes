import React from "react";
import MdxArticle from "../content/MdxArticle";
import prequelCards from "../../data/prequelCards.csv";
import Credits from "../content/Credits";
import ToggleData from "../../../../components/DataToggle";
import PrequelCard from "../gameComponents/PrequelCard";

import prequelArticle from "../../content/prequel.mdx";
import inAPubArticle from "../../content/prequel-in-a-pub.mdx";
import inAPubPlaytestersArticle from "../../content/prequel-in-a-pub-playtesters.mdx";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import { chunk } from "lodash";

const standardHand = prequelCards.slice(1);
const handWithFart = [prequelCards[0], ...prequelCards.slice(2)];
const allCards = [...handWithFart, ...standardHand, ...standardHand, ...standardHand];

const CARDS_PER_PAGE = 16;

export default function PrequelRoute() {
    return (
        <div className="mt-4 print:m-0 print:p-0 w-full text-jd-iron md:py-5 px-2 md:px-10 flex gap-5 flex-wrap print:block relative">
            <PrintPage className="rounded">
                <MdxArticle mdx={prequelArticle} className="mb-5" />
            </PrintPage>
            <PrintPage className="rounded">
                <MdxArticle mdx={inAPubArticle} className="mb-5" />
            </PrintPage>
            {chunk(allCards, CARDS_PER_PAGE).map((cards, pageIndex) => (
                <>
                    <PrintPage
                        key={"card-page-" + pageIndex}
                        contentClassName="overflow-hidden border-2 border-slate-200"
                    >
                        <div className="flex flex-wrap justify-center content-center items-center">
                            {cards.map((card) => (
                                <PrequelCard key={card.name} {...card} />
                            ))}
                            <h2 className="text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                                Cards front {pageIndex * 2 + 1}/{Math.ceil(allCards.length / CARDS_PER_PAGE) * 2}
                            </h2>
                        </div>
                    </PrintPage>
                    <PrintPage
                        key={"card-page-" + pageIndex}
                        className="-scale-x-100"
                        contentClassName="overflow-hidden border-2 border-slate-200"
                    >
                        <div className="flex flex-wrap justify-center content-center items-center">
                            {cards.map((card, cardIndex) => (
                                <PrequelCard isFaceDown key={cardIndex} {...card} />
                            ))}
                            <h2 className="-scale-x-100 text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                                Cards back {pageIndex * 2 + 2}/{Math.ceil(allCards.length / CARDS_PER_PAGE) * 2}
                            </h2>
                        </div>
                    </PrintPage>
                </>
            ))}
            <div>
                <ToggleData data={prequelCards} className="mb-5" />
                <MdxArticle mdx={inAPubPlaytestersArticle} className="mb-5" />
                <Credits />
            </div>
        </div>
    );
}
