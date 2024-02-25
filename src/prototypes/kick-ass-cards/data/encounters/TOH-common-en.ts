import wealthAssetsImport from "../wealth-en-asset-props";
import wealthDataImport from "../wealth-en.csv";

export const defaultClockProps = {
    size: "Bridge",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultActorProps = {
    size: "Bridge",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
    imagePosition: "center top",
};
export const defaultAssetProps = {
    size: "Mini European",
    className: "not-prose drop-shadow-md print:drop-shadow-none print:filter-none",
};
export const defaultMiniProps = {
    baseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    backBaseClassName: "pt-2 bg-kac-blood-dark text-white text-center",
    baseWidth: "0.5in",
    height: "2in",
    width: "1in",
};
export const wealthData = wealthDataImport;
export const wealthAssets = wealthAssetsImport;
