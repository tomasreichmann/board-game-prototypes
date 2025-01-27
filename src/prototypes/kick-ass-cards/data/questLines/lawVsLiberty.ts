import { EncounterProps, QuestLineCardProps } from "../../components/gameComponents/QuestLineCard";

export const encounters: EncounterProps[] = [
    {
        title: "★ Crackdown in the Streets",
        description:
            "The Town Guard begins raiding local businesses, claiming they are dens of crime. Your business is next.",
        twists: [
            "The Guard Captain offers to spare your business if you find and turn over a suspected thief.",
            // "A thief hides in your cellar, begging for protection.",
            // "A patron tries to bribe the guards, escalating the situation.",
            "The townsfolk rally to block the Guard, risking violence.",
            "The Guard plants evidence to justify the raid.",
        ],
    },
    {
        title: "★ A Thief in Need",
        description:
            "A small-time thief flees into your business, pursued by the Guard. They offer gold for refuge, but harboring them could lead to trouble.",
        twists: [
            "The thief claims to be a spy for the King of Thieves.",
            "The Guard offers a reward for turning them in.",
            // "A vigilante group appears, demanding justice on the spot.",
            // "The thief reveals a cache of stolen goods hidden nearby.",
            "The thief’s family begs you to protect them.",
        ],
    },
    {
        title: "★ Vigilante Justice",
        description:
            "A vigilante group gathers outside your business, demanding the names of any thieves you’ve harbored.",
        twists: [
            "The vigilantes threaten to burn your business if you don’t comply.",
            "They accuse one of your regulars of being a thief.",
            "A Thieves' Guild member warns you to stay quiet, or else.",
            // "The Guard arrives to disperse the vigilantes but sides with them.",
            // "The vigilantes leave but spread damaging rumors about your business.",
        ],
    },
    {
        title: "★ The Guard’s Favor",
        description: "The Guard Captain offers to station guards at your business to 'protect' it.",
        twists: [
            "The guards harass your patrons, driving away business.",
            "A Thieves' Guild member offers to counter the bribe with their own payment.",
            // "The townsfolk accuse you of siding with the corrupt Guard.",
            // "The guards secretly stash contraband in your business to frame you.",
            "A vigilante attacks the stationed guards, causing chaos.",
        ],
    },

    {
        title: "★★ A Test of Loyalty",
        description:
            "The King of Thieves personally visits your business and asks for a favor: host a secret meeting for his lieutenants.",
        twists: [
            "A Guard informant overhears and demands access to the meeting.",
            // "One of the lieutenants betrays the Guild, leading to a brawl.",
            "The townsfolk learn of the meeting and want to inform the vigilantes.",
            // "A rival thief uses the meeting to stage an ambush.",
            "The King offers you a place in the Guild for your help.",
        ],
    },
    {
        title: "★★ Rebellion Brewing",
        description:
            "A townsfolk leader organizes a meeting in your business to plan a protest against both the Guard and the Guild.",
        twists: [
            // "The Guard gets wind of the meeting and demands you stop it.",
            // "A Guild enforcer arrives, threatening to silence the leader.",
            "The leader asks you to provide food and drink for the protest.",
            "The protest turns into a riot, spilling into your business.",
            "The leader offers to protect you from the mob in the future.",
        ],
    },
    {
        title: "★★ A Guard Gone Rogue",
        description:
            "A low-ranking guard comes to your business with evidence of corruption within the Guard, asking for your protection.",
        twists: [
            "The Guard Captain demands you turn them over.",
            "The Thieves’ Guild offers to protect them in exchange for the evidence.",
            // "The townsfolk rally behind the whistleblower, creating tension.",
            // "The guard's family is taken hostage, forcing their surrender.",
            "The evidence implicates your own staff.",
        ],
    },
    {
        title: "★★ Guild Retaliation",
        description: "A gang of thieves ransacks your storeroom.",
        twists: [
            // "The Guard arrives but demands a bribe to investigate.",
            "The thieves threaten to escalate unless you pay them for protection.",
            "The townsfolk demand justice and offer to form a militia.",
            "The King of Thieves sends a message apologizing but asks for your patience.",
            // "The thieves reveal they were hired by a rival business.",
        ],
    },
    {
        title: "★★ A Mysterious Patron",
        description:
            "A stranger arrives at your business, asking suspicious questions about your dealings with the Thieves’ Guild.",
        twists: [
            "The stranger is an undercover Guard operative.",
            "The stranger is a Guild member testing your loyalty.",
            // "The stranger works for a rival business trying to disrupt your operations.",
            "The stranger plants false evidence of criminal activity in your business.",
            // "The stranger disappears after overhearing a private conversation."
        ],
    },
    {
        title: "★★ The People's Petition",
        description:
            "A group of townsfolk invites representatives from both the Guard and the Guild to your business demanding fair treatment.",
        twists: [
            // "The Guard Captain dismisses the petition and cracks down harder on the townsfolk.",
            "The Guild sees the petition as an opportunity to strike against the Guard.",
            // "The petitioners ask you to host a public forum, risking conflict.",
            "The petition gains momentum, but a key organizer goes missing.",
            "The Guard accuses you of instigating the petition.",
        ],
    },

    {
        title: "★★ The Guild's Request",
        description: "The Thieves' Guild asks you to store stolen goods in your business temporarily.",
        twists: [
            "The Guard gets wind of the plan and prepares a raid.",
            "The goods are dangerous, creating unforeseen problems.",
            "The townsfolk find out and threaten to expose you.",
            // "A rival thief tries to steal the goods for themselves.",
            // "The Guild offers you a lucrative reward for taking the risk."
        ],
    },
    {
        title: "★★ A Vigilante Unmasked",
        description:
            "A vigilante is captured and dragged into your business by the Guard while they wait for reinforcements.",
        twists: [
            "The vigilante claims to have dirt on the Guard Captain.",
            "The Guild wants the vigilante silenced permanently.",
            "The townsfolk demand the vigilante's release, threatening to riot.",
            // "The Guard uses the incident to justify harsher crackdowns.",
            // "The vigilante reveals ties to the uprising leader."
        ],
    },
    {
        title: "★★ A King's Ransom",
        description:
            "The Thieves' Guild plans a daring heist targeting a high-ranking noble, asking for your assistance.",
        twists: [
            "The Guard learns of the plan and threatens your business if you don’t betray the Guild.",
            "The heist's success depends on you distracting the noble.",
            // "The noble offers a hefty reward for your loyalty instead.",
            "The townsfolk oppose the heist, fearing retaliation on their community.",
            // "A rival thief tries to sabotage the operation and blame you."
        ],
    },

    {
        title: "★★★ The Captain’s Crackdown",
        description:
            "The Guard Captain declares martial law and orders your business to close or become the new headquarters for the Guard.",
        twists: [
            // "The Thieves’ Guild requests your help with the assassination of the captain.",
            "The townsfolk plan a protest outside your business to defy the Captain’s rule.",
            "You get an offer to join the Vigilantes to burn down the Guard's barracks.",
            // "The Guard plants evidence linking your business to treason.",
            "The Guild offers you to sneak in and abduct the captain.",
        ],
    },
    {
        title: "★★★ The King’s Gambit",
        description: "The King of Thieves invites you to join his inner circle as his power grows unchecked.",
        twists: [
            "The King of Thieves offers you to steal the Guard Captain's identity.",
            "The Guard captain learns of the meeting and leads a raid of the Guild's hideout.",
            "Turns out the vigilante group are all members of the guild who decide to stage a coup and take control of the Guild.",
        ],
    },
    {
        title: "★★★ The People’s Rebellion",
        description: "The townsfolk rise up, declaring your business their headquarters if you like it or not.",
        twists: [
            "The Guard Captain surrounds the business demanding your surrender.",
            "The King of Thieves offers to burn down the rebels in your business and offers you a place in the Guild hideout instead.",
            // "A vigilante faction splits from the rebellion, accusing you of betrayal.",
            // "The uprising’s leader demands you publicly denounce both the Guard and the Guild.",
            "The vigilantes plan to send the mob against the Guard and drive them from the town.",
        ],
    },
];

const lawVsLiberty: QuestLineCardProps = {
    title: "Law vs. Liberty",
    description:
        "In a city teetering on chaos, your business becomes the battleground between three forces: the ruthless Town Guard seeking control, the shadowy Thieves’ Guild fighting for freedom through crime, and the angry townsfolk rising as vigilantes to overthrow them both. Align with the Guard to enforce order, aid the Guild to seize power, or rally the people to dismantle corruption—but every choice shifts the balance of power and shapes the city’s future.",
    encounters,
};

export default lawVsLiberty;
