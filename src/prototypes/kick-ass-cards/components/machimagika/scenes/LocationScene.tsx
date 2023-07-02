import React from "react";
import { twMerge } from "tailwind-merge";
import useGameContext from "../model/GameContext";
import ToggleData from "../../../../../components/DataToggle";

export type LocationSceneProps = React.PropsWithChildren<{
    className?: string;
}>;

const locationMap = {
    tavern: {
        backgroundUrl:
            "/LP/ScrattCZ_sci-fi_casino_lobby_robot_and_alien_casino_staff_neon__3473fb69-84cf-433a-81cb-3a5f351a2877.png",
    },
};

export default function LocationScene({ className, children }: LocationSceneProps) {
    const {
        state: { locationId },
    } = useGameContext();
    if (!locationId) {
        return null;
    }

    const location = locationId in locationMap ? locationMap[locationId as keyof typeof locationMap] : null;

    if (!location) {
        console.log("no location", locationId, locationMap[locationId as keyof typeof locationMap]);
        return null;
    }

    return (
        <div className={twMerge("flex-1 relative w-full h-full", className)}>
            <div className="absolute flex flex-col gap-4 p-10">
                <h1 className="text-xl">LocationId: {locationId}</h1>
                <ToggleData data={location} initialCollapsed />
            </div>
            <img src={location.backgroundUrl} alt="" className="w-full h-full object-cover" />
            {children}
        </div>
    );
}
