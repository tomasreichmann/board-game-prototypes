import React, { useState } from "react";
import MdxArticle from "../content/MdxArticle";
import Credits from "../content/Credits";
import ToggleData from "../../../../components/DataToggle";
import PrequelCard from "../gameComponents/PrequelCard";

import prequelCards from "../../data/prequelInAPubCards.csv";

import prequelArticle from "../../content/prequel.mdx";
import inAPubArticle from "../../content/prequel-in-a-pub.mdx";
// import inAPubPlaytestersArticle from "../../content/prequel-in-a-pub-playtesters.mdx";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import { chunk } from "lodash";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import PrequelRules from "../gameComponents/PrequelRules";
import PrintMarker from "../../../../components/print/PrintMarker/PrintMarker";
import PaperCraftBox from "../../../../components/print/PaperCraftBox";
import { cardSizes } from "../../../../components/print/paperSizes";
import CardBox from "../../../../components/print/CardBox";

const allCards = multiplyByCount(prequelCards, "count", defaultCountAdapter);

const CARDS_PER_PAGE = 9;

const cardPaperThickness = 0.23; // 250gsm art paper
const boxPaperThickness = 0.46; // 350gsm single side coated board
const rulesPaperThickness = 0.12; // 100gsm offset paper

const cardHeight = cardSizes.Bridge.mm[1];
const cardWidth = cardSizes.Bridge.mm[0];
const margin = 1;

const rulePages = 6;
const rulePagesDoublesided = rulePages / 2;
const extraCards = 15;

const smallBox = {
    contentHeight: cardHeight + margin * 2,
    contentWidth: cardWidth + margin * 2 + boxPaperThickness * 2,
    contentDepth:
        (allCards.length + extraCards) * cardPaperThickness +
        margin * 2 +
        boxPaperThickness * 2 +
        rulePagesDoublesided * rulesPaperThickness,
};

const parts = [
    { label: "All", parts: ["box", "rules", "cards", "projectInfo", "oldRules"] },
    { label: "Box", parts: ["box"] },
    { label: "Rules", parts: ["rules"] },
    { label: "Cards", parts: ["cards"] },
];

export default function PrequelRoute() {
    const [showParts, setShowParts] = useState(parts[0].parts);
    return (
        <div className="mt-4 print:m-0 print:p-0 w-full text-jd-iron md:py-5 px-2 md:px-10 flex gap-5 flex-wrap print:block relative">
            <div className="flex flex-col flex-wrap gap-2 print:hidden">
                {parts.map(({ label, parts }) => {
                    return (
                        <button
                            key={label}
                            onClick={() => setShowParts(parts)}
                            className={
                                "btn btn-sm  text-jd-gold-light  hover:text-jd-gold-light " +
                                (showParts === parts
                                    ? "border-jd-emerald-darkest bg-jd-emerald hover:bg-jd-emerald-light hover:border-jd-emerald"
                                    : "border-jd-gold-darkest bg-jd-gold hover:bg-jd-gold-light hover:border-jd-gold")
                            }
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
            {showParts.includes("box") && (
                <PrintPage className="rounded">
                    {/* <PaperCraftBox
                        {...smallBox}
                        paperThickness={boxPaperThickness}
                        classNameVisible="bg-jd-shitty-paper-dark"
                        bendStyles={{ borderColor: "#1c0726" }}
                        contentLidOutsideTop={
                            <img src="/JD/in-a-pub/box-front.png" className="absolute w-full h-full object-cover" />
                        }
                        contentBoxOutsideBottom={
                            <img
                                src="/JD/in-a-pub/box-back.png"
                                className="absolute top-0 left-0 w-full h-full max-w-none max-h-none object-cover object-center"
                            />
                        }
                        contentLidOutsideFront={
                            <div className="absolute top-0 left-0 w-full h-full bg-shitty-dark">
                                <img
                                    src="/JD/in-a-pub/logo.png"
                                    className="absolute top-[5%] left-[5%] w-[90%] h-[90%] max-w-none max-h-none object-contain object-center"
                                />
                            </div>
                        }
                    /> */}
                    <CardBox
                        {...smallBox}
                        paperThickness={boxPaperThickness}
                        classNamePartVisible="bg-jd-shitty-paper-dark"
                        bendStyles={{
                            top: { borderTop: "1px solid #1c0726" },
                            left: { borderLeft: "1px solid #1c0726" },
                            bottom: { borderBottom: "1px solid #1c0726" },
                            right: { borderRight: "1px solid #1c0726" },
                        }}
                        cutStyles={{
                            top: { borderTop: "1px solid #1c0726" },
                            left: { borderLeft: "1px solid #1c0726" },
                            bottom: { borderBottom: "1px solid #1c0726" },
                            right: { borderRight: "1px solid #1c0726" },
                        }}
                        classNameLabel="text-slate-200"
                        contentFront={
                            <img src="/JD/in-a-pub/box-front.png" className="absolute w-full h-full object-cover" />
                        }
                        contentBack={
                            <img
                                src="/JD/in-a-pub/box-back.png"
                                className="absolute top-0 left-0 w-full h-full max-w-none max-h-none object-cover object-center"
                            />
                        }
                        contentTop={
                            <div className="absolute top-0 left-0 w-full h-full bg-shitty-dark">
                                <img
                                    src="/JD/in-a-pub/logo.png"
                                    className="absolute top-[5%] left-[5%] w-[90%] h-[90%] max-w-none max-h-none object-contain object-center"
                                />
                            </div>
                        }
                        contentBottom={
                            <div className="absolute top-0 left-0 w-full h-full bg-shitty-dark">
                                <img
                                    src="/JD/in-a-pub/logo.png"
                                    className="absolute top-[5%] left-[5%] w-[90%] h-[90%] max-w-none max-h-none object-contain object-center"
                                />
                            </div>
                        }
                    />
                </PrintPage>
            )}
            {showParts.includes("rules") && (
                <PrintPage className="rounded">
                    <PrequelRules isPrint />
                </PrintPage>
            )}
            {showParts.includes("projectInfo") && (
                <PrintPage className="rounded">
                    <MdxArticle mdx={prequelArticle} className="mb-5" />
                    <pre>{JSON.stringify(smallBox, null, 2)}</pre>
                </PrintPage>
            )}
            {showParts.includes("oldRules") && (
                <PrintPage className="rounded">
                    <MdxArticle mdx={inAPubArticle} className="mb-5" />
                </PrintPage>
            )}
            {showParts.includes("cards") &&
                chunk(allCards, CARDS_PER_PAGE).map((cards, pageIndex) => (
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
