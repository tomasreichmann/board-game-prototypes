import { twMerge } from "tailwind-merge";
import Paper from "../../../../components/print/Paper/Paper";
import Icon from "../misc/Icon";
import GenericRichText from "../../../../components/RichText";

export type PrequelCardProps = React.PropsWithChildren<{
    className?: string;
    slug: string;
    name: string;
    imageUri: string;
    count: number;
    isFaceDown?: boolean;
    frontBottom: string;
    frontTop: string;
    backBottom: string;
    backTop: string;
}>;

export default function PrequelCard({
    slug,
    className,
    children,
    name,
    isFaceDown,
    imageUri,
    frontBottom,
    frontTop,
    backBottom,
    backTop,
}: PrequelCardProps) {
    const imageSrc = isFaceDown ? "/JD/in-a-pub/back.png" : `/JD/in-a-pub/${imageUri}.png`;
    const isMoistFart = slug.includes("moist-fart");
    const isGetLucky = slug.includes("get-lucky");
    const isSpecialLayout = isMoistFart || isGetLucky;
    return (
        <Paper
            size="Bridge"
            bleedMm={3}
            className={twMerge(
                `PrequelCard bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`,
                className
            )}
        >
            <div className="absolute top-0 left-0 w-full h-full rounded print:rounded-none overflow-hidden">
                {!isFaceDown && (
                    <div className="absolute left-0 top-0 h-full w-full">
                        <div className="h-1/2 flex flex-col items-center text-jd-shitty-text p-[9mm_6mm]">
                            {isMoistFart ? (
                                <div className="font-jd-heading text-[14px] text-center uppercase text-jd-golden-text">
                                    {name}
                                </div>
                            ) : (
                                <div className="font-jd-heading text-[14px] text-center uppercase mb-1">{name}</div>
                            )}
                            {!isSpecialLayout && (
                                <div className="text-center font-jd-prequel-body text-[10px] leading-none">
                                    {frontTop}
                                </div>
                            )}
                        </div>
                        <div className="h-1/2 flex flex-col items-center rotate-180 text-jd-golden-text p-[9mm_6mm]">
                            {isGetLucky ? (
                                <div className="font-jd-heading text-[14px] text-center uppercase text-jd-shitty-text">
                                    {name}
                                </div>
                            ) : (
                                <div className="font-jd-heading text-[14px] text-center uppercase mb-1">{name}</div>
                            )}
                            {!isSpecialLayout && (
                                <div className="text-center font-jd-prequel-body text-[10px] leading-none">
                                    {frontBottom}
                                </div>
                            )}
                        </div>
                        {isGetLucky && (
                            <div className="absolute top-0 -right-[55%] rotate-90 h-full w-[150%] flex flex-col justify-center items-center text-center font-jd-prequel-body text-[10px] leading-none p-[12mm_10mm]">
                                {frontTop}
                            </div>
                        )}
                        {isMoistFart && (
                            <div className="absolute top-0 -right-[55%] rotate-90 h-full w-[150%] flex flex-col justify-center items-center text-center font-jd-prequel-body text-[10px] leading-none p-[12mm_12mm] text-jd-golden-text">
                                {frontTop}
                            </div>
                        )}
                    </div>
                )}
                {isFaceDown ? (
                    <img src="/JD/in-a-pub/back.png" className="w-full h-full object-cover" />
                ) : (
                    <img src={imageSrc} className="w-full h-full object-contain" />
                )}
            </div>
            {children}
        </Paper>
    );
}
