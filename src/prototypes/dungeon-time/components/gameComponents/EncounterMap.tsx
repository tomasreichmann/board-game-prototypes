import React from "react";
import clsx from "clsx";
import { StageType } from "../../types";
import Icon from "../Icon/Icon";
// import "./EncounterMap.css";

export type EncounterMapProps = React.PropsWithChildren<{
    className?: string;
    stages: StageType[];
}>;

const stageTypeClassNameMap: { [key: string]: string } = {
    initial_encounter: "bg-lime-500 border-lightning-1 text-lightning-1",
    mystery: "bg-curse-5 border-lightning-1",
    rest: "bg-lightning-5 border-lightning-1",
    shop: "bg-fire-3 border-lightning-1",
    basic_battle: "bg-fire-5 border-lightning-1",
    elite_battle: "bg-fire-4 border-lightning-1",
    boss_battle: "bg-fire-2 border-lightning-1",
};

export default function EncounterMap({ className, stages, children }: EncounterMapProps) {
    const iconProps = { className: "h-5 inline-block -my-1" };
    const stagesToInsert = stages[0] ? [stages[0]] : [];
    const levels = [{ level: 0, stages: [] as StageType[] }];
    let safeGuard = 100;
    while (--safeGuard && stagesToInsert.length > 0) {
        const stage = stagesToInsert.shift() as StageType;
        if (levels.at(-1)?.level !== stage.stageIndex) {
            levels.push({ level: stage.stageIndex, stages: [] as StageType[] });
        }
        const lastLevel = levels.at(-1);
        const nextStages = stage.nextStageSlugs.flatMap((slug) => {
            const match = stages.find((stage) => stage.slug === slug);
            if (!match) {
                console.error(
                    `next stage slug "${slug}" of stage "${stage.slug}" not found. Stages available: ${stages
                        .map((stage) => stage.slug)
                        .join(", ")}`
                );
            }
            return match ? [match] : [];
        });
        if (!lastLevel?.stages.find((includedStage) => includedStage.slug === stage.slug)) {
            lastLevel?.stages.push(stage);
        }
        stagesToInsert.push(
            ...nextStages.filter((stage) => !stagesToInsert.find((includedStage) => includedStage.slug === stage.slug))
        );
    }

    return (
        <>
            <div className={clsx("flex flex-row justify-between relative", className)}>
                <div className="flex flex-col gap-1">
                    {levels.map(({ level, stages }, levelIndex) => {
                        return (
                            <div key={level} className="flex flex-row justify-center items-center">
                                {stages.map(({ slug, name, icon, nextStageSlugs, type }, stageIndex) => {
                                    return (
                                        <div key={slug} className="relative w-28 h-28 m-4">
                                            <div
                                                key={slug}
                                                className={clsx(
                                                    "relative flex flex-col justify-center items-center w-full h-full border-4 rounded-full z-10",
                                                    stageTypeClassNameMap[type]
                                                )}
                                            >
                                                <Icon icon={icon} className="h-12 -mt-2" />
                                                <div className="font-dtHeading text-md text-center leading-3 px-4 mt-1">
                                                    {name}
                                                </div>
                                            </div>
                                            {nextStageSlugs.map((nextStageSlug) => {
                                                const nextLevel = levels[levelIndex + 1];
                                                const nextStageIndex = nextLevel?.stages.findIndex(
                                                    (stage) => stage.slug === nextStageSlug
                                                );
                                                const indexShift = nextStageIndex - stageIndex;

                                                const currentLevelSize = stages.length;
                                                const currentStageIndex = stageIndex;

                                                const currentPosition = (3 - currentLevelSize) / 2 + currentStageIndex;
                                                const nextLevelSize = nextLevel.stages.length;
                                                const nextPosition = (3 - nextLevelSize) / 2 + nextStageIndex;
                                                const positionShift = nextPosition - currentPosition;

                                                const angle = Math.atan(positionShift / 1) * (180 / Math.PI) * -1;
                                                const stageWidth = 150;
                                                const stageHeight = 150;
                                                const length = Math.sqrt(
                                                    (positionShift * stageWidth) ** 2 + stageHeight ** 2
                                                );

                                                return (
                                                    <div
                                                        className="absolute border-r-4 border-lightning-2 z-0"
                                                        style={{
                                                            height: length,
                                                            left: "50%",
                                                            top: "50%",
                                                            rotate: angle + "deg",
                                                            transformOrigin: "0 0 ",
                                                        }}
                                                    ></div>
                                                );
                                                return indexShift;
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                {children}
                {/* 
                <div className="flex flex-col justify-start items-end relative flex-shrink self-stretch h-full overflow-hidden">
                    {["bg-fire-1", "bg-lightning-3", "bg-acid-1", "bg-curse-1", "bg-black"].map((className) => (
                        <div
                            className={clsx(className, "h-[" + cardSizes.Trump.mm[1] + "mm]", "w-8")}
                            style={{ height: cardSizes.Trump.mm[0] + "mm" }}
                        ></div>
                    ))}
                </div> */}
            </div>
        </>
    );
}
