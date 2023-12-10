import React, { PropsWithChildren, useEffect, useState } from "react";
import Paper from "../../../../../components/print/Paper/Paper";
import { cardSizes } from "../../../../../components/print/paperSizes";
import { twMerge } from "tailwind-merge";
import ActorCard from "../content/ActorCard";
import TraitCard from "../content/TraitCard";
import traitsData from "../../../data/traits-cs-cleaned";

export type ComponentPanelProps = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

export default function ComponentPanel({ className, children, ...restProps }: ComponentPanelProps) {
    return (
        <div className={twMerge("flex flex-row gap-4", className)} {...restProps}>
            <ActorCard cardSize="Mini US game" name="Actor" imageUri="/ISV/minis/militia1.jpg" />
            <TraitCard cardSize="Mini US game" imageUri={traitsData[0].imageUri} name="Spread of Traits" />
        </div>
    );
}
