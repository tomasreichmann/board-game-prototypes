import React from "react";
import MdxArticle from "../layout/MdxArticle";
import preparingTheGameIntroMdx from "../../articles/preparingTheGame-intro.mdx";
import { Navigation } from "../Navigation";
import Text, { H2, H3 } from "../content/Text";
import { paperSizes, cardSizes } from "../../../../components/print/paperSizes";
import PaperAndCardControls from "../print/PaperAndCardControls";
import OutcomeCardsPrintControls from "../print/OutcomeCardsPrintControls";
import Button from "../controls/Button";
import TemplatePrintControls from "../print/TemplatePrintControls";
import Print from "../../../../components/print/Print";

const componentControlsMap = {
    Template: TemplatePrintControls,
    "Outcome Cards": OutcomeCardsPrintControls,
};

export default function PreparingTheGameRoute() {
    const [defaultPaperSize, setDefaultPaperSize] = React.useState<keyof typeof paperSizes>("A4");
    const [isDefaultPaperOrientationPortrait, setIsDefaultPaperOrientationPortrait] = React.useState(false);
    const [defaultCardSize, setDefaultCardSize] = React.useState<keyof typeof cardSizes>("54x86");
    const [defaultPageMarginsMm, setDefaultPageMarginsMm] = React.useState<[number, number, number, number]>([
        9, 10, 9, 10,
    ]);
    const [defaultGapMm, setDefaultGapMm] = React.useState<[number, number]>([2, 7]);
    const [defaultBleedMm, setDefaultBleedMm] = React.useState<number>(3);

    const [componentControls, setComponentControls] =
        React.useState<keyof typeof componentControlsMap>("Outcome Cards");

    const PrintComponent = componentControlsMap[componentControls];

    return (
        <>
            <Navigation />
            <div className="flex-1 mt-4 print:m-0 w-full text-kac-iron p-2 md:px-10 bg-white">
                <section className="flex flex-col gap-8 ">
                    <div className="flex flex-col gap-4 pb-8">
                        <MdxArticle
                            mdx={preparingTheGameIntroMdx}
                            className="mt-4 md:columns-2 lg:columns-3 xl:columns-4"
                        />
                    </div>
                    <div className="flex-1 flex flex-col relative">
                        <H2>Printable Components</H2>
                        <Text variant="body">
                            These are all the printable components you will need. Setup the print page and click the
                            Print button to either print immediately or export to PDF to print later.
                        </Text>
                        <Text variant="body">You can preselect card and paper sizes for all components.</Text>

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
                                ⚠ When printing on both sides in landscape paper orientation, make sure to set your
                                printer to flip on short edge.
                            </Text>
                        )}

                        <H3 className="mt-4">Component types</H3>
                        <div className="flex flex-row gap-2 mt-2">
                            {(Object.keys(componentControlsMap) as (keyof typeof componentControlsMap)[]).map((key) => (
                                <Button
                                    color={componentControls === key ? "secondary" : "primary"}
                                    onClick={() => setComponentControls(key)}
                                    size="sm"
                                >
                                    {key}
                                </Button>
                            ))}
                        </div>
                        <div className="flex-1 w-full overflow-auto">
                            <Print>
                                <PrintComponent
                                    paperSize={defaultPaperSize}
                                    cardSize={defaultCardSize}
                                    pageOrientation={isDefaultPaperOrientationPortrait ? "portrait" : "landscape"}
                                    pageMarginsMm={defaultPageMarginsMm}
                                    bleedMm={defaultBleedMm}
                                    gapMm={defaultGapMm}
                                />
                            </Print>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
