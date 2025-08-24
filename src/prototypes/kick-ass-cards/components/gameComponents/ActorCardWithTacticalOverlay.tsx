import twm from "@/utils/twm";
import { HTMLAttributes } from "react";
import ActorCard, { ActorCardProps } from "./ActorCard";
import TacticalRoleOverlay, { TacticalRoleOverlayProps } from "./TacticalRoleOverlay";

export type ActorCardWithTacticalOverlayProps = {
    actorCardProps: ActorCardProps;
    tacticalRoleOverlayProps: TacticalRoleOverlayProps;
    tacticalSpecialOverlayProps?: TacticalRoleOverlayProps;
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function ActorCardWithTacticalOverlay({
    className,
    actorCardProps,
    tacticalRoleOverlayProps,
    tacticalSpecialOverlayProps,
    ...restProps
}: ActorCardWithTacticalOverlayProps) {
    return (
        <div className={twm("relative", className)}>
            <ActorCard {...actorCardProps} {...restProps} />
            <TacticalRoleOverlay
                {...tacticalRoleOverlayProps}
                {...restProps}
                className={twm("absolute top-0 left-0", tacticalRoleOverlayProps.className)}
            />
            {tacticalSpecialOverlayProps && (
                <TacticalRoleOverlay
                    {...tacticalSpecialOverlayProps}
                    {...restProps}
                    className={twm("absolute top-0 left-0", tacticalSpecialOverlayProps.className)}
                />
            )}
        </div>
    );
}
