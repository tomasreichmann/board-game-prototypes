import React from "react";
import BroadcastImage, { BroadcastImageProps } from "./screenContent/BroadcastImage";

export default function EncounterImage({
    className = "h-[50vh] my-10",
    objectFit = "contain",
    objectPosition = "center center",
    ...restProps
}: BroadcastImageProps) {
    return <BroadcastImage {...{ className, objectFit, objectPosition }} {...restProps} />;
}
