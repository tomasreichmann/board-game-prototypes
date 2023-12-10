import React, { PropsWithChildren, useEffect, useState } from "react";
import Paper from "../../../../../components/print/Paper/Paper";
import { cardSizes } from "../../../../../components/print/paperSizes";
import { twMerge } from "tailwind-merge";

export type ActorCardProps = PropsWithChildren<{
    cardSize?: keyof typeof cardSizes;
    currentPower?: number;
    className?: string;
    imageUri?: string;
    name: string;
}>;
/*
export const formDefinition = [
    {
        name: "imageUri",
        type: "image",
        optional: true,
    },
    {
        name: "name",
        type: "text",
    },
    {
        name: "currentPower",
        type: "number",
        min: 0,
        optional: true,
    },
    {
        name: "cardSize"
    }
]*/

export default function ActorCard({
    className,
    name,
    currentPower,
    imageUri,
    cardSize = "Tarot",
    children,
}: ActorCardProps) {
    return (
        <Paper
            size={cardSize}
            className={twMerge(
                "ActorCard bg-white rounded-md flex flex-col gap-2 justify-end items-stretch relative drop-shadow-md",
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
            {currentPower && (
                <div className="absolute top-0 right-0 rounded-se-md overflow-hidden min-w-[40px] min-h-[40px]">
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.75)_60%,rgba(0,0,0,0)_100%)] text-3xl text-kac-fire text-right -mt-4 -mr-4 rounded-full font-bold pr-8 pt-8 pb-4 pl-4 leading-none">
                        {currentPower}
                    </div>
                </div>
            )}
            <h2 className="text-xl text-kac-monster-light text-center font-bold p-2 pt-8 pb-4 bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_60%,rgba(0,0,0,0)_100%)] rounded-bl-md rounded-br-md overflow-hidden relative z-10">
                {name}
            </h2>
            {children}
        </Paper>
    );
}
