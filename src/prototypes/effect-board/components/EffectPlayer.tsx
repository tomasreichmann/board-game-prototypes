import React, { PropsWithChildren, useEffect } from "react";
import { AnimationEnum, EffectType, LightModeEnum, RGBChannelEnum } from "../types/effectTypes";
import { updateDmx } from "../services/dmx";
import { useEffectBoard } from "../hooks/useEffectBoard";
import { useInterpolatedObject } from "../hooks/useInterpolatedObject";
import { useSoundEngine } from "../hooks/useSoundEngine";
import { flicker, lightningEase, linear } from "../utils/easings";
import { useAnimationFunction } from "../hooks/useAnimationFunction";
import { getPoliceAnimationFunction } from "../utils/getPoliceAnimationFunction";
import { noop } from "lodash";
import { getLightningAnimationFunction } from "../utils/getLightningAnimationFunction";
import { getAmbulanceAnimationFunction } from "../utils/getAmbulanceAnimationFunction";
import { getFlickerFunction } from "../utils/getFlicker";
import { getGatlingAnimation } from "../utils/getGatlingAnimation";

export type EffectPlayerProps = PropsWithChildren & {};

const normalizeChannelValue = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const updateDmxParams = (lightEffect: EffectType["lightEffect"]) => {
    if (!lightEffect) {
        return;
    }

    const params: { [key: number]: number } = {};

    const { intensity, r, g, b, mode, interval } = lightEffect;

    if (intensity !== undefined) {
        params[RGBChannelEnum.Intensity] = normalizeChannelValue(intensity * 255);
    }

    if (r !== undefined) {
        params[RGBChannelEnum.R] = normalizeChannelValue(r);
    }

    if (g !== undefined) {
        params[RGBChannelEnum.G] = normalizeChannelValue(g);
    }

    if (b !== undefined) {
        params[RGBChannelEnum.B] = normalizeChannelValue(b);
    }

    if (mode !== undefined) {
        if (lightEffect.mode === LightModeEnum.Static) {
            params[RGBChannelEnum.Mode] = LightModeEnum.Flash;
            params[RGBChannelEnum.Interval] = 0;
        } else {
            params[RGBChannelEnum.Mode] = mode;
        }
    }

    if (interval !== undefined) {
        params[RGBChannelEnum.Interval] = interval;
    }

    void updateDmx(params).catch((error) => {
        console.error("Failed to update DMX:", error);
    });
};

const easingMap = {
    [AnimationEnum.Immediate]: () => 1,
    [AnimationEnum.Linear]: linear,
    [AnimationEnum.Lightning]: lightningEase,
    [AnimationEnum.Flicker]: flicker,
};

const getAnimationFunction =
    (lightEffect: EffectType["lightEffect"] | undefined) => (elapsedMs: number, durationMs: number) => {
        if (lightEffect?.animation === AnimationEnum.Police) {
            return getPoliceAnimationFunction(elapsedMs, durationMs);
        }
        if (lightEffect?.animation === AnimationEnum.Ambulance) {
            return getAmbulanceAnimationFunction(elapsedMs, durationMs);
        }
        if (lightEffect?.animation === AnimationEnum.Lightning) {
            return getLightningAnimationFunction(elapsedMs, durationMs);
        }
        if (lightEffect?.animation === AnimationEnum.Gatling) {
            return getGatlingAnimation(elapsedMs, durationMs);
        }
        if (lightEffect?.animation === AnimationEnum.Fireplace) {
            return getFlickerFunction(
                { r: lightEffect?.r ?? 0, g: lightEffect?.g ?? 0, b: lightEffect?.b ?? 0 },
                0.3,
                0.2,
                { attackMs: durationMs / 10, decayMs: durationMs / 5 }
            )(elapsedMs, durationMs);
        }

        return noop;
    };

function EffectPlayer({ children }: EffectPlayerProps) {
    const { state } = useEffectBoard();

    const soundEffect = state.activeEffect?.soundEffect;

    const soundEngine = useSoundEngine();

    const lightEffect = state.activeEffect?.lightEffect ?? {};
    const { intensity, r, g, b, interval, animation = AnimationEnum.Immediate, animationDuration, mode } = lightEffect;

    const isImmediate = animation === AnimationEnum.Immediate;

    if (isImmediate) {
        updateDmxParams(lightEffect);
    }

    const isInterpolated = animation === AnimationEnum.Transition;

    useInterpolatedObject(
        isInterpolated
            ? {
                  intensity: intensity,
                  r: r,
                  g: g,
                  b: b,
                  interval: interval,
              }
            : {},
        isInterpolated ? animationDuration ?? 0 : 0,
        (params) => {
            if (isInterpolated) {
                updateDmxParams({ ...params, mode });
            }
        },
        animation in easingMap ? easingMap[animation as keyof typeof easingMap] : easingMap.linear
    );

    useAnimationFunction(animationDuration ?? 0, isInterpolated ? undefined : getAnimationFunction(lightEffect));

    if (soundEffect) {
        const {
            url,
            channel = "SFX",
            volume,
            offsetMs,
            durationMs,
            fadeInMs,
            fadeOutMs,
            previousFadeOutMs = fadeOutMs,
            stopChannels = [],
        } = soundEffect;
        if (url) {
            console.log("playing sound", { url, channel, volume, offsetMs, durationMs, fadeInMs, fadeOutMs });
            soundEngine
                .play({
                    url: url,
                    channel: channel,
                    volume: volume,
                    offsetMs,
                    durationMs,
                    fadeInMs,
                    fadeOutMs,
                    previousFadeOutMs,
                })
                .catch((error) => console.error("Failed to play sound:", error))
                .finally(() => {
                    console.log("finished playing sound");
                });
        }
        if (stopChannels.length > 0) {
            stopChannels.forEach((ch) => soundEngine.stopChannel(ch));
        }
    }

    return <div className="EffectPlayer flex flex-col gap-4">{children}</div>;
}

export default React.memo(EffectPlayer);
