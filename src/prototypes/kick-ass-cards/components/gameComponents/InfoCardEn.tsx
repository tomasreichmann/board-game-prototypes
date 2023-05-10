import React from "react";
import Icon from "../Icon";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";

export type InfoCardProps = React.PropsWithChildren<{
    className?: string;
    size?: PaperProps["size"];
    forPrint?: boolean;
}>;

export default function InfoCard({
    className,
    forPrint,
    size = forPrint ? "Square" : undefined,
    children,
}: InfoCardProps) {
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "InfoCard relative bg-white p-5 flex flex-column gap-5 text-kac-steel-dark rounded-lg",
                className
            )}
        >
            <div className="flex-1 flex flex-col gap-[2px] text-sm items-stretch">
                <div className="flex flex-row gap-2 items-center mb-1">
                    <Icon icon="blackBook" className={"text-kac-cloth-dark h-5"} />
                    <h2 className="font-kacHeading text-kac-cloth-dark">Player Help</h2>
                </div>
                <div>
                    <span className="font-bold text-kac-iron">Player turn:</span> 1x movement by 1 zone and 1x action or
                    extra movement. Followed by characters and threats on the table in front of the player.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        2x
                        <Icon icon="drop" className={"text-kac-blood h-5 inline-block"} /> Injury:
                    </span>{" "}
                    You are <span className="font-bold text-kac-cloth-dark">Dazed</span>. Your{" "}
                    <span className="font-bold text-kac-monster-dark">Success</span> counts as a{" "}
                    <span className="font-bold text-kac-monster-dark">Partial Success</span>.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        4x
                        <Icon icon="drop" className={"text-kac-blood h-5 inline-block"} /> Injury:
                    </span>{" "}
                    You are <span className="font-bold text-kac-iron-dark">Unconscious</span>. You cannot perform
                    actions until someone resurrects you.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        3x
                        <Icon icon="tearTracks" className={"text-kac-cloth h-5 inline-block"} /> Distress:
                    </span>{" "}
                    You are seized by <span className="font-bold text-kac-curse">Panic</span>. Instead of playing from
                    your hand, blindly play the top card of the Outcome deck.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        4x
                        <Icon icon="tearTracks" className={"text-kac-cloth h-5 inline-block"} /> Distress:
                    </span>{" "}
                    You are <span className="font-bold text-kac-iron-dark">Hopeless</span>. Instead of an action, you
                    can only flee to safety or give up.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        2x
                        <Icon icon="thermometerHot" className={"text-kac-fire h-5 inline-block"} /> Heat:
                    </span>{" "}
                    At the end of your turn, you gain <span className="font-bold text-kac-blood">Injury</span>.
                </div>
                <div>
                    <span className="font-bold text-kac-iron">
                        2x
                        <Icon icon="thermometerHot" className={"text-kac-cloth h-5 inline-block"} /> Frost: At the end
                        of your turn, you gain <span className="font-bold text-iron-dark">Distress</span>.
                    </span>
                </div>
            </div>

            {children}
        </PaperOrDiv>
    );
}
