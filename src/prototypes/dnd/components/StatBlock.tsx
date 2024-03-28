import { JSONSchemaType } from "ajv";
import { Fragment, PropsWithChildren, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import ComponentMetaType from "../../kick-ass-cards/components/generation/ComponentMetaType";

export type StatBlockProps = PropsWithChildren<{
    className?: string;
    name: string;
    imageUri?: string;
    size: "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";
    type: string;
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
    armorClass: number;
    armorType?: string;
    hitPoints: number;
    speed?: {
        walk?: number | string;
        burrow?: number | string;
        climb?: number | string;
        fly?: number | string;
        swim?: number | string;
    };
    abilityScores: {
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
    senses: {
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
            nullable: true,
        },

        name: {
            type: "string",
        },
        imageUri: {
            type: "string",
            nullable: true,
        },
        size: {
            type: "string",
            enum: ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"],
        },
        type: {
            type: "string",
        },
        armorClass: {
            type: "number",
        },
        hitPoints: {
            type: "number",
        },
        speed: {
            type: "object",
            nullable: true,
            properties: {
                walk: {
                    type: ["number", "string"],
                    nullable: true,
                },
                burrow: {
                    type: ["number", "string"],
                    nullable: true,
                },
                climb: {
                    type: ["number", "string"],
                    nullable: true,
                },
                fly: {
                    type: ["number", "string"],
                    nullable: true,
                },
                swim: {
                    type: ["number", "string"],
                    nullable: true,
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
        },
        armorType: {
            type: "string",
            nullable: true,
        },
        abilityScores: {
            type: "object",
            properties: {
                strength: {
                    type: "number",
                },
                dexterity: {
                    type: "number",
                },
                constitution: {
                    type: "number",
                },
                intelligence: {
                    type: "number",
                },
                wisdom: {
                    type: "number",
                },
                charisma: {
                    type: "number",
                },
            },
            required: ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"],
        },
        savingThrows: {
            type: "object",
            nullable: true,
            required: [],
        },
        skills: {
            type: "object",
            nullable: true,
            required: [],
        },
        vulnerabilities: {
            type: "array",
            nullable: true,
            items: {
                type: "string",
            },
        },
        resistances: {
            type: "array",
            nullable: true,
            items: {
                type: "string",
            },
        },
        immunities: {
            type: "array",
            nullable: true,
            items: {
                type: "string",
            },
        },
        conditionImmunities: {
            type: "array",
            nullable: true,
            items: {
                type: "string",
            },
        },
        senses: {
            type: "object",
            properties: {
                passive: {
                    type: "number",
                },
                special: {
                    type: "array",
                    nullable: true,
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
            items: {
                type: "string",
            },
        },
        telepathy: {
            nullable: true,
            type: "number",
        },
        challenge: {
            type: "number",
        },
        traits: {
            type: "array",
            nullable: true,
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                },
                required: ["name", "description"],
            },
        },
        actions: {
            type: "array",
            nullable: true,
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                    attack: {
                        type: "object",
                        nullable: true,
                        properties: {
                            type: {
                                type: "string",
                                enum: ["melee", "ranged"],
                            },
                            range: {
                                type: ["number", "string"],
                                nullable: true,
                            },
                            hit: {
                                type: "string",
                            },
                            miss: {
                                type: "string",
                                nullable: true,
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
                    },
                    description: {
                        type: "string",
                    },
                },
                required: ["name", "description"],
            },
        },
        legendaryActions: {
            type: "array",
            nullable: true,
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                },
                required: ["name", "description"],
            },
        },
        lairActions: {
            type: "array",
            nullable: true,
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                },
                required: ["name", "description"],
            },
        },
        regionalEffects: {
            type: "string",
            nullable: true,
        },
    },
    required: ["name", "size", "type", "armorClass", "hitPoints", "senses"],
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
    schema: statBlockSchema as JSONSchemaType<Omit<StatBlockProps, "children">>,
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
    return (
        <div
            className={twMerge(
                "max-w-xl p-6 bg-white rounded-lg shadow-lg",
                "grid grid-cols-1 gap-4 md:grid-cols-2",
                className
            )}
        >
            <div className="col-span-1">
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
            <div className="col-span-1">
                {imageUri && <img src={imageUri} alt="" className="h-full object-contain object-top" />}
                {"SD_imageUri" in restProps && <p>{(restProps as any).SD_imageUri}</p>}
            </div>
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
        </div>
    );
}
