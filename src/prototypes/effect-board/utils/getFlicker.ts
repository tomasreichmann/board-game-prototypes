import { clamp } from "lodash";
import { updateDmx } from "../services/dmx";
import { LightModeEnum, RGBChannelEnum } from "../types/effectTypes";
import { getInterpolationEnvelope } from "./getInterpolationEnvelope";

const initialParams = {
    [RGBChannelEnum.Intensity]: 0,
    [RGBChannelEnum.R]: 0,
    [RGBChannelEnum.G]: 0,
    [RGBChannelEnum.B]: 0,
    [RGBChannelEnum.Mode]: LightModeEnum.Flash,
    [RGBChannelEnum.Interval]: 0,
};

export const getFlickerFunction =
    (
        color: { r: number; g: number; b: number },
        intensityVariation: number,
        colorVariation: number,
        envelope: { attackMs: number; decayMs: number }
    ) =>
    (elapsedMs: number, durationMs: number) => {
        const intensityEnvelope = getInterpolationEnvelope(elapsedMs, durationMs, envelope.attackMs, envelope.decayMs);
        const currentIntensity = (1 - intensityVariation * Math.random()) * intensityEnvelope;
        const rVariation = 1 - colorVariation * Math.random();
        const gVariation = 1 - colorVariation * Math.random();
        const bVariation = 1 - colorVariation * Math.random();

        const params = {
            ...initialParams,
            [RGBChannelEnum.Intensity]: clamp(currentIntensity * 255, 0, 255),
            [RGBChannelEnum.R]: clamp(color.r * rVariation, 0, 255),
            [RGBChannelEnum.G]: clamp(color.g * gVariation, 0, 255),
            [RGBChannelEnum.B]: clamp(color.b * bVariation, 0, 255),
        };

        updateDmx(params).catch((error) => {
            console.error("Failed to update DMX:", error, params);
        });
    };
