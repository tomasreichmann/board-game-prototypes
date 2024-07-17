import arrayToMap from "../../../utils/arrayToMap";
import { AssetType } from "../types";
import assetData from "./assets-en.csv";

const assets: Required<AssetType>[] = assetData;

export const assetMap = arrayToMap(assets, "slug");

export default assets;
