import { EncounterProps, QuestLineCardProps } from "../../components/gameComponents/QuestLineCard";

export const title = "Wine, Wages, and Worship";

export const events: EncounterProps[] = [
    {
        title: "An Ignoble Request",
        description:
            "A local baroness requests a private room to host a secret meeting with her lover. She offers a generous fee and promises more such opportunities. A priest, however, urges you to expose her dirty secrets.",
        twists: [
            "The lover is a rival noble seeking leverage against her.",
            "A servant overhears and threatens to reveal the affair unless paid off.",
            "The baroness hints she can sponsor your tavern’s expansion if kept secret.",
            "The priest offers to absolve your debts in exchange for exposing the affair.",
            "The lovers accidentally leave behind incriminating evidence.",
        ],
    },
    {
        title: "Feeding the Poor",
        description:
            "A priest asks for donations or leftover food from the tavern to feed the hungry, emphasizing charity and goodwill. Meanwhile, the poor promise favors in return if beer is included.",
        twists: [
            "The hungry are willing to trade stolen goods for beer.",
            "A noble patron protests, claiming charity attracts thieves.",
            "A gang leader threatens your business if the charity undermines their influence.",
            "The Church disapproves of beer distribution, questioning your morals.",
            "Townsfolk demand priority over the poor, claiming favoritism.",
        ],
    },
    {
        title: "High Stakes",
        description:
            "A charismatic gambler requests to host regular games at your establishment, promising to bring in a steady crowd. Among the players, you notice a skilled noble in disguise raising the stakes far beyond the means of the townsfolk.",
        twists: [
            "The noble is deliberately bankrupting others to buy their loyalty.",
            "The gambler is secretly cheating with the noble’s support.",
            "A townsfolk loses everything and threatens violence.",
            "A Church official accuses you of enabling gambling sin.",
            "The noble demands a private room for high-stakes games.",
        ],
    },
    {
        title: "Love for Sale",
        description:
            "A priest asks you to evict a harlot offering her services in your tavern. She counters with an offer to share her profits if you let her stay.",
        twists: [
            "She claims she’s saving money to escape an abusive noble.",
            "Her clients include the very priest who demands her removal.",
            "She offers to spy on the nobles and clergy for you.",
            "A rival harlot stirs up drama to take her place.",
            "A local gang demands a cut of her earnings.",
        ],
    },
    {
        title: "Wedding Bells",
        description:
            "A noble Christian-Protestant couple requests a lavish private wedding banquet. However, no priest is willing to marry them, and beggars steal food intended for the feast.",
        twists: [
            "The couple offers you a rare heirloom to secure a priest.",
            "The beggars sell the stolen food to your competitors.",
            "A Church representative arrives to denounce the event.",
            "The wedding draws angry mobs from both sides of the religious divide.",
            "A noble rival tries to sabotage the event entirely.",
        ],
    },
    {
        title: "Charity Dispute",
        description:
            "The Church organizes a charity event at your tavern, but nobles feel excluded and criticize the focus on the poor.",
        twists: [
            "A noble offers to fund the event if it benefits their cause instead.",
            "The townsfolk riot over unequal distribution of charity.",
            "A Church rival spreads rumors about your tavern’s lack of morality.",
            "Charity goods mysteriously go missing, and you’re blamed.",
            "The clergy demand full control of your establishment for the event.",
        ],
    },
    {
        title: "Festival Fiasco",
        description:
            "Townsfolk demand a wild festival at your tavern, but nobles and clergy find the idea distasteful.",
        twists: [
            "A noble bribes you to cancel the festival.",
            "The Church offers to fund a more “appropriate” event.",
            "The festival attracts criminal elements.",
            "A traveling bard accidentally insults a noble, sparking conflict.",
            "A storm damages festival decorations, delaying the event.",
        ],
    },
    {
        title: "Theft Scandal",
        description: "A noble loses an expensive ring during their visit, and the clergy or townsfolk are suspected.",
        twists: [
            "The noble accuses a specific patron, causing uproar.",
            "The ring turns up in your possession, raising suspicion.",
            "A townsperson is framed by a rival noble.",
            "The thief offers to split the profit with you.",
            "The Church blames the theft on a lack of morality in your tavern.",
        ],
    },
    {
        title: "Conflicting Orders",
        description: "The Church asks you to remove a painting deemed inappropriate, but it was gifted by a noble.",
        twists: [
            "The noble threatens to withdraw their patronage if it’s removed.",
            "A local artist demands compensation for the painting’s destruction.",
            "The Church offers to replace it with a religious mural.",
            "Townsfolk protest the Church’s interference in your business.",
            "A rival tavern spreads rumors about your supposed allegiance.",
        ],
    },
    {
        title: "Tax Collector’s Visit",
        description:
            "A Church-affiliated tax collector demands unpaid dues, while the townsfolk claim the Church is exploiting them.",
        twists: [
            "The tax collector hints they can “adjust” your dues for a fee.",
            "Nobles offer to cover the taxes if you align with them.",
            "The townsfolk organize a protest against the tax collector.",
            "A rival tavern encourages the collector to target you.",
            "The tax collector demands you hand over certain patrons to settle the debt.",
        ],
    },
    {
        title: "Open Debate",
        description:
            "A heated debate between a noble and a preacher in your tavern risks turning into a public spectacle.",
        twists: [
            "The debate attracts a crowd, boosting business but risking violence.",
            "A rival noble offers to disrupt the debate for you.",
            "The preacher demands you shut down the debate, fearing scandal.",
            "The noble offers funding if you let them “win” the debate.",
            "Townsfolk begin betting on the outcome, escalating tensions.",
        ],
    },
    {
        title: "Quality Over Quantity",
        description: "Nobles push for higher quality resources, but locals refuse to pay higher prices.",
        twists: [
            "Nobles offer exclusive goods if locals are excluded.",
            "Locals boycott your tavern in protest of rising costs.",
            "A supplier offers substandard goods at a steep discount.",
            "The Church condemns luxury as sinful, discouraging noble patronage.",
            "A rival tavern undercuts your prices to lure locals.",
        ],
    },
    {
        title: "Get High",
        description: "Nobles and townsfolk seek forbidden drugs, but the Church condemns their use.",
        twists: [
            "A drug dealer offers to sell exclusively through your tavern.",
            "A noble hints at connections to avoid legal trouble.",
            "The Church threatens excommunication if you allow the trade.",
            "A patron overdoses, sparking panic.",
            "The city guard begins investigating your tavern.",
        ],
    },
    {
        title: "A New Landlord",
        description:
            "The land your tavern stands on is up for auction, with nobles, clergy, and townsfolk vying to claim it.",
        twists: [
            "A noble threatens sabotage if you side against them.",
            "The Church demands a share of profits to secure your ownership.",
            "The townsfolk promise free labor if they win the bid.",
        ],
    },
    {
        title: "An Angry Mob",
        description: "Enraged townsfolk rise up to drive corrupt nobles from town but may be redirected.",
        twists: [
            "The nobles offer a bribe to pacify the mob.",
            "The Church attempts to mediate, but tensions escalate.",
            "The mob demands you take a public stance.",
        ],
    },
    {
        title: "A Holy Mission",
        description: "The clergy invite you to move into a wealthy monastery if you agree to their terms.",
        twists: [
            "Nobles accuse the Church of monopolizing your services.",
            "The townsfolk claim betrayal, fearing higher prices.",
            "The monastery demands you abandon all secular activities.",
        ],
    },
    {
        title: "King’s Favor",
        description: "The king builds a new palace, and taverns compete to provide royal services.",
        twists: [
            "The nobles sabotage your competitors for their gain.",
            "The Church demands a share of the honor to bless the partnership.",
            "The townsfolk feel neglected and threaten to boycott your tavern.",
        ],
    },
];

const wineWagesAndWorship: QuestLineCardProps = {
    title: "Wine, Wages, and Worship",
    description:
        "In the bustling heart of a divided town, your tavern becomes the stage for a three-way struggle for influence. The nobility demand luxury, privacy, and power, while the Church preaches morality, charity, and tradition. Meanwhile, the townsfolk just want a lively place to drink, gamble, and indulge in their desires. Balancing these Stakeholders is no simple task, as their demands often clash and their secrets threaten to pull your establishment into scandal or ruin.",
    encounters: events,
};

export default wineWagesAndWorship;
