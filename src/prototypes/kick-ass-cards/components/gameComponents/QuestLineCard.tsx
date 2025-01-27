import React from "react";
import Icon from "../Icon";
import Paper, { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import Text, { H1, H2, H3, H5, H6 } from "../content/Text";
import { Checkbox } from "react-daisyui";
import Input from "../controls/Input";

export type EncounterProps = {
    className?: string;
    title: string;
    description: React.ReactNode;
    resolution?: React.ReactNode;
    twists?: React.ReactNode[];
    forPrint?: boolean;
};

export const Encounter = ({ className, title, description, twists = [], resolution, forPrint }: EncounterProps) => {
    const emptyResolution = forPrint ? <div className="w-full h-6 border-b border-kac-steel-dark" /> : null;
    const isResolutionDisplayed = forPrint || resolution !== undefined;
    return (
        <div className={twMerge("Encounter flex flex-col", className)}>
            <div className="columns-xs gap-4">
                <Text size={"2xs"} className="mb-1 leading-tighter">
                    <span className="text-kac-cloth-dark font-bold font-kacHeading tracking-tighter">{title}:</span>{" "}
                    {description}
                </Text>
                {twists.length > 0 &&
                    twists.map((twist, twistIndex) => {
                        return (
                            <div className="flex flex-row items-center gap-2 break-inside-avoid" key={twistIndex}>
                                <div className="size-2 min-w-2 min-h-2 border border-kac-steel" />
                                <Text size={"2xs"} className="leading-tighter">
                                    {twist}
                                </Text>
                            </div>
                        );
                    })}
                {isResolutionDisplayed && (
                    <div className="flex flex-col flex-wrap mt-1">
                        <Text size={"2xs"} className="text-kac-steel-dark">
                            Resolution:
                        </Text>{" "}
                        {resolution || emptyResolution}
                    </div>
                )}
            </div>
        </div>
    );
};

export type QuestLineCardProps = React.PropsWithChildren<{
    className?: string;
    title: string;
    description: React.ReactNode;
    encounters: EncounterProps[];
    forPrint?: boolean;
}>;

export default function QuestLineCard({
    className,
    title,
    description,
    encounters,
    forPrint,
    children,
}: QuestLineCardProps) {
    return (
        <PaperOrDiv
            size="A4"
            orientation="landscape"
            className={twMerge(
                "QuestLineCard relative bg-white px-5 py-5 gap-5 flex flex-col text-kac-iron rounded-lg font-kacBody shadow-lg print:shadow-none",
                className
            )}
        >
            <div className="relative h-full w-full flex flex-col flex-wrap justify-between gap-x-4 gap-y-1">
                <div className="w-[calc((100%-3rem)/3)] flex-shrink">
                    <H6>{title}</H6>
                    <Text size={"2xs"} className="mb-2">
                        {description}
                    </Text>
                </div>
                {encounters.map((encounter) => {
                    return (
                        <Encounter
                            className="w-[calc((100%-3rem)/3)] flex-shrink break-inside-avoid"
                            key={encounter.title}
                            forPrint={forPrint}
                            {...encounter}
                        />
                    );
                })}
            </div>
            {children}
        </PaperOrDiv>
    );
}
