import { countersMap as countersMapInitial } from "../counters-deck";
import { assetMap as assetMapInitial } from "../assets-en-deck";
import { effectMap as effectMapInitial } from "../effects-deck-en";
import { stuntMap as stuntMapInitial } from "../stunts-en-deck";
import { outcomeMap as outcomeMapInitial } from "../outcomeDeck";
import { actorMap as actorMapInitial } from "../actors-deck";
export { tacticalRoleMap as actorRoleMap, tacticalModifierMap as actorModifierMap } from "../tactical-roles";

import defaultProps from "./defaultProps";

export const counterMap = Object.fromEntries(
    Object.entries(countersMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultCounterProps, ...value }])
);

export const assetMap = Object.fromEntries(
    Object.entries(assetMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultAssetProps, ...value }])
);

export const effectMap = Object.fromEntries(
    Object.entries(effectMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultEffectProps, ...value }])
);

export const stuntMap = Object.fromEntries(
    Object.entries(stuntMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultStuntProps, ...value }])
);

export const outcomeMap = Object.fromEntries(
    Object.entries(outcomeMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultOutcomeProps, ...value }])
);

export const actorMap = Object.fromEntries(
    Object.entries(actorMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultActorProps, ...value }])
);
