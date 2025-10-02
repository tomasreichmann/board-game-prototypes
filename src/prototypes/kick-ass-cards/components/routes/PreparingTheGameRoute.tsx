import React, { Suspense } from "react";
import { Navigation } from "../Navigation";
import Text, { H1, H3 } from "../content/Text";
import PaperAndCardControls, {
    componentControlsMap,
    getComponent,
    routeNameMap,
    usePrintControlsStore,
} from "../preparingTheGame/PaperAndCardControls";
import Button from "../controls/Button";
import { useParams } from "react-router-dom";
import { mightyDecksPath } from "./routes";

export default function PreparingTheGameRoute() {
    const { isDefaultPaperOrientationPortrait } = usePrintControlsStore();
    const { componentSlug } = useParams<"componentSlug">();
    const componentKey = (componentSlug as keyof typeof componentControlsMap) || "template";
    const PrintComponent = getComponent(componentKey);

    return (
        <>
            <Navigation />
            <div className="flex-1 mt-4 print:m-0 w-full text-kac-iron p-2 md:px-10 bg-white">
                <section className="flex flex-col gap-8 ">
                    <div className="flex-1 flex flex-col relative">
                        <H1 className="mt-8">Preparing the game</H1>
                        <Text variant="body">
                            These are all the printable components you will need. Setup the print page and click the
                            Print button to either print immediately or export to PDF to print later.
                        </Text>
                        <Text variant="body">You can preselect card and paper sizes for all components.</Text>

                        <PaperAndCardControls className="mt-4" />

                        {!isDefaultPaperOrientationPortrait && (
                            <Text color="warning" variant="body" className="self-center font-bold my-4">
                                ⚠ When printing on both sides in landscape paper orientation, make sure to set your
                                printer to flip on short edge.
                            </Text>
                        )}

                        <H3 className="mt-4">Component types</H3>
                        <div className="flex flex-row flex-wrap gap-2 mt-2">
                            {Object.entries(routeNameMap).map(([key, title]) => (
                                <Button
                                    href={mightyDecksPath + "/preparing-the-game/" + key}
                                    color={componentSlug === key ? "secondary" : "primary"}
                                    size="sm"
                                >
                                    {title}
                                </Button>
                            ))}
                        </div>
                        <div className="flex-1 w-full overflow-auto -mx-4 px-4">
                            <Suspense fallback={<div className="p-4 italic">Loading...</div>}>
                                <PrintComponent />
                            </Suspense>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
