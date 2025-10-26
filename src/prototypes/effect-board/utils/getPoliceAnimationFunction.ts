import { clamp } from "lodash";
import { updateDmx } from "../services/dmx";
import { LightModeEnum, RGBChannelEnum } from "../types/effectTypes";
import { getInterpolationEnvelope } from "./getInterpolationEnvelope";

const intervalDuration = 500;

const initialParams = {
    [RGBChannelEnum.Intensity]: 0,
    [RGBChannelEnum.R]: 255,
    [RGBChannelEnum.G]: 0,
    [RGBChannelEnum.B]: 0,
    [RGBChannelEnum.Mode]: LightModeEnum.Flash,
    [RGBChannelEnum.Interval]: 0,
};

export const getPoliceAnimationFunction = (elapsedMs: number, durationMs: number) => {
    const isRedInterval = elapsedMs % (intervalDuration * 2) < intervalDuration;
    const fadeInDuration = Math.min(1000, durationMs / 3);
    const fadeOutDuration = Math.min(5000, durationMs / 3);
    const envelope = getInterpolationEnvelope(elapsedMs, durationMs, fadeInDuration, fadeOutDuration);
    const params = {
        ...initialParams,
        [RGBChannelEnum.Intensity]: clamp(envelope * 255, 0, 255),
        [RGBChannelEnum.R]: isRedInterval ? 255 : 0,
        [RGBChannelEnum.B]: isRedInterval ? 0 : 255,
    };
    updateDmx(params).catch((error) => {
        console.error("Failed to update DMX:", error, params);
    });
};
