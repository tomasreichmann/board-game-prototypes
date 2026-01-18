import defaultProps from "../defaultProps";
import { AssetType, EffectType, OutcomeType, StuntType } from "@/prototypes/kick-ass-cards/types";
import { CounterType } from "../../counters-deck";
import { ActorType } from "../../actors-deck";

/* // <Outcome {...outcomeMap.success} />
export const exilesOutcomeMap = Object.fromEntries(
    Object.entries({} satisfies Record<string, OutcomeType>).map(([key, value]) => [
        key,
        { ...defaultProps.defaultOutcomeProps, ...value },
    ])
);

// <Effect {...counterMap.danger} />
export const exilesEffectMap = Object.fromEntries(
    Object.entries({} satisfies Record<string, EffectType>).map(([key, value]) => [
        key,
        { ...defaultProps.defaultEffectProps, ...value },
    ])
);

// <CounterCard {...counterMap.danger} />
export const exilesCounterMap = Object.fromEntries(
    Object.entries({} satisfies Record<string, CounterType>).map(([key, value]) => [
        key,
        { ...defaultProps.defaultCounterProps, ...value },
    ])
);

// <LayeredAssetCard {...assetMap["base_light_weapon"]} modifier={tacticalModifierMap.base_fast} />
export const exilesAssetMap = Object.fromEntries(
    Object.entries({} satisfies Record<string, AssetType>).map(([key, value]) => [
        key,
        { ...defaultProps.defaultAssetProps, ...value },
    ])
); */

// <StuntCard {...stuntMap.dontGiveUp} />
export const exilesStuntMap = Object.fromEntries(
    Object.entries({
        machine_speaker: {
            title: "Machine Speaker",
            effect: "You can understand, communicate and interface with machines of any kind.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/machine_speaker.png",
            deck: "Machinist-Priest Heretic",
        },
        servo_arms: {
            title: "Servo-Arms",
            effect: "You always have the right tool at hand. +1 Effect on repairs.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/servo_arms.png",
            deck: "Machinist-Priest Heretic",
        },
        specialized_augments: {
            title: "Specialized Augments",
            effect: "Once per encounter, you can enable a new sense, like Xray vision and get +1 Effect on using it.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/specialized_augments.png",
            deck: "Machinist-Priest Heretic",
        },
        blood_sense: {
            title: "Blood Sense",
            effect: "You can detect living organic creatures. When at least a dog-sized one dies in the same zone, you can collect one unit of blood.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/blood_sense.png",
            deck: "Crimson Witch/Warlock",
        },
        hemomancy: {
            title: "Hemomancy",
            effect: "You can conjure and move solid objects made of crystallized blood from your (+1 Injury) or collected blood.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/hemomancy.png",
            deck: "Crimson Witch/Warlock",
        },
        ritualist: {
            title: "Ritualist",
            effect: "You can perform rituals to influence creatures at a distance with +1 Effect.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/ritualist.png",
            deck: "Crimson Witch/Warlock",
        },
        weapon_proficiency: {
            title: "Weapon Proficiency",
            effect: "You are skilled with most common weapons and military equipment.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/weapon_proficiency.png",
            deck: "Augmented Veteran",
        },
        augmented_body: {
            title: "Augmented Body",
            effect: "Your augmented body provides super-human strength and speed. +1 Effect on strength and speed actions.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/augmented_body.png",
            deck: "Augmented Veteran",
        },
        pain_inhibitor: {
            title: "Pain Inhibitor",
            effect: "Your pain inhibitor maintains your consciousness under extreme strain. You can sustain +1 Injury before falling unconscious.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/pain_inhibitor.png",
            deck: "Augmented Veteran",
        },
        surface_thoughts: {
            title: "Surface Thoughts",
            effect: "You can read people's surface thoughts and project emotions onto them.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/surface_thoughts.png",
            deck: "Noble Empath",
        },
        empathic_touch: {
            title: "Empathic Touch",
            effect: "You can detect past emotions associated with items on touch.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/empathic_touch.png",
            deck: "Noble Empath",
        },
        noble_lineage: {
            title: "Noble Lineage",
            effect: "Many people still remember your name and station, for better or worse.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/noble_lineage.png",
            deck: "Noble Empath",
        },
        certified_navigator: {
            title: "Certified Navigator",
            effect: "You can safely chart routes through space for Spin drive travel.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/certified_navigator.png",
            deck: "Void Seer",
        },
        space_folding: {
            title: "Space Folding",
            effect: "You can fold space locally with sheer will on short distances, moving through space or matter.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/space_folding.png",
            deck: "Void Seer",
        },
        gravity_manipulation: {
            title: "Gravity Manipulation",
            effect: "You can influence gravity between two objects. Pulling them together, pushing away, or disable it entirely.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/gravity_manipulation.png",
            deck: "Void Seer",
        },
        expert_doctor: {
            title: "Expert Doctor",
            effect: "You can perform surgeries and treat most diseases.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/expert_doctor.png",
            deck: "Synthetic Medic",
        },
        knowledge_base: {
            title: "Knowledge Base",
            effect: "You contain huge records of history and knowledge across scientific fields.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/knowledge_base.png",
            deck: "Synthetic Medic",
        },
        vacuum_tolerance: {
            title: "Vacuum Tolerance",
            effect: "You don't breathe and can tolerate the vacuum of space without a space-suit.",
            icon: "/public/mighty-decks/encounters/exiles_of_the_hungry_void/stunts/vacuum_tolerance.png",
            deck: "Synthetic Medic",
        },
    } satisfies Record<string, StuntType>).map(([key, value]) => [
        key,
        { ...defaultProps.defaultStuntProps, ...value },
    ]),
);

/* // <LayeredActorCard {...actorMap.claw_green} role={actorRoleMap.tank} modifier={actorModifierMap.reaching} />
export const exilesActorMap = Object.fromEntries(
    Object.entries({} satisfies Record<string, ActorType>).map(([key, value]) => [
        key,
        { ...defaultProps.defaultActorProps, ...value },
    ])
); */
