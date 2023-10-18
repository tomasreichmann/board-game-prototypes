import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import clsx from "clsx";
import { Button } from "react-daisyui";
import Toggle from "../../../../components/Toggle";
import ActorCard, { ActorCardProps } from "../gameComponents/ActorCard";
import ComponentList from "../ComponentList";
import resolveRandom, {
    DeepRandomType,
    isRandomArrayType,
    isRandomMultipleType,
    isRandomObjectType,
    isRandomRangeType,
    isRandomTemplateType,
    isRandomValueType,
    isRandomWeightedType,
    isRandomWordType,
    isReferenceConditionType,
} from "../../generators/resolveRandom";
import {
    GenderEnum,
    ageOptions,
    firstNameOptions,
    genderOptions,
    lastNameOptions,
    occupationOptions,
} from "../../generators/schemes/personScheme";
import { twMerge } from "tailwind-merge";
import DataPreview from "../../../../components/DataPreview";

export type VisualizeRandomProps<T> = {
    className?: string;
    random: DeepRandomType<T>;
};

export default function VisualizeRandom<T>({ className, random }: VisualizeRandomProps<T>) {
    const [counter, setCounter] = useState(0);

    return (
        <div className={twMerge("flex flex-col gap-5", className)}>
            {(isReferenceConditionType(random) && (
                <div>
                    <h2>Condition</h2>
                    <DataPreview data={random} />
                </div>
            )) ||
                (isRandomValueType(random) && (
                    <div>
                        <h2>Value</h2>
                        <VisualizeRandom random={random._rValue} />
                        <DataPreview data={random} />
                    </div>
                )) ||
                (isRandomWordType(random) && (
                    <div>
                        <h2>Word</h2>
                        <DataPreview data={random} />
                    </div>
                )) ||
                (isRandomObjectType(random) && (
                    <div>
                        <h2>Object</h2>
                        <DataPreview data={random} />
                    </div>
                )) ||
                (isRandomArrayType(random) && (
                    <div>
                        <h2>Array</h2>
                        <DataPreview data={random} />
                    </div>
                )) ||
                (isRandomWeightedType(random) && (
                    <div>
                        <h2>Weighted</h2>
                        <DataPreview data={random} />
                    </div>
                )) ||
                (isRandomMultipleType(random) && (
                    <div>
                        <h2>Multiple</h2>
                        <DataPreview data={random} />
                    </div>
                )) ||
                (isRandomRangeType(random) && (
                    <div>
                        <h2>Range</h2>
                        <DataPreview data={random} />
                    </div>
                )) ||
                (isRandomTemplateType(random) && (
                    <div>
                        <h2>Template</h2>
                        <DataPreview data={random} />
                    </div>
                )) || <div>{String(random)}</div>}
        </div>
    );
}
