import Page from "../components/Page/Page";

import { useState } from "react";
import Text from "../prototypes/kick-ass-cards/components/content/Text";
import WgBusinessCardsPrintControls from "../prototypes/kick-ass-cards/components/print/WgBusinessCardsPrintControls";
import { paperSizes, cardSizes } from "../components/print/paperSizes";
import PaperAndCardControls from "../prototypes/kick-ass-cards/components/print/PaperAndCardControls";

export default function WgBusinessCardRoute() {
    const [defaultPaperSize, setDefaultPaperSize] = useState<keyof typeof paperSizes>("A4");
    const [isDefaultPaperOrientationPortrait, setIsDefaultPaperOrientationPortrait] = useState(false);
    const [defaultCardSize, setDefaultCardSize] = useState<keyof typeof cardSizes>("54x86");
    const [defaultPageMarginsMm, setDefaultPageMarginsMm] = useState<[number, number, number, number]>([9, 10, 9, 10]);
    const [defaultGapMm, setDefaultGapMm] = useState<[number, number]>([2, 2]);
    const [defaultBleedMm, setDefaultBleedMm] = useState<number>(3);

    return (
        <Page className="SDRoute flex-1 h-svh flex flex-col box-border font-kacBody">
            <Text variant={"h1"} className="mb-8">
                WG Business Cards Route
            </Text>
            <PaperAndCardControls
                className="mt-4"
                paperSize={defaultPaperSize}
                cardSize={defaultCardSize}
                isPortrait={isDefaultPaperOrientationPortrait}
                pageMarginsMm={defaultPageMarginsMm}
                bleedMm={defaultBleedMm}
                gapMm={defaultGapMm}
                setPaperSize={setDefaultPaperSize}
                setCardSize={setDefaultCardSize}
                setPortrait={setIsDefaultPaperOrientationPortrait}
                setPageMarginsMm={setDefaultPageMarginsMm}
                setBleedMm={setDefaultBleedMm}
                setGapMm={setDefaultGapMm}
            />

            {!isDefaultPaperOrientationPortrait && (
                <Text color="warning" variant="body" className="self-center font-bold my-4">
                    ⚠ When printing on both sides in landscape paper orientation, make sure to set your printer to flip
                    on short edge.
                </Text>
            )}
            <WgBusinessCardsPrintControls
                paperSize={defaultPaperSize}
                cardSize={defaultCardSize}
                pageOrientation={isDefaultPaperOrientationPortrait ? "portrait" : "landscape"}
                pageMarginsMm={defaultPageMarginsMm}
                bleedMm={defaultBleedMm}
                gapMm={defaultGapMm}
            />
        </Page>
    );
}
