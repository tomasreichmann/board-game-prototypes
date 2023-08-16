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
            size="Mini European"
            bleedMm={3}
            className={twMerge(
                `PrequelCard bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`,
                className
            )}
        >
            <div className="absolute top-0 left-0 w-full h-full rounded print:rounded-none overflow-hidden">
                {!isFaceDown && (
                    <div className="absolute left-0 top-0 h-full w-full">
                        <div className="h-1/2 flex flex-col items-center text-jd-shitty-text p-[3.5mm_5mm]">
                            {isMoistFart ? (
                                <div className="font-jd-heading text-[12px] text-center uppercase text-jd-golden-text">
                                    {name}
                                </div>
                            ) : (
                                <div className="font-jd-heading text-[12px] text-center uppercase">{name}</div>
                            )}
                            {!isSpecialLayout && (
                                <div className="text-center font-jd-prequel-body text-[8px] leading-none uppercase ">
                                    {frontTop}
                                </div>
                            )}
                        </div>
                        <div className="h-1/2 flex flex-col items-center rotate-180 text-jd-golden-text p-[3.5mm_5mm]">
                            {isGetLucky ? (
                                <div className="font-jd-heading text-[12px] text-center uppercase text-jd-shitty-text">
                                    {name}
                                </div>
                            ) : (
                                <div className="font-jd-heading text-[12px] text-center uppercase">{name}</div>
                            )}
                            {!isSpecialLayout && (
                                <div className="text-center font-jd-prequel-body text-[8px] leading-none uppercase">
                                    {frontBottom}
                                </div>
                            )}
                        </div>
                        {isGetLucky && (
                            <div className="absolute top-0 -right-[55%] rotate-90 h-full w-[150%] flex flex-col justify-center items-center text-center font-jd-prequel-body text-[8px] leading-none uppercase p-[8mm_8mm]">
                                {frontTop}
                            </div>
                        )}
                        {isMoistFart && (
                            <div className="absolute top-0 -right-[55%] rotate-90 h-full w-[150%] flex flex-col justify-center items-center text-center font-jd-prequel-body text-[8px] leading-none uppercase p-[8mm_8mm] text-jd-shitty-text">
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
