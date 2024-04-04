import React from "react";
import Icon from "./Icon";
import { PaperOrDiv, PaperProps } from "../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import DiceCounter from "./DiceCounter";
import { JSONSchemaType } from "ajv";

export type ClockProps = React.PropsWithChildren<
    {
        slug?: string;
        className?: string;
        size?: PaperProps["size"];
        forPrint?: boolean;
        title?: string | null;
        reward?: string | null;
        threat?: string | null;
        note?: string | null;
        total: number;
        current?: number;
    } & Partial<PaperProps>
>;

export default function Clock({
    className,
    forPrint,
    title = forPrint ? "" : null,
    reward = forPrint ? "" : null,
    threat = forPrint ? "" : null,
    note = forPrint ? "" : null,
    total,
    current = 0,
    children,
    bleedMm = 0,
    size = "Bridge",
    ...restProps
}: ClockProps) {
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge("Clock flex flex-col text-kac-steel-dark bg-white relative rounded-lg", className)}
            {...restProps}
        >
            <div className="flex-1 relative flex flex-col p-5 gap-2" style={{ margin: `${bleedMm}mm` }}>
                <div className="relative">
                    <Icon icon="sandsOfTime" className="absolute top-0 right-0 h-5 text-kac-bone-dark" />
                </div>
                <DiceCounter current={current} total={total} className="flex-1 text-kac-steel" />
                {title !== null && (
                    <h2 className="text-sm font-kacHeading leading-tight text-balance mt-1 mb-1 text-center">
                        {title || <div className="flex-1 border-b-2 border-dashed mt-[2em]" />}
                    </h2>
                )}
                {note !== null && (
                    <div className="text-sm text-kac-bone-dark font-kacBody flex flex-row gap-2">
                        <Icon icon="scrollQuill" className="h-5 flex-shrink-0 inline-block" />
                        {note ? (
                            <p className="flex-grow text-sm font-kacBody leading-tight">{note}</p>
                        ) : (
                            <>
                                <div className="border-b-2 border-dashed ml-7"></div>
                                <div className="border-b-2 border-dashed mt-[2em]"></div>
                                <div className="border-b-2 border-dashed mt-[2em]"></div>
                            </>
                        )}
                    </div>
                )}
                {threat !== null && (
                    <div className="text-sm text-kac-blood font-kacBody flex flex-row gap-2">
                        <Icon icon="deathSkull" className="h-5 flex-shrink-0 inline-block" />
                        {threat ? (
                            <p className="flex-grow text-sm font-kacBody leading-tight">{threat}</p>
                        ) : (
                            <div className="flex-1 border-b-2 border-dashed mt-[2em]" />
                        )}
                    </div>
                )}
                {reward !== null && (
                    <div className="text-sm text-kac-gold-dark font-kacBody flex flex-row gap-2">
                        <Icon icon="chest" className="h-5 flex-shrink-0 inline-block text-sm" />
                        {reward ? (
                            <p className="flex-grow text-sm font-kacBody leading-tight">{reward}</p>
                        ) : (
                            <div className="flex-1 border-b-2 border-dashed mt-[2em]" />
                        )}
                    </div>
                )}
                {children}
            </div>
        </PaperOrDiv>
    );
}

export const clockSchema: JSONSchemaType<Omit<ClockProps, keyof PaperProps>> = {
    type: "object",
    properties: {
        slug: { type: "string", nullable: true },
        forPrint: { type: "boolean", nullable: true },
        title: { type: "string", nullable: true },
        reward: { type: "string", nullable: true },
        threat: { type: "string", nullable: true },
        note: { type: "string", nullable: true },
        total: { type: "number" },
        current: { type: "number", nullable: true },
    },
    required: ["total"],
};
