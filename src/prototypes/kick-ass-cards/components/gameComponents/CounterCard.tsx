import React from "react";
import Icon from "../Icon";
import { PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import Card, { CardBody, CardHeader } from "./Card";
import { allSizes } from "../../../../components/print/paperSizes";
import { H2 } from "../content/Text";
import LayeredCard, { LayeredCardBackFace } from "./LayeredCard";
import { LayeredActorCardBackFaceProps } from "./LayeredActorCard";

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
    size = "54x86",
    ...restProps
}: CounterCardProps) {
    return (
        <LayeredCard
            imageUri={icon ?? undefined}
            adjective={
                current !== undefined &&
                total !== undefined && (
                    <>
                        {current}&nbsp;/&nbsp;{total}
                    </>
                )
            }
            nounCornerIcon="/mighty-decks/types/counter.png"
            nounDeck={deck ?? undefined}
            noun={<>{title ?? undefined}</>}
            nounEffect={<span className="text-kac-monster-dark ">{reward}</span>}
            adjectiveEffect={<span className="text-kac-blood ">{threat}</span>}
            {...restProps}
        />
    );
}

export const CounterCardBackFace = ({ ...restProps }: LayeredActorCardBackFaceProps) => {
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
