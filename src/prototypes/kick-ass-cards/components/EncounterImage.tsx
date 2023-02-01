import React from "react";
import BroadcastImage, { BroadcastImageProps } from "./screenContent/BroadcastImage";

export default function EncounterImage({
    className = "h-[50vh]",
    objectFit = "contain",
    objectPosition = "center center",
    ...restProps
}: BroadcastImageProps) {
    return <BroadcastImage {...{ className, objectFit, objectPosition }} {...restProps} />;
}
