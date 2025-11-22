import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
    actorMap,
    actorModifierMap,
    actorRoleMap,
    assetMap,
    assetModifierMap,
    counterMap,
    effectMap,
    outcomeMap,
    stuntMap,
} from "../data/encounters/components.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prototypeRoot = path.resolve(__dirname, "..");

const paths = {
    outputDir: path.join(prototypeRoot, "components", "gameComponents", "ai-reference"),
};

type ComponentInfoValue = {
    fileName: string;
    title: string;
    description: string;
    usage: string;
};

type ComponentInfo = {
    [key: string]: ComponentInfoValue;
};

const componentInfo = {
    actorMap: {
        fileName: "actors.mdx",
        title: "Actor Cards",
        description: "Actors are characters or creatures in the game.",
        usage: `<LayeredActorCard {...actorMap[actorMapSlug]} role={actorRoleMap[actorRoleMapSlug]} modifier={actorModifierMap[actorModifierMapSlug]} />`,
    },
    actorRoleMap: {
        fileName: "actor-roles.mdx",
        title: "Actor Roles",
        description: "Roles define the tactical function of an actor.",
        usage: `<LayeredActorCard role={actorRoleMap[actorRoleMapSlug]} />`,
    },
    actorModifierMap: {
        fileName: "actor-modifiers.mdx",
        title: "Actor Modifiers",
        description: "Modifiers add special abilities or stats to actors.",
        usage: `<LayeredActorCard modifier={actorModifierMap[actorModifierMapSlug]} />`,
    },
    assetMap: {
        fileName: "assets.mdx",
        title: "Asset Cards",
        description: "Assets are items or equipment players can use.",
        usage: `<LayeredAssetCard {...assetMap[assetMapSlug]} modifier={assetModifierMap[assetModifierMapSlug]} />`,
    },
    counterMap: {
        fileName: "counters.mdx",
        title: "Counter Cards",
        description: "Counters represent threats or obstacles.",
        usage: `<CounterCard {...counterMap[counterMapSlug]} />`,
    },
    effectMap: {
        fileName: "effects.mdx",
        title: "Effect Cards",
        description: "Effects are status conditions that can affect actors or players.",
        usage: `<Effect {...effectMap[effectMapSlug]} />`,
    },
    stuntMap: {
        fileName: "stunts.mdx",
        title: "Stunt Cards",
        description: "Stunts are special actions players can perform.",
        usage: `<StuntCard {...stuntMap[stuntMapSlug]} />`,
    },
    outcomeMap: {
        fileName: "outcomes.mdx",
        title: "Outcome Cards",
        description: "Outcomes represent the result of an action or event.",
        usage: `<Outcome {...outcomeMap[outcomeMapSlug]} />`,
    },
} as const satisfies ComponentInfo;

const importedData = {
    actorMap,
    actorRoleMap,
    actorModifierMap,
    assetMap,
    counterMap,
    effectMap,
    stuntMap,
    outcomeMap,
};

const variableSlugMap = {
    actorMap: Object.keys(actorMap),
    actorRoleMap: Object.keys(actorRoleMap),
    actorModifierMap: Object.keys(actorModifierMap),
    assetMap: Object.keys(assetMap),
    assetModifierMap: Object.keys(assetModifierMap),
    counterMap: Object.keys(counterMap),
    effectMap: Object.keys(effectMap),
    stuntMap: Object.keys(stuntMap),
    outcomeMap: Object.keys(outcomeMap),
};

const replaceVariableSlugs = (content: string) => {
    let result = content;
    for (const [key, value] of Object.entries(variableSlugMap)) {
        const slug = value[0];
        result = result.replace(new RegExp(`\\[${key}Slug\\]`, "g"), `.${slug}`);
    }
    return result;
};

async function generateMdxFile(objectName: string, info: ComponentInfoValue, dataContent: any) {
    if (!dataContent) {
        console.warn(`No data content for ${objectName}, skipping file generation.`);
        return;
    }
    const mdxContent = [
        "---",
        `title: ${info.title}`,
        "---",
        "",
        `import { outcomeMap, actorMap, actorRoleMap, actorModifierMap, counterMap, assetMap, assetModifierMap, effectMap, stuntMap } from "../../../data/encounters/components";`,
        "",
        `# ${info.title}`,
        "",
        info.description,
        "",
        "## Data",
        "",
        "````typescript",
        `export const ${objectName} = ${JSON.stringify(dataContent, null, 4)};`,
        "````",
        "",
        "## Usage Example",
        "",
        "````tsx",
        info.usage,
        "````",
        replaceVariableSlugs(info.usage),
    ].join("\n");
    await fs.writeFile(path.join(paths.outputDir, info.fileName), mdxContent);
    console.log(`Generated ${info.fileName}`);
}

async function generateIndexFile(allInfo: Record<string, ComponentInfoValue>) {
    const imports = Object.values(allInfo)
        .map((info) => `import ${info.title.replace(/ /g, "")} from './${info.fileName}';`)
        .join("\n");

    const content = `
# Component Reference

This documentation provides details and usage examples for the various game components available in MDX.

${Object.values(allInfo)
    .map(
        (info) => `
<details>
    <summary>${info.title}</summary>
    <${info.title.replace(/ /g, "")} />
</details>
`
    )
    .join("\n")}
`;

    const indexContent = `${imports}\n\n${content}`;

    await fs.writeFile(path.join(paths.outputDir, "index.mdx"), indexContent);
    console.log("Generated index.mdx");
}

async function main() {
    try {
        await fs.mkdir(paths.outputDir, { recursive: true });
        const allInfo = {} as Record<string, ComponentInfoValue>;

        for (const [name, info] of Object.entries(componentInfo)) {
            const dataContent = importedData[name as keyof typeof importedData];
            if (dataContent) {
                await generateMdxFile(name, info, dataContent);
                allInfo[name] = info;
            }
        }

        await generateIndexFile(allInfo);

        console.log("MDX component documentation generated successfully!");
    } catch (error) {
        console.error("Error generating MDX documentation:", error);
    }
}

main();
