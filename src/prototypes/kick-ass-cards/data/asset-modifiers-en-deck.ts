import arrayToMap from "../../../utils/arrayToMap";
import { AssetType } from "../types";
import assetData from "./asset-modifiers-en.csv";

const assetModifiers: Required<AssetType>[] = assetData;

export const assetModifierMap = arrayToMap(assetModifiers, "slug");

export default assetModifiers;
