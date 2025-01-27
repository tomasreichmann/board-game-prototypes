import { EncounterProps, QuestLineCardProps } from "../../components/gameComponents/QuestLineCard";

export const encounters: EncounterProps[] = [
    {
        title: "★ The Strange Patient",
        description: "A sick traveler staggers in, begging for help.",
        twists: [
            "The traveler offers money if you look after him till they get better.",
            "A shaman insists on performing a cleansing ritual on the traveler.",
            "An alchemist accuses you of harboring someone contagious.",
        ],
    },
    {
        title: "★ A Blessing",
        description: "A self-proclaimed shaman is 'blessing' your customers to protect them against an illness.",
        twists: [
            "The shaman claims a customer’s illness was caused by your products.",
            "A customer insists the blessing worked and refuses to shop without it.",
            "More people come to see the shaman. It's not clear if his blessing works, but at least the people feel better.",
        ],
    },
    {
        title: "★ Volunteers Needed",
        description: "An alchemist visits, seeking volunteers for experiments to develop a cure for a new illness.",
        twists: [
            "A shaman accuses the alchemist of heresy, causing a public scene.",
            "A vial shatters, sparking panic among customers.",
            "The alchemist leaves his formula behind.",
        ],
    },

    {
        title: "★ A Questionable Cure",
        description:
            "Word spreads of a miracle medicine that protects against the plague, drawing away your customers.",
        twists: [
            "The medicine only helps with the symptoms. The infected look healthy, but continue to spread the illness.",
            "One infected buys all the medicine.",
            "The alchemist accuses the seller of stealing their research.",
        ],
    },

    {
        title: "★★ A Deal Gone Sour",
        description:
            "An alchemist hires you to deliver rare herbs, but a shaman claims the herbs are sacred and must not be used.",
        twists: [
            "The shaman threatens to curse your business if the herbs are delivered.",
            "The alchemist doubles the offer but insists on secrecy.",
            "The herbs start wilting very fast.",
        ],
    },
    {
        title: "★★ The Unmasked Infected",
        description: "A wealthy customer is revealed to be infected, causing panic in your shop.",
        twists: [
            "The customer offers a large bribe to keep their condition secret.",
            "A shaman talks to the crowd calming them down.",
            "An alchemist insists on taking the customer for study, regardless of consent.",
        ],
    },
    {
        title: "★★ Infected Shipment",
        description: "A shipment of supplies you depend on arrives infested with a strange contagion.",
        twists: [
            "The Infected intentionally contaminated the shipment to spread the illness.",
            "A shaman offers to cleanse the goods through a ritual, but at a cost.",
            "The alchemist insists the goods should be discarded.",
        ],
    },
    {
        title: "★★ The Spirited Uprising",
        description: "A group led by a shaman convenes outside your shop, people are drawn to their rituals.",
        twists: [
            "A shaman believes they are protecting you with their rituals.",
            "The alchemist offers to help break up the group in exchange for a favor.",
            "You know that one of the members is an Infected.",
        ],
    },
    {
        title: "★★ The Desperate Cure",
        description: "A sick employee steals from your shop to buy an experimental cure from the alchemist.",
        twists: [
            "The cure works, but now the employee does not have money for future doses.",
            "The employee is worse after the treatment but demands to continue working.",
            "A shaman denounces your business for supporting unnatural cures.",
        ],
    },
    {
        title: "★★ Contaminated Goods",
        description: "Rumors spread that your goods are contaminated, driving away customers.",
        twists: [
            "The rumors originate from a shaman to steer people to their rituals.",
            "An alchemist investigates and quarantines your entire establishment.",
            "You discover the rumors were planted by the Infected to destroy trust in your businesses.",
        ],
    },
    {
        title: "★★ The Medicine",
        description: "An alchemist offers a lucrative deal for selling an expensive remedy through your business.",
        twists: [
            "The remedy is actually a very common plant.",
            "The remedy helps some people, but hurts others.",
            "People become addicted to this remedy.",
        ],
    },
    {
        title: "★★ The Artifact",
        description:
            "A shaman brings you an ancient artifact that is said to cure illnesses, but the alchemist calls it a dangerous fraud.",
        twists: [
            "The artifact has unforeseen effects on the ill.",
            "The artifact is stolen overnight, and both factions blame you.",
            "The Infected show up, demanding you destroy the artifact.",
        ],
    },
    {
        title: "★★ The Cleansing Fire",
        description:
            "A nearby building is set on fire by zealots led by a shaman to 'purify' it, and your business is at risk of catching fire.",
        twists: [
            "The alchemist offers to help extinguish the flames for a price.",
            "The shaman demands you join them in their efforts or risk further targeting.",
            "The Infected use the chaos to spread their influence in the area.",
        ],
    },
    {
        title: "★★★ Infect Everyone",
        description:
            "The Infected want you help in exposing people of the town to the illness to help people adapt to it better.",
        twists: [
            "It looks like everyone will be exposed eventually and doing it this way may actually reduce the damage.",
            "A shaman offers you a way to only fake spreading the illness.",
            "The alchemist wants your business to sell his medicine for free or they will expose you to the authorities.",
        ],
    },
    {
        title: "★★★ The Alchemist’s Reckoning",
        description:
            "The alchemist perfects their cure but needs a final, dangerous experiment to prove its effectiveness.",
        twists: [
            "The experiment involves testing on an healthy person, and they demand you choose someone.",
            "The Infected threaten to infect you if you don't sabotage the experiment.",
            "A shaman warns that the cure will have terrible side effects.",
        ],
    },
    {
        title: "★★★ The Shaman’s Sacrifice",
        description:
            "The shaman declares a final ritual that requires him to take all the infected away from the town.",
        twists: [
            "The ritual only saves the Infected from dying, but they keep spreading the disease.",
            "The alchemist wants your help to use his experimental cure on the crowd without their consent.",
            "The ritual causes people to accept their fate and live out the last days in peace.",
        ],
    },
];

const thePlague: QuestLineCardProps = {
    title: "The Plague",
    description:
        "As a mysterious illness spreads through the town, your business becomes a battleground for competing ideologies and solutions. An ambitious alchemist seeks scientific breakthroughs at any cost, a self-proclaimed shaman performs rituals to protect the town, and the Infected sow chaos, pushing for their twisted vision of a new world. Faced with impossible decisions, you must navigate fragile alliances, moral dilemmas, and escalating tensions. Will you side with science, spirituality, or survival? Your choices will determine whether the town succumbs to despair, endures the plague, or finds hope in the midst of crisis.",
    encounters,
};

export default thePlague;
