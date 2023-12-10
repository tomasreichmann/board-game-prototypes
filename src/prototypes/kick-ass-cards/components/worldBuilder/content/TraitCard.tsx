import React, { PropsWithChildren, useEffect, useState } from "react";
import Paper from "../../../../../components/print/Paper/Paper";
import { cardSizes } from "../../../../../components/print/paperSizes";
import { twMerge } from "tailwind-merge";
import traitsData from "../../../data/traits-cs-cleaned";
import titleCase from "../../../../../utils/titleCase";

export type TraitCardProps = PropsWithChildren<{
    cardSize?: keyof typeof cardSizes;
    currentPower?: number;
    className?: string;
    imageUri?: string;
    name: string;
}>;

export default function TraitCard({ className, imageUri, cardSize = "Mini US game", name, children }: TraitCardProps) {
    return (
        <Paper
            size={cardSize}
            className={twMerge(
                "TraitCard bg-white rounded-md flex flex-col gap-2 justify-end items-stretch relative",
                className
            )}
        >
            {imageUri && (
                <img
                    src={imageUri}
                    className="absolute left-0 top-0 w-full h-full rounded-md object-cover"
                    draggable="false"
                />
            )}
            <h2 className="text-xl text-kac-cloth-dark text-center font-bold p-2 pt-8 pb-4 relative z-10">{name}</h2>
            {children}
        </Paper>
    );
}
