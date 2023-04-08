import React from "react";
import { EncounterType } from "../../types";
import { twMerge } from "tailwind-merge";
// import "./EncounterCard.css";

export type EncounterCardProps = React.PropsWithChildren<{ className?: string } & EncounterType>;

export default function EncounterCard({ className, title = "", children }: EncounterCardProps) {
    return (
        <div
            className={twMerge(
                "EncounterCard relative bg-white p-5 flex flex-row gap-5 text-kac-steel-dark",
                className
            )}
        >
            <div className="flex-1 flex flex-col gap-2">{title}</div>
            {children}
        </div>
    );
}
