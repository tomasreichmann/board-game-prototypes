import { updateDmx } from "../services/dmx";
import { LightModeEnum, RGBChannelEnum } from "../types/effectTypes";
import { getInterpolationEnvelope } from "./getInterpolationEnvelope";

const intervalDuration = 500;

const initialParams = {
    [RGBChannelEnum.Intensity]: 0,
    [RGBChannelEnum.R]: 0,
    [RGBChannelEnum.G]: 0,
    [RGBChannelEnum.B]: 255,
    [RGBChannelEnum.Mode]: LightModeEnum.Flash,
    [RGBChannelEnum.Interval]: 0,
};

export const getAmbulanceAnimationFunction = (elapsedMs: number, durationMs: number) => {
    const isBlueInterval = elapsedMs % (intervalDuration * 2) < intervalDuration;
    const fadeInDuration = Math.min(1000, durationMs / 3);
    const fadeOutDuration = Math.min(5000, durationMs / 3);
    const envelope = getInterpolationEnvelope(elapsedMs, durationMs, fadeInDuration, fadeOutDuration);
    const params = {
        ...initialParams,
        [RGBChannelEnum.Intensity]: envelope * 255,
        [RGBChannelEnum.B]: isBlueInterval ? 0 : 255,
    };
    updateDmx(params).catch((error) => {
        console.error("Failed to update DMX:", error, params);
    });
};
