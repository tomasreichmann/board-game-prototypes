import React from "react";
import Paper, { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import RichText from "../RichText";
import { twMerge } from "tailwind-merge";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import { allSizes } from "../../../../components/print/paperSizes";
import Card from "./Card";
import Text, { H2 } from "../content/Text";

export enum QualityEnum {
    "None" = "None",
    "Poor" = "Poor",
    "Good" = "Good",
    "Excellent" = "Excellent",
}

export type RoomProps = {
    name?: string;
    quality?: QualityEnum;
    effectContent?: React.ReactNode;
    otherContent?: React.ReactNode;
};

export const Room = ({ name, quality, effectContent, otherContent }: RoomProps) => {
    return (
        <div className="flex-1 flex flex-col items-stretch">
            <div className="flex flex-row items-stretch gap-1">
                <IconOrImage className="h-8" icon="/KAC/icons/door.png" />

                <div className="flex-1 border-b-2 border-b-kac-steel-dark">
                    <H2>{name}</H2>
                </div>
            </div>
            <div className="flex flex-row items-stretch mt-1">
                <IconOrImage className="h-10 -mx-1" icon="/KAC/icons/star-outline.png" />
                <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center">
                        <IconOrImage className="h-5" icon="/KAC/icons/build.png" />
                        <Text className="text-xs">10</Text>
                    </div>
                    <div className="flex flex-row items-center">
                        <IconOrImage className="h-5" icon="/KAC/icons/income.png" />
                        <Text className="text-xs">+1</Text>
                    </div>
                </div>
                <IconOrImage className="h-10 -mx-1" icon="/KAC/icons/star-outline.png" />
                <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center">
                        <IconOrImage className="h-5" icon="/KAC/icons/build.png" />
                        <Text className="text-xs">100</Text>
                    </div>
                    <div className="flex flex-row items-center">
                        <IconOrImage className="h-5" icon="/KAC/icons/income.png" />
                        <Text className="text-xs">+10</Text>
                    </div>
                </div>
                <IconOrImage className="h-10 -mx-1" icon="/KAC/icons/star-outline.png" />
                <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center">
                        <IconOrImage className="h-5" icon="/KAC/icons/build.png" />
                        <Text className="text-xs">1000</Text>
                    </div>
                    <div className="flex flex-row items-center">
                        <IconOrImage className="h-5" icon="/KAC/icons/income.png" />
                        <Text className="text-xs">+100</Text>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-stretch relative mt-4">
                {effectContent}
                <Paper size="54x86" className="mx-auto border-2 border-kac-cloth-dark/50 bg-white/50 rounded-lg">
                    <IconOrImage
                        className="mt-2 h-10 mx-auto saturate-0 opacity-50"
                        icon="/KAC/heartbeat.png"
                        style={{ filter: "saturate(0) drop-shadow(0 0 4px white)" }}
                    />
                </Paper>
            </div>
            <div className="flex-1 flex flex-col items-stretch mt-4 ">
                {otherContent}
                <div className="w-[54mm] h-full mx-auto border-2 border-kac-cloth-dark/50 border-b-0 bg-white/50 rounded-t-lg flex flex-row justify-center gap-2 pt-2 backdrop-blur-[1px]">
                    <IconOrImage
                        className="mt-2 h-10 saturate-0 opacity-50"
                        icon="/KAC/icons/person.png"
                        style={{ filter: "saturate(0) drop-shadow(0 0 4px white)" }}
                    />
                    <IconOrImage
                        className="mt-2 h-10 saturate-0 opacity-50"
                        icon="/KAC/icons/barrel.png"
                        style={{ filter: "saturate(0) drop-shadow(0 0 4px white)" }}
                    />
                </div>
            </div>
        </div>
    );
};

export type BaseSheetProps = React.PropsWithChildren<
    {
        className?: string;
        size?: PaperProps["size"];
        backgroundUri?: string;
        name?: string;
        owner?: string;
        location?: string;
        forPrint?: boolean;
        rooms?: RoomProps[];
    } & Partial<PaperProps>
>;

const emptyRooms = [{ quality: QualityEnum.None }, { quality: QualityEnum.None }, { quality: QualityEnum.None }];

export default function BaseSheet({
    className,
    backgroundUri = "/KAC/base/house.png",
    name,
    owner,
    location,
    forPrint = false,
    rooms = emptyRooms,
    children,
    size = "A5",
    ...restProps
}: BaseSheetProps) {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;
    return (
        <PaperOrDiv
            size={size}
            orientation="landscape"
            bleedMm={bleedMm}
            className={twMerge(
                "BaseSheet bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch font-kacBody",
                className
            )}
            {...restProps}
        >
            <div
                className="absolute left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-stretch"
                style={{
                    margin: `-${bleedTopMm}mm -${bleedRightMm}mm -${bleedBottomMm}mm -${bleedLeftMm}mm`,
                    padding: `${bleedTopMm}mm ${bleedRightMm}mm ${bleedBottomMm}mm ${bleedLeftMm}mm`,
                }}
            >
                <div
                    style={{ background: "url('/KAC/base/a5-paper.png') center center / cover" }}
                    className="absolute left-0 top-0 w-full h-full max-w-none opacity-50"
                />
                <div
                    style={{
                        background: `url('${backgroundUri}') center center / cover`,
                        maskImage: "linear-gradient(to bottom, #ffffff20 20%, #ffffffff 40%)",
                    }}
                    className="absolute left-0 top-0 w-full h-full max-w-none mix-blend-multiply"
                />
            </div>
            <div
                className="flex-1 relative flex flex-col items-stretch z-10 pt-4 px-10"
                style={{ marginBottom: -bleedBottomMm + "mm" }}
            >
                <div className="relative flex flex-row items-stretch gap-2">
                    <div className="flex-1 flex flex-row gap-1">
                        <IconOrImage className="h-8" icon="/KAC/icons/house.png" />
                        <div className="flex-1 border-b-2 border-b-kac-steel-dark" />
                    </div>
                    <div className="flex-1 flex flex-row gap-1">
                        <IconOrImage className="h-8" icon="/KAC/icons/owner.png" />
                        <div className="flex-1 border-b-2 border-b-kac-steel-dark" />
                    </div>
                    <div className="flex-1 flex flex-row gap-1">
                        <IconOrImage className="h-8" icon="/KAC/icons/location.png" />
                        <div className="flex-1 border-b-2 border-b-kac-steel-dark" />
                    </div>
                </div>
                <div className="flex-1 relative flex flex-row items-stretch gap-2">
                    {rooms.map((room, index) => (
                        <Room key={index} {...room} />
                    ))}
                </div>

                {children}
            </div>
        </PaperOrDiv>
    );
}
