import React from "react";
import Paper from "../../../../components/print/Paper/Paper";
import { ThreatType } from "../../types";
import Icon from "../Icon";
import RichText from "../RichText";
import { twMerge } from "tailwind-merge";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";

export type ThreatCardProps = React.PropsWithChildren<{ className?: string } & ThreatType>;

const colorClassNameMap: { [key: string]: string } = {
    punchBlast: "text-kac-fire-light",
    plainDagger: "text-kac-blood",
    crossMark: "text-kac-fire",
    batteredAxe: "text-kac-fire",
    checkedShield: "text-kac-cloth",
    run: "text-kac-bone-dark",
    mightyForce: "text-kac-curse",
    crownedSkull: "text-kac-gold-dark",
    gooeyImpact: "text-kac-curse-dark",
    doubleFaceMask: "text-kac-cloth-dark",
    stickyBoot: "text-kac-monster-dark",
    magicPalm: "text-kac-gold-dark",
};

export default function ThreatCard({ className, slug, title, icon, description, children }: ThreatCardProps) {
    return (
        <Paper
            size="Mini US game"
            className={twMerge("ThreatCard bg-white p-5 flex flex-col gap-2 rounded-lg", className)}
        >
            <div className="flex flex-row items-center gap-1">
                <Icon icon="fangs" className={"text-kac-fire-dark h-5"} />
                <div className="flex-1 text-slate-400 text-center text-xs pr-6">{slug}</div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end gap-1 h-0">
                <IconOrImage
                    icon={icon}
                    className={twMerge("max-h-fit h-16 text-kac-iron-light", colorClassNameMap[icon])}
                />
                <div className={twMerge("font-kacHeading text-kac-cloth text-sm text-center", colorClassNameMap[icon])}>
                    {title}
                </div>
            </div>
            <div className="text-xs text-center min-h-8 text-kac-iron-light">
                <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{description}</RichText>
            </div>
            {children}
        </Paper>
    );
}

export const ThreatCardBackFace = ({ className, children }: Pick<ThreatCardProps, "children" | "className">) => {
    return (
        <Paper
            size="Mini US game"
            className={twMerge(
                "ThreatCardBackFace bg-white p-3 flex flex-col justify-center items-center gap-2 rounded-lg",
                className
            )}
        >
            <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                <Icon icon="splash" className={"text-kac-blood w-full absolute"} />
                <Icon icon="fangs" className={"text-white h-10 relative z-1 mt-2"} />
                <div className="font-kacHeading text-white text-sm uppercase text-center relative z-1">Threat</div>
            </div>
            {children}
        </Paper>
    );
};
