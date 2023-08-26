import React from "react";
import MdxArticle from "../content/MdxArticle";
import Credits from "../content/Credits";
import ToggleData from "../../../../components/DataToggle";
import PrequelCard from "../gameComponents/PrequelCard";

import prequelCards from "../../data/prequelInAPubCards.csv";

import prequelArticle from "../../content/prequel.mdx";
import inAPubArticle from "../../content/prequel-in-a-pub.mdx";
import inAPubPlaytestersArticle from "../../content/prequel-in-a-pub-playtesters.mdx";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import { chunk } from "lodash";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import Rules from "../gameComponents/Rules";
import PrintMarker from "../../../../components/print/PrintMarker/PrintMarker";

const allCards = multiplyByCount(prequelCards, "count", defaultCountAdapter);

const CARDS_PER_PAGE = 9;

export default function PrequelRoute() {
    return (
        <div className="mt-4 print:m-0 print:p-0 w-full text-jd-iron md:py-5 px-2 md:px-10 flex gap-5 flex-wrap print:block relative">
            <PrintPage className="rounded">
                <Rules isPrint />
            </PrintPage>
            <PrintPage className="rounded">
                <MdxArticle mdx={prequelArticle} className="mb-5" />
            </PrintPage>
            <PrintPage className="rounded">
                <MdxArticle mdx={inAPubArticle} className="mb-5" />
            </PrintPage>
            {chunk(allCards, CARDS_PER_PAGE).map((cards, pageIndex) => (
                <React.Fragment key={pageIndex}>
                    <PrintPage
                        key={"card-page-front-" + pageIndex}
                        contentClassName="overflow-hidden border-2 border-slate-200"
                    >
                        <div className="flex flex-wrap justify-center content-center items-center">
                            {cards.map((card, cardIndex) => (
                                <PrequelCard key={cardIndex} {...card}>
                                    <PrintMarker
                                        left
                                        top
                                        noTopMarker={cardIndex > 2}
                                        noLeftMarker={cardIndex % 3 !== 0}
                                        bleedMm={3}
                                        offsetMm={-1}
                                    />
                                    <PrintMarker
                                        right
                                        top
                                        noTopMarker={cardIndex > 2}
                                        noRightMarker={cardIndex % 3 !== 2}
                                        bleedMm={3}
                                        offsetMm={-1}
                                    />
                                    <PrintMarker
                                        right
                                        bottom
                                        noBottomMarker={cardIndex < 6}
                                        noRightMarker={cardIndex % 3 !== 2}
                                        bleedMm={3}
                                        offsetMm={-1}
                                    />
                                    <PrintMarker
                                        left
                                        bottom
                                        noBottomMarker={cardIndex < 6}
                                        noLeftMarker={cardIndex % 3 !== 0}
                                        bleedMm={3}
                                        offsetMm={-1}
                                    />
                                </PrequelCard>
                            ))}
                            {/* <h2 className="text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                                Cards front {pageIndex * 2 + 1}/{Math.ceil(allCards.length / CARDS_PER_PAGE) * 2}
                            </h2> */}
                        </div>
                    </PrintPage>
                    <PrintPage
                        key={"card-page-back-" + pageIndex}
                        className="-scale-x-100"
                        contentClassName="overflow-hidden border-2 border-slate-200"
                    >
                        <div className="flex flex-wrap justify-center content-center items-center -scale-x-100">
                            {cards.map((card, cardIndex) => (
                                <PrequelCard isFaceDown key={cardIndex} {...card}>
                                    <PrintMarker
                                        left
                                        top
                                        noTopMarker={cardIndex > 2}
                                        noLeftMarker={cardIndex % 3 !== 0}
                                        bleedMm={3}
                                        offsetMm={-1}
                                    />
                                    <PrintMarker
                                        right
                                        top
                                        noTopMarker={cardIndex > 2}
                                        noRightMarker={cardIndex % 3 !== 2}
                                        bleedMm={3}
                                        offsetMm={-1}
                                    />
                                    <PrintMarker
                                        right
                                        bottom
                                        noBottomMarker={cardIndex < 6}
                                        noRightMarker={cardIndex % 3 !== 2}
                                        bleedMm={3}
                                        offsetMm={-1}
                                    />
                                    <PrintMarker
                                        left
                                        bottom
                                        noBottomMarker={cardIndex < 6}
                                        noLeftMarker={cardIndex % 3 !== 0}
                                        bleedMm={3}
                                        offsetMm={-1}
                                    />
                                </PrequelCard>
                            ))}
                            {/* <h2 className=" text-2xl font-kacHeading text-kac-steel-dark w-full text-center">
                                Cards back {pageIndex * 2 + 2}/{Math.ceil(allCards.length / CARDS_PER_PAGE) * 2}
                            </h2> */}
                        </div>
                    </PrintPage>
                </React.Fragment>
            ))}
            {/* <div>
                <ToggleData data={prequelCards} className="mb-5" />
                <MdxArticle mdx={inAPubPlaytestersArticle} className="mb-5" />
                <Credits />
            </div> */}
        </div>
    );
}
