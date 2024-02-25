import { AssetCardProps } from "../components/gameComponents/AssetCard";
import wealthDataRaw from "./wealth-en.csv";

const wealthData: AssetCardProps[] = wealthDataRaw.map((item) => ({
    ...item,
    cornerIcon: "crownCoin",
    iconClassName: "max-h-none",
    size: "Bridge",
    effectClassName: "min-h-[8em]",
    icon: item.imageUri,
    title: item.title,
    effect:
        item.description +
        "<BR>" +
        item.incomeRequirements +
        "<BR>" +
        item.incomeDescription +
        "<BR>" +
        item.savingsDuration,
}));

export default wealthData;
