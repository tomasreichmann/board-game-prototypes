import { countersMap as countersMapInitial } from "../counters-deck";
import { assetMap as assetMapInitial } from "../assets-en-deck";
import { effectMap as effectMapInitial } from "../effects-deck-en";
import { stuntMap as stuntMapInitial } from "../stunts-en-deck";
import { outcomeMap as outcomeMapInitial } from "../outcomeDeck";
import { actorMap as actorMapInitial } from "../actors-deck";
export { assetModifierMap } from "../asset-modifiers-en-deck";
export { tacticalRoleMap as actorRoleMap, tacticalModifierMap as actorModifierMap } from "../tactical-roles";

import defaultProps from "./defaultProps";

// <Outcome {...outcomeMap.success} />
export const outcomeMap = Object.fromEntries(
    Object.entries(outcomeMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultOutcomeProps, ...value }])
);

// <Effect {...counterMap.danger} />
export const effectMap = Object.fromEntries(
    Object.entries(effectMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultEffectProps, ...value }])
);

// <CounterCard {...counterMap.danger} />
export const counterMap = Object.fromEntries(
    Object.entries(countersMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultCounterProps, ...value }])
);

// <LayeredAssetCard {...assetMap["base_light_weapon"]} modifier={tacticalModifierMap.base_fast} />
export const assetMap = Object.fromEntries(
    Object.entries(assetMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultAssetProps, ...value }])
);

// <StuntCard {...stuntMap.dontGiveUp} />
export const stuntMap = Object.fromEntries(
    Object.entries(stuntMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultStuntProps, ...value }])
);

// <LayeredActorCard {...actorMap.claw_green} role={actorRoleMap.tank} modifier={actorModifierMap.reaching} />
export const actorMap = Object.fromEntries(
    Object.entries(actorMapInitial).map(([key, value]) => [key, { ...defaultProps.defaultActorProps, ...value }])
);
