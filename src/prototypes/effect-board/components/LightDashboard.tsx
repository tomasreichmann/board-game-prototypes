import React, { PropsWithChildren, useState } from "react";
import { updateDmx } from "../services/dmx";
import { H3 } from "@/prototypes/kick-ass-cards/components/content/Text";

export type LightDashboardProps = PropsWithChildren & {};

export default function LightDashboard({ children }: LightDashboardProps) {
    const [channelMap, setChannelMap] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    });

    const handleChange = (channel: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setChannelMap({ ...channelMap, [channel]: Number(e.target.value) });
        updateDmx({ [channel]: Number(e.target.value) }).catch((error: string) =>
            console.error("Failed to update DMX:", error)
        );
    };

    return (
        <div className="LightDashboard flex flex-row gap-4">
            {Object.keys(channelMap).map((channel) => {
                return (
                    <div className="flex flex-col gap-2" key={channel}>
                        <H3 className="text-center">
                            {channel} ({channelMap[Number(channel) as keyof typeof channelMap]})
                        </H3>
                        <input
                            key={channel}
                            style={{
                                appearance: "slider-vertical" as React.CSSProperties["appearance"],
                                width: "16px",
                                height: "100px",
                            }}
                            type="range"
                            min="0"
                            max="255"
                            value={channelMap[Number(channel) as keyof typeof channelMap]}
                            onChange={handleChange(Number(channel))}
                        />
                    </div>
                );
            })}
            {children}
        </div>
    );
}
