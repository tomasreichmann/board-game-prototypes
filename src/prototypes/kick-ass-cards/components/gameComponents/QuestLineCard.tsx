import React from "react";
import Icon from "../Icon";
import Paper, { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";
import Text, { H1, H2 } from "../content/Text";
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
    const emptyResolution = forPrint ? <>...</> : null;
    return (
        <div className={twMerge("Encounter flex flex-col gap-4", className)}>
            <H2>{title}</H2>
            <Text>{description}</Text>
            {twists.length > 0 && (
                <div className="flex flex-col gap-2 flex-wrap">
                    {twists.map((twist, twistIndex) => {
                        return (
                            <div className="flex flex-row gap-2" key={twistIndex}>
                                <Input type="checkbox" checked={false} className="w-auto self-center" />
                                <Text>{twist}</Text>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="flex flex-col gap-2 flex-wrap">{resolution || emptyResolution}</div>
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
            // size="A5"
            className={twMerge(
                "QuestLineCard relative bg-white p-5 flex flex-col gap-5 text-kac-steel-dark rounded-lg font-kacBody",
                className
            )}
        >
            <H1>{title}</H1>
            <Text>{description}</Text>
            <div className="flex flex-col gap-2">
                {encounters.map((encounter) => {
                    return <Encounter key={encounter.title} forPrint={forPrint} {...encounter} />;
                })}
            </div>
            {children}
        </PaperOrDiv>
    );
}
