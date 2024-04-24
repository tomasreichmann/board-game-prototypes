import React from "react";
import multiplyByCount, { defaultCountAdapter } from "../../../../utils/multiplyByCount";
import StuntCard, { StuntCardBackFace } from "../gameComponents/StuntCard";
import ChunkedPages from "./ChunkedPages";
import { assets } from "../../data/encounters/B139-cs";
import Paper, { PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";

const CARDS_PER_PAGE = 2 * 6;

const AssetCard = ({ name, types, className, ...restProps }: (typeof assets)[number] & Partial<PaperProps>) => (
    <Paper
        {...restProps}
        size="Mini US game"
        orientation="landscape"
        className={twMerge(
            "AssetCard flex flex-col items-center justify-center font-kacBody leading-tight text-center",
            className
        )}
        style={{
            background: `url(/B139/data-storage.png) no-repeat center center / contain`,
        }}
    >
        <div className="w-[150px] h-[110px] flex flex-col items-center justify-between">
            <div className="text-md opacity-80">{name}</div>
            <div className="text-sm uppercase opacity-80">{types.join("  |  ")}</div>
        </div>
    </Paper>
);

const allStunts = assets.map((item) => ({
    ...item,
    bleedMm: 3,
    className: "relative -m-[3mm]",
}));

export default function BDay139CarPages() {
    return (
        <ChunkedPages
            Component={AssetCard}
            items={allStunts}
            itemsPerPage={CARDS_PER_PAGE}
            frontFacePrintPageProps={{
                bleedInMm: 0,
                contentClassName: "p-[3mm]",
            }}
            backFacePrintPageProps={{
                bleedInMm: 0,
                contentClassName: "p-[3mm]",
            }}
            label="Assets"
        />
    );
}
