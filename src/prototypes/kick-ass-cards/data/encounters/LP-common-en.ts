import { ClockProps } from "../../components/Clock";
import { ActorCardProps } from "../../components/gameComponents/ActorCard";
import { AssetCardProps } from "../../components/gameComponents/AssetCard";
import { EffectCardProps } from "../../components/gameComponents/EffectCard";
import { WithCount } from "../../types";

export const defaultClockProps = {
    size: "Bridge" as ClockProps["size"],
    className: "not-prose relative drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultActorProps = {
    size: "Bridge" as ClockProps["size"],
    className: "not-prose relative drop-shadow-md print:drop-shadow-none print:filter-none",
    imagePosition: "center top",
};
export const defaultEffectProps = {
    size: "Mini European" as ClockProps["size"],
    className: "not-prose relative drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultAssetProps = {
    size: "Mini European" as ClockProps["size"],
    className: "not-prose relative drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultMiniProps = {
    baseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    backBaseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    baseWidth: "0.5in",
    height: "2in",
    width: "1in",
};

export const characters = {
    aia: {
        slug: "aia",
        imageUri: "/LP/Aia.png",
        name: "Aia",
        imagePosition: "center top",
        occupation: "Head Researcher, Geneticist",
        notes: "Aia is the team leader and a renowned geneticist. She has increased intelligence and problem-solving abilities, as well as heightened senses and physical strength. However, she has a tendency to be overly competitive and can be ruthless in her goals. Her hidden talent is that she is a skilled musician and has a beautiful voice.",
    } as ActorCardProps,
    ela: {
        slug: "ela",
        imageUri: "/LP/Ela.png",
        name: "Ela",
        imagePosition: "center top",
        occupation: "Doctor",
        notes: "Ela is a doctor and a team expert in physiological modifications. She has increased healing abilities and strong resistance to diseases. Her hidden weakness is that she has a weakness for sweets and sometimes indulges in them when no one is around. Her hidden talent is that she is a talented artist and has a natural gift for drawing and painting.",
    } as ActorCardProps,
    isa: {
        slug: "isa",
        imageUri: "/LP/Isa.png",
        name: "Isa",
        imagePosition: "center top",
        occupation: "IT Specialist",
        notes: "Isa is a computer scientist and a team expert in hacking. She has increased information processing speed and memory and can directly interface with technology using her mind. She can be too trusting and has fallen for scams several times. She is a skilled fighter and has won many tournaments.",
    } as ActorCardProps,
    opa: {
        slug: "opa",
        imageUri: "/LP/Opa.png",
        name: "Opa",
        imagePosition: "center top",
        occupation: "Botanist",
        notes: "Opa is a botanist and a team expert in plant genetics. She has the ability to photosynthesize and communicate with plants telepathically. Her hidden weakness is that she has a gambling addiction and has bet on everything from card games to sports several times. Her hidden talent is that she is a skilled cook and can prepare a variety of delicious dishes.",
    } as ActorCardProps,
    una: {
        slug: "una",
        imageUri: "/LP/Una.png",
        name: "Una",
        imagePosition: "center top",
        occupation: "Geologist",
        notes: "Una is a geologist and a team expert in terraforming. She has increased endurance and the ability to survive in extreme conditions. Her weakness is that she can be prone to anger and can be quick to anger. Her hidden talent is that she is a talented dancer and has won many awards for her performances.",
    } as ActorCardProps,
    victor: {
        slug: "victor",
        imageUri: "/LP/viktor.png",
        name: "Victor",
        imagePosition: "center top",
        occupation: "Ship Engineer",
        notes: "Confidence 0/4",
    } as ActorCardProps,
    endless_swarm_of_spore_drones: {
        slug: "endless_swarm_of_spore_drones",
        imageUri:
            "/LP/ScrattCZ_croud_of_sci-fi_floral_zombies_invading_a_futuristic_c_ec55d41e-04de-4a50-b3a5-7691310dda21.png",
        imagePosition: "center top",
        name: "Endless swarm of spore drones",
        occupation: "Once thinking and feeling beings, now just empty shells with the impulse to kill",
        notes: "Lashing Attack: 1x Injury; Infection: if Defense fails -> Spore Infection",
    } as ActorCardProps,
    buxus: {
        slug: "buxus",
        size: "US game",
        imageUri:
            "/LP/ScrattCZ_a_portrait_of_a_man_with_well-groomed_beard_with_roots_1b41648b-212a-4659-b5d3-e746c9d3d069.png",
        imagePosition: "center 30%",
        name: "Buxus",
        occupation: "Spore hybrid of Dr. Zimostraz",
    } as ActorCardProps,
    spore_sirens: {
        slug: "spore_sirens",
        imageUri:
            "/LP/ScrattCZ_several_screaming_slender_6_feet_tall_feminine-looking_70707d8f-a4ff-474f-974a-608f4d82b3c9.png",
        name: "Spore Sirens",
        occupation: "Infected inhabitants of the water world",
        notes: "Action: Nerve-racking scream - Zone: +1 Distress, Bite - Crew reputation",
        toughness: 6,
        reward: "Medigel, Saving New Vega +1",
    } as ActorCardProps,
    infected_recharge_tower: {
        slug: "infected_recharge_tower",
        imageUri:
            "/LP/sci-fi_electric_tesla_tower_spiky_cannon_charging_with_lightning_in_the_middle_of_space_station_corridor.jpg",
        name: "Infected Recharge Tower",
        toughness: 6,
        threat: "Once every 3 rounds, it sends an electrical discharge up to 2 zones away, injuring Androids for 2x Injury and organics for 2x Distress in the entire zone; A hit for 1 round disables vehicles; Resistant to conventional weapons",
        reward: "2x Overclocking Battery, Saving New Vega +1",
    } as ActorCardProps,
    firefighting_drones: {
        slug: "firefighting_drones",
        imageUri:
            "/LP/several_small_bulky_sci-fi_firefighting_drones_spraying_water_on_a_burning_cyberpunk_street_stall.jpg",
        name: "Firefighting Drones",
        notes: "Action: -1 Heat to everyone in the zone where the fire is burning; Destruction: -1 Saving New Vega",
    } as ActorCardProps,
    infected_robotic_arm: {
        slug: "infected_robotic_arm",
        imageUri:
            "/LP/ScrattCZ_sci-fi_industrial_floor-mounted_robotic_arm_with_clamp_59d24f3a-44d0-4133-8141-09fc23307af6.png",
        name: "Infected Robotic Arm",
        toughness: 6,
        reward: "Robotic Prosthesis",
        threat: "Grab - Stuck / Complication, Crush - 2x Injury",
    } as ActorCardProps,
    spore_swarm: {
        slug: "spore_swarm",
        imageUri: "/LP/alien-swarm.jpg",
        name: "Spore Swarm",
        notes: "Infected with spores +1x Doom; Immune to shooting and melee attacks. Weak to fire and area attacks.",
    } as ActorCardProps,
    infected_robotic_arm_2: {
        slug: "infected_robotic_arm_2",
        imageUri:
            "/LP/ScrattCZ_sci-fi_industrial_floor-mounted_robotic_arm_with_clamp_59d24f3a-44d0-4133-8141-09fc23307af6.png",
        name: "Infected Robotic Arm 2",
        toughness: 6,
        threat: "Throwing Scrap - 2x Injury up to 2 zones away, Throwing Away - 1x Distress and throwing up to 2 zones away",
        reward: "Targeting Eye Implant",
    } as ActorCardProps,
    confused_cargo_beetle: {
        slug: "confused_cargo_beetle",
        imageUri:
            "/LP/ScrattCZ_huge_flying_alien_with_electric_tentacles_and_weeds_gr_3507de64-ba9e-4db4-a383-a7d4e892dd34.png",
        name: "Confused Cargo Beetle",
        notes: "Action: When injured: Scream - +1 Distress in the given and adjacent zones; Impact - movement +1",
    } as ActorCardProps,
    infected_robo_mercenary: {
        slug: "infected_robo_mercenary",
        imageUri:
            "/LP/ScrattCZ_futuristic_killer_military_robot_with_leaves_flowers_a_eb1a5d76-ca30-4811-a6d8-6fa94a15d1af.png",
        name: "Infected Robo-Mercenary",
        toughness: 8,
        reward: "1x Overclocking Battery, 1x Flamethrower Arm",
        threat: "SavingNew Vega -1",
        notes: "Action: -1 Heat to everyone in the zone where the fire is burning; Destruction: -1 Saving New Vega",
    } as ActorCardProps,
    security_robots: {
        slug: "security_robots",
        imageUri:
            "/LP/ScrattCZ_two_sci-fi_crowds_of_angry_humanoids_shouting_at_each__70560736-bf42-4734-a7e3-f55f7450352b.png",
        name: "Security Robots",
        imagePosition: "center 30%",
        toughness: 8,
        notes: "Action: Scanning - +1 Effect against anything in the zone until the end of the conflict.",
        threat: "Flamethrower - 1x Injury, +1 Heat, Disintegrator 2x/1x Injury. Resistant to shooting and melee attacks.",
        reward: "1x Disintegrator, 1x Flamethrower Arm, Saving New Vega -1",
    } as ActorCardProps,
};

type ItemType = WithCount<AssetCardProps & { slug: string }>;

export const items = {
    medi_gel: {
        slug: "medi_gel",
        icon: "/LP/icons/injection.png",
        title: "Medi-gel",
        effect: "Repairs organic damage",
        count: 5,
    } as ItemType,
    nano_gel: {
        slug: "nano_gel",
        icon: "/LP/icons/tube.png",
        title: "Nano-gel",
        effect: "Repairs mechanical damage",
        count: 5,
    } as ItemType,
    instahack: {
        slug: "instahack",
        icon: "/LP/icons/gadget.png",
        title: "Instahack",
        effect: "Temporarily gains control over a device for 1 turn",
        count: 2,
    } as ItemType,
    grapple_gun: {
        slug: "grapple_gun",
        icon: "/LP/icons/rifle.png",
        title: "Grapple gun",
        effect: "Shoots a grappling hook and pulls to the target",
        count: 1,
    } as ItemType,
    gluenade: {
        slug: "gluenade",
        icon: "/LP/icons/bag.png",
        title: "Gluenade",
        effect: "Grenade that sticks everything in the zone for 1 turn",
        count: 2,
    } as ItemType,
    emp_grenade: {
        slug: "emp_grenade",
        icon: "/LP/icons/capsule.png",
        title: "EMP grenade",
        effect: "Grenade that temporarily disables all electronics in the zone for 1 turn",
        count: 2,
    } as ItemType,
    rapid_regen: {
        slug: "rapid_regen",
        icon: "/LP/icons/syringe-2.png",
        title: "Rapid-regen",
        effect: "Instantly heals all organic injuries. Tissue may mutate (+1 Doom)",
        count: 2,
    } as ItemType,
    sped: {
        slug: "sped",
        icon: "/LP/icons/nose-spray.png",
        title: "SPED",
        effect: "+1 movement, multiplies landing distance by 3 rounds",
        count: 2,
    } as ItemType,
    rage: {
        slug: "rage",
        icon: "/LP/icons/syringe.png",
        title: "Rage",
        effect: "+1 effect on strength actions and close-range attacks for 3 rounds",
        count: 2,
    } as ItemType,
    overclocking_battery: {
        slug: "overclocking_battery",
        icon: "/LP/icons/battery.png",
        title: "Overclocking Battery",
        effect: "Once, +2 effect on action for Synthetics or machines",
        count: 4,
    } as ItemType,
    targeting_eye_implant: {
        slug: "targeting_eye_implant",
        icon: "/LP/targeting-implant.png",
        title: "Targeting Eye Implant",
        effect: "+1 Effect on shooting actions. +1 Destruction.",
        count: 1,
    } as ItemType,
    flamethrower_arm: {
        slug: "flamethrower_arm",
        icon: "/LP/icons/flamethrower-arm.jpg",
        title: "Flamethrower Arm",
        effect: "1x Injury, +1 Heat to all in the zone. +1 Destruction when installed (+1 Heat when used, +2 Injury when uninstalled)",
        count: 2,
    } as ItemType,
    bfg: {
        slug: "bfg",
        icon: "/LP/icons/bfg.png",
        title: "BFG",
        effect: "Huge weapon: 1 round absorbs 1 heat from anyone in the zone, in the next damages all in all zones in a straight line for the amount of heat absorbed.",
        count: 1,
    } as ItemType,
    disintegrator: {
        slug: "disintegrator",
        icon: "/LP/icons/rifle-3.png",
        title: "Disintegrator",
        effect: "+1 Effect against organic targets",
        count: 1,
    } as ItemType,
};

export const clocks = {
    researcher_respect: {
        slug: "researcher_respect",
        title: "Building respect for Viktor among the researchers",
        reward: "Mental stim - 2 actions",
        current: 0,
        total: 6,
    } as ClockProps,
    calm_down_the_researchers: {
        slug: "calm_down_the_researchers",
        title: "Calm down the researchers",
        reward: "Consumable",
        current: 0,
        total: 6,
    } as ClockProps,
    crew_reputation: {
        slug: "crew_reputation",
        title: "Crew reputation",
        reward: "Each: Magnetic chip",
        threat: "Title: Damn hooligans",
        current: 3,
        total: 6,
    } as ClockProps,
    too_late_for_viktor: {
        slug: "too_late_for_viktor",
        title: "Delay",
        threat: "It may be too late for Viktor",
        note: "Ticks down every whole round",
        current: 6,
        total: 6,
    } as ClockProps,
    viktor_in_critical_condition: {
        slug: "viktor_in_critical_condition",
        title: "Viktor in critical condition",
        current: 6,
        total: 6,
        threat: "Viktor succumbs to his injuries",
        reward: "Viktor is stabilized",
    } as ClockProps,
    saving_new_vega: {
        slug: "saving_new_vega",
        title: "Saving New Vega",
        current: 2,
        total: 6,
        threat: "New Vega is consumed by spores",
        reward: "Title: Heroes of New Vega",
    } as ClockProps,
    suspicion_of_security_robots: {
        slug: "suspicion_of_security_robots",
        title: "Suspicion of Security Robots",
        current: 4,
        total: 4,
        threat: "They open fire",
        reward: "Access to the airlock",
    } as ClockProps,
    gathering_of_the_spore_drone_crowd: {
        slug: "gathering_of_the_spore_drone_crowd",
        title: "Gathering of the Spore Drone Crowd",
        current: 8,
        total: 8,
        threat: "Spore Drone Crowd Attacks",
    } as ClockProps,
    panic_at_the_airlock: {
        slug: "panic_at_the_airlock",
        title: "Panic at the airlock",
        current: 6,
        total: 6,
        threat: "Everyone +1 Stress",
        reward: "Saving New Vega +1",
    } as ClockProps,
};

export const effects = {
    spore_fever: {
        slug: "spore_fever",
        icon: "thermometerHot",
        title: "Spore Fever",
        effect: "+1 Heat each round until cured",
    } as EffectCardProps,
    spore_infection: {
        slug: "spore_infection",
        icon: "/LP/icons/spore-infection-2.png",
        title: "Spore Infection",
        effect: "+1 Doom",
    } as EffectCardProps,
};
