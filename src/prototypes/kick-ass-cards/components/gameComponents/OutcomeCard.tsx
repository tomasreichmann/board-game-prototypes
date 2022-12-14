import React from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import { OutcomeType } from "../../types";
import Icon, { IconType } from "../Icon";
import RichText from "../RichText";
// import "./OutcomeCard.css";

export type OutcomeCardProps = React.PropsWithChildren<{ className?: string } & OutcomeType>;

const effectSizeClassNameMap: { [key in IconType]?: string } = {
    //SPECIAL: "h-24",
};

const outcomeColorClassNameMap: { [key: string]: string } = {
    mightyForce: "text-kac-fire",
    bullseye: "text-kac-monster",
    dodge: "text-kac-monster-light",
    knockout: "text-kac-steel-dark",
    thrustBend: "text-kac-cloth",
    drop: "text-kac-blood",
    stickyBoot: "text-kac-curse-light",
    sunbeams: "text-kac-gold",
    sprint: "text-kac-gold-dark",
    warlockEye: "text-kac-curse",
};

export default function OutcomeCard({ className, slug, title, icon, description, children }: OutcomeCardProps) {
    return (
        <Paper size="Mini US game" className={clsx("OutcomeCard bg-white p-5 flex flex-col gap-2", className)}>
            <div>
                <div className="text-slate-400 text-center text-xs">{slug}</div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end gap-1">
                <Icon
                    icon={icon}
                    className={clsx(
                        "max-h-fit",
                        outcomeColorClassNameMap[icon] || "text-iron-light",
                        effectSizeClassNameMap[icon] || "h-16"
                    )}
                />
                <div className="font-kacHeading text-kac-cloth text-sm text-center">{title}</div>
            </div>
            <div className="flex-1 text-xs text-center max-h-12 text-kac-iron-light">
                <RichText commonComponentProps={{ className: "h-5 inline-block -my-1" }}>{description}</RichText>
            </div>
            {children}
        </Paper>
    );
}
