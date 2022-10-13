import React from "react";
import clsx from "clsx";
import Paper from "../../../../components/print/Paper/Paper";
import { OutcomeType } from "../../types";
import Icon, { IconType } from "../Icon/Icon";
import RichText from "../RichText";
// import "./OutcomeCard.css";

export type OutcomeCardProps = React.PropsWithChildren<{ className?: string } & OutcomeType>;

const effectSizeClassNameMap: { [key in IconType]?: string } = {
    SPECIAL: "h-24",
};

const outcomeColorClassNameMap: { [key: string]: string } = {
    special: "text-fire-1",
    success: "text-acid-1",
    partialSuccess: "text-acid-2",
    fumble: "text-blood-3",
    chaos: "text-lightning-1",
    wound: "text-blood-1",
    complication: "text-curse-3",
    bless: "text-fire-3",
    advantage: "text-lightning-3",
    curse: "text-curse-1",
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
                        outcomeColorClassNameMap[slug] || "text-slate-600",
                        effectSizeClassNameMap[icon] || "h-16"
                    )}
                />
                <div className="font-dtHeading text-blood-1 text-md text-center">{title}</div>
            </div>
            <div className="flex-1 text-xs text-center max-h-12">
                <RichText iconProps={{ className: "h-5 inline-block -my-1" }}>{description}</RichText>
            </div>
            {children}
        </Paper>
    );
}
