import React, { SVGProps } from "react";
import clsx from "clsx";
import { EncounterType } from "../../types";
import CharacterOutline from "../../media/character-outline.svg";
import Icon from "../Icon";
// import "./EncounterCard.css";

const CharacterOutlineImage = CharacterOutline as unknown as React.ComponentType<SVGProps<SVGElement>>;

export type EncounterCardProps = React.PropsWithChildren<{ className?: string } & EncounterType>;

export default function EncounterCard({ className, title = "", children }: EncounterCardProps) {
    const iconProps = { className: "h-5 inline-block -my-1" };
    return (
        <div className={clsx("EncounterCard relative bg-white p-5 flex flex-row gap-5 text-kac-steel-dark", className)}>
            <div className="flex-1 flex flex-col gap-2">{title}</div>
            {children}
        </div>
    );
}
