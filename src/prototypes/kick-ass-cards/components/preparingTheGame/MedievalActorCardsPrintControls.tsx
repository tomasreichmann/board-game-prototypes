import { twMerge } from "tailwind-merge";
import ChunkedPages, { ChunkedPagesProps } from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import { useState } from "react";
import Input from "../controls/Input";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import Card, { CardBody, CardHeader } from "../gameComponents/Card";
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
            <CardHeader icon={imageUri} className="z-10" cornerIcon="/KAC/actor.png" deck="medieval"></CardHeader>
            <div className="flex-1 relative self-stretch my-[5%]">
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
        "/KAC/actors/medieval/villager.png",
        "/KAC/actors/medieval/alchemist.png",
        "/KAC/actors/medieval/aristocrat.png",
        "/KAC/actors/medieval/bandit.png",
        "/KAC/actors/medieval/bandit.png",
        "/KAC/actors/medieval/beggar.png",
        "/KAC/actors/medieval/child.png",
        "/KAC/actors/medieval/craftsman.png",

        "/KAC/actors/medieval/female/villager.png",
        "/KAC/actors/medieval/female/alchemist.png",
        "/KAC/actors/medieval/female/aristocrat.png",
        "/KAC/actors/medieval/female/bandit.png",
        "/KAC/actors/medieval/female/bandit.png",
        "/KAC/actors/medieval/female/beggar.png",
        "/KAC/actors/medieval/female/child.png",
        "/KAC/actors/medieval/female/craftsman.png",

        "/KAC/actors/medieval/elder.png",
        "/KAC/actors/medieval/farmer.png",
        "/KAC/actors/medieval/hunter.png",
        "/KAC/actors/medieval/idiot.png",
        "/KAC/actors/medieval/knight.png",
        "/KAC/actors/medieval/knight.png",
        "/KAC/actors/medieval/marksman.png",
        "/KAC/actors/medieval/marksman.png",

        "/KAC/actors/medieval/female/elder.png",
        "/KAC/actors/medieval/female/farmer.png",
        "/KAC/actors/medieval/female/hunter.png",
        "/KAC/actors/medieval/female/crazy-cat-lady.png",
        "/KAC/actors/medieval/female/knight.png",
        "/KAC/actors/medieval/female/knight.png",
        "/KAC/actors/medieval/female/marksman.png",
        "/KAC/actors/medieval/female/marksman.png",

        "/KAC/actors/medieval/merchant.png",
        "/KAC/actors/medieval/militia.png",
        "/KAC/actors/medieval/militia.png",
        "/KAC/actors/medieval/pikeman.png",
        "/KAC/actors/medieval/priest.png",
        "/KAC/actors/medieval/rogue.png",
        "/KAC/actors/medieval/scholar.png",
        "/KAC/actors/medieval/shopkeeper.png",

        "/KAC/actors/medieval/female/merchant.png",
        "/KAC/actors/medieval/female/militia.png",
        "/KAC/actors/medieval/female/militia.png",
        "/KAC/actors/medieval/female/pikeman.png",
        "/KAC/actors/medieval/female/nun.png",
        "/KAC/actors/medieval/female/rogue.png",
        "/KAC/actors/medieval/female/scribe.png",
        "/KAC/actors/medieval/female/shopkeeper.png",
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
            <ToggleData data={items} initialCollapsed className="print:hidden mt-4" />
            <Print
                className="flex flex-col-reverse gap-2"
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
                        label="Blank Actor Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
