import React from "react";
import Icon from "../Icon";
import { PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import Card, { CardBody, CardHeader } from "./Card";
import { allSizes } from "../../../../components/print/paperSizes";
import { H2 } from "../content/Text";
import { Layer } from "recharts";
import { LayeredCardBackFace } from "./LayeredCard";

export type CounterCardProps = React.PropsWithChildren<
    {
        slug?: string;
        className?: string;
        size?: PaperProps["size"];
        forPrint?: boolean;
        deck?: string | null;
        icon?: string | null;
        title?: string | null;
        reward?: string | null;
        threat?: string | null;
        note?: string | null;
        total?: number;
        current?: number;
    } & Partial<PaperProps>
>;

export default function CounterCard({
    className,
    forPrint,
    icon,
    title = forPrint ? "" : null,
    reward = forPrint ? "" : null,
    threat = forPrint ? "" : null,
    note = forPrint ? "" : null,
    total,
    current = 0,
    children,
    deck,
    size = "Bridge",
    ...restProps
}: CounterCardProps) {
    const isSmSize = allSizes[size].mm[1] < 70;

    return (
        <Card className={twMerge("CounterCard", className)} {...restProps}>
            <CardHeader
                icon={icon ?? undefined}
                className="z-10"
                cornerIcon="/mighty-decks/counter.png"
                deck={deck ?? undefined}
            ></CardHeader>
            <CardBody
                icon={icon ?? undefined}
                childrenClassName="shrink-0 basis-auto flex flex-col gap-2 align-stretch text-left min-h-[50%]"
            >
                {title !== null && (
                    <H2 className="text-lg text-balance mt-1 mb-1 text-center leading-none text-kac-iron-light">
                        {title || <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em]" />}
                        {current !== undefined && total !== undefined && (
                            <>
                                <br />
                                <span className="text-kac-blood">{current}</span>&nbsp;/&nbsp;{total}
                            </>
                        )}
                    </H2>
                )}

                {total === undefined && (
                    <div className="flex-1 flex flex-row flex-wrap gap-2 justify-center items-center px-4 opacity-50">
                        <Icon icon="d4" className={"w-8 h-8"} />
                        <Icon icon="d6" className={"w-8 h-8"} />
                        <Icon icon="d10" className={"w-8 h-8"} />
                    </div>
                )}

                {note !== null && (
                    <div className="text-xs text-kac-bone-darker font-kacBody flex flex-row gap-2 leading-tight">
                        <Icon icon="scrollQuill" className="h-4 flex-shrink-0 inline-block" />
                        {note ? (
                            <p
                                className={twMerge(
                                    "flex-grow font-kacBody text-xs",
                                    isSmSize && "text-[0.6rem]",
                                    "leading-tight"
                                )}
                            >
                                {note}
                            </p>
                        ) : (
                            <div className="flex-1 flex-col">
                                <div className="border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1"></div>
                                <div className="border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1"></div>
                            </div>
                        )}
                    </div>
                )}
                {reward !== null && (
                    <div
                        className={twMerge(
                            "text-xs text-kac-gold-darker font-kacBody flex flex-row gap-2",
                            isSmSize && "text-[0.6rem]",
                            "leading-tight tracking-tight"
                        )}
                    >
                        <div className="flex flex-col items-center justify-start -mt-3 leading-none">
                            <span className="mt-1 -mb-1 scale-75">▲</span>
                            <Icon icon="chest" className="h-4 flex-shrink-0 inline-block" />
                        </div>
                        {reward ? (
                            <p
                                className={twMerge(
                                    "flex-grow font-kacBody text-xs",
                                    isSmSize && "text-[0.6rem]",
                                    "leading-tight tracking-tight"
                                )}
                            >
                                {reward}
                            </p>
                        ) : (
                            <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1" />
                        )}
                    </div>
                )}
                {threat !== null && (
                    <div
                        className={twMerge(
                            "text-xs text-kac-blood font-kacBody flex flex-row gap-2 pb-2",
                            isSmSize && "text-[0.6rem]",
                            "leading-tight tracking-tight"
                        )}
                    >
                        <div className="flex flex-col items-center justify-start -mb-3 leading-none">
                            <Icon icon="deathSkull" className="h-4 flex-shrink-0 inline-block" />
                            <span className="translate-y-[-0.1em] scale-75">▼</span>
                        </div>
                        {threat ? (
                            <p
                                className={twMerge(
                                    "flex-grow font-kacBody text-xs",
                                    isSmSize && "text-[0.6rem]",
                                    "leading-tight tracking-tight"
                                )}
                            >
                                {threat}
                            </p>
                        ) : (
                            <div className="flex-1 border-b-[0.2mm] border-kac-steel border-dashed mt-[2em] relative -top-1" />
                        )}
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export const CounterCardBackFace = ({ icon, deck, ...restProps }: CounterCardProps) => {
    return (
        <LayeredCardBackFace
            label="Counter"
            labelClassName="text-[#cbecf0]"
            iconUri="/mighty-decks/types/counter.png"
            className="CounterCardBackFace"
            {...restProps}
        />
    );
};
