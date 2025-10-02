import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import tacticalRoles, { TacticalRoleType, tacticalSpecials } from "../../data/tactical-roles";
import multiplyByCount, { defaultCountAdapter } from "@/utils/multiplyByCount";
import LayeredActorCard, { LayeredActorCardProps } from "../gameComponents/LayeredActorCard";
import { LayeredCardBackFaceProps } from "../gameComponents/LayeredCard";

export type BaseTacticalRolesPrintControlsProps = {
    className?: string;
};

const sampleLayeredBackFaceProps: LayeredCardBackFaceProps = {
    iconUri: "/mighty-decks/types/actor.png",
    backgroundImageUri: "/mighty-decks/background/card-backface.png",
    label: "Asset",
    labelClassName: "text-kac-gold-light",
} as const;

const adaptActorModifier = (tacticalRole: TacticalRoleType): LayeredActorCardProps => ({
    size: "54x86",
    bleedMm: 3,
    className: "relative",
    ...tacticalRole,
    backFaceProps: sampleLayeredBackFaceProps,
    // backgroundImageUri: null,
});

export default function BaseTacticalRolesPrintControls({ className }: BaseTacticalRolesPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();

    const items = useItemAdapter(
        multiplyByCount([...tacticalRoles, ...tacticalSpecials], "count", defaultCountAdapter)
    ).map(adaptActorModifier);
    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <ToggleData
                data={items}
                buttonContent={"Items data (" + items.length + ")"}
                initialCollapsed
                className="print:hidden mt-4"
            />
            <Print
                className="flex flex-col-reverse gap-2"
                documentTitle="Base Tactical Roles"
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
                        Component={LayeredActorCard}
                        items={items}
                        {...chunkedPagesProps}
                        label="Base Tactical Roles"
                    />
                </div>
            </Print>
        </div>
    );
}
