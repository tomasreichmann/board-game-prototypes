import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import { range } from "lodash";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import PaperMini, { PaperMiniProps } from "../gameComponents/PaperMini";
import PrintMarkerCorners from "@/components/print/PrintMarker/PrintMarkerCorners";
import RegistrationMark from "@/components/print/PrintMarker/RegistrationMark";
import ColorBars from "@/components/print/PrintMarker/ColorBars";
import ToggleCheckbox from "../controls/ToggleCheckbox";
import Text from "../content/Text";

export type BaseActorMinisPrintControlsProps = {
    className?: string;
};

export default function BaseActorMinisPrintControls({ className }: BaseActorMinisPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const [isTransparent, setIsTransparent] = useState(false);
    const [copyCount, setCopyCount] = useState(1);
    const actorImageUris = [
        "/mighty-decks/actors/base/claw-yellow.png",
        "/mighty-decks/actors/base/claw-red.png",
        "/mighty-decks/actors/base/claw-green.png",
        "/mighty-decks/actors/base/claw-blue.png",
        "/mighty-decks/actors/base/aristocrat.png",
        "/mighty-decks/actors/base/artillery-fire.png",
        "/mighty-decks/actors/base/artillery-lightning.png",
        "/mighty-decks/actors/base/artillery-earth.png",
        "/mighty-decks/actors/base/artillery-ice.png",
        "/mighty-decks/actors/base/artillery-acid.png",
        "/mighty-decks/actors/base/assassin.png",
        "/mighty-decks/actors/base/beast.png",
        "/mighty-decks/actors/base/bruiser-yellow.png",
        "/mighty-decks/actors/base/bruiser-red.png",
        "/mighty-decks/actors/base/bruiser-green.png",
        "/mighty-decks/actors/base/bruiser-blue.png",
        "/mighty-decks/actors/base/civilian.png",
        "/mighty-decks/actors/base/commander.png",
        "/mighty-decks/actors/base/construct.png",
        "/mighty-decks/actors/base/cog.png",
        "/mighty-decks/actors/base/guard-yellow.png",
        "/mighty-decks/actors/base/guard-red.png",
        "/mighty-decks/actors/base/guard-green.png",
        "/mighty-decks/actors/base/guard-blue.png",
        "/mighty-decks/actors/base/healer.png",
        "/mighty-decks/actors/base/horror.png",
        "/mighty-decks/actors/base/manipulator.png",
        "/mighty-decks/actors/base/marksman-yellow.png",
        "/mighty-decks/actors/base/marksman-red.png",
        "/mighty-decks/actors/base/marksman-green.png",
        "/mighty-decks/actors/base/marksman-blue.png",
        "/mighty-decks/actors/base/merchant.png",
        "/mighty-decks/actors/base/minion-yellow.png",
        "/mighty-decks/actors/base/minion-red.png",
        "/mighty-decks/actors/base/minion-green.png",
        "/mighty-decks/actors/base/minion-blue.png",
        "/mighty-decks/actors/base/sentry.png",
        "/mighty-decks/actors/base/specialist.png",
        "/mighty-decks/actors/base/swarm.png",
        "/mighty-decks/actors/base/zealot.png",
    ];
    const items = useItemAdapter(
        range(copyCount)
            .map((copyIndex) =>
                actorImageUris.map(
                    (imageUri, imageIndex) =>
                        ({
                            slug: copyIndex + "-" + imageIndex,
                            imageStyle: { backgroundSize: "contain" },
                            width: "1in",
                            height: "1in",
                            children: <PrintMarkerCorners />,
                            cutBorderStyle: "",
                            className: isTransparent
                                ? "relative"
                                : "relative bg-[url('/mighty-decks/background/paper-custom-with-image-shadow.png')] [background-size:250%] [background-position:50%_35%] bg-center",
                            imageUri,
                        } as PaperMiniProps)
                )
            )
            .flat()
    );

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4 flex flex-row gap-4">
                <div className="flex flex-col">
                    <Text Component="span" variant="body" className={twMerge("text-kac-steel")}>
                        Transparent
                    </Text>
                    <ToggleCheckbox
                        labelFalse="Opaque"
                        labelTrue="Transparent"
                        value={isTransparent}
                        onChange={(event) => setIsTransparent(event.target.checked)}
                    />
                </div>
                <Input
                    label="Copies"
                    type="number"
                    value={copyCount}
                    onChange={(event) => setCopyCount(event.target.valueAsNumber || 1)}
                    className="w-32"
                />
            </div>
            <ToggleData
                data={items}
                buttonContent={"Items data (" + items.length + ")"}
                initialCollapsed
                className="print:hidden mt-4"
            />
            <Print
                className="flex flex-col-reverse gap-2"
                documentTitle="Actors"
                buttonProps={{
                    className: "self-center flex flex-row items-center",
                    children: (
                        <>
                            <Icon icon="print" className="w-6 h-6" />
                            &ensp;Print all pages
                        </>
                    ),
                }}
            >
                <div className="flex flex-col items-center w-full">
                    <ChunkedPages
                        Component={PaperMini}
                        items={items}
                        {...chunkedPagesProps}
                        itemsPerPage={20}
                        frontFacePageContentProps={{
                            ...chunkedPagesProps.frontFacePageContentProps,
                            style: { gap: 0 },
                            className: "pt-5",
                        }}
                        frontFacePrintPageProps={{
                            ...chunkedPagesProps.frontFacePrintPageProps,
                            children: (
                                <>
                                    <RegistrationMark className="absolute top-0 left-0" />
                                    <RegistrationMark className="absolute top-0 right-0" />
                                    <ColorBars className="absolute bottom-0 right-4 origin-top-right rotate-90" />
                                    <ColorBars className="absolute top-0 left-4 origin-bottom-left rotate-90" />
                                    <RegistrationMark className="absolute bottom-0 right-0" />
                                    <RegistrationMark className="absolute bottom-0 left-0" />
                                </>
                            ),
                        }}
                        label="Blank Actor Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
