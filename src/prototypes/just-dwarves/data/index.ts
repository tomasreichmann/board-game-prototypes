import rawBuildingsData from "./buildings.csv";
import rawEventsData from "./events.csv";
import rawClanChiefsData from "./clanChiefs.csv";
import rawComponentsData from "./components.csv";

const TRUE = "TRUE";
const isTrue = (val: any) => val === TRUE;

export const buildingsData = rawBuildingsData.map((rawItem) => ({
    name: String(rawItem.name), //"Pig Farm",
    cost: String(rawItem.cost), //"",
    costInGoldMin: Number(rawItem.costInGoldMin), //"0",
    costInGoldMax: Number(rawItem.costInGoldMax), //"0",
    production: String(rawItem.production), //"+3 Food",
    productionValueMin: Number(rawItem.productionValueMin), //"3",
    productionValueMax: Number(rawItem.productionValueMax), //"9",
    consumption: String(rawItem.consumption), //"-",
    consumtionValueMin: Number(rawItem.consumtionValueMin), //"0",
    consumtionValueMax: Number(rawItem.consumtionValueMax), //"0",
    incomeMin: Number(rawItem.incomeMin), //"3",
    incomeMax: Number(rawItem.incomeMax), //"9",
    slotCount: Number(rawItem.slotCount), //"3",
    golemSlotCount: Number(rawItem.golemSlotCount), //"3",
    slotBuilt: isTrue(rawItem.slotBuilt), //"TRUE",
    townBoardOrder: Number(rawItem.townBoardOrder), //"1",
    numberOfMachineryToAutomate: Number(rawItem.numberOfMachineryToAutomate), //"4",
    description: String(rawItem.description), //"",
    story: String(rawItem.story), //"“Oink!”"
    // count: Number(rawItem.count), //"1",
    // image: String(rawItem.image), //"https://images.fineartamerica.com/images-medium-large-5/drunken-pigs-daniel-eskridge.jpg",
}));

export const eventsData = rawEventsData.map((rawItem) => ({
    name: String(rawItem.name), //"Beard of Holding",
    tier: String(rawItem.tier), //"1",
    imageUri: String(rawItem.imageUri), //"",
    artDescription: String(rawItem.artDescription), //"S hammer sticking out of a huge beard woven into complicated braids adorned by greenish stone rings with glowing runes.",
    artDescription2: String(rawItem.artDescription2), //"fancy braided beard full of content from our resources,(diamonds, ingots, money, barrel with alcohol, chicken) colorfull resources",
    graphicDraft: isTrue(rawItem.graphicDraft), //"FALSE",
    graphicFeedback: String(rawItem.graphicFeedback), //"",
    graphicDone: isTrue(rawItem.graphicDone), //"FALSE",
    type: String(rawItem.type), //"Treasure",
    group: String(rawItem.group), //"Luxury",
    subGroup: String(rawItem.subGroup), //"",
    players: String(rawItem.players), //"All",
    count: Number(rawItem.count), //"1",
    description: String(rawItem.description), //"Does not belong to any set.",
    drawExtra: isTrue(rawItem.drawExtra), //"FALSE",
    story: String(rawItem.story), //"Brought to you by the latest best-seller \"Dwarven Beard Magic and How To Use It\"",
    cost: String(rawItem.cost), //"4 Gold",
    value: Number(rawItem.value), //"5",
    minResourceCost: Number(rawItem.minResourceCost), //"4",
    maxResourceCost: Number(rawItem.maxResourceCost), //"4",
    roi: String(rawItem.roi), //"125.00%"
}));

export const clanChiefsData = rawClanChiefsData.map((rawItem) => ({
    name: String(rawItem.name), // Brewer
    imageUri: String(rawItem.imageUri), // https://i.imgur.com/7sxCznG.jpg
    artDescription: String(rawItem.artDescription), // "A lively nobleman with mead tucked in his chinstrap or tied to a string, very slick metallic elastics on his chin, a big drunken nose."
    graphicDraft: isTrue(rawItem.graphicDraft), // TRUE
    graphicFeedback: isTrue(rawItem.graphicFeedback), //
    graphicDone: isTrue(rawItem.graphicDone), // FALSE
    startingResources: String(rawItem.startingResources), // "3 Food, 3 Stone, 3 Metal, 1 Mead"
    startingGold: Number(rawItem.startingGold), // 5
    startingProductionTokens: String(rawItem.startingProductionTokens), // 2x BREWERY
    effect1: String(rawItem.effect1), // Produces +1 Mead on top of other bonuses.
    effect2: String(rawItem.effect2), // Start with cheaper Mead.
    effect3: String(rawItem.effect3), // You cannot buy Mead from other players.
    slotCount: Number(rawItem.slotCount), // 0
    consumption: String(rawItem.consumption), // -
    production: String(rawItem.production), //-
}));

export const componentsData = rawComponentsData.map((rawItem) => ({
    name: String(rawItem.name), //"Town board",
    imageUri: String(rawItem.imageUri), //"",
    width: String(rawItem.width), //"",
    height: String(rawItem.height), //"",
    thickness: String(rawItem.thickness), //"",
    form: String(rawItem.form), //"board",
    material: String(rawItem.material), //"cardboard",
    punchout: isTrue(rawItem.punchout), //"FALSE",
    variations: String(rawItem.variations), //"1",
    count: Number(rawItem.count), //"1",
    pricePerPiece: String(rawItem.pricePerPiece), //"",
    priceTotal: String(rawItem.priceTotal), //"",
    description: String(rawItem.description), //"1 fold"
}));
