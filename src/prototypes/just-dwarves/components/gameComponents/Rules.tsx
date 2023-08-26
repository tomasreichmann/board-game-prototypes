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
        <>
            <Paper
                size="Bridge"
                bleedMm={isPrint ? 3 : 0}
                className={twMerge(
                    `RulesPage bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`
                )}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full rounded print:rounded-none overflow-hidden bg-jd-golden-paper text-jd-shitty-text leading-none"
                    style={{ padding: isPrint ? "6mm" : "3mm" }}
                >
                    <h1 className="[font-size:inherit] font-jd-heading">Just Dwarves In a Pub</h1>
                    <p className="text-xs font-jd-prequel-body leading-tight">
                        This is a fast card game where up to 5 players are trying to restore their dignity and have a
                        good time at a typical dwarven pub.
                    </p>
                    <h2 className="text-sm font-jd-heading mt-2">Components</h2>
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
                                <div className="absolute top-1/2 right-full -translate-y-1/2 text-center -mr-4 -rotate-90 whitespace-nowrap">
                                    Golden side
                                </div>
                            </div>
                            <div className="absolute top-[18mm] left-[34mm] w-[3mm] h-[25mm] rounded-tr-lg rounded-br-lg border-r-2 border-black">
                                <div className="absolute top-1/2 left-full -translate-y-1/2 -ml-3 whitespace-nowrap rotate-90">
                                    Shitty side
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isPrint && <PrintMarker top vertical bleedMm={3} />}
            </Paper>
        </>
    );
}
