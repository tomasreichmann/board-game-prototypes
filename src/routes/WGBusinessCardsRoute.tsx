import Page from "../components/Page/Page";

import { useState } from "react";
import Text from "../prototypes/kick-ass-cards/components/content/Text";
import WgBusinessCardsPrintControls from "../prototypes/kick-ass-cards/components/preparingTheGame/WgBusinessCardsPrintControls";
import { paperSizes, cardSizes } from "../components/print/paperSizes";
import PaperAndCardControls, {
    usePrintControlsStore,
} from "../prototypes/kick-ass-cards/components/preparingTheGame/PaperAndCardControls";
import { ChunkedPagesProps } from "../prototypes/kick-ass-cards/components/print/ChunkedPages";

export default function WgBusinessCardRoute() {
    const { isDefaultPaperOrientationPortrait } = usePrintControlsStore();

    return (
        <Page className="SDRoute flex-1 h-svh flex flex-col box-border font-kacBody">
            <Text variant={"h1"} className="mb-8">
                WG Business Cards Route
            </Text>
            <PaperAndCardControls className="mt-4" />

            {!isDefaultPaperOrientationPortrait && (
                <Text color="warning" variant="body" className="self-center font-bold my-4">
                    ⚠ When printing on both sides in landscape paper orientation, make sure to set your printer to flip
                    on short edge.
                </Text>
            )}
            <WgBusinessCardsPrintControls />
        </Page>
    );
}
