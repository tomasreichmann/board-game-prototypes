import AssetCard, { AssetCardProps } from "../../components/gameComponents/AssetCard";
import createPreset from "../../components/generation/createPreset";
import { DeepRandomType } from "../resolveRandom";

const weaponOptions = [
    { title: "Dagger", icon: "/DND/weapons/dagger.svg", effect: "Attacks for 1 Effect (piercing)" },
    { title: "Dart", icon: "/DND/weapons/dart.svg", effect: "Attacks for 1 Effect (piercing)" },
    { title: "Flail", icon: "/DND/weapons/flail.svg", effect: "Attacks for 1 Effect (crushing)" },
    {
        title: "Glaive",
        icon: "/DND/weapons/glaive.svg",
        effect: "Attacks for 1 Effect (slashing). Can attack in neighboring zones",
    },
    {
        title: "Greataxe",
        icon: "/DND/weapons/greataxe.svg",
        effect: "Attacks for 1 Effect (slashing). Can attack 2 engaged enemies in the same zone using the same Effect",
    },
    {
        title: "Greatclub",
        icon: "/DND/weapons/greatclub.svg",
        effect: "Attacks for 1 Effect (crushing). Can attack 2 engaged enemies in the same zone using the same Effect",
    },
    {
        title: "Greatsword",
        icon: "/DND/weapons/greatsword.svg",
        effect: "Attacks for 1 Effect (slashing). Can attack 2 engaged enemies in the same zone using the same Effect",
    },
    {
        title: "Halberd",
        icon: "/DND/weapons/halberd.svg",
        effect: "Attacks for 1 Effect (slashing). Can attack in neighboring zones",
    },
    {
        title: "Hand Crossbow",
        icon: "/DND/weapons/hand-crossbow.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack in neighboring zones",
    },
    { title: "Handaxe", icon: "/DND/weapons/handaxe.svg", effect: "Attacks for 1 Effect (slashing)" },
    {
        title: "Heavy Crossbow",
        icon: "/DND/weapons/heavy-crossbow.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack anywhere in line of sight",
    },
    {
        title: "Javelin Stack",
        icon: "/DND/weapons/javelin-stack.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack 2 zones away in line of sight",
    },
    {
        title: "Javelin",
        icon: "/DND/weapons/javelin.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack 2 zones away in line of sight",
    },
    {
        title: "Lance",
        icon: "/DND/weapons/lance.svg",
        effect: "Attacks for 1 Effect (piercing). +1 Effect for each zone you moved before attacking",
    },
    {
        title: "Light Crossbow",
        icon: "/DND/weapons/light-crossbow.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack 3 zones away in line of sight",
    },
    { title: "Light Hammer", icon: "/DND/weapons/light-hammer.svg", effect: "Attacks for 1 Effect (crushing)" },
    {
        title: "Longbow",
        icon: "/DND/weapons/longbow.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack anywhere in line of sight or ballistically",
    },
    { title: "Longsword", icon: "/DND/weapons/longsword.svg", effect: "Attacks for 1 Effect (slashing)" },
    { title: "Mace", icon: "/DND/weapons/mace.svg", effect: "Attacks for 1 Effect (crushing)" },
    {
        title: "Maul",
        icon: "/DND/weapons/maul.svg",
        effect: "Attacks for 1 Effect (crushing). Can attack 2 engaged enemies in the same zone using the same Effect",
    },
    { title: "Morningstar", icon: "/DND/weapons/morningstar.svg", effect: "Attacks for 1 Effect (crushing)" },
    { title: "Net", icon: "/DND/weapons/net.svg", effect: "Hinders target. Can attack in neighboring zones" },
    {
        title: "Pike",
        icon: "/DND/weapons/pike.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack in neighboring zones",
    },
    { title: "Quarterstaff", icon: "/DND/weapons/quarterstaff.svg", effect: "Attacks for 1 Effect (crushing)" },
    { title: "Rapier", icon: "/DND/weapons/rapier.svg", effect: "Attacks for 1 Effect (piercing)" },
    { title: "Scimitar", icon: "/DND/weapons/scimitar.svg", effect: "Attacks for 1 Effect (slashing)" },
    { title: "Scythe", icon: "/DND/weapons/scythe.svg", effect: "Attacks for 1 Effect (slashing)" },
    {
        title: "Shortbow",
        icon: "/DND/weapons/shortbow.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack 2 zones away in line of sight",
    },
    { title: "Shortsword", icon: "/DND/weapons/shortsword.svg", effect: "Attacks for 1 Effect (piercing)" },
    { title: "Sickle", icon: "/DND/weapons/sickle.svg", effect: "Attacks for 1 Effect (slashing)" },
    {
        title: "Sling",
        icon: "/DND/weapons/sling.svg",
        effect: "Attacks for 1 Effect (crushing). Can attack 2 zones away in line of sight",
    },
    {
        title: "Slingshot",
        icon: "/DND/weapons/slingshot.svg",
        effect: "Attacks for 1 Effect (crushing). Can attack 2 zones away in line of sight",
    },
    {
        title: "Spear",
        icon: "/DND/weapons/spear.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack in neighboring zones",
    },
    { title: "Staff", icon: "/DND/weapons/staff.svg", effect: "Attacks for 1 Effect (crushing)" },
    {
        title: "Trident",
        icon: "/DND/weapons/trident.svg",
        effect: "Attacks for 1 Effect (piercing). Can attack in neighboring zones",
    },
    { title: "War Axe", icon: "/DND/weapons/war-axe.svg", effect: "Attacks for 1 Effect (slashing)" },
    { title: "War Pick", icon: "/DND/weapons/war-pick.svg", effect: "Attacks for 1 Effect (crushing)" },
    { title: "Warhammer", icon: "/DND/weapons/warhammer.svg", effect: "Attacks for 1 Effect (crushing)" },
    {
        title: "Whip",
        icon: "/DND/weapons/whip.svg",
        effect: "Attacks for 1 Effect (crushing), can grapple. Can attack in neighboring zones",
    },
    { title: "Quarterstaff", icon: "/DND/weapons/wooden-staff.svg", effect: "Attacks for 1 Effect (crushing)" },
];

const armorOptions = [
    { title: "Breastplate", icon: "/DND/armor/breastplate.svg", effect: "Reduces Injury received by 2 (minimum 1)" },
    { title: "Chain-Mail", icon: "/DND/armor/chain-mail.svg", effect: "Reduces Injury received by 1 (minimum 1)" },
    { title: "Chain-Shirt", icon: "/DND/armor/chain-shirt.svg", effect: "Reduces Injury received by 1 (minimum 1)" },
    { title: "Goggles", icon: "/DND/armor/goggles.svg", effect: "Protects eyes" },
    {
        title: "Half-Plate-Armour",
        icon: "/DND/armor/half-plate-armour.svg",
        effect: "Reduces Injury received by 2 (minimum 1)",
    },
    { title: "Hide-Armour", icon: "/DND/armor/hide-armour.svg", effect: "Reduces Injury received by 1 (minimum 1)" },
    {
        title: "Leather-Armour",
        icon: "/DND/armor/leather-armour.svg",
        effect: "Reduces Injury received by 1 (minimum 1)",
    },
    {
        title: "Padded-Armour",
        icon: "/DND/armor/padded-armour.svg",
        effect: "Reduces Injury received by 1 (minimum 1)",
    },
    { title: "Plate-Armour", icon: "/DND/armor/plate-armour.svg", effect: "Reduces Injury received by 2 (minimum 1)" },
    { title: "Ring-Mail", icon: "/DND/armor/ring-mail.svg", effect: "Reduces Injury received by 1 (minimum 1)" },
    { title: "Scale-Mail", icon: "/DND/armor/scale-mail.svg", effect: "Reduces Injury received by 1 (minimum 1)" },
    {
        title: "Shield-(Checked)",
        icon: "/DND/armor/shield-(checked).svg",
        effect: "Defense has +1 Effect if not Fumble",
    },
    { title: "Shield-(Kite)", icon: "/DND/armor/shield-(kite).svg", effect: "Defense has +1 Effect if not Fumble" },
    { title: "Shield-(Round)", icon: "/DND/armor/shield-(round).svg", effect: "Defense has +1 Effect if not Fumble" },
    {
        title: "Spiked-Armour",
        icon: "/DND/armor/spiked-armour.svg",
        effect: "Reduces Injury received by 1 (minimum 1)",
    },
    {
        title: "Splint-Armour",
        icon: "/DND/armor/splint-armour.svg",
        effect: "Reduces Injury received by 1 (minimum 1)",
    },
    {
        title: "Studded-Leather-Armour",
        icon: "/DND/armor/studded-leather-armour.svg",
        effect: "Reduces Injury received by 1 (minimum 1)",
    },
];

const assetOptions: DeepRandomType<{ title: string; icon: string; effect: string }> = {
    _rArray: [...armorOptions, ...weaponOptions],
};

const assetPreset = createPreset<AssetCardProps>(
    "Asset",
    assetOptions,
    AssetCard,
    "Asset",
    {
        size: "Mini European",
        icon: "/TOH/items/two-handed-sword.png",
        className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
        title: "Great Sword",
        effect: "Attacks for 1 Effect (slashing). Can attack 2 engaged enemies in the same zone using the same Effect.",
    },
    {},
    {
        title: "Longsword",
        SD_icon:
            "ethereal fantasy concept art of slavic medieval longsword on solid white background, <lora:white_1_0:1>, center composition, SK_Fantasy painterly, fantasy art",
        effect: "Attacks for 1 Effect (slashing)",
    },
    {
        title: "1-4 words",
        SD_icon: `use a stable diffusion prompt instead of an URI and make sure to include "ethereal fantasy concept art" and "on solid white background, <lora:white_1_0:1>, center composition, SK_Fantasy painterly, fantasy art". Always omit background description`,
        effect: "Weapons attack for 1 Effect (type slashing/crushing/piercing). Pole arms can attack in neighboring zones. Ranged weapons can attack further in either line of sight or ballistically.",
    }
);

export default assetPreset;
