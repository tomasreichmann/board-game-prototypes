export type SoundEffectType = {
    url?: string;
    channel?: string;
    volume?: number;
    offsetMs?: number;
    durationMs?: number;
    fadeInMs?: number;
    fadeOutMs?: number;
    previousFadeOutMs?: number;
    stopChannels?: string[];
};

export enum LightModeEnum {
    Static = -1,
    Flash = 0,
    Jump = 51,
    Gradual = 101,
    Pulse = 151,
    Shuffle = 201,
}

export enum AnimationEnum {
    Immediate = "immediate",
    Linear = "linear",
    Transition = "transition",
    Lightning = "lightning",
    Flicker = "flicker",
    Pulse = "pulse",
    FadeIn = "fadeIn",
    FadeOut = "fadeOut",
    Police = "police",
    Ambulance = "ambulance",
    Fireplace = "fireplace",
    Gatling = "gatling",
}

export type LightEffect = {
    r?: number;
    g?: number;
    b?: number;
    intensity?: number;
    mode?: LightModeEnum;
    interval?: number;
    animation?: AnimationEnum;
    animationDuration?: number;
    animationRepeats?: number;
};

export type EffectType = {
    slug: string;
    title: string;
    icon?: string;
    soundEffect?: SoundEffectType;
    lightEffect?: LightEffect;
};

export enum RGBChannelEnum {
    Intensity = 1,
    R = 2,
    G = 3,
    B = 4,
    Mode = 7,
    Interval = 6,
}
