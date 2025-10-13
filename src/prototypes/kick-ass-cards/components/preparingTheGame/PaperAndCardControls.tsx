import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import Select from "../controls/Select";
import ToggleCheckbox from "../controls/ToggleCheckbox";
import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import Input from "../controls/Input";
import Text from "../content/Text";
import { ChunkedPagesProps } from "../print/ChunkedPages";
import React from "react";

export const cardOptions = Object.entries(cardSizes).map(([key, { inches, mm }]) => ({
    label: `${key} (${mm[0]}x${mm[1]}mm)`,
    value: key,
}));

export const paperOptions = Object.entries(paperSizes).map(([key, { inches, mm }]) => ({
    label: `${key} (${mm[0]}x${mm[1]}mm)`,
    value: key,
}));

const pageLabelPositionOptions = [
    { label: "top", value: "top" } as const,
    { label: "bottom", value: "bottom" } as const,
    { label: "left", value: "left" } as const,
    { label: "right", value: "right" } as const,
];

export type PrintControlsComponentType = React.ComponentType<{ className?: string }>;

/* prettier-ignore */
export const componentControlsMap = {
    "template": () => React.lazy(() => import("./TemplatePrintControls")),
    "outcome-cards": () => React.lazy(() => import("./OutcomeCardsPrintControls")),
    "effect-cards": () => React.lazy(() => import("./EffectCardsPrintControls")),
    "base-counter-cards": () => React.lazy(() => import("./CounterCardsPrintControls")),
    "base-actor-cards": () => React.lazy(() => import("./BaseActorCardsPrintControls")),
    "base-asset-cards": () => React.lazy(() => import("./BaseAssetCardsPrintControls")),
    "base-asset-modifier-cards": () => React.lazy(() => import("./BaseAssetModifierCardsPrintControls")),
    "base-actor-minis": () => React.lazy(() => import("./BaseActorMinisPrintControls")),
    "base-tactical-roles": () => React.lazy(() => import("./BaseTacticalRolesPrintControls")),
    "base-stunt-cards": () => React.lazy(() => import("./StuntCardsPrintControls")),
    "blank-actor-cards": () => React.lazy(() => import("./ActorCardsPrintControls")),
    "blank-counter-cards": () => React.lazy(() => import("./ClocksCardsPrintControls")),
    "medieval-asset-cards": () => React.lazy(() => import("./AssetCardsPrintControls")),
    "medieval-actors": () => React.lazy(() => import("./MedievalActorCardsPrintControls")),
    "medieval-locations": () => React.lazy(() => import("./MedievalLocationsPrintControls")),
    "penance-in-blood": () => React.lazy(() => import("./PenanceInBloodPrintControls")),
    "attractive-card": () => React.lazy(() => import("./AttractiveCardPrintControls")),
    "dividers": () => React.lazy(() => import("./DividersPrintControls")),
    "box": () => React.lazy(() => import("./BoxPrintControls")),
};

const componentCache: Partial<
    Record<keyof typeof componentControlsMap, React.LazyExoticComponent<PrintControlsComponentType>>
> = {};

export const getComponent = (key: keyof typeof componentControlsMap) => {
    if (!componentCache[key]) {
        componentCache[key] = componentControlsMap[key]();
    }
    return componentCache[key]!;
};

/* prettier-ignore */
export const routeNameMap = {
    "template": "Template",
    "outcome-cards": "Outcome Cards",
    "effect-cards": "Effect Cards",
    "base-counter-cards": "Base Counter Cards",
    "base-actor-cards": "Base Actor Cards",
    "base-tactical-roles": "Base Tactical Roles",
    "base-asset-cards": "Base Asset Cards",
    "base-asset-modifier-cards": "Base Asset Modifier Cards",
    "base-actor-minis": "Base Actor Minis",
    "base-stunt-cards": "Base Stunt Cards",
    "blank-actor-cards": "Blank Actor Cards",
    "blank-counter-cards": "Blank Counter Cards",
    "medieval-asset-cards": "Medieval Asset Cards",
    "medieval-actors": "Medieval Actors",
    "medieval-locations": "Medieval Locations",
    "penance-in-blood": "Penance In Blood",
    "attractive-card": "Attractive Card",
    "dividers": "Dividers",
    "box": "Box",
} as const;

export type PrintControlsStoreType = {
    defaultPaperSize: keyof typeof paperSizes;
    setDefaultPaperSize: (newValue: keyof typeof paperSizes) => void;
    isDefaultPaperOrientationPortrait: boolean;
    setIsDefaultPaperOrientationPortrait: (newValue: boolean) => void;
    defaultCardSize: keyof typeof cardSizes;
    setDefaultCardSize: (newValue: keyof typeof cardSizes) => void;
    defaultPageMarginsMm: [number, number, number, number];
    setDefaultPageMarginsMm: (newValue: [number, number, number, number]) => void;
    defaultGapMm: [horizontal: number, vertical: number];
    setDefaultGapMm: (newValue: [horizontal: number, vertical: number]) => void;
    defaultBleedMm: number;
    setDefaultBleedMm: (newValue: number) => void;
    flipSecondHalf: boolean;
    setFlipSecondHalf: (newValue: boolean) => void;
    showHorizontalBend: boolean;
    setShowHorizontalBend: (newValue: boolean) => void;
    fitToPage: boolean;
    setFitToPage: (newValue: boolean) => void;
    pageLabelPosition: ChunkedPagesProps<any, any>["labelPosition"];
    setPageLabelPosition: (newValue: ChunkedPagesProps<any, any>["labelPosition"]) => void;
};

export const usePrintControlsStore = create<PrintControlsStoreType>((set) => ({
    defaultPaperSize: "A4",
    setDefaultPaperSize: (paperSize: keyof typeof paperSizes) => set({ defaultPaperSize: paperSize }),
    isDefaultPaperOrientationPortrait: false,
    setIsDefaultPaperOrientationPortrait: (isPortrait: boolean) =>
        set({ isDefaultPaperOrientationPortrait: isPortrait }),
    defaultCardSize: "54x86" as const,
    setDefaultCardSize: (cardSize: keyof typeof cardSizes) => set({ defaultCardSize: cardSize }),
    defaultPageMarginsMm: [7, 10, 7, 10],
    setDefaultPageMarginsMm: (marginsMm: [number, number, number, number]) => set({ defaultPageMarginsMm: marginsMm }),
    defaultGapMm: [2, 6],
    setDefaultGapMm: (gapMm: [number, number]) => set({ defaultGapMm: gapMm }),
    defaultBleedMm: 3,
    setDefaultBleedMm: (bleedMm: number) => set({ defaultBleedMm: bleedMm }),
    flipSecondHalf: true,
    // flipSecondHalf: false,
    setFlipSecondHalf: (flipSecondHalf: boolean) => set({ flipSecondHalf }),
    showHorizontalBend: true,
    setShowHorizontalBend: (showHorizontalBend: boolean) => set({ showHorizontalBend }),
    fitToPage: true,
    setFitToPage: (fitToPage: boolean) => set({ fitToPage }),
    pageLabelPosition: "left",
    setPageLabelPosition: (pageLabelPosition: ChunkedPagesProps<any, any>["labelPosition"]) =>
        set({ pageLabelPosition }),
}));

export type PaperAndCardControlsProps = {
    className?: string;
};

export default function PaperAndCardControls({ className }: PaperAndCardControlsProps) {
    const {
        defaultPaperSize,
        setDefaultPaperSize,
        isDefaultPaperOrientationPortrait,
        setIsDefaultPaperOrientationPortrait,
        defaultCardSize,
        setDefaultCardSize,
        defaultPageMarginsMm,
        setDefaultPageMarginsMm,
        defaultGapMm,
        setDefaultGapMm,
        defaultBleedMm,
        setDefaultBleedMm,
        flipSecondHalf,
        setFlipSecondHalf,
        showHorizontalBend,
        setShowHorizontalBend,
        pageLabelPosition,
        setPageLabelPosition,
        fitToPage,
        setFitToPage,
    } = usePrintControlsStore();

    return (
        <div className={twMerge("flex flex-row gap-4 items-end flex-wrap", className)}>
            <Select
                label="Paper size"
                className="w-48"
                options={paperOptions}
                value={defaultPaperSize}
                onChange={(event) => setDefaultPaperSize(event.target.value as keyof typeof paperSizes)}
            />
            <Input
                type="number"
                label="Page margin top (mm)"
                className="w-32"
                value={defaultPageMarginsMm[0]}
                onChange={(event) =>
                    setDefaultPageMarginsMm([
                        parseInt(event.target.value),
                        defaultPageMarginsMm[1],
                        defaultPageMarginsMm[2],
                        defaultPageMarginsMm[3],
                    ])
                }
            />
            <Input
                type="number"
                label="Page margin right (mm)"
                className="w-32"
                value={defaultPageMarginsMm[1]}
                onChange={(event) =>
                    setDefaultPageMarginsMm([
                        defaultPageMarginsMm[0],
                        parseInt(event.target.value),
                        defaultPageMarginsMm[2],
                        defaultPageMarginsMm[3],
                    ])
                }
            />
            <Input
                type="number"
                label="Page margin bottom (mm)"
                className="w-32"
                value={defaultPageMarginsMm[2]}
                onChange={(event) =>
                    setDefaultPageMarginsMm([
                        defaultPageMarginsMm[0],
                        defaultPageMarginsMm[1],
                        parseInt(event.target.value),
                        defaultPageMarginsMm[3],
                    ])
                }
            />
            <Input
                type="number"
                label="Page margin left (mm)"
                className="w-32"
                value={defaultPageMarginsMm[3]}
                onChange={(event) =>
                    setDefaultPageMarginsMm([
                        defaultPageMarginsMm[0],
                        defaultPageMarginsMm[1],
                        defaultPageMarginsMm[2],
                        parseInt(event.target.value),
                    ])
                }
            />
            <Input
                type="number"
                label="Gap horizontal (mm)"
                className="w-32"
                value={defaultGapMm[0]}
                onChange={(event) => setDefaultGapMm([parseInt(event.target.value), defaultGapMm[1]])}
            />
            <Input
                type="number"
                label="Gap vertical (mm)"
                className="w-32"
                value={defaultGapMm[1]}
                onChange={(event) => setDefaultGapMm([defaultGapMm[0], parseInt(event.target.value)])}
            />
            <div className="flex flex-col">
                <Text Component="span" variant="body" className={twMerge("text-kac-steel")}>
                    Page orientation
                </Text>
                <ToggleCheckbox
                    labelFalse="Landscape"
                    labelTrue="Portrait"
                    value={isDefaultPaperOrientationPortrait}
                    onChange={(event) => setIsDefaultPaperOrientationPortrait(event.target.checked)}
                />
            </div>
            <Select
                className="w-48"
                label="Page label position"
                options={pageLabelPositionOptions}
                value={pageLabelPosition}
                onChange={(event) =>
                    setPageLabelPosition(event.target.value as PrintControlsStoreType["pageLabelPosition"])
                }
            />
            <Select
                className="w-48"
                label="Default card size"
                options={cardOptions}
                value={defaultCardSize}
                onChange={(event) => setDefaultCardSize(event.target.value as keyof typeof cardSizes)}
            />
            <Input
                type="number"
                label="Bleed (mm)"
                className="w-32"
                value={defaultBleedMm}
                onChange={(event) => setDefaultBleedMm(event.target.valueAsNumber)}
            />
            <div className="flex flex-col">
                <Text Component="span" variant="body" className={twMerge("text-kac-steel")}>
                    Flip Second Half
                </Text>
                <ToggleCheckbox
                    labelFalse="No Flip"
                    labelTrue="Flip"
                    value={flipSecondHalf}
                    onChange={(event) => setFlipSecondHalf(event.target.checked)}
                />
            </div>
            <div className="flex flex-col">
                <Text Component="span" variant="body" className={twMerge("text-kac-steel")}>
                    Show Horizontal Bend
                </Text>
                <ToggleCheckbox
                    labelFalse="Don't show"
                    labelTrue="Show"
                    value={showHorizontalBend}
                    onChange={(event) => setShowHorizontalBend(event.target.checked)}
                />
            </div>
            <div className="flex flex-col">
                <Text Component="span" variant="body" className={twMerge("text-kac-steel")}>
                    Fit cards to page
                </Text>
                <ToggleCheckbox
                    labelFalse="Fit page to a single card"
                    labelTrue="Fit multiple cards to page"
                    value={fitToPage}
                    onChange={(event) => setFitToPage(event.target.checked)}
                />
            </div>
        </div>
    );
}

export type PrintControlsProps = {
    className?: string;
    defaultPaperSize?: keyof typeof paperSizes;
    defaultCardSize?: keyof typeof cardSizes;
    defaultIsPortrait?: boolean;
};
