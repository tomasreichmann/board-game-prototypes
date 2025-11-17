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
import {
    tacticalModifierMap as actorModifierMap,
    tacticalRoleMap as actorRoleMap,
    TacticalRoleType,
} from "../../data/tactical-roles";
import { assetModifierMap } from "../../data/asset-modifiers-en-deck";
import LayeredActorCard from "./LayeredActorCard";
import { H3 } from "../content/Text";
import LayeredAssetCard from "./LayeredAssetCard";

type TypeType = (typeof types)[number];

export type ComponentHelperProps = {
    initialType?: TypeType;
    initialSearch?: string;
};

const typeMap = {
    asset: {
        data: assetMap,
        Component: LayeredAssetCard,
        getProps: (item: (typeof assetMap)[string]) => ({ ...item }),
        getCode: (item: (typeof assetMap)[string], { modifier }: { modifier?: (typeof assetModifierMap)[string] }) =>
            `<LayeredAssetCard
    {...assetMap["${item.slug}"]}${
                modifier
                    ? `
    modifier={tacticalModifierMap["${modifier.slug}"]}`
                    : ""
            } />`,
        secondaryData: {
            modifier: assetModifierMap,
        },
    },
    assetModifier: {
        data: assetModifierMap,
        Component: LayeredAssetCard,
        getProps: (item: (typeof assetModifierMap)[string]) => ({ modifier: item }),
        getCode: (item: (typeof assetModifierMap)[string]) =>
            `<LayeredAssetCard modifier={tacticalModifierMap.${item.slug}} />`,
        secondaryData: {
            modifier: assetModifierMap,
        },
    },
    actor: {
        data: actorMap,
        Component: LayeredActorCard,
        getProps: (
            item: (typeof actorMap)[string],
            { role, modifier }: { role?: TacticalRoleType; modifier?: TacticalRoleType }
        ) => ({ ...item, role, modifier }),
        getCode: (
            item: (typeof assetMap)[string],
            { role, modifier }: { role?: TacticalRoleType; modifier?: TacticalRoleType }
        ) =>
            `<LayeredActorCard
    {...actorMap.${item.slug}}${
                role
                    ? `
    role={actorRoleMap.${role.slug}}`
                    : ""
            } ${
                modifier
                    ? `
    modifier={actorModifierMap.${modifier.slug}}`
                    : ""
            } />`,
        secondaryData: {
            role: actorRoleMap,
            modifier: actorModifierMap,
        },
    },
    actorRole: {
        data: actorRoleMap,
        Component: LayeredActorCard,
        getProps: (role: (typeof actorRoleMap)[keyof typeof actorRoleMap]) => ({ role }),
        getCode: (item: (typeof actorRoleMap)[keyof typeof actorRoleMap]) =>
            `<LayeredActorCard
    role={actorRoleMap.${item.slug}}
/>`,
    },
    actorModifier: {
        data: actorModifierMap,
        Component: LayeredActorCard,
        getProps: (modifier: (typeof actorModifierMap)[keyof typeof actorModifierMap]) => ({ modifier }),
        getCode: (item: (typeof actorModifierMap)[keyof typeof actorModifierMap]) =>
            `<LayeredActorCard
    modifier={actorModifierMap.${item.slug}}
/>`,
    },
    counter: {
        data: counterMap,
        Component: CounterCard,
        getProps: (item: (typeof counterMap)[string]) => ({ ...item }),
        getCode: (item: (typeof counterMap)[string]) => `<CounterCard {...counterMap.${item.slug}} />`,
    },
    effect: {
        data: effectMap,
        Component: EffectCard,
        getProps: (item: (typeof effectMap)[string]) => ({ ...item }),
        getCode: (item: (typeof effectMap)[string]) => `<EffectCard {...effectMap.${item.slug}} />`,
    },
    stunt: {
        data: stuntMap,
        Component: StuntCard,
        getProps: (item: (typeof stuntMap)[string]) => ({ ...item }),
        getCode: (item: (typeof stuntMap)[string]) => `<StuntCard {...stuntMap.${item.slug}} />`,
    },
};

const types = Object.keys(typeMap) as (keyof typeof typeMap)[];

const ComponentHelper = ({ initialType = "asset", initialSearch = "", ...restProps }: ComponentHelperProps) => {
    const [search, setSearch] = useState(initialSearch);
    const [selectedType, setSelectedType] = useState<TypeType>(initialType);

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
                        <Item {...(typeMap[selectedType].getProps(item, {} as any) as any)} />
                        <pre className="text-xs text-slate-800 bg-slate-100 border-2 border-slate-500 rounded-md p-2 overflow-auto max-w-[250px] max-h-[calc(100vh-200px)] whitespace-pre-wrap">
                            {typeMap[selectedType].getCode(item, data)}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComponentHelper;
