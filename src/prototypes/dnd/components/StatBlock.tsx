import { JSONSchemaType } from "ajv";
import { Fragment, PropsWithChildren, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import ComponentMetaType from "../../kick-ass-cards/components/generation/ComponentMetaType";

export type StatBlockProps = PropsWithChildren<{
    className?: string;
    name?: string;
    imageUri?: string;
    size?: "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";
    type?: string;
    alignment:
        | "Lawful Good"
        | "Neutral Good"
        | "Chaotic Good"
        | "Lawful Neutral"
        | "True Neutral"
        | "Chaotic Neutral"
        | "Lawful Evil"
        | "Neutral Evil"
        | "Chaotic Evil"
        | "Unaligned"
        | "Any alignment";
    armorClass?: number;
    armorType?: string;
    hitPoints: number;
    speed?: {
        walk?: number | string;
        burrow?: number | string;
        climb?: number | string;
        fly?: number | string;
        swim?: number | string;
    };
    abilityScores?: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    savingThrows?: { [key: string]: number }; // e.g., 'Wis': 5
    skills?: { [key: string]: number }; // e.g., 'Perception': 5
    vulnerabilities?: string[];
    resistances?: string[];
    immunities?: string[];
    conditionImmunities?: string[];
    senses?: {
        passive: number;
        special?: ("blindsight" | "darkvision" | "tremorsense" | "truesight")[];
    };
    languages?: string[];
    telepathy?: number; // range in feet
    challenge: number;
    traits?: {
        name: string;
        description: string;
    }[];
    actions?: {
        name: string;
        description: string;
        attack?: {
            type: "melee" | "ranged";
            range?: number | string; // e.g., 10 ft. or 30/60 ft.
            hit: string;
            miss?: string;
        };
    }[];
    reactions?: {
        name: string;
        description: string;
    }[];
    legendaryActions?: {
        name: string;
        description: string;
    }[];
    lairActions?: {
        name: string;
        description: string;
    }[];
    regionalEffects?: string;
}>;

export const statBlockSchema: JSONSchemaType<Omit<StatBlockProps, "children">> = {
    type: "object",
    properties: {
        className: {
            type: "string",
            title: "Class name",
            nullable: true,
        },

        name: {
            type: "string",
            title: "Name",
            nullable: true,
        },
        imageUri: {
            type: "string",
            title: "Image URI",
            nullable: true,
        },
        size: {
            type: "string",
            title: "Size",
            enum: ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"],
            nullable: true,
        },
        type: {
            type: "string",
            title: "Type",
            nullable: true,
        },
        armorClass: {
            type: "number",
            title: "Armor class",
            nullable: true,
        },
        hitPoints: {
            type: "number",
            title: "Hit points",
        },
        speed: {
            type: "object",
            nullable: true,
            title: "Speed",
            properties: {
                walk: {
                    type: ["number", "string"],
                    nullable: true,
                    title: "Walking speed",
                },
                burrow: {
                    type: ["number", "string"],
                    nullable: true,
                    title: "Burrowing speed",
                },
                climb: {
                    type: ["number", "string"],
                    nullable: true,
                    title: "Climbing speed",
                },
                fly: {
                    type: ["number", "string"],
                    nullable: true,
                    title: "Flying speed",
                },
                swim: {
                    type: ["number", "string"],
                    nullable: true,
                    title: "Swimming speed",
                },
            },
            required: [],
        },
        alignment: {
            type: "string",
            enum: [
                "Lawful Good",
                "Neutral Good",
                "Chaotic Good",
                "Lawful Neutral",
                "True Neutral",
                "Chaotic Neutral",
                "Lawful Evil",
                "Neutral Evil",
                "Chaotic Evil",
                "Unaligned",
                "Any alignment",
            ],
            title: "Alignment",
        },
        armorType: {
            type: "string",
            nullable: true,
            title: "Armor type",
        },
        abilityScores: {
            type: "object",
            properties: {
                strength: {
                    type: "number",
                    title: "Strength score",
                },
                dexterity: {
                    type: "number",
                    title: "Dexterity score",
                },
                constitution: {
                    type: "number",
                    title: "Constitution score",
                },
                intelligence: {
                    type: "number",
                    title: "Intelligence score",
                },
                wisdom: {
                    type: "number",
                    title: "Wisdom score",
                },
                charisma: {
                    type: "number",
                    title: "Charisma score",
                },
            },
            nullable: true,
            required: ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"],
            title: "Ability scores",
        },
        savingThrows: {
            type: "object",
            nullable: true,
            title: "Saving throws",
            required: [],
        },
        skills: {
            type: "object",
            nullable: true,
            title: "Skills",
            required: [],
        },
        vulnerabilities: {
            type: "array",
            nullable: true,
            title: "Vulnerabilities",
            items: {
                type: "string",
            },
        },
        resistances: {
            type: "array",
            nullable: true,
            title: "Resistances",
            items: {
                type: "string",
            },
        },
        immunities: {
            type: "array",
            nullable: true,
            title: "Immunities",
            items: {
                type: "string",
            },
        },
        conditionImmunities: {
            type: "array",
            nullable: true,
            title: "Condition immunities",
            items: {
                type: "string",
            },
        },
        senses: {
            type: "object",
            title: "Senses",
            nullable: true,
            properties: {
                passive: {
                    type: "number",
                    title: "Passive Perception",
                },
                special: {
                    type: "array",
                    nullable: true,
                    title: "Special Senses",
                    items: {
                        type: "string",
                        enum: ["blindsight", "darkvision", "tremorsense", "truesight"],
                    },
                },
            },
            required: [],
        },
        languages: {
            type: "array",
            nullable: true,
            title: "Languages",
            items: {
                type: "string",
            },
        },
        telepathy: {
            nullable: true,
            type: "number",
            title: "Telepathy",
        },
        challenge: {
            type: "number",
            title: "Challenge",
        },
        traits: {
            type: "array",
            nullable: true,
            title: "Traits",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        title: "Name",
                    },
                    description: {
                        type: "string",
                        title: "Description",
                    },
                },
                required: ["name", "description"],
            },
        },
        actions: {
            type: "array",
            nullable: true,
            title: "Actions",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        title: "Name",
                    },
                    description: {
                        type: "string",
                        title: "Description",
                    },
                    attack: {
                        type: "object",
                        nullable: true,
                        properties: {
                            type: {
                                type: "string",
                                enum: ["melee", "ranged"],
                                title: "Type",
                            },
                            range: {
                                type: ["number", "string"],
                                nullable: true,
                                title: "Range",
                            },
                            hit: {
                                type: "string",
                                title: "Hit",
                            },
                            miss: {
                                type: "string",
                                nullable: true,
                                title: "Miss",
                            },
                        },
                        required: ["type", "hit"],
                    },
                },
                required: ["name", "description"],
            },
        },
        reactions: {
            type: "array",
            nullable: true,
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        title: "Name",
                    },
                    description: {
                        type: "string",
                        title: "Description",
                    },
                },
                required: ["name", "description"],
            },
            title: "Reactions",
        },
        legendaryActions: {
            type: "array",
            nullable: true,
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        title: "Name",
                    },
                    description: {
                        type: "string",
                        title: "Description",
                    },
                },
                required: ["name", "description"],
            },
            title: "Legendary Actions",
        },
        lairActions: {
            type: "array",
            nullable: true,
            title: "Lair Actions",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        title: "Name",
                    },
                    description: {
                        type: "string",
                        title: "Description",
                    },
                },
                required: ["name", "description"],
            },
        },
        regionalEffects: {
            type: "string",
            nullable: true,
            title: "Regional Effects",
        },
    },
    required: [],
};

export const statBlockSchemaWithGeneratedProps = {
    ...statBlockSchema,
    properties: {
        ...statBlockSchema.properties,
        ...{
            SD_imageUri: {
                title: "Image description (Stable Diffusion XL prompt; add 'in style of DnD')",
                type: "string",
            },
        },
    },
    required: [...statBlockSchema.required, "SD_imageUri"],
} as JSONSchemaType<any>;

export const statBlockMeta: ComponentMetaType<StatBlockProps> = {
    schema: statBlockSchema as JSONSchemaType<StatBlockProps>,
    componentName: "StatBlock",
    Component: StatBlock,
    generationConfig: {
        props: {
            name: {
                llm: true,
            },
        },
    },
};

export default function StatBlock({
    className,
    name,
    imageUri,
    size,
    type,
    armorClass,
    alignment,
    hitPoints,
    speed,
    abilityScores,
    senses,
    conditionImmunities,
    immunities,
    resistances,
    vulnerabilities,
    languages,
    challenge,
    traits,
    actions,
    ...restProps
}: StatBlockProps) {
    const hasImage = Boolean(imageUri || ("SD_imageUri" in restProps && restProps.SD_imageUri));
    return (
        <div
            className={twMerge(
                "max-w-xl p-6 bg-white rounded-lg shadow-lg border-2 border-kac-steel-light",
                "grid grid-cols-1 gap-4 ",
                hasImage && "md:grid-cols-2",
                className
            )}
        >
            <div className={twMerge("col-span-1")}>
                <h2 className="text-2xl text-kac-blood">{name}</h2>
                <p className="text-md text-kac-iron mt-1 italic">
                    {size} {type} {alignment && alignment !== "Unaligned" ? `, ${alignment}` : ""}
                </p>
                <hr className="my-1 border-t-2 border-kac-blood" />
                <p className="text-sm text-kac-iron mt-2">
                    <strong>Armor Class</strong> {armorClass}
                </p>
                <p className="text-sm text-kac-iron mt-2">
                    <strong>Hit Points</strong> {hitPoints}
                </p>
                {speed && Boolean(Object.entries(speed).length) && (
                    <>
                        <h3 className="text-sm font-bold text-kac-iron mb-1 mt-2">Speed</h3>
                        <p className="text-sm">
                            {Object.entries(speed).reduce((fragments, [key, s], i) => {
                                if (s) {
                                    fragments.push(
                                        <Fragment key={i}>
                                            {i > 0 && <>, </>}
                                            {key === "walk" ? "" : " " + key}
                                            {typeof s === "number" ? `${s}ft.` : s}
                                        </Fragment>
                                    );
                                }
                                return fragments;
                            }, [] as JSX.Element[])}
                        </p>
                    </>
                )}
                {abilityScores &&
                    Object.entries(abilityScores).filter(([, value]) => value !== undefined).length > 0 && (
                        <>
                            <hr className="my-1 border-t-2 border-kac-blood" />
                            <div className="flex flex-row gap-2">
                                {Object.entries(abilityScores).map(([key, value]) => (
                                    <div key={key} className="flex flex-col items-center">
                                        <h4 className="text-md font-bold text-kac-iron uppercase">{key.slice(0, 3)}</h4>
                                        <p className="text-sm text-kac-iron">
                                            {value} (
                                            <span className="font-bold">
                                                {value >= 12 ? "+" : ""}
                                                {Math.floor((value - 10) / 2)}
                                            </span>
                                            )
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <hr className="my-1 border-t-2 border-kac-blood" />
                        </>
                    )}

                {senses && senses.special && Boolean(senses.special?.length) && (
                    <div>
                        <h3 className="font-bold inline mr-2 text-sm text-kac-iron mb-1 mt-4">Senses</h3>
                        <p className="text-sm inline">{senses.special.join(", ")}</p>
                    </div>
                )}
                {conditionImmunities && Boolean(conditionImmunities?.length) && (
                    <div>
                        <h3 className="font-bold inline mr-2 text-sm text-kac-iron mb-1 mt-4">Condition Immunities</h3>
                        <p className="text-sm inline">{conditionImmunities.join(", ")}</p>
                    </div>
                )}
                {immunities && Boolean(immunities?.length) && (
                    <div>
                        <h3 className="font-bold inline mr-2 text-sm text-kac-iron mb-1 mt-4">Damage Immunities</h3>
                        <p className="text-sm inline">{immunities.join(", ")}</p>
                    </div>
                )}
                {resistances && Boolean(resistances?.length) && (
                    <div>
                        <h3 className="font-bold inline mr-2 text-sm text-kac-iron mb-1 mt-4">Damage Resistances</h3>
                        <p className="text-sm inline">{resistances.join(", ")}</p>
                    </div>
                )}
                {vulnerabilities && Boolean(vulnerabilities?.length) && (
                    <div>
                        <h3 className="font-bold inline mr-2 text-sm text-kac-iron mb-1 mt-4">
                            Damage Vulnerabilities
                        </h3>
                        <p className="text-sm inline">{vulnerabilities.join(", ")}</p>
                    </div>
                )}
                {languages && Boolean(languages?.length) && (
                    <div>
                        <h3 className="font-bold inline mr-2 text-sm text-kac-iron mb-1 mt-4">Languages</h3>
                        <p className="text-sm inline">{languages.join(", ")}</p>
                    </div>
                )}
                {Boolean(challenge) && (
                    <div>
                        <h3 className="font-bold inline mr-2 text-sm text-kac-iron mb-1 mt-4">Challenge</h3>
                        <p className="text-sm inline">{challenge}</p>
                    </div>
                )}
                <hr className="my-1 border-t-2 border-kac-blood" />
            </div>
            {hasImage && (
                <div className="col-span-1">
                    {imageUri && <img src={imageUri} alt="" className="h-full object-contain object-top" />}
                    {"SD_imageUri" in restProps && <p>{(restProps as any).SD_imageUri}</p>}
                </div>
            )}
            {(traits && traits?.length > 0) ||
                (actions && actions?.length > 0 && (
                    <div className="col-span-2 columns-2">
                        {traits?.map((trait) => (
                            <div className="break-inside-avoid">
                                <h3 className="text-sm font-bold text-kac-iron mb-1">{trait.name}</h3>
                                <p className="text-sm">{trait.description}</p>
                            </div>
                        ))}
                        {actions && actions.length > 0 && (
                            <>
                                <h3 className="text-lg font-bold text-kac-iron mt-2 mb-1 border-b-2 border-kac-blood break-after-avoid">
                                    Actions
                                </h3>
                                {actions.map((action) => (
                                    <div className="break-inside-avoid">
                                        <h4 className="font-bold text-md mb-1 text-kac-iron">{action.name}</h4>
                                        <p className="text-sm">{action.description}</p>
                                        {action.attack && (
                                            <div>
                                                <h4 className="text-sm mb-1 mt-2">Attack</h4>
                                                <p className="text-sm">
                                                    {`${action.attack.type} ${action.attack.range || ""}, `}
                                                    {action.attack.hit}, {action.attack.miss || ""}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                ))}
        </div>
    );
}
