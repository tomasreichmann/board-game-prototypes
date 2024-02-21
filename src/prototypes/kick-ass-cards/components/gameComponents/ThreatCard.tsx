import React from "react";
import Paper, { PaperProps } from "../../../../components/print/Paper/Paper";
import { ThreatType } from "../../types";
import Icon from "../Icon";
import RichText from "../RichText";
import { twMerge } from "tailwind-merge";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";

export type ThreatCardProps = React.PropsWithChildren<ThreatType & Partial<PaperProps>>;

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

export default function ThreatCard({
    className,
    slug,
    title,
    icon,
    description,
    children,
    bleedMm = 0,
    ...restProps
}: ThreatCardProps) {
    return (
        <Paper
            size="Mini European"
            bleedMm={bleedMm}
            className={twMerge("ThreatCard bg-white flex flex-col justify-stretch items-stretch rounded-lg", className)}
            {...restProps}
        >
            <div
                className="relative flex flex-col justify-stretch items-stretch flex-1 p-3"
                style={{ margin: `${bleedMm}mm` }}
            >
                <div className="flex flex-row items-center gap-1">
                    <Icon icon="fangs" className={"text-kac-fire-dark h-5"} />
                    <div className="flex-1 text-slate-400 text-center text-xs pr-6">{slug}</div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-end h-0">
                    <IconOrImage
                        icon={icon}
                        className={twMerge("max-h-fit h-16 text-kac-iron-light mb-4", colorClassNameMap[icon])}
                    />
                    <div
                        className={twMerge(
                            "font-kacHeading text-kac-cloth text-sm text-center leading-none mb-2",
                            colorClassNameMap[icon]
                        )}
                    >
                        {title}
                    </div>
                </div>
                <div className="text-xs text-center min-h-8 text-kac-iron-light leading-tight text-balance">
                    <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{description}</RichText>
                </div>
                {children}
            </div>
        </Paper>
    );
}

export const ThreatCardBackFace = ({ className, children, ...restProps }: Partial<PaperProps>) => {
    return (
        <Paper
            size="Mini European"
            className={twMerge(
                "ThreatCardBackFace rounded-lg bg-kac-blood-dark -m-[3mm] flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div className="m-[3mm] relative flex flex-col justify-center items-center flex-1 p-3">
                <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                    <Icon icon="splash" className={"text-kac-blood-light w-full absolute"} />
                    <Icon icon="fangs" className={"text-kac-steel-light h-10 relative z-1 mt-2"} />
                    <div className="font-kacBody text-kac-steel-light text-xs text-center relative z-1">Threat</div>
                </div>
                {children}
            </div>
        </Paper>
    );
};
