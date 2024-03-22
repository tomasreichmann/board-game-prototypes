import { ClockProps } from "../../components/Clock";
import { ActorCardProps } from "../../components/gameComponents/ActorCard";
import { AssetCardProps } from "../../components/gameComponents/AssetCard";
import { EffectCardProps } from "../../components/gameComponents/EffectCard";
import { WithCount } from "../../types";
import { effectMap } from "../effects-deck-en";

export const defaultClockProps = {
    size: "Bridge" as ClockProps["size"],
    className: "not-prose relative drop-shadow-md print:drop-shadow-none print:filter-none",
} as const;
export const defaultActorProps = {
    size: "Bridge" as ClockProps["size"],
    className: "not-prose relative drop-shadow-md print:drop-shadow-none print:filter-none",
    imagePosition: "center top",
} as const;
export const defaultEffectProps = {
    size: "Mini European" as ClockProps["size"],
    className: "not-prose relative drop-shadow-md print:drop-shadow-none print:filter-none",
} as const;
export const defaultAssetProps = {
    size: "Mini European" as ClockProps["size"],
    className: "not-prose relative drop-shadow-md print:drop-shadow-none print:filter-none",
} as const;
export const defaultMiniProps = {
    baseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    backBaseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    baseWidth: "0.5in",
    height: "2in",
    width: "1in",
} as const;

type ActorType = ActorCardProps & { slug: string };

export const actors = {
    aia: {
        slug: "aia",
        imageUri: "/LP/Aia.png",
        name: "Aia",
        imagePosition: "center top",
        occupation: "Head Researcher, Geneticist",
        notes: "Aia is the team leader and a renowned geneticist. She has increased intelligence and problem-solving abilities, as well as heightened senses and physical strength. However, she has a tendency to be overly competitive and can be ruthless in her goals. Her hidden talent is that she is a skilled musician and has a beautiful voice.",
    } as ActorType,
    ela: {
        slug: "ela",
        imageUri: "/LP/Ela.png",
        name: "Ela",
        imagePosition: "center top",
        occupation: "Doctor",
        notes: "Ela is a doctor and a team expert in physiological modifications. She has increased healing abilities and strong resistance to diseases. Her hidden weakness is that she has a weakness for sweets and sometimes indulges in them when no one is around. Her hidden talent is that she is a talented artist and has a natural gift for drawing and painting.",
    } as ActorType,
    isa: {
        slug: "isa",
        imageUri: "/LP/Isa.png",
        name: "Isa",
        imagePosition: "center top",
        occupation: "IT Specialist",
        notes: "Isa is a computer scientist and a team expert in hacking. She has increased information processing speed and memory and can directly interface with technology using her mind. She can be too trusting and has fallen for scams several times. She is a skilled fighter and has won many tournaments.",
    } as ActorType,
    opa: {
        slug: "opa",
        imageUri: "/LP/Opa.png",
        name: "Opa",
        imagePosition: "center top",
        occupation: "Botanist",
        notes: "Opa is a botanist and a team expert in plant genetics. She has the ability to photosynthesize and communicate with plants telepathically. Her hidden weakness is that she has a gambling addiction and has bet on everything from card games to sports several times. Her hidden talent is that she is a skilled cook and can prepare a variety of delicious dishes.",
    } as ActorType,
    una: {
        slug: "una",
        imageUri: "/LP/Una.png",
        name: "Una",
        imagePosition: "center top",
        occupation: "Geologist",
        notes: "Una is a geologist and a team expert in terraforming. She has increased endurance and the ability to survive in extreme conditions. Her weakness is that she can be prone to anger and can be quick to anger. Her hidden talent is that she is a talented dancer and has won many awards for her performances.",
    } as ActorType,
    victor: {
        slug: "victor",
        imageUri: "/LP/viktor.png",
        name: "Victor",
        imagePosition: "center top",
        occupation: "Ship Engineer",
        notes: "Confidence 0/4",
    } as ActorType,
    endless_swarm_of_spore_drones: {
        slug: "endless_swarm_of_spore_drones",
        imageUri:
            "/LP/ScrattCZ_croud_of_sci-fi_floral_zombies_invading_a_futuristic_c_ec55d41e-04de-4a50-b3a5-7691310dda21.png",
        imagePosition: "center top",
        name: "Endless swarm of spore drones",
        occupation: "Once thinking and feeling beings, now just empty shells with the impulse to kill",
        notes: "Lashing Attack: 1x Injury; Infection: if Defense fails -> Spore Infection",
    } as ActorType,
    buxus: {
        slug: "buxus",
        imageUri:
            "/LP/ScrattCZ_a_portrait_of_a_man_with_well-groomed_beard_with_roots_1b41648b-212a-4659-b5d3-e746c9d3d069.png",
        imagePosition: "center 30%",
        name: "Buxus",
        occupation: "Spore hybrid of Dr. Zimostraz",
    } as ActorType,
    spore_sirens: {
        slug: "spore_sirens",
        imageUri:
            "/LP/ScrattCZ_several_screaming_slender_6_feet_tall_feminine-looking_70707d8f-a4ff-474f-974a-608f4d82b3c9.png",
        name: "Spore Sirens",
        occupation: "Infected inhabitants of the water world",
        notes: "Action: Nerve-racking scream - Zone: +1 Distress, Bite - Crew reputation",
        toughness: 6,
        reward: "Medigel, Saving New Vega +1",
    } as ActorType,
    infected_recharge_tower: {
        slug: "infected_recharge_tower",
        imageUri:
            "/LP/sci-fi_electric_tesla_tower_spiky_cannon_charging_with_lightning_in_the_middle_of_space_station_corridor.jpg",
        name: "Infected Recharge Tower",
        toughness: 6,
        threat: "Once every 3 rounds, it sends an electrical discharge up to 2 zones away, injuring Androids for 2x Injury and organics for 2x Distress in the entire zone; A hit for 1 round disables vehicles; Resistant to conventional weapons",
        reward: "2x Overclocking Battery, Saving New Vega +1",
    } as ActorType,
    firefighting_drones: {
        slug: "firefighting_drones",
        imageUri:
            "/LP/several_small_bulky_sci-fi_firefighting_drones_spraying_water_on_a_burning_cyberpunk_street_stall.jpg",
        name: "Firefighting Drones",
        notes: "Action: -1 Heat to everyone in the zone where the fire is burning; Destruction: -1 Saving New Vega",
    } as ActorType,
    infected_robotic_arm: {
        slug: "infected_robotic_arm",
        imageUri:
            "/LP/ScrattCZ_sci-fi_industrial_floor-mounted_robotic_arm_with_clamp_59d24f3a-44d0-4133-8141-09fc23307af6.png",
        name: "Infected Robotic Arm",
        toughness: 6,
        reward: "Robotic Prosthesis",
        threat: "Grab - Stuck / Complication, Crush - 2x Injury",
    } as ActorType,
    spore_swarm: {
        slug: "spore_swarm",
        imageUri: "/LP/alien-swarm.jpg",
        name: "Spore Swarm",
        notes: "Infected with spores +1x Doom; Immune to shooting and melee attacks. Weak to fire and area attacks.",
    } as ActorType,
    infected_robotic_arm_2: {
        slug: "infected_robotic_arm_2",
        imageUri:
            "/LP/ScrattCZ_sci-fi_industrial_floor-mounted_robotic_arm_with_clamp_59d24f3a-44d0-4133-8141-09fc23307af6.png",
        name: "Infected Robotic Arm 2",
        toughness: 6,
        threat: "Throwing Scrap - 2x Injury up to 2 zones away, Throwing Away - 1x Distress and throwing up to 2 zones away",
        reward: "Targeting Eye Implant",
    } as ActorType,
    confused_cargo_beetle: {
        slug: "confused_cargo_beetle",
        imageUri:
            "/LP/ScrattCZ_huge_flying_alien_with_electric_tentacles_and_weeds_gr_3507de64-ba9e-4db4-a383-a7d4e892dd34.png",
        name: "Confused Cargo Beetle",
        notes: "Action: When injured: Scream - +1 Distress in the given and adjacent zones; Impact - movement +1",
    } as ActorType,
    infected_robo_mercenary: {
        slug: "infected_robo_mercenary",
        imageUri:
            "/LP/ScrattCZ_futuristic_killer_military_robot_with_leaves_flowers_a_eb1a5d76-ca30-4811-a6d8-6fa94a15d1af.png",
        name: "Infected Robo-Mercenary",
        toughness: 8,
        reward: "1x Overclocking Battery, 1x Flamethrower Arm",
        threat: "SavingNew Vega -1",
        notes: "Action: -1 Heat to everyone in the zone where the fire is burning; Destruction: -1 Saving New Vega",
    } as ActorType,
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
    } as ActorType,
    tentacle_on_the_spore_ship: {
        slug: "tentacle_on_the_spore_ship",
        imageUri: "/LP/ship_with_tentacles.jpg",
        toughness: 1,
        name: "Tentacle on the Spore Ship",
        notes: "Ignores 1 damage, blocks attack on the ship",
        threat: "Throwing containers",
    } as ActorType,
    k_chark_shkrh: {
        slug: "k_chark_shkrh",
        imageUri: "/LP/reptilian_male.jpg",
        toughness: 3,
        name: "K'Chark Shkrh",
        occupation: "Reptilian Mercenary",
        notes: "One of the last members of a race from a swampy planet, whose local star has died out. Born into a warrior caste, he trained in weapons and hunting from an early age. His current motivation is collecting trophies - hunting strong and interesting opponents - for the glory of his extinct clan and ancestors.",
    } as ActorType,
    xander: {
        slug: "xander",
        imageUri: "/LP/security-guard.jpg",
        name: "Xander",
        toughness: 3,
        occupation: "Terran Security Guard",
        notes: "He often appears strict and tries to show his power to others. Lack of experience and weak morals often lead to wrong decisions and poor handling of situations. In addition, he often resorts to illegal practices to earn extra money and maintain his high standard of living.",
    } as ActorType,
    squeko: {
        slug: "squeko",
        imageUri: "/LP/rat_man.jpg",
        name: "Squeko",
        toughness: 3,
        occupation: "Stripper from New Vega",
        notes: "Rodentid Squeko always tried to get as much for himself as possible, he has no honor, self-preservation is his top priority. He has an excellent sense of smell and intuition in organics. He learned to avoid felinids because there is a natural hostility between these species.",
    } as ActorType,
    hbfuoaoqli: {
        slug: "hbfuoaoqli",
        imageUri: "/LP/reptilian_female.jpg",
        imagePosition: "left top",
        name: "HBFUOAOQLI",
        occupation: "Reptilian Costume Designer and Makeup Artist",
        notes: "She changed her name from Jackie Liz to HBFUOAOQLI because she is introverted and wanted to complicate it for others to address her. She wears her creations if she ever leaves the house. OMG! Total panic, but outwardly maintains the poker face of a paralyzed introvert.",
        toughness: 3,
    } as ActorType,
    lyra: {
        slug: "lyra",
        imageUri: "/LP/cat-hybrid.jpg",
        imagePosition: "left top",
        name: "Lyra",
        occupation: "Feline Mercenary",
        notes: "She undertakes dangerous missions for her faction. She is building her name in the local galaxy. She is very agile and capable. She has armor and a custom-made energy rifle. She is looking for meaning and purpose in her work, having seen too much violence already.",
        toughness: 3,
    } as ActorType,
    buzz: {
        slug: "buzz",
        imageUri: "/LP/insectoid_female.jpg",
        imagePosition: "left top",
        name: "Buzz",
        occupation: "Insectoid Mechanic",
        notes: "Although she doesn't talk much, she is quite skilled in mechanical repairs and maintenance. She is cautious and observant, and communicates mostly through buzzing noises.",
        toughness: 3,
    } as ActorType,
    vulcan_dragon: {
        slug: "vulcan_dragon",
        name: "Vulcan Dragon",
        imageUri: "/LP/scifi_dragon.jpg",
        toughness: 6,
        notes: "Action: Fire Breath - +1 Injury and 2x Heat; Bite: 2x Injury. Scaly skin - immune to fire damage, Max. 1 Injury per 1 attack.",
    } as ActorType,
    freezing_vine: {
        slug: "freezing_vine",
        name: "Freezing Vine",
        imageUri: "/LP/green_tentacle.jpg",
        toughness: 4,
        threat: "Grabbing a character - Stuck, Choking a character - 3x Injury, Throwing a character onto another - +1 Injury to both, Splashing with cooling liquid - Everyone in the zone +1 Cold.",
        notes: "Retracts into the fog and becomes invisible with each hit.",
    } as ActorType,
    freezing_vine_2: {
        slug: "freezing_vine_2",
        name: "Freezing Vine 2",
        imageUri: "/LP/green_tentacle.jpg",
        toughness: 4,
        threat: "Grabbing a character - Stuck, Choking a character - 3x Injury, Throwing a character onto another - +1 Injury to both, Splashing with cooling liquid - Everyone in the zone +1 Cold.",
        notes: "Retracts into the fog and becomes invisible with each hit.",
    } as ActorType,
    robotic_chef: {
        slug: "robotic_chef",
        name: "Robotic chef",
        imageUri: "/LP/kitchen_robot.jpg",
        toughness: 6,
        threat: "Every turn: Capture and escape, Throwing food - Complications",
        reward: "Overclocking battery",
    } as ActorType,
    spore_drone_swarm: {
        slug: "spore_drone_swarm",
        name: "Spore drone swarm",
        imageUri:
            "/LP/ScrattCZ_croud_of_sci-fi_floral_zombies_invading_a_futuristic_c_ec55d41e-04de-4a50-b3a5-7691310dda21.png",
        toughness: 12,
        threat: "Every turn: Grappling - +1 Injury or Capture",
        reward: "1x Medi-gel, 1x Anxiolytics, Disintegrator",
    } as ActorType,
    spore_weed: {
        slug: "spore_weed",
        name: "Spore weed",
        imageUri: "/LP/spore_bush.jpg",
        toughness: 1,
        threat: "Every turn: Grappling - +1 Injury",
    } as ActorType,
    synthetic_engineer_overrun_by_a_spore_infection: {
        slug: "synthetic_engineer_overrun_by_a_spore_infection",
        name: "Synthetic engineer overrun by a spore infection",
        imageUri: "/LP/drone_engineer.jpg",
        toughness: 1,
        notes: "The engineer cannot move or speak properly. Only parts of sentences are understandable. The engineer knows all the ship's systems very well.",
    } as ActorType,
    sapling_vine: {
        slug: "sapling_vine",
        name: "Sapling vine",
        imageUri: "/LP/green_tentacle.jpg",
        toughness: 4,
        threat: "Grabs character - Stuck, Blocks physical attacks on Buxus with a trapped character, Throws character at another - +1 Injury to both",
    } as ActorType,
    sapling_vine_2: {
        slug: "sapling_vine_2",
        name: "Sapling vine 2",
        imageUri: "/LP/green_tentacle.jpg",
        toughness: 4,
        threat: "Grabs character - Stuck, Blocks physical attacks on Buxus with a trapped character, Throws character at another - +1 Injury to both",
    } as ActorType,
    spore_drone: {
        slug: "spore_drone",
        name: "Spore drone",
        imageUri:
            "/LP/BlipBlop_Dark_fantasy_zombie_spores_animated_body_left_for_dead_e0a2eb85-983f-4aea-ac67-02c4e62e618d.png",
        toughness: 2,
        threat: "Bite: +1 Injury, Grab: Stuck",
    } as ActorType,
    spore_drone_2: {
        slug: "spore_drone_2",
        name: "Spore drone 2",
        imageUri:
            "/LP/BlipBlop_Dark_fantasy_zombie_spores_animated_body_left_for_dead_e0a2eb85-983f-4aea-ac67-02c4e62e618d.png",
        toughness: 2,
        threat: "Bite: +1 Injury, Grab: Stuck",
    } as ActorType,
    spore_drone_3: {
        slug: "spore_drone_3",
        name: "Spore drone 3",
        imageUri:
            "/LP/BlipBlop_Dark_fantasy_zombie_spores_animated_body_left_for_dead_e0a2eb85-983f-4aea-ac67-02c4e62e618d.png",
        toughness: 2,
        threat: "Bite: +1 Injury, Grab: Stuck",
    } as ActorType,
    spore_drone_4: {
        slug: "spore_drone_4",
        name: "Spore drone 4",
        imageUri:
            "/LP/BlipBlop_Dark_fantasy_zombie_spores_animated_body_left_for_dead_e0a2eb85-983f-4aea-ac67-02c4e62e618d.png",
        toughness: 2,
        threat: "Bite: +1 Injury, Grab: Stuck",
    },
    buxus_in_control: {
        slug: "buxus_in_control",
        name: "Buxus in control",
        imageUri: "/LP/buxus_final.jpg",
        imagePosition: "center 30%",
        toughness: 6,
        occupation: "Spore hybrid of Dr. Zimostráž",
        threat: "Controls the ship, Spore cloud - tries to control character to harm others, creates Sapling vine.",
    } as ActorType,
    buxus_monstrum: {
        slug: "buxus_monstrum",
        name: "Buxus Monstrum",
        imageUri: "/LP/buxus_monster.jpg",
        toughness: 8,
        threat: "Releases a cloud of ice spores every round: +1 Distress, +1 Frost in the zone. Throws bridge equipment +2 Injury.",
        note: "Receives +1 Injury from heat-based attacks.",
        reward: "+1 Salvation",
    } as ActorType,
};

type AssetType = WithCount<AssetCardProps & { slug: string }>;

export const assets = {
    medi_gel: {
        slug: "medi_gel",
        icon: "/LP/icons/injection.png",
        title: "Medi-gel",
        effect: "Repairs organic damage",
        count: 5,
    } as AssetType,
    nano_gel: {
        slug: "nano_gel",
        icon: "/LP/icons/tube.png",
        title: "Nano-gel",
        effect: "Repairs mechanical damage",
        count: 5,
    } as AssetType,
    instahack: {
        slug: "instahack",
        icon: "/LP/icons/gadget.png",
        title: "Instahack",
        effect: "Temporarily gains control over a device for 1 turn",
        count: 2,
    } as AssetType,
    grapple_gun: {
        slug: "grapple_gun",
        icon: "/LP/icons/rifle.png",
        title: "Grapple gun",
        effect: "Shoots a grappling hook and pulls to the target",
        count: 1,
    } as AssetType,
    gluenade: {
        slug: "gluenade",
        icon: "/LP/icons/bag.png",
        title: "Gluenade",
        effect: "Grenade that sticks everything in the zone for 1 turn",
        count: 2,
    } as AssetType,
    emp_grenade: {
        slug: "emp_grenade",
        icon: "/LP/icons/capsule.png",
        title: "EMP grenade",
        effect: "Grenade that temporarily disables all electronics in the zone for 1 turn",
        count: 2,
    } as AssetType,
    rapid_regen: {
        slug: "rapid_regen",
        icon: "/LP/icons/syringe-2.png",
        title: "Rapid-regen",
        effect: "Instantly heals all organic injuries. Tissue may mutate (+1 Doom)",
        count: 2,
    } as AssetType,
    sped: {
        slug: "sped",
        icon: "/LP/icons/nose-spray.png",
        title: "SPED",
        effect: "+1 movement, multiplies landing distance by 3 rounds",
        count: 2,
    } as AssetType,
    rage: {
        slug: "rage",
        icon: "/LP/icons/syringe.png",
        title: "Rage",
        effect: "+1 effect on strength actions and close-range attacks for 3 rounds",
        count: 2,
    } as AssetType,
    overclock_bat: {
        slug: "overclock_bat",
        icon: "/LP/icons/battery.png",
        title: "Overclocking Battery",
        effect: "Once, +2 effect on action for Synthetics or machines",
        count: 4,
    } as AssetType,
    targ_impl: {
        slug: "targ_impl",
        icon: "/LP/targeting-implant.png",
        title: "Targeting Eye Implant",
        effect: "+1 Effect on shooting actions. +1 Destruction.",
        count: 1,
    } as AssetType,
    flameth_arm: {
        slug: "flameth_arm",
        icon: "/LP/icons/flamethrower-arm.jpg",
        title: "Flamethrower Arm",
        effect: "1x Injury, +1 Heat to all in the zone. +1 Destruction when installed (+1 Heat when used, +2 Injury when uninstalled)",
        count: 2,
    } as AssetType,
    bfg: {
        slug: "bfg",
        icon: "/LP/icons/bfg.png",
        title: "BFG",
        effect: "Huge weapon: 1 round absorbs 1 heat from anyone in the zone, in the next damages all in all zones in a straight line for the amount of heat absorbed.",
        count: 1,
    } as AssetType,
    disintegrator: {
        slug: "disintegrator",
        icon: "/LP/icons/rifle-3.png",
        title: "Disintegrator",
        effect: "+1 Effect against organic targets",
        count: 4,
    } as AssetType,
    frag_grenade: {
        slug: "frag_grenade",
        icon: "/LP/icons/shell.png",
        title: "Fragmentation grenade",
        effect: "Damages everything in the zone",
        count: 4,
    } as AssetType,
    frost_grenade: {
        slug: "frost_grenade",
        icon: "/LP/icons/liquid-grenade.png",
        title: "Frost grenade",
        effect: "Everyone in the zone is frozen. +2 Frost",
        count: 4,
    } as AssetType,
    medical_station: {
        slug: "medical_station",
        icon: "/LP/icons/medical-station.png",
        title: "Portable Med Station",
        effect: "-1 Injury or -1 Distress<BR>reusable",
        count: 1,
    } as AssetType,
    anxiolytics: {
        slug: "anxiolytics",
        icon: "/LP/icons/pill-bottle.png",
        title: "Anxiolytics",
        effect: "-2 Distress",
        count: 4,
    } as AssetType,
};

type ClockType = ClockProps & { slug: string };

export const clocks = {
    researcher_respect: {
        slug: "researcher_respect",
        title: "Building respect for Viktor among the researchers",
        reward: "Mental stim - 2 actions",
        current: 0,
        total: 6,
    } as ClockType,
    calm_down_the_researchers: {
        slug: "calm_down_the_researchers",
        title: "Calm down the researchers",
        reward: "Consumable",
        current: 0,
        total: 6,
    } as ClockType,
    crew_reputation: {
        slug: "crew_reputation",
        title: "Crew reputation",
        reward: "Each: Magnetic chip",
        threat: "Title: Damn hooligans",
        current: 3,
        total: 6,
    } as ClockType,
    too_late_for_viktor: {
        slug: "too_late_for_viktor",
        title: "Delay",
        threat: "It may be too late for Viktor",
        note: "Ticks down every whole round",
        current: 6,
        total: 6,
    } as ClockType,
    viktor_in_critical_condition: {
        slug: "viktor_in_critical_condition",
        title: "Viktor in critical condition",
        current: 6,
        total: 6,
        threat: "Viktor succumbs to his injuries",
        reward: "Viktor is stabilized",
    } as ClockType,
    saving_new_vega: {
        slug: "saving_new_vega",
        title: "Saving New Vega",
        current: 2,
        total: 6,
        threat: "New Vega is consumed by spores",
        reward: "Title: Heroes of New Vega",
    } as ClockType,
    suspicion_of_security_robots: {
        slug: "suspicion_of_security_robots",
        title: "Suspicion of Security Robots",
        current: 4,
        total: 4,
        threat: "They open fire",
        reward: "Access to the airlock",
    } as ClockType,
    gathering_of_the_spore_drone_crowd: {
        slug: "gathering_of_the_spore_drone_crowd",
        title: "Gathering of the Spore Drone Crowd",
        current: 8,
        total: 8,
        threat: "Spore Drone Crowd Attacks",
    } as ClockType,
    panic_at_the_airlock: {
        slug: "panic_at_the_airlock",
        title: "Panic at the airlock",
        current: 6,
        total: 6,
        threat: "Everyone +1 Stress",
        reward: "Saving New Vega +1",
    } as ClockType,
    rh4_ship_integrity: {
        slug: "rh4_ship_integrity",
        icon: "/LP/icons/clock.png",
        title: "RH4 Ship Integrity",
        effect: "Evacuation by rescue modules",
        current: 6,
        total: 6,
        threat: "Success required",
        reward: "Support for ship systems",
    } as ClockType,
    ship_distance: {
        slug: "ship_distance",
        icon: "/LP/icons/clock.png",
        title: "Ship Distance",
        current: 5,
        total: 6,
        threat: "If the distance increases above 6, the spore ship will be out of reach",
        reward: "Opportunity for landing",
    } as ClockType,
    salvo_of_rockets: {
        slug: "salvo_of_rockets",
        title: "Salvo of 4 rockets",
        current: 4,
        total: 4,
        threat: "Rockets hit in 2 turns! Ship integrity drops by 1 for each un-destroyed rocket",
    } as ClockType,
    spore_ship_integrity: {
        slug: "spore_ship_integrity",
        title: "Spore Ship Integrity",
        current: 6,
        total: 6,
        reward: "Ship systems stop working",
    } as ClockType,
    tentacles_on_the_spore_ship: {
        slug: "tentacles_on_spore_ship",
        title: "Tentacles on the Spore Ship",
        current: 4,
        total: 4,
        threat: "Tentacles protect the ship and attack",
        reward: "Ship can be boarded",
    } as ClockType,
    leaving_the_interstellar_corridor: {
        slug: "leaving_the_interstellar_corridor",
        title: "Leaving the interstellar corridor",
        current: 0,
        total: 12,
        threat: "The Spore ship is within range of the Clan's black-sphere",
    } as ClockType,
    destroying_the_spore_bush: {
        slug: "destroying_the_spore_bush",
        title: "Destroying the spore bush",
        current: 0,
        total: 6,
        threat: "Vibrations of breaking branches resonate throughout the hallway",
        reward: "Path to the captain's cabin",
    } as ClockType,

    convincing_the_children_to_open_the_door: {
        slug: "convincing_the_children_to_open_the_door",
        title: "Convincing the children to open the door",
        current: 0,
        total: 6,
        reward: "Access to the infirmary",
    } as ClockType,
    core_stabilization: {
        slug: "core_stabilization",
        title: "Core stabilization",
        current: 0,
        total: 6,
        threat: "Every round, growing spores grab at anything that moves and embed their thorns: +1 Injury",
        reward: "The core is no longer at risk of exploding",
    } as ClockType,
};

type EffectType = EffectCardProps & { slug: string };

export const defaultEffects = effectMap;

export const effects = {
    spore_fever: {
        slug: "spore_fever",
        icon: "thermometerHot",
        title: "Spore Fever",
        effect: "+1 Heat each round until cured",
    } as EffectType,
    spore_infection: {
        slug: "spore_infection",
        icon: "/LP/icons/spore-infection-2.png",
        title: "Spore Infection",
        effect: "+1 Doom",
    } as EffectType,
    overclock_body: {
        icon: "/LP/icons/overclock-body.png",
        title: "Overclock Body",
        effect: "+1 Effect on Body actions, -3 Injury, +1 Doom",
    } as EffectType,
    overclock_mind: {
        icon: "/LP/icons/overclock-mind.png",
        title: "Overclock Mind",
        effect: "+1 Effect on Mind actions, -3 Distress, +1 Doom",
    } as EffectType,
    techno_doom_i: {
        icon: "/LP/icons/techno-doom.png",
        title: "Techno Doom I",
        effect: "You're thinking about how emotions limit you. The only way forward is through technology. Unnecessary considerations, especially for the weakest, only hinder you from achieving your goal.",
    } as EffectType,
    techno_doom_ii: {
        icon: "/LP/icons/techno-doom.png",
        title: "Techno Doom II",
        effect: "You never have Distress, +1 Effect on actions related to handling technology, -1 Effect on actions related to handling emotions.",
    } as EffectType,
    techno_doom_iii: {
        icon: "/LP/icons/techno-doom.png",
        title: "Techno Doom III",
        effect: "+1 Effect on actions related to handling technology, Effect 0 on actions related to handling emotions.",
    } as EffectType,
    psycho_doom_i: {
        icon: "/LP/icons/psycho-doom.png",
        title: "Psycho Doom I",
        effect: "The only escape from this crazy world is in your own mind. There you are the master and can create anything. When you also take something to enhance it, you become a god.",
    } as EffectType,
    psycho_doom_ii: {
        icon: "/LP/icons/psycho-doom.png",
        title: "Psycho Doom II",
        effect: "Your Distress is always 3, +1 Effect on bio-chemical attacks on yourself, -1 Effect on actions related to handling technology.",
    } as EffectType,
    psycho_doom_iii: {
        icon: "/LP/icons/psycho-doom.png",
        title: "Psycho Doom III",
        effect: "Using bio-chemical attacks alters reality, Effect 0 on actions related to handling technology.",
    } as EffectType,
    spore_doom_i: {
        icon: "/LP/icons/spore-doom.png",
        title: "Spore Doom I",
        effect: "Your wounds heal suspiciously quickly, but you are a little worried about the small green stems that grow there no matter how often you tear them off.",
    } as EffectType,
    spore_doom_ii: {
        icon: "/LP/icons/spore-doom.png",
        title: "Spore Doom II",
        effect: "You can control spores, +1 Effect on close combat attacks, -1 Effect on actions related to precision.",
    } as EffectType,
    spore_doom_iii: {
        icon: "/LP/icons/spore-doom.png",
        title: "Spore Doom III",
        effect: "+1 Effect on close combat attacks, Effect 0 on actions related to precision, you must spread spore infection.",
    } as EffectType,
    hateful_doom_i: {
        icon: "/LP/icons/hate-doom.png",
        title: "Hateful Doom I",
        effect: "If all those damn people didn't get in your way, you wouldn't be in this mess. Your blood boils when those bastards touch you. Put them against the wall and shoot. Pfft!",
    } as EffectType,
    hateful_doom_ii: {
        icon: "/LP/icons/hate-doom.png",
        title: "Hateful Doom II",
        effect: "At Distress 0, you attack allies, +1 Effect on ranged attacks, +1 Heat when injuring enemies.",
    } as EffectType,
    hateful_doom_iii: {
        icon: "/LP/icons/hate-doom.png",
        title: "Hateful Doom III",
        effect: "+1 Ranged attack Effect, 0 Close-range action effect, considers no one as your ally.",
    } as EffectType,
    destructive_doom_i: {
        icon: "/LP/icons/destroy-doom.png",
        title: "Destructive Doom I",
        effect: "No more talking, no more arguments, just run in there and when something moves, hit it until it stops moving. That will cool you down.",
    } as EffectType,
    destructive_doom_ii: {
        icon: "/LP/icons/destroy-doom.png",
        title: "Destructive Doom II",
        effect: "+1 Effect on attacks, -1 Effect on defense, -1 Heat every time you destroy something.",
    } as EffectType,
    destructive_doom_iii: {
        icon: "/LP/icons/destroy-doom.png",
        title: "Destructive Doom III",
        effect: "+1 Effect on attacks, Effect 0 on defense, you do not consider anyone your ally.",
    } as EffectType,
    disabled_station: {
        icon: "/LP/icons/broken-console.png",
        title: "Disabled Station",
        effect: "Ship systems of the given station are out of order until the player repairs them - Success is required",
    } as EffectType,
};
