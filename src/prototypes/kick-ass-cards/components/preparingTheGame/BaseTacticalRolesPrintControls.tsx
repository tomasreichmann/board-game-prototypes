import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import tacticalRoles, { tacticalSpecials } from "../../data/tactical-roles";
import TacticalRoleOverlay, { TacticalRoleOverlayProps } from "../gameComponents/TacticalRoleOverlay";
import ActorCard, { ActorCardProps } from "../gameComponents/ActorCard";
import twm from "@/utils/twm";
import { HTMLAttributes } from "react";
import multiplyByCount, { defaultCountAdapter } from "@/utils/multiplyByCount";

export type BaseTacticalRolesPrintControlsProps = {
    className?: string;
};

export default function BaseTacticalRolesPrintControls({ className }: BaseTacticalRolesPrintControlsProps) {
    const chunkedPagesProps = useChunkedPagesProps();
    /* const actorImageUris = [
        "/mighty-decks/actors/base/animal.png",
        "/mighty-decks/actors/base/aristocrat.png",
        "/mighty-decks/actors/base/artillery.png",
        "/mighty-decks/actors/base/assassin.png",
        "/mighty-decks/actors/base/beast.png",
        "/mighty-decks/actors/base/bruiser.png",
        "/mighty-decks/actors/base/civilian.png",
        "/mighty-decks/actors/base/commander.png",
        "/mighty-decks/actors/base/construct.png",
        "/mighty-decks/actors/base/guard.png",
        "/mighty-decks/actors/base/healer.png",
        "/mighty-decks/actors/base/horror.png",
        "/mighty-decks/actors/base/manipulator.png",
        "/mighty-decks/actors/base/marksman.png",
        "/mighty-decks/actors/base/merchant.png",
        "/mighty-decks/actors/base/minion.png",
        "/mighty-decks/actors/base/sentry.png",
        "/mighty-decks/actors/base/specialist.png",
        "/mighty-decks/actors/base/swarm.png",
        "/mighty-decks/actors/base/zealot.png",
    ];
    const items = useItemAdapter(
        tacticalRoles.map((role, roleIndex) => ({
            actorCardProps: {
                forPrint: true,
                size: "54x86",
                imageUri: actorImageUris[roleIndex],
                deck: "universal",
                name: null,
                occupation: null,
                reward: null,
                threat: null,
                notes: null,
            } as ActorCardProps,
            tacticalRoleOverlayProps: {
                ...role,
                size: "54x86",
                forPrint: true,
            } as TacticalRoleOverlayProps,
            tacticalSpecialOverlayProps: {
                ...tacticalSpecials[roleIndex],
                size: "54x86",
                forPrint: true,
            } as TacticalRoleOverlayProps,
        }))
    ); */
    const items = useItemAdapter(
        multiplyByCount([...tacticalRoles, ...tacticalSpecials], "count", (role) => ({
            ...role,
            size: "54x86",
            forPrint: true,
        }))
    );
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
                        Component={TacticalRoleOverlay}
                        items={items}
                        {...chunkedPagesProps}
                        label="Base Tactical Roles"
                    />
                </div>
            </Print>
        </div>
    );
}
