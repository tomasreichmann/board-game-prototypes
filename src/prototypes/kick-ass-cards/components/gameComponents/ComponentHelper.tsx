import { useState } from "react";
import Input from "../controls/Input";
import { assetMap } from "../../data/assets-en-deck";
import { actorMap } from "../../data/actors-deck";
import { counterMap } from "../../data/encounters/components";
import { effectMap } from "../../data/effects-deck-en";
import { stuntMap } from "../../data/stunts-en-deck";
import CounterCard from "./CounterCard";
import EffectCard from "./EffectCard";
import StuntCard from "./StuntCard";
import { tacticalModifierMap, tacticalRolesMap, TacticalRoleType } from "../../data/tactical-roles";
import { assetModifierMap } from "../../data/asset-modifiers-en-deck";
import LayeredActorCard from "./LayeredActorCard";
import { H3 } from "../content/Text";
import ToggleData from "@/components/DataToggle";
import LayeredAssetCard from "./LayeredAssetCard";
import DataPreview from "@/components/DataPreview";

const types = ["asset", "actor", "counter", "effect", "stunt"] as const;

export type ComponentHelperProps = {
    initialType?: (typeof types)[number];
    initialSearch?: string;
};

const typeMap = {
    asset: {
        data: assetMap,
        Component: LayeredAssetCard,
        getCode: (item: (typeof assetMap)[string], { modifier }: { modifier?: (typeof assetModifierMap)[string] }) =>
            `<LayeredAssetCard {...assetMap["${item.slug}"]} ${
                modifier ? `modifier={tacticalModifierMap["${modifier.slug}"]}` : ""
            } />`,
        secondaryData: {
            modifier: assetModifierMap,
        },
    },
    actor: {
        data: actorMap,
        Component: LayeredActorCard,
        getCode: (
            item: (typeof assetMap)[string],
            { role, modifier }: { role?: TacticalRoleType; modifier?: TacticalRoleType }
        ) =>
            `<LayeredActorCard {...actorMap["${item.slug}"]} ${role ? `role={tacticalRolesMap["${role.slug}"]}` : ""} ${
                modifier ? `modifier={tacticalModifierMap["${modifier.slug}"]}` : ""
            } />`,
        secondaryData: {
            role: tacticalRolesMap,
            modifier: tacticalModifierMap,
        },
    },
    counter: {
        data: counterMap,
        Component: CounterCard,
        getCode: (item: (typeof counterMap)[string]) => `<CounterCard {...counterMap["${item.slug}"]} />`,
    },
    effect: {
        data: effectMap,
        Component: EffectCard,
        getCode: (item: (typeof effectMap)[string]) => `<EffectCard {...effectMap["${item.slug}"]} />`,
    },
    stunt: {
        data: stuntMap,
        Component: StuntCard,
        getCode: (item: (typeof stuntMap)[string]) => `<StuntCard {...stuntMap["${item.slug}"]} />`,
    },
};

const ComponentHelper = ({ initialType = "asset", initialSearch = "", ...restProps }: ComponentHelperProps) => {
    const [search, setSearch] = useState(initialSearch);
    const [selectedType, setSelectedType] = useState(initialType);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSelectedType(e.target.value as (typeof types)[number]);

    const items = Object.values(typeMap[selectedType].data);
    const filteredItems = search
        ? items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        : items;
    const Item = typeMap[selectedType].Component;

    const data = {};
    return (
        <div {...restProps}>
            <Input type="text" value={search} onChange={handleSearchChange} />
            <div className="flex flex-row gap-4 flex-wrap">
                {types.map((type, index) => (
                    <Input
                        key={type + "-" + index}
                        label={type}
                        type={"radio"}
                        value={type}
                        checked={type === selectedType}
                        className="w-auto flex-row-reverse items-center"
                        inputClassName="w-6 h-6 mr-2"
                        onChange={handleTypeChange}
                    />
                ))}
            </div>
            <div className="flex flex-row flex-wrap gap-4 not-prose">
                {filteredItems.map((item, index) => (
                    <div key={item.name + "-" + index} className="flex flex-col items-center">
                        <H3>{item.slug}</H3>
                        <Item {...item} />
                        <pre className="text-xs text-slate-800 bg-slate-100 border-2 border-slate-500 rounded-md p-2 overflow-auto max-w-[calc(100vw-100px)] max-h-[calc(100vh-200px)] whitespace-pre-wrap">
                            {typeMap[selectedType].getCode(item, data)}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComponentHelper;
