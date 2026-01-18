import React from "react";
import twm from "@/utils/twm";
import Card, { CardProps } from "./Card";
import { Stage2d } from "../../stage2d/components/Stage2d";
import { StageObject } from "../../stage2d/components/StageObject";
import { cardSizes } from "@/components/print/paperSizes";
import { Frame2d } from "../../stage2d/components/Frame2d";
import { useLayoutManager } from "../../stage2d/hooks/useLayoutManager";
import { GridLayoutPropsType } from "../../stage2d/types";
import mmToPx from "@/utils/mmToPx";

type ZoneProps = {
    className?: string;
    title?: string;
    level?: number;
    description?: string;
    cardProps: CardProps;
};

function Zone({
    className,
    title,
    level,
    description,
    cardProps: { size = "54x86", orientation = "landscape", ...restCardProps },
}: ZoneProps) {
    const cardProps = {
        ...restCardProps,
        size,
        orientation,
    };
    return (
        <Card className={twm("Zone", className)} {...cardProps}>
            <div
                className="flex-1 flex flex-col relative rounded-md -m-3 p-3"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.5) 80%)",
                }}
            >
                <div className="flex-1 flex flex-col justify-between items-stretch gap-2 px-4 py-2 ">
                    <div className={twm("font-kacLogo text-kac-bone text-lg leading-none text-center mb-1")}>
                        {title} {level && `(Level ${level})`}
                    </div>
                    <div className={twm("font-kacBody text-kac-bone-light text-xs leading-none text-center")}>
                        {description}
                    </div>
                </div>
            </div>
        </Card>
    );
}

const zones: ZoneProps[] = [
    {
        title: "Cargo Hold",
        level: 1,
        description: "A description for the cargo hold.",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/cargo_hold.png",
        },
    },
    {
        title: "Cockpit",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/cockpit.png",
        },
    },
    {
        title: "Crew Quarters",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/crew_quarters.png",
        },
    },
    {
        title: "Docking Bay",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/docking_bay.png",
        },
    },
    {
        title: "Elevator",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/elevator.png",
        },
    },
    {
        title: "Engine Room",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/engine_room.png",
        },
    },
    {
        title: "Life Support",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/life_support.png",
        },
    },
    {
        title: "Lobotron Assembly",
        cardProps: {
            backgroundImageUri:
                "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/lobotron_assembly.png",
        },
    },
    {
        title: "Medical Bay",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/medical_bay.png",
        },
    },
    {
        title: "Missile Bay",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/missile_bay.png",
        },
    },
    {
        title: "Reactor",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/reactor.png",
        },
    },
    {
        title: "Ritual Chamber",
        cardProps: {
            backgroundImageUri:
                "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/ritual_chamber.png",
        },
    },
    {
        title: "Sensor Array",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/sensor_array.png",
        },
    },
    {
        title: "Shield Generator",
        cardProps: {
            backgroundImageUri:
                "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/shield_generator.png",
        },
    },
    {
        title: "Spin Drive",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/spin_drive.png",
        },
    },
    {
        title: "Stairwell",
        cardProps: {
            backgroundImageUri: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/stairwell.png",
        },
    },
    {
        title: "Weapons Station",
        cardProps: {
            backgroundImageUri:
                "/public/mighty-decks/encounters/exiles_of_the_hungry_void/locations/weapons_station.png",
        },
    },
];

const [cardHeight, cardWidth] = cardSizes["54x86"].mm.map(mmToPx);

const gridCols = 3;
const gridRows = Math.ceil(zones.length / gridCols);
const gapX = 4;
const gapY = 4;

export type AreaStageProps = {
    className?: string;
};

export default function AreaStage({ className }: AreaStageProps) {
    const layout = useLayoutManager({
        zoneGrid: {
            type: "grid",
            cellHeight: cardHeight,
            cellWidth: cardWidth,
            columns: gridCols,
            rows: gridRows,
            gapX,
            gapY,
            x: 0,
            y: 0,
        } satisfies GridLayoutPropsType,
    });

    const zoneItems = zones.map((zone, index) => ({
        zoneProps: zone,
        stageObjectProps: layout.getCardTransform("zoneGrid", index),
    }));

    const width = gridCols * cardWidth + (gridCols - 1) * gapX;
    const height = gridRows * cardHeight + (gridRows - 1) * gapY;

    return (
        <Frame2d width={width} height={height} className={className}>
            <Stage2d width={width} height={height}>
                {zoneItems.map(({ zoneProps, stageObjectProps }, index) => (
                    <StageObject
                        {...stageObjectProps}
                        width={cardWidth}
                        height={cardHeight}
                        key={`stage-object-${index}`}
                    >
                        <Zone {...zoneProps} />
                    </StageObject>
                ))}
            </Stage2d>
        </Frame2d>
    );
}
