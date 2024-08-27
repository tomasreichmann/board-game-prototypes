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
import { allSizes } from "../../../../components/print/paperSizes";
import Text, { H2 } from "../content/Text";

export type MedievalLocationsPrintControlsProps = {
    className?: string;
};

type ImageCardProps = {
    imageUri: string;
    name?: string;
    size?: PaperProps["size"];
} & Omit<PaperProps, "size">;

const ImageCard = ({ imageUri, name, ...restProps }: ImageCardProps) => {
    const size = restProps.size || "54x86";
    const sizeInMm = allSizes[size].mm;
    const defBleedMm = restProps.bleedMm || 0;
    const {
        bleedTopMm = defBleedMm,
        bleedRightMm = defBleedMm,
        bleedBottomMm = defBleedMm,
        bleedLeftMm = defBleedMm,
    } = restProps;
    const orientation = restProps.orientation || "portrait";
    const [width, height] = orientation === "landscape" ? [...sizeInMm].reverse() : sizeInMm;

    const bleedWidth = width + bleedLeftMm + bleedRightMm;
    const bleedHeight = height + bleedTopMm + bleedBottomMm;
    console.log({ width, height, bleedWidth, bleedHeight });
    return (
        <Card className="justify-start overflow-hidden" childrenWrapperClassName="p-0" {...restProps}>
            <div
                className="z-10 p-3 mb-auto absolute left-0 top-0 right-0"
                style={{
                    marginTop: -bleedTopMm + "mm",
                    marginLeft: -bleedLeftMm + "mm",
                    marginRight: -bleedRightMm + "mm",
                }}
            >
                <div
                    style={{
                        marginTop: bleedTopMm + "mm",
                        marginLeft: bleedLeftMm + "mm",
                        marginRight: bleedRightMm + "mm",
                    }}
                >
                    <CardHeader
                        deckClassName="text-kac-bone-light"
                        cornerIcon="/KAC/map.png"
                        deck="medieval"
                        className="items-start"
                        cornerIconClassName="-mt-[1px]"
                    >
                        <Text
                            variant="h6"
                            color="body"
                            className="text-kac-bone-light text-xs leading-none order-first tracking-wide mt-[1px]"
                        >
                            {name}
                        </Text>
                    </CardHeader>
                </div>
            </div>
            <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                {imageUri && (
                    <IconOrImage
                        icon={imageUri}
                        className={"rotate-90 max-w-none"}
                        style={{ width: bleedHeight + "mm", height: bleedWidth + "mm" }}
                    />
                )}
                {imageUri && (
                    <IconOrImage
                        icon={imageUri}
                        className={"absolute left-0 top-0 rotate-90 max-w-none blur-[2px] brightness-[70%]"}
                        style={{
                            width: bleedHeight + "mm",
                            height: bleedWidth + "mm",
                            maskImage: "linear-gradient(90deg, rgba(0, 0, 0, 1) 12%, rgba(0, 0, 0, 0) 18%)",
                        }}
                    />
                )}
            </div>
        </Card>
    );
};

export const LocationCardBackFace = ({ imageUri, name, ...restProps }: Partial<ImageCardProps>) => {
    return (
        <Card {...restProps} backgroundImageUri="/KAC/location-back-face.png">
            <div className="absolute top-[60%] left-4 right-4 flex flex-col justify-center items-center flex-1 p-3">
                <H2 className="text-kac-gold-light text-2xl text-center relative z-1 drop-shadow-md-heavy">Location</H2>
            </div>
        </Card>
    );
};

export default function MedievalLocationsPrintControls({ className }: MedievalLocationsPrintControlsProps) {
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
    const locations = [
        { name: "Dungeon", imageUri: "/KAC/locations/medieval/dungeon.jpg" },
        { name: "Forrest", imageUri: "/KAC/locations/medieval/forrest.jpg" },
        { name: "Garden", imageUri: "/KAC/locations/medieval/garden.jpg" },
        { name: "Graveyard", imageUri: "/KAC/locations/medieval/graveyard.jpg" },
        { name: "Harbor", imageUri: "/KAC/locations/medieval/harbor.jpg" },
        { name: "Lake", imageUri: "/KAC/locations/medieval/lake.jpg" },
        { name: "Market", imageUri: "/KAC/locations/medieval/market.jpg" },
        { name: "Mine Shaft", imageUri: "/KAC/locations/medieval/mine_shaft.jpg" },
        { name: "Pantry", imageUri: "/KAC/locations/medieval/pantry.jpg" },
        { name: "Pasture", imageUri: "/KAC/locations/medieval/pasture.jpg" },
        { name: "Quarry", imageUri: "/KAC/locations/medieval/quarry.jpg" },
        { name: "Road", imageUri: "/KAC/locations/medieval/road.jpg" },
        { name: "Servants Room", imageUri: "/KAC/locations/medieval/servants_quarters.jpg" },
        { name: "Sewer", imageUri: "/KAC/locations/medieval/sewer.jpg" },
        { name: "Swamp", imageUri: "/KAC/locations/medieval/swamp.jpg" },
        { name: "Tavern", imageUri: "/KAC/locations/medieval/tavern.jpg" },
        // { name: "Town Hall", imageUri: "/KAC/locations/medieval/town_hall.jpg" },
        { name: "Town Square", imageUri: "/KAC/locations/medieval/town_square.jpg" },
        { name: "Townhouse Bath Room", imageUri: "/KAC/locations/medieval/townhouse_bath_room.jpg" },
        { name: "Townhouse Bedchamber", imageUri: "/KAC/locations/medieval/townhouse_bedchamber.jpg" },
        { name: "Townhouse Corridor", imageUri: "/KAC/locations/medieval/townhouse_corridor.jpg" },
        { name: "Townhouse Dining Room", imageUri: "/KAC/locations/medieval/townhouse_dining_room.jpg" },
        { name: "Townhouse Nursery", imageUri: "/KAC/locations/medieval/townhouse_nursery.jpg" },
        { name: "Townhouse Study", imageUri: "/KAC/locations/medieval/townhouse_study.jpg" },
        { name: "Village", imageUri: "/KAC/locations/medieval/village.jpg" },
        { name: "Vine Cellar", imageUri: "/KAC/locations/medieval/vine_cellar.jpg" },
        { name: "Warehouse", imageUri: "/KAC/locations/medieval/warehouse.jpg" },
        { name: "Weapons Shop", imageUri: "/KAC/locations/medieval/weapons_shop.jpg" },
        { name: "Workshop", imageUri: "/KAC/locations/medieval/workshop.jpg" },
        { name: "Armory", imageUri: "/KAC/locations/medieval/armory.jpg" },
        { name: "Bakery", imageUri: "/KAC/locations/medieval/bakery.jpg" },
        { name: "Barracks", imageUri: "/KAC/locations/medieval/barracks.jpg" },
        { name: "Bathhouse", imageUri: "/KAC/locations/medieval/bathhouse.jpg" },
        { name: "Butchery", imageUri: "/KAC/locations/medieval/butchery.jpg" },
        { name: "Camp", imageUri: "/KAC/locations/medieval/camp.jpg" },
        { name: "Castle Bastion", imageUri: "/KAC/locations/medieval/castle_bastion.jpg" },
        { name: "Castle Bailey", imageUri: "/KAC/locations/medieval/castle_bailey.jpg" },
        { name: "Castle Corridor", imageUri: "/KAC/locations/medieval/castle_corridor.jpg" },
        { name: "Castle Dining Room", imageUri: "/KAC/locations/medieval/castle_dining_room.jpg" },
        { name: "Castle Gate", imageUri: "/KAC/locations/medieval/castle_gate.jpg" },
        { name: "Cave", imageUri: "/KAC/locations/medieval/cave.jpg" },
        { name: "Church", imageUri: "/KAC/locations/medieval/church.jpg" },
        { name: "Clearing", imageUri: "/KAC/locations/medieval/clearing.jpg" },
        { name: "Mountain Trail", imageUri: "/KAC/locations/medieval/mountain_trail.jpg" },
        { name: "Prison Cell", imageUri: "/KAC/locations/medieval/prison_cell.jpg" },
        { name: "Dark Alley", imageUri: "/KAC/locations/medieval/dark_alley.jpg" },
        { name: "Library", imageUri: "/KAC/locations/medieval/library.jpg" },
        { name: "Apothecary", imageUri: "/KAC/locations/medieval/apothecary.jpg" },
        { name: "Winery", imageUri: "/KAC/locations/medieval/winery.jpg" },
    ];
    const items = useItemAdapter(
        locations.map(({ name, imageUri }, imageIndex) => ({
            slug: String(imageIndex),
            forPrint: true,
            className: "relative",
            imageUri,
            name,
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
                documentTitle="Medieval Locations"
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
                        BackFaceComponent={LocationCardBackFace}
                        items={items}
                        {...mergedChunkedPagesProps}
                        label="Blank Actor Cards"
                    />
                </div>
            </Print>
        </div>
    );
}
