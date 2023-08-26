import { twMerge } from "tailwind-merge";
import Paper from "../../../../components/print/Paper/Paper";
import Icon from "../misc/Icon";
import GenericRichText from "../../../../components/RichText";
import PrequelCard from "./PrequelCard";
import prequelCards from "../../data/prequelInAPubCards.csv";
import { cardSizes } from "../../../../components/print/paperSizes";
import PrintMarker from "../../../../components/print/PrintMarker/PrintMarker";

const getScaledCardSizeStyle = (cardSize: keyof typeof cardSizes, scale: number, bleedMm = 0) => {
    const [width, height] = cardSizes[cardSize].mm;
    return {
        width: `${(width + bleedMm * 2) * scale}mm`,
        height: `${(height + bleedMm * 2) * scale}mm`,
    };
};

export type RulesProps = {
    isPrint?: boolean;
};

export default function Rules({ isPrint }: RulesProps) {
    return (
        <div className="flex flex-row flex-wrap">
            <Paper
                size="Bridge"
                bleedMm={isPrint ? 3 : 0}
                bleedRightMm={0}
                bleedBottomMm={0}
                className={twMerge(
                    `RulesPage bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`
                )}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden bg-jd-golden-paper text-jd-shitty-text leading-none"
                    style={{ padding: isPrint ? "6mm 3mm 3mm 6mm" : "3mm" }}
                >
                    <h1 className="[font-size:inherit] font-jd-heading mb-1">Just Dwarves In a Pub</h1>
                    <p className="text-xs font-jd-prequel-body leading-tight">
                        This is a fast card game where up to 5 players are trying to restore their dignity and have a
                        good time at a typical dwarven pub.
                    </p>
                    <h2 className="[font-size:inherit] font-jd-heading mt-2">Components</h2>
                    <p className="text-xs font-jd-prequel-body leading-tight">36 cards</p>
                    <div className="relative mt-2">
                        <div
                            className="overflow-hidden ml-6 rounded-md border-[1px] border-jd-shitty-text border-opacity-50"
                            style={getScaledCardSizeStyle("Bridge", 0.5)}
                        >
                            <PrequelCard
                                {...prequelCards[4]}
                                className="scale-50 origin-top-left  ml-[-1.5mm] mt-[-1.5mm]"
                            />
                        </div>
                        <div className="font-jd-prequel-body [letter-spacing:-0.03em] text-xs leading-none">
                            <div className="absolute top-[2mm] left-[28mm] w-[3mm] h-[2px] border-t-2 border-black -rotate-6">
                                <div className="absolute top-1/2 left-full -translate-y-1/2 ml-2 whitespace-nowrap rotate-6 bg-jd-golden-paper">
                                    Card name
                                </div>
                            </div>
                            <div className="absolute top-[7mm] left-[28mm] w-[3mm] h-[2px] border-t-2 border-black rotate-12">
                                <div className="absolute -top-1 left-full -translate-y-1/2 ml-2 whitespace-nowrap -rotate-12 bg-jd-golden-paper">
                                    Card effect
                                </div>
                            </div>
                            <div className="absolute top-[2mm] left-[4mm] w-[3mm] h-[25mm] rounded-tl-lg rounded-bl-lg border-l-2 border-black">
                                <div className="absolute top-1/2 right-full -translate-y-1/2 text-center -mr-3 -rotate-90 whitespace-nowrap">
                                    Golden side
                                </div>
                            </div>
                            <div className="absolute top-[18mm] left-[34mm] w-[3mm] h-[25mm] rounded-tr-lg rounded-br-lg border-r-2 border-black">
                                <div className="absolute top-1/2 left-full -translate-y-1/2 -ml-2 whitespace-nowrap rotate-90">
                                    Shitty side
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isPrint && <PrintMarker top left bleedMm={3} bleedRightMm={0} bleedBottomMm={0} offsetMm={0} />}
                {isPrint && (
                    <PrintMarker
                        bottom
                        left
                        noBottomMarker
                        bleedMm={3}
                        bleedRightMm={0}
                        bleedBottomMm={0}
                        offsetMm={0}
                    />
                )}
                {isPrint && (
                    <PrintMarker top right noRightMarker bleedMm={3} bleedRightMm={0} bleedBottomMm={0} offsetMm={0} />
                )}
            </Paper>
            <Paper
                size="Bridge"
                bleedMm={isPrint ? 3 : 0}
                bleedLeftMm={0}
                bleedRightMm={0}
                bleedBottomMm={0}
                className={twMerge(
                    `RulesPage bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`
                )}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden bg-jd-golden-paper text-jd-shitty-text leading-none"
                    style={{ padding: isPrint ? "6mm 3mm 3mm 3mm" : "3mm" }}
                >
                    <ol className="list-decimal pl-3 font-jd-prequel-body text-xs mb-2" start={3}>
                        <li>Keep the cards in the same order they were dealt.</li>
                        <li>Make sure the cards are turned shitty side up.</li>
                        <li>Pick a starting player.</li>
                        <li>
                            (the player right of the one who won the last round or the one who was in a pub the most
                            recently)
                        </li>
                    </ol>
                    <h1 className="[font-size:inherit] font-jd-heading mb-1 ">Player Turn</h1>
                    <p className="text-xs font-jd-prequel-body leading-tight">
                        Each round, players take turns in the clockwise order until one of them has all their cards
                        turned the golden side up.
                    </p>
                    <ol className="list-decimal pl-3 font-jd-prequel-body text-xs mb-2">
                        <li>
                            Each turn the active player selects a card from their hand and activates it by reading the
                            title and effect text.
                        </li>
                        <li>Resolve the card’s effect. This can activate other cards even in other players’ hands.</li>
                    </ol>
                </div>
                {isPrint && (
                    <PrintMarker
                        top
                        right
                        noRightMarker
                        noLeftMarker
                        bleedMm={3}
                        bleedRightMm={0}
                        bleedLeftMm={0}
                        bleedBottomMm={0}
                        offsetMm={0}
                    />
                )}
            </Paper>
            <Paper
                size="Bridge"
                bleedMm={isPrint ? 3 : 0}
                bleedLeftMm={0}
                bleedBottomMm={0}
                className={twMerge(
                    `RulesPage bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`
                )}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden bg-jd-golden-paper text-jd-shitty-text leading-none"
                    style={{ padding: isPrint ? "6mm 6mm 3mm 3mm" : "3mm" }}
                >
                    <h1 className="[font-size:inherit] font-jd-heading mb-1">Legend</h1>
                    <p className="text-xs font-jd-prequel-body leading-tight mb-2">
                        ↻: Turn - from golden to shitty or vice versa
                    </p>
                    <p className="text-xs font-jd-prequel-body leading-tight mb-2">💩: shitty - the violet side</p>
                    <p className="text-xs font-jd-prequel-body leading-tight mb-2">
                        ⇄: exchange - replace a card with a different card, usually between players. Keep the
                        orientation.
                    </p>
                    <h1 className="[font-size:inherit] font-jd-heading mb-1">The End</h1>
                    <p className="text-xs font-jd-prequel-body leading-tight mb-2">
                        if anyone has all the cards turned the golden side up at the end of anyone’s turn they win the
                        round.
                    </p>
                    <p className="text-xs font-jd-prequel-body leading-tight mb-2">
                        If a player manages to win 3 times in total, they win the game.
                    </p>
                </div>
                {isPrint && (
                    <PrintMarker top right noLeftMarker bleedMm={3} bleedLeftMm={0} bleedBottomMm={0} offsetMm={0} />
                )}
                {isPrint && (
                    <PrintMarker
                        bottom
                        right
                        noBottomMarker
                        bleedMm={3}
                        bleedLeftMm={0}
                        bleedBottomMm={0}
                        offsetMm={0}
                    />
                )}
            </Paper>
            <Paper
                size="Bridge"
                bleedMm={isPrint ? 3 : 0}
                bleedTopMm={0}
                bleedRightMm={0}
                className={twMerge(
                    `RulesPage bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`
                )}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden bg-jd-golden-paper text-jd-shitty-text leading-none"
                    style={{ padding: isPrint ? "3mm 3mm 6mm 6mm" : "3mm" }}
                >
                    <h1 className="[font-size:inherit] font-jd-heading mb-1">The Goal</h1>
                    <p className="text-xs font-jd-prequel-body leading-tight mb-2">
                        Dwarves want to have a good time, but at the end of the night, they want to save face and not
                        bring shame to their name.
                    </p>
                    <div className="relative overflow-hidden">
                        <div
                            className="float-right ml-2 overflow-hidden rounded-md border-[1px] border-jd-shitty-text border-opacity-50"
                            style={getScaledCardSizeStyle("Bridge", 0.25)}
                        >
                            <PrequelCard
                                isFaceDown
                                {...prequelCards[4]}
                                className="scale-[0.25] origin-top-left  ml-[-1.5mm] mt-[-1.5mm]"
                            />
                        </div>
                        <div className="flex-1 ">
                            <p className="text-xs font-jd-prequel-body leading-tight mb-2">
                                The goal of the game is to turn all the cards in your hand the golden side up. Whoever
                                manages this at the end of anyone’s turn is the winner.
                            </p>
                            <p className="text-xs font-jd-prequel-body leading-tight mb-2">
                                It is best to play several rounds and whoever manages to win 3 rounds, they win the
                                game.
                            </p>
                        </div>
                        <h1 className="[font-size:inherit] font-jd-heading mb-1 ">Round setup</h1>
                        <p className="text-xs font-jd-prequel-body leading-tight">At the start of each round:</p>
                        <ol className="list-decimal pl-3 font-jd-prequel-body text-xs">
                            <li>Shuffle the cards and deal 7 cards to each player.</li>
                            <li>Each player then discards 2 cards.</li>
                        </ol>
                    </div>
                </div>
                {isPrint && <PrintMarker bottom left bleedMm={3} bleedRightMm={0} offsetMm={0} />}

                {isPrint && (
                    <PrintMarker bottom right noRightMarker noLeftMarker bleedMm={3} bleedRightMm={0} offsetMm={0} />
                )}
            </Paper>
            <Paper
                size="Bridge"
                bleedMm={isPrint ? 3 : 0}
                bleedLeftMm={0}
                bleedRightMm={0}
                bleedTopMm={0}
                className={twMerge(
                    `RulesPage bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`
                )}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden bg-jd-golden-paper text-jd-shitty-text leading-none"
                    style={{ padding: isPrint ? "3mm 3mm 6mm 3mm" : "3mm" }}
                >
                    <ol className="list-decimal pl-3 font-jd-prequel-body text-xs mb-2" start={3}>
                        <li>
                            Check, if anyone has all the cards turned the golden side up. If so, the player wins the
                            round and the round is over.
                        </li>
                        <li>
                            The turn is over and The player on the left of the active player becomes the next active
                            player.
                        </li>
                    </ol>
                    <h1 className="[font-size:inherit] font-jd-heading mb-1 ">Additional rules</h1>
                    <ul className="list-disc pl-4 font-jd-prequel-body text-xs mb-2">
                        <li>Keep the cards in your hand in the same order unless told to move a card.</li>
                        <li>
                            Whenever you receive a card you can put it anywhere in your hand, but keep the same
                            orientation (golden/shitty).
                        </li>
                        <li>
                            Some cards appear to have a shitty and golden side from the back, but count as having both
                            sides golden (get lucky) or both sides shitty (moist fart) for the purposes of both winning
                            a round and effects of cards.
                        </li>
                    </ul>
                </div>
                {isPrint && (
                    <PrintMarker
                        bottom
                        right
                        noRightMarker
                        bleedMm={3}
                        bleedRightMm={0}
                        bleedLeftMm={0}
                        bleedTopMm={0}
                        offsetMm={0}
                    />
                )}
            </Paper>
            <Paper
                size="Bridge"
                bleedMm={isPrint ? 3 : 0}
                bleedLeftMm={0}
                bleedTopMm={0}
                className={twMerge(
                    `RulesPage bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`
                )}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden bg-jd-golden-paper text-jd-shitty-text leading-none"
                    style={{ padding: isPrint ? "3mm 6mm 6mm 3mm" : "3mm" }}
                ></div>
                {isPrint && <PrintMarker bottom right bleedMm={3} bleedLeftMm={0} bleedTopMm={0} offsetMm={0} />}
            </Paper>
        </div>
    );
}
