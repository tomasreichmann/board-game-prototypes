import { updateDmx } from "../services/dmx";
import { LightModeEnum, RGBChannelEnum } from "../types/effectTypes";
import { lightningEase } from "./easings";

const initialParams = {
    [RGBChannelEnum.Intensity]: 0,
    [RGBChannelEnum.R]: 255,
    [RGBChannelEnum.G]: 50,
    [RGBChannelEnum.B]: 100,
    [RGBChannelEnum.Mode]: LightModeEnum.Flash,
    [RGBChannelEnum.Interval]: 0,
};

export const getLightningAnimationFunction = (elapsedMs: number, durationMs: number) => {
    const envelope = lightningEase(elapsedMs / durationMs);
    const params = {
        ...initialParams,
        [RGBChannelEnum.Intensity]: envelope * 255,
    };
    updateDmx(params).catch((error) => {
        console.error("Failed to update DMX:", error, params);
    });
};
