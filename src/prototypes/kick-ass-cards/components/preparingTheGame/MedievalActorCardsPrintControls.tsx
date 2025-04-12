import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import Card, { CardHeader } from "../gameComponents/Card";
import { PaperProps } from "../../../../components/print/Paper/Paper";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";

export type MedievalActorCardsPrintControlsProps = {
    className?: string;
};

type ImageCardProps = {
    imageUri: string;
    size?: PaperProps["size"];
} & Omit<PaperProps, "size">;

const ImageCard = ({ imageUri, ...restProps }: ImageCardProps) => {
    return (
        <Card {...restProps}>
            <CardHeader icon={imageUri} className="z-10" cornerIcon="/mighty-decks/actor.png" deck="medieval"></CardHeader>
            <div className="flex-1 relative self-stretch">
                {imageUri && (
                    <IconOrImage icon={imageUri} className={"absolute w-full h-full object-cover drop-shadow-lg"} />
                )}
            </div>
        </Card>
    );
};

export default function MedievalActorCardsPrintControls({ className }: MedievalActorCardsPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    const mergedChunkedPagesProps = {
        ...chunkedPagesProps,
        frontFacePrintPageProps: {
            ...chunkedPagesProps.frontFacePrintPageProps,
            className: twMerge(
                chunkedPagesProps.frontFacePrintPageProps?.className,
                "[&:nth-child(even)>div>div]:flex-row-reverse"
            ),
        },
    };
    const [copyCount, setCopyCount] = useState(1);
    const actorImageUris = [
        "/mighty-decks/actors/medieval/villager.png",
        "/mighty-decks/actors/medieval/alchemist.png",
        "/mighty-decks/actors/medieval/aristocrat.png",
        "/mighty-decks/actors/medieval/bandit.png",
        "/mighty-decks/actors/medieval/bandit.png",
        "/mighty-decks/actors/medieval/beggar.png",
        "/mighty-decks/actors/medieval/child.png",
        "/mighty-decks/actors/medieval/craftsman.png",

        "/mighty-decks/actors/medieval/female/villager.png",
        "/mighty-decks/actors/medieval/female/alchemist.png",
        "/mighty-decks/actors/medieval/female/aristocrat.png",
        "/mighty-decks/actors/medieval/female/bandit.png",
        "/mighty-decks/actors/medieval/female/bandit.png",
        "/mighty-decks/actors/medieval/female/beggar.png",
        "/mighty-decks/actors/medieval/female/child.png",
        "/mighty-decks/actors/medieval/female/craftsman.png",

        "/mighty-decks/actors/medieval/elder.png",
        "/mighty-decks/actors/medieval/farmer.png",
        "/mighty-decks/actors/medieval/hunter.png",
        "/mighty-decks/actors/medieval/idiot.png",
        "/mighty-decks/actors/medieval/knight.png",
        "/mighty-decks/actors/medieval/knight.png",
        "/mighty-decks/actors/medieval/marksman.png",
        "/mighty-decks/actors/medieval/marksman.png",

        "/mighty-decks/actors/medieval/female/elder.png",
        "/mighty-decks/actors/medieval/female/farmer.png",
        "/mighty-decks/actors/medieval/female/hunter.png",
        "/mighty-decks/actors/medieval/female/crazy-cat-lady.png",
        "/mighty-decks/actors/medieval/female/knight.png",
        "/mighty-decks/actors/medieval/female/knight.png",
        "/mighty-decks/actors/medieval/female/marksman.png",
        "/mighty-decks/actors/medieval/female/marksman.png",

        "/mighty-decks/actors/medieval/merchant.png",
        "/mighty-decks/actors/medieval/militia.png",
        "/mighty-decks/actors/medieval/militia.png",
        "/mighty-decks/actors/medieval/pikeman.png",
        "/mighty-decks/actors/medieval/priest.png",
        "/mighty-decks/actors/medieval/rogue.png",
        "/mighty-decks/actors/medieval/scholar.png",
        "/mighty-decks/actors/medieval/shopkeeper.png",

        "/mighty-decks/actors/medieval/female/merchant.png",
        "/mighty-decks/actors/medieval/female/militia.png",
        "/mighty-decks/actors/medieval/female/militia.png",
        "/mighty-decks/actors/medieval/female/pikeman.png",
        "/mighty-decks/actors/medieval/female/nun.png",
        "/mighty-decks/actors/medieval/female/rogue.png",
        "/mighty-decks/actors/medieval/female/scribe.png",
        "/mighty-decks/actors/medieval/female/shopkeeper.png",
    ];
    const items = useItemAdapter(
        actorImageUris.map((imageUri, imageIndex) => ({
            slug: String(imageIndex),
            forPrint: true,
            className: "relative",
            imageUri,
        }))
    );

    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <div className="print:hidden mt-4">
                <Input
                    label="Copy count"
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
                documentTitle="Medieval Actors"
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
                        Component={ImageCard}
                        items={items}
                        {...mergedChunkedPagesProps}
                        label="Medieval Actors"
                    />
                </div>
            </Print>
        </div>
    );
}
