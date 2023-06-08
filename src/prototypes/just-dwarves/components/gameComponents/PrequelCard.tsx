import { twMerge } from "tailwind-merge";
import Paper from "../../../../components/print/Paper/Paper";
import Icon from "../misc/Icon";
import GenericRichText from "../../../../components/RichText";

export type PrequelCardProps = React.PropsWithChildren<{
    className?: string;
    name: string;
    frontBottom: string;
    frontTop: string;
    backBottom: string;
    backTop: string;
    isFaceDown?: boolean;
}>;

export default function PrequelCard({
    className,
    children,
    name,
    frontBottom,
    frontTop,
    isFaceDown,
    backBottom,
    backTop,
}: PrequelCardProps) {
    const nameElement = <span className="font-bold text-slate-700 mr-2">{name.toUpperCase()}</span>;
    const iconAliases = {
        PRIDE: () => (
            <>
                <Icon icon="dwarfKing" className="h-5 text-amber-700 mr-1 mb-1 inline-block align-center" />
                {isFaceDown ? null : nameElement}
            </>
        ),
        SHAME: () => (
            <>
                <Icon icon="knockout" className="h-5 text-indigo-700 mr-1 mb-1 inline-block align-center" />
                {isFaceDown ? null : nameElement}
            </>
        ),
        BR: () => <br />,
    };
    return (
        <Paper
            size="Mini European"
            className={twMerge(
                `PrequelCard bg-white rounded print:rounded-none py-2 px-3 flex flex-col relative text-md leading-tight`,
                className
            )}
        >
            <div className="absolute top-0 left-0 w-full h-full rounded print:rounded-none overflow-hidden bg-indigo-300">
                {(frontTop.startsWith("PRIDE") || isFaceDown) && (
                    <div className="absolute -left-1/4 top-1/2 w-[150%] h-full bg-amber-300 rotate-[170deg] origin-[50%_0%]"></div>
                )}
            </div>
            <div className="flex-1 relative z-10 flex flex-col justify-between">
                <div className="">
                    <GenericRichText aliasComponentMap={iconAliases}>{isFaceDown ? backTop : frontTop}</GenericRichText>
                </div>
                <div className="rotate-180 ">
                    <GenericRichText aliasComponentMap={iconAliases}>
                        {isFaceDown ? backBottom : frontBottom}
                    </GenericRichText>
                </div>
            </div>

            {children}
        </Paper>
    );
}
