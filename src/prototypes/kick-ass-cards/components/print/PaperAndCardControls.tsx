import { twMerge } from "tailwind-merge";
import Select from "../controls/Select";
import ToggleCheckbox from "../controls/ToggleCheckbox";
import { cardSizes, paperSizes } from "../../../../components/print/paperSizes";
import Input from "../controls/Input";
import Text from "../content/Text";

export const cardOptions = Object.entries(cardSizes).map(([key, { inches, mm }]) => ({
    label: `${key} (${mm[0]}x${mm[1]}mm)`,
    value: key,
}));

export const paperOptions = Object.entries(paperSizes).map(([key, { inches, mm }]) => ({
    label: `${key} (${mm[0]}x${mm[1]}mm)`,
    value: key,
}));

export type PaperAndCardControlsProps = {
    className?: string;
    paperSize: keyof typeof paperSizes;
    cardSize: keyof typeof cardSizes;
    isPortrait: boolean;
    pageMarginsMm: [number, number, number, number];
    bleedMm: number;
    gapMm: [number, number];
    setPaperSize: (paperSize: keyof typeof paperSizes) => void;
    setCardSize: (cardSize: keyof typeof cardSizes) => void;
    setPortrait: (portrait: boolean) => void;
    setPageMarginsMm: (marginsMm: [number, number, number, number]) => void;
    setBleedMm: (bleedMm: number) => void;
    setGapMm: (gapMm: [number, number]) => void;
};

export default function PaperAndCardControls({
    className,
    paperSize,
    cardSize,
    isPortrait,
    pageMarginsMm,
    bleedMm,
    gapMm,
    setPaperSize,
    setCardSize,
    setPortrait,
    setPageMarginsMm,
    setBleedMm,
    setGapMm,
}: PaperAndCardControlsProps) {
    return (
        <div className={twMerge("flex flex-row gap-4 items-end flex-wrap", className)}>
            <Select
                label="Paper size"
                className="w-48"
                options={paperOptions}
                value={paperSize}
                onChange={(event) => setPaperSize(event.target.value as keyof typeof paperSizes)}
            />
            <Input
                type="number"
                label="Page margin top (mm)"
                className="w-32"
                value={pageMarginsMm[0]}
                onChange={(event) =>
                    setPageMarginsMm([
                        parseInt(event.target.value),
                        pageMarginsMm[1],
                        pageMarginsMm[2],
                        pageMarginsMm[3],
                    ])
                }
            />
            <Input
                type="number"
                label="Page margin right (mm)"
                className="w-32"
                value={pageMarginsMm[1]}
                onChange={(event) =>
                    setPageMarginsMm([
                        pageMarginsMm[0],
                        parseInt(event.target.value),
                        pageMarginsMm[2],
                        pageMarginsMm[3],
                    ])
                }
            />
            <Input
                type="number"
                label="Page margin bottom (mm)"
                className="w-32"
                value={pageMarginsMm[2]}
                onChange={(event) =>
                    setPageMarginsMm([
                        pageMarginsMm[0],
                        pageMarginsMm[1],
                        parseInt(event.target.value),
                        pageMarginsMm[3],
                    ])
                }
            />
            <Input
                type="number"
                label="Page margin left (mm)"
                className="w-32"
                value={pageMarginsMm[3]}
                onChange={(event) =>
                    setPageMarginsMm([
                        pageMarginsMm[0],
                        pageMarginsMm[1],
                        pageMarginsMm[2],
                        parseInt(event.target.value),
                    ])
                }
            />
            <Input
                type="number"
                label="Gap horizontal (mm)"
                className="w-32"
                value={gapMm[0]}
                onChange={(event) => setGapMm([parseInt(event.target.value), gapMm[1]])}
            />
            <Input
                type="number"
                label="Gap vertical (mm)"
                className="w-32"
                value={gapMm[1]}
                onChange={(event) => setGapMm([gapMm[0], parseInt(event.target.value)])}
            />
            <div className="flex flex-col">
                <Text Component="span" variant="body" className={twMerge("text-kac-steel")}>
                    Page orientation
                </Text>
                <ToggleCheckbox
                    labelFalse="Landscape"
                    labelTrue="Portrait"
                    value={isPortrait}
                    onChange={(event) => setPortrait(event.target.checked)}
                />
            </div>
            <Select
                className="w-48"
                label="Default card size"
                options={cardOptions}
                value={cardSize}
                onChange={(event) => setCardSize(event.target.value as keyof typeof cardSizes)}
            />
            <Input
                type="number"
                label="Bleed (mm)"
                className="w-32"
                value={bleedMm}
                onChange={(event) => setBleedMm(parseInt(event.target.value))}
            />
        </div>
    );
}

export type PrintControlsProps = {
    className?: string;
    defaultPaperSize?: keyof typeof paperSizes;
    defaultCardSize?: keyof typeof cardSizes;
    defaultIsPortrait?: boolean;
};

/* export default function PrintControls({
    className,
    defaultPaperSize,
    defaultCardSize,
    defaultIsPortrait,
}: PrintControlsProps) {
    const [paperSize, setPaperSize] = React.useState<keyof typeof paperSizes>(defaultPaperSize ?? "A4");
    const [cardSize, setCardSize] = React.useState<keyof typeof cardSizes>(defaultCardSize ?? "Bridge");
    const [isPaperOrientationPortrait, setIsPaperOrientationPortrait] = React.useState(defaultIsPortrait ?? true);
    
    const isDirtyRef = React.useRef(false);

    // Prevent updating sizes when default change if the user already interacted with them
    React.useEffect(() => {
        isDirtyRef.current = true;
    }, [paperSize, cardSize, isPaperOrientationPortrait]);

    React.useEffect(() => {
        if (!isDirtyRef.current) {
            return;
        }
        setPaperSize(defaultPaperSize ?? "A4");
        setCardSize(defaultCardSize ?? "Bridge");
        setIsPaperOrientationPortrait(defaultIsPortrait ?? true);
    }, [defaultCardSize, defaultPaperSize, defaultIsPortrait]);

    return (
        <div className={twMerge("flex flex-col gap-4", className)}>
            <PaperAndCardControls
                paperSize={paperSize}
                cardSize={cardSize}
                isPortrait={isPaperOrientationPortrait}
                setPaperSize={setPaperSize}
                setCardSize={setCardSize}
                setPortrait={setIsPaperOrientationPortrait}
            />
            <PrintPage
                size={paperSize ?? defaultPaperSize ?? "A4"}
                orientation={isPaperOrientationPortrait ? "portrait" : "landscape"}
                bleedInMm={0}
            ></PrintPage>
        </div>
    );
} */
