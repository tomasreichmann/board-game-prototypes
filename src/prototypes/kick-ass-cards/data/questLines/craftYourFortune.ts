import { EncounterProps, QuestLineCardProps } from "../../components/gameComponents/QuestLineCard";

export const encounters: EncounterProps[] = [
    {
        title: "★ A Merchant’s Bargain",
        description: "A rich merchant offers a contract to supply high-quality goods for an incredibly low price.",
        twists: [
            "The goods turn out to be stolen, and authorities show up asking questions.",
            "The goods are watered down or cut with cheaper materials, damaging your reputation.",
            "The goods are past their expiration date.",
            // "The merchant offers low prices only to demand a higher price for the next shipment once the business becomes dependent.",
            // "The contract includes a hidden clause forcing the business to pay hefty penalties for any delays or cancellations.",
        ],
    },
    {
        title: "★ A Questionable Apprentice",
        description: "The Artisan’s League offers to assign an apprentice to your business.",
        twists: [
            "they have little skill, creating more problems than they solve.",
            "they are a criminal in hiding, drawing trouble to your business.",
            "they are secretly a merchant with enemies searching for them.",
            "they start stealing from your business.",
            "they have a substance abuse problem.",
        ],
    },
    {
        title: "★ A Defector’s Offer",
        description: "An employee of a rival business approaches you, offering to switch sides.",
        twists: [
            "They offer to steal clients, recipes or secrets from the rival business.",
            "They’ve racked up a debt, and creditors may come after you.",
            // "They share information on shady business practices at the rival business.",
            // "They know unique recipes that could give your business an edge.",
            "They are a spy for the rival business.",
        ],
    },
    {
        title: "★ The Fair Dilemma",
        description:
            "The Merchant’s Guild organizes a grand fair, but sets prices unusually low. The Artisan’s League tells you to host a competition instead.",
        twists: [
            "The fair’s low prices draw in large crowds, bringing a lot of exposure.",
            // "Hosting a competition at the business risks alienating the Merchant’s Guild, but could draw artisans’ loyalty.",
            "The fair includes exclusive deals, but also obligations to the Guild.",
            // "Rumors circulate that the rival business plans to use the fair to poach clients and workers from your business.",
            "A sudden change in weather or a conflict elsewhere leaves the fair poorly attended.",
        ],
    },
    {
        title: "★ The Rival’s Visit",
        description: "The owner of a rival business pays a surprise visit to your business.",
        twists: [
            "The rival drops veiled threats about your business's future.",
            "The rival attempts to steal trade secrets or poach your employees or clients while they’re on the premises.",
            // "The rival tries to poach your employees with promises of better pay or working conditions.",
            // "The rival chats up your regular clients, subtly suggesting they try the rival business.",
            "The rival proposes a friendly wager, such as who can attract the most customers during the next event.",
        ],
    },

    {
        title: "★★ Supply Chain Shortage",
        description: "Several shipments of goods are missing.",
        twists: [
            "A rival business bribed the couriers to delay your deliveries.",
            "The goods were stolen by thieves who are willing to sell it back to you.",
            "The Merchant’s Guild insists on increasing fees to cover ‘logistical issues.’",
            // "A disgruntled former employee sabotaged the shipment out of spite.",
            // "The Artisan’s League suggests using only vetted suppliers to avoid future disruptions.",
        ],
    },
    /*     {
        title: "★★ Artisan’s Revolt",
        description: "Local craftsmen stage a protest, claiming the business is underpaying for their goods or services.",
        twists: [
            "The protest is led by an Artisan’s League representative demanding better contracts.",
            "A rival business quietly funds the protest to damage your reputation.",
            // "A specific artisan feels personally slighted and escalates the situation.",
            // "A fire breaks out during the protest, raising tensions further.",
            "Some of the protesters offer to make it go away if you hire them.",
        ],
    }, */
    {
        title: "★★ A Brewing Scandal",
        description: "Rumors spread about unethical practices at your business, tarnishing its reputation.",
        twists: [
            "A disgruntled employee or a client started the rumors.",
            // "The rival business paid someone to spread false accusations.",
            "A real but minor issue in your operations was blown out of proportion.",
            // "A customer overheard private conversations and misrepresented the details.",
            "A Merchant’s Guild official offers to clear your name for a favor or price.",
        ],
    },
    {
        title: "★★ The Guild Tax",
        description: "The Merchant’s Guild introduces a new tax for businesses.",
        twists: [
            "The tax disproportionately affects your business.",
            "A rival business wants to team up and lobby against the tax together.",
            // "The Artisan’s League suggests a strike against the tax but offers little support.",
            // "The Merchant’s Guild offers a tax break in exchange for loyalty.",
            "The tax collectors are open to bribes.",
        ],
    },
    {
        title: "★★ Poaching Talent",
        description: "Several of your best employees receive offers to work for a rival business.",
        twists: [
            "The rival offers significantly better pay, but only temporarily.",
            // "Your employees claim they were threatened into considering the rival’s offer.",
            "The Artisan’s League suggests hiring apprentices to fill the gaps.",
            // "An influential client notices the disruption and threatens to take their business elsewhere.",
            "Some employees agree to stay, but only if they receive a major promotion or raise.",
        ],
    },
    {
        title: "★★ An Expensive Partnership",
        description: "A wealthy merchant offers to invest in the business.",
        twists: [
            "They need the business as a front for embezzlement.",
            "Their terms include appointing their own manager.",
            // "The merchant is secretly allied with the rival business.",
            "The Artisan’s League claims the merchant exploits workers.",
            // "The deal looks profitable but locks you into unfavorable contracts for years.",
            // "A hidden clause requires the business to prioritize certain goods over others, alienating some clients.",
        ],
    },
    {
        title: "★★ Rival’s Charity Event",
        description:
            "A rival business organizes a charity event that draws customers away from your business. They claim it’s for a good cause.",
        twists: [
            "The rival offers you to join their charity cause if you donate part of your proceeds to it.",
            "The charity turns out to be a front for embezzlement.",
            "The charity is clearly a PR stunt and no money is donated.",
            // "One of your regular patrons is honored at the event, creating awkward tension.",
            // "The Artisan’s League offers to help you host a competing event.",
            // "The charity event is a huge success, and the rival business gains significant public favor.",
        ],
    },
    /*     {
        title: "★★ Getting a Bribe",
        description:
            "A Merchant’s Guild representative offers a bribe to side against the Artisan’s League in an ongoing dispute.",
        twists: [
            "Accepting the bribe risks alienating the artisans, but declining could invite retaliation.",
            "The rival business is also involved in the dispute and stands to benefit if you side with the merchants.",
            // "The bribe comes with additional conditions that would restrict future partnerships.",
            // "The Artisan’s League hears about the offer and demands an explanation.",
            "The bribe turns out to be counterfeit or a setup to discredit you.",
        ],
    }, */
    {
        title: "★★ Sabotage",
        description: "Your business is sabotaged during peak hours.",
        twists: [
            "A rival business hired someone to sabotage your business.",
            "A disgruntled employee tampered with the equipment out of revenge.",
            "A mysterious figure offers to help out.",
            // "The Artisan’s League demands proof that the ingredients were locally sourced.",
            "The sabotage turns out to be just an accident.",
        ],
    },
    /* {
        title: "★★ A Mysterious Sponsor",
        description: "An anonymous figure offers to invest in your business but refuses to reveal their identity.",
        twists: [
            "The sponsor turns out to be an infamous merchant.",
            "The expansion funds are tied to illegal activities, drawing unwanted attention.",
            "The Merchant’s Guild demands you investigate the source before accepting.",
            // "The Merchant’s Guild warns you against working with unknown entities.",
            // "The sponsor’s terms include drastic changes to the business’s branding and operations.",
        ],
    }, */
    /* {
        title: "★★ A Town Council Meeting",
        description:
            "A heated town council meeting focuses on new business regulations that could significantly impact your business.",
        twists: [
            "A rival business lobbies for stricter rules to disadvantage you.",
            "The Merchant’s Guild proposes regulations that favor your suppliers over you.",
            // "The Artisan’s League organizes a counter-proposal which requires you to pay higher wages instead.",
            "The council members are open to persuasion—for a price.",
            // "A surprise announcement at the meeting dramatically shifts the focus of the debate.",
        ],
    }, */
    {
        title: "★★ A Dangerous Debt",
        description:
            "A key supplier reveals they’re deeply in debt and can’t fulfill your next order unless you pay upfront.",
        twists: [
            // "The rival business has bought out their debt and now controls the supplier.",
            "The supplier offers to sell their goods at a discount if you help with their debts.",
            // "The Merchant’s Guild offers to cover the costs but demands exclusive rights.",
            "The Artisan’s League suggests switching to a smaller but untested supplier.",
            "The debt collectors threaten to involve your business if the supplier doesn’t pay.",
        ],
    },

    {
        title: "★★★ The Rival’s Downfall",
        description: "An opportunity arises to ruin or buy out the rival business.",
        twists: [
            "The rival business is revealed to have extensive debts.",
            // "A key ally in the Merchant’s Consortium offers support, but only if you give up working with the Artisan’s League.",
            // "A hidden clause in the purchase agreement ties your business to a corrupt entity.",
            "The rival offers a truce instead, with terms that could be mutually beneficial—or a trap.",
            "Sabotaging the rival risks alienating the town, artisans or merchants, as they employ many locals.",
        ],
    },
    {
        title: "★★★ The Golden Award",
        description:
            "Your business or product is nominated for the most prestigious award in the region, but the competition is fierce.",
        twists: [
            "The rival business bribes the judges, putting your chances in jeopardy.",
            "One of your key suppliers fails to deliver on time.",
            "A rumor spreads that your entry is plagiarized, forcing you to defend your honor.",
            // "An influential judge offers to swing the vote in your favor—for a steep price.",
            // "The Artisan’s League demands that you showcase artisan-made goods, which could hurt your chances against more mainstream competitors.",
        ],
    },
    {
        title: "★★★ The Big Sale",
        description: "You receive multiple offers to buy your business. This could be your ticket to fortune.",
        twists: [
            "The Merchants Guild offers the highest bid but demands you will not start a competing business.",
            "A mysterious buyer offers a premium price but wants to shut the business down.",
            // "The Artisan’s League proposes a co-op deal, but at a lower price and with limited creative freedom.",
            "The rival business offers a buyout at a personal cost to your pride.",
            // "A local official intervenes, suggesting the business is critical to the community and shouldn’t be sold at all.",
        ],
    },
    /*     {
        title: "★★★ A Split Alliance",
        description:
            "Tensions between the Merchant’s Consortium and the Artisan’s League come to a head, forcing you to choose a side—or mediate an impossible truce.",
        twists: [
            "The Merchant’s Consortium threatens to blacklist your business if you side with the artisans.",
            "The Artisan’s League offers exclusive access to their best craftspeople if you support them publicly.",
            "A town-wide boycott looms if you fail to mediate the dispute effectively.",
            "A third party steps in, offering to broker peace—but only on terms that strip you of influence.",
            "The rival business exploits the chaos to siphon away clients and employees.",
        ],
    }, */
    /*     {
        title: "★★★ The Grand Festival",
        description:
            "The town’s annual festival presents an opportunity for your business to shine—or to be overshadowed. Success could secure your future, but failure might mean the end.",
        twists: [
            "A key performer or supplier withdraws at the last moment, forcing you to scramble for replacements.",
            "A storm threatens to ruin the festival, testing your ability to adapt and salvage the event.",
            "The rival business sets up a competing venue, drawing attention away from your business.",
            "A major accident occurs during the festival, potentially implicating your staff.",
            "A wealthy patron offers to sponsor your festival booth—but insists on exclusive branding rights.",
        ],
    }, */
];

const craftYourFortune: QuestLineCardProps = {
    title: "Craft Your Fortune",
    description:
        "In the bustling heart of a competitive town, your business stands at a crossroads. Navigate alliances with powerful factions, fend off cunning rivals, and strive to secure your legacy. Will you dominate the market, gain fame for your craftsmanship, or sell it all for a fortune?",
    encounters,
};

export default craftYourFortune;
