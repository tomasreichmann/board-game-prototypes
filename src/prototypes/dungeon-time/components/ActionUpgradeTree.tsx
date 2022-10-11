import { mapValues } from "lodash";
import { useActions } from "../hooks/useActions";
import { ActionType } from "../types";
import effectColorClassNameMap from "../utils/effectColorClassNameMap";
import RichText from "./RichText";

const effectAliasProps = mapValues(effectColorClassNameMap, (value) => ({ className: value + " h-6" }));

const ActionTreeNode = ({ effects, upgradeOptions, isRoot }: ActionType & { isRoot?: boolean }) => {
    return (
        <div className="relative mb-1">
            {!isRoot && <div className="border-t-2 border-dotted border-slate-500 absolute -left-3 top-4 w-3"></div>}
            <div className="text-bold text-lightning-2 flex flex-row border-2 px-1 border-slate-300 rounded-full w-min bg-white">
                <RichText aliasProps={effectAliasProps}>{effects.join(" ")}</RichText>
            </div>
            {upgradeOptions && upgradeOptions.length > 0 && (
                <div className="flex flex-col pl-6 gap-1 mt-1">
                    {upgradeOptions?.map((upgradeOption) => (
                        <ActionTreeNode key={upgradeOption.slug} {...upgradeOption} />
                    ))}
                </div>
            )}

            <div className="border-l-2 border-dotted border-slate-500 absolute left-3 top-7 bottom-4"></div>
        </div>
    );
};

export default function ActionUpgradeTree() {
    const { data: actions } = useActions(true);
    const upgradeOptionSet = actions?.reduce((options, action) => {
        action.upgradeOptionSlugs.forEach((slug) => options.add(slug));
        return options;
    }, new Set<string>());
    const basicActions = actions?.filter(
        (action) => !upgradeOptionSet?.has(action.slug) && action.upgradeOptionSlugs.length > 0
    );

    return (
        <div className="mb-5 text-lg flex flex-row flex-wrap gap-x-5 gap-y-5 justify-start items-start">
            {basicActions?.map((action) => (
                <ActionTreeNode key={action.slug} {...action} isRoot />
            ))}
        </div>
    );
}
