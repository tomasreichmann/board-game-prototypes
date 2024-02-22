import React from "react";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { OutcomeType } from "../../types";
import Icon, { IconType } from "../Icon";
import RichText from "../RichText";
import { twMerge } from "tailwind-merge";

export type OutcomeCardProps = React.PropsWithChildren<OutcomeType & Partial<PaperProps>>;

const effectSizeClassNameMap: { [key in IconType]?: string } = {
    //SPECIAL: "h-24",
};

const outcomeColorClassNameMap: { [key: string]: string } = {
    mightyForce: "text-kac-fire",
    bullseye: "text-kac-monster",
    dodge: "text-kac-monster-light",
    knockout: "text-kac-steel-dark",
    thrustBend: "text-kac-cloth",
    whirlwind: "text-kac-curse",
    drop: "text-kac-blood",
    stickyBoot: "text-kac-curse-light",
    sunbeams: "text-kac-gold",
    sprint: "text-kac-gold-dark",
    warlockEye: "text-kac-curse",
};

export default function OutcomeCard({
    className,
    size = "Mini European",
    slug,
    title,
    icon,
    description,
    children,
    bleedMm = 0,
    ...restProps
}: OutcomeCardProps) {
    const colorClassName = outcomeColorClassNameMap[icon];
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "OutcomeCard bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="relative flex flex-col justify-center items-stretch flex-1 p-3"
                style={{ margin: `${bleedMm}mm` }}
            >
                <div className="flex flex-row items-center gap-1">
                    <Icon icon={icon} className={twMerge("h-5", colorClassName || "text-kac-iron-light")} />
                    <div className="flex-1 text-slate-400 text-center text-xs">{slug}</div>
                    <Icon icon="cardRandom" className={"text-kac-steel h-5"} />
                </div>

                <div className="flex-1 flex flex-col items-center justify-end h-0">
                    <Icon
                        icon={icon}
                        className={twMerge(
                            "max-h-fit mb-2",
                            colorClassName || "text-kac-iron-light",
                            effectSizeClassNameMap[icon] || "h-16"
                        )}
                    />
                    <div
                        className={twMerge(
                            "font-kacHeading text-kac-cloth text-sm leading-none text-center mb-1",
                            colorClassName
                        )}
                    >
                        {title}
                    </div>
                </div>
                <div className="text-xs text-center min-h-[6em] text-kac-iron-light leading-tight text-balance">
                    <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{description}</RichText>
                </div>
                {children}
            </div>
        </PaperOrDiv>
    );
}

export const OutcomeCardBackFace = ({
    className,
    size = "Mini European",
    children,
    ...restProps
}: Partial<PaperProps>) => {
    return (
        <PaperOrDiv
            size={size}
            className={twMerge(
                "OutcomeCardBackFace gap-2 rounded-lg print:rounded-none bg-kac-steel-dark flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div className="m-[3mm] relative flex flex-col justify-center items-center flex-1 p-3">
                <div className="w-32 h-32 flex flex-col justify-center items-center relative">
                    <div
                        className={
                            "text-kac-steel-light w-8/12 aspect-square rounded-full border-[0.2mm] border-kac-steel absolute bg-kac-iron"
                        }
                    />
                    <Icon icon="d20" className={"text-kac-steel h-10 relative z-1 mt-2"} />
                    <div className="font-kacBody text-kac-steel text-xs text-center relative z-1">Outcome</div>
                </div>
                {children}
            </div>
        </PaperOrDiv>
    );
};
