import interpolate from "@/utils/interpolate";
import { updateDmx } from "../services/dmx";
import { LightModeEnum, RGBChannelEnum } from "../types/effectTypes";
import { cubic } from "./easings";

const initialParams = {
    [RGBChannelEnum.Intensity]: 0,
    [RGBChannelEnum.R]: 0,
    [RGBChannelEnum.G]: 0,
    [RGBChannelEnum.B]: 0,
    [RGBChannelEnum.Mode]: LightModeEnum.Flash,
    [RGBChannelEnum.Interval]: 0,
};

const spinUpStart = 0;
const spinUpEnd = 1500;
const shootingStart = 1500;
const spinDownStart = 2600;

const isInInterval = (elapsedMs: number, intervalStartMs: number, intervalEndMs: number) =>
    elapsedMs > intervalStartMs && elapsedMs < intervalEndMs;

const shotProgressInterval = 1 / 8;

export const getGatlingAnimation = (elapsedMs: number, durationMs: number) => {
    /* const fadeInDuration = Math.min(1000, durationMs / 3);
    const fadeOutDuration = Math.min(5000, durationMs / 3);
    const envelope = getInterpolationEnvelope(elapsedMs, durationMs, fadeInDuration, fadeOutDuration); */
    const params = {
        ...initialParams,
    };
    const spinUpProgress = interpolate(elapsedMs, spinUpStart, spinUpEnd, 0, 1);
    const isInSpinUpInterval = isInInterval(elapsedMs, spinUpStart, spinUpEnd);
    if (isInSpinUpInterval) {
        params[RGBChannelEnum.Intensity] = cubic(spinUpProgress) * 128;
        params[RGBChannelEnum.R] = 255;
        params[RGBChannelEnum.G] = 64;
        params[RGBChannelEnum.B] = 64;
    }
    const shootingProgress = interpolate(elapsedMs, shootingStart, spinDownStart, 0, 1);
    const isInShootingInterval = isInInterval(elapsedMs, shootingStart, spinDownStart);
    if (isInShootingInterval) {
        const isShootingInterval = shootingProgress % shotProgressInterval < shotProgressInterval / 2;
        const currentIntensity = isShootingInterval ? 1 : 0;
        params[RGBChannelEnum.Intensity] = 255 * currentIntensity;
        params[RGBChannelEnum.R] = 255;
        params[RGBChannelEnum.G] = 0;
        params[RGBChannelEnum.B] = 0;
    }
    const spinDownProgress = interpolate(elapsedMs, spinDownStart, durationMs, 0, 1);
    const isInSpinDownInterval = isInInterval(elapsedMs, spinDownStart, durationMs);
    if (isInSpinDownInterval) {
        params[RGBChannelEnum.Intensity] = (1 - spinDownProgress) * 128;
        params[RGBChannelEnum.R] = 255;
        params[RGBChannelEnum.G] = 64;
        params[RGBChannelEnum.B] = 64;
    }

    updateDmx(params).catch((error) => {
        console.error("Failed to update DMX:", error, params);
    });
};
