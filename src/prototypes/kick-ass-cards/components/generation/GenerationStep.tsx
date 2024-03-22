import { HTMLAttributes, useEffect } from "react";
import { StepGeneratorActionTypeEnum, useStepGenerator } from "./useStepGenerator";
import { StepEnum, StepGeneratorStateType } from "./stepGeneratorTypes";
import copyToClipboard from "../../../../utils/copyToClipboard";
import { twMerge } from "tailwind-merge";
import Button from "../content/Button";
import getComponentCode from "./getComponentCode";
import { useMistral } from "../../../../hooks/useMistral";
import Pending from "../../../../components/form/Pending";
import PreviewCode from "./PreviewCode";
import { LLM_PREFIX, SD_PREFIX } from "./ComponentMetaEditor";
import { MistralModelEnum } from "../../../../services/Mistral/Mistral";

const getSampleProps = (state: StepGeneratorStateType) => {
    const preset = state.presets.find((preset) => preset.name === state.presetName);
    if (!preset) {
        console.warn(`Preset "${state.presetName}" not found`);
        return state.presetProps || {};
    }
    const combinedProps = { ...(preset.sampleProps || {}) };
    Object.keys(combinedProps).forEach((key) => {
        if (key.startsWith(SD_PREFIX)) {
            const nonPrefixedKey = key.slice(SD_PREFIX.length);
            delete combinedProps[nonPrefixedKey];
            return;
        }
        if (key.startsWith(LLM_PREFIX)) {
            const nonPrefixedKey = key.slice(LLM_PREFIX.length);
            delete combinedProps[nonPrefixedKey];
            return;
        }
    });
    return combinedProps;
};

const getGenerationPrompt = (state: StepGeneratorStateType) => {
    if (!state.presetName || !state.presetProps) {
        return "[ERROR] Preset name or props not set";
    }
    const preset = state.presets.find((preset) => preset.name === state.presetName);
    if (!preset) {
        return `[ERROR] Preset "${state.presetName}" not found`;
    }
    return (
        state.contextPrompt +
        "\n" +
        `I want to add a new ${preset.componentName} element with a ${state.presetName} preset: ${state.elementPrompt}` +
        "\n" +
        "\n" +
        `This is a sample ${preset.componentName} React component:` +
        "\n" +
        "```jsx\n" +
        getComponentCode(preset.componentName, getSampleProps(state)) +
        "\n" +
        "```\n\n" +
        `${state.presetName} prop hints:\n` +
        Object.keys(state.propPrompts || {})
            .map((key) => {
                const prop = state?.propPrompts?.[key];
                return `"${key}" prop: ${prop}`;
            })
            .join("\n") +
        "\n" +
        "\n" +
        "Put the code between ```jsx and ```. Do not escape any characters in property names. Do not include comments in code.\n" +
        `Give me ${state.generationCount > 1 ? `${state.generationCount} variants of` : ""} the ${
            preset.componentName
        } code according to the sample.`
    );
};

export default function GenerationStep({ className, children }: HTMLAttributes<HTMLDivElement>) {
    const { state, dispatch } = useStepGenerator();
    const preset = state.presets.find((preset) => preset.name === state.presetName);
    if (!state.presetName || !state.presetProps || !preset) {
        dispatch({ type: StepGeneratorActionTypeEnum.SetStep, step: StepEnum.Preset });
        return null;
    }

    const generationPrompt = getGenerationPrompt(state);
    const mistral = useMistral({
        model: MistralModelEnum["open-mixtral-8x7b"],
        maxTokens: 100 * state.generationCount,
        includeHistoryLength: 0,
    });

    useEffect(() => {
        if (!mistral.value) {
            return;
        }
        dispatch({
            type: StepGeneratorActionTypeEnum.Update,
            updater: (state) => ({ ...state, generationResult: mistral.value?.choices[0]?.message.content || "" }),
        });
    }, [mistral.value]);

    return (
        <div className={twMerge("flex-1 flex flex-col", className)}>
            <h2 className="font-kacHeading text-lg text-kac-cloth mt-4">Context prompt</h2>
            <textarea
                value={state.contextPrompt}
                className="rounded-md border-2 border-slate-500 bg-slate-100 p-2"
                onChange={(e) =>
                    dispatch({
                        type: StepGeneratorActionTypeEnum.Update,
                        updater: (state) => ({ ...state, contextPrompt: e.target.value }),
                    })
                }
            />

            <h2 className="font-kacHeading text-lg text-kac-cloth mt-4">Element prompt</h2>
            <textarea
                value={state.elementPrompt}
                className="rounded-md border-2 border-slate-500 bg-slate-100 p-2"
                onChange={(e) =>
                    dispatch({
                        type: StepGeneratorActionTypeEnum.Update,
                        updater: (state) => ({ ...state, elementPrompt: e.target.value }),
                    })
                }
            />

            <h2 className="font-kacHeading text-lg text-kac-cloth mt-4">Generations: {state.generationCount}</h2>
            <input
                type="range"
                value={state.generationCount}
                min={1}
                max={10}
                onChange={(e) =>
                    dispatch({
                        type: StepGeneratorActionTypeEnum.Update,
                        updater: (state) => ({ ...state, generationCount: Number(e.target.value) }),
                    })
                }
            />

            <h2 className="font-kacHeading text-lg text-kac-cloth mt-4">Generation prompt</h2>
            <div className="relative">
                <pre className="rounded-md border-2 border-slate-500 bg-slate-100 p-2 whitespace-pre-wrap text-kac-steel-dark resize-y h-[200px] text-sm overflow-auto">
                    {generationPrompt}
                </pre>
                <div className="absolute bottom-full translate-y-2 right-0 flex flex-row gap-4 items-start">
                    {mistral.error && <p className="text-red-500">{mistral.error.message}</p>}
                    <Button color="success" onClick={() => copyToClipboard(generationPrompt)}>
                        Copy
                    </Button>
                    <Button
                        color="primary"
                        disabled={mistral.isPending || generationPrompt.trim().length === 0}
                        onClick={() => {
                            if (generationPrompt.trim().length === 0) return;
                            console.log("send message", generationPrompt);
                            mistral.sendMessage(generationPrompt);
                        }}
                    >
                        {mistral.isPending ? <Pending className="w-6 h-6" /> : "Generate"}
                    </Button>
                </div>
            </div>

            <h2 className="font-kacHeading text-lg text-kac-cloth mt-4">
                Generation Result <span className="text-sm font-kacBody">you can paste here too</span>
            </h2>
            <div className="flex flex-row gap-4">
                <Button
                    color="success"
                    onClick={() => {
                        const sample = `1. <Actor
name="Vladislav z Novgoroda"
notes="Summons his elite guards if threatened"
occupation="Warlord"
size="Bridge"
reward="Rare spices and exotic treasures"
threat="Wields a two-handed sword for 2 Effects and commands his guards to attack"
toughness={4}
currentToughness={4}
SD_imageUri="ethereal full body fantasy concept art of a warlord with a two-handed sword on solid white background, (soft white vignette:0.3), center composition, SK_Fantasy painterly, fantasy art, dreamy"
/>
2. <Actor
name="Bohdan z Kieva"
notes="Threatens to destroy villages if not obeyed"
occupation="Conquering Warlord"
reward="Valuable resources and precious metals"
threat="Commands a ballista to attack from a distance for 2 Effects"
toughness={3}
currentToughness={3}
SD_imageUri="ethereal full body fantasy concept art of a warlord with a ballista on solid white background, (strong white vignette:0.7), center composition, SK_Fantasy painterly, fantasy art, dreamy"
/>
3. <Actor
name="Michal z Smolenska"
notes="Fights with a relentless fury"
occupation="Invading Warlord"
reward="Prisoners of war and territorial control"
threat="Attacks with a battle axe for 2 Effects and enrages when wounded"
toughness={4}
currentToughness={4}
SD_imageUri="ethereal full body fantasy concept art of a warlord with a battle axe on solid white background, (soft white vignette:0.3), center composition, SK_Fantasy painterly, fantasy art, dreamy"
/>
4. <Actor
name="Jaroslav z Vladimira"
notes="Manipulates and bribes to get what he wants"
occupation="Power-hungry Warlord"
reward="Power and political influence"
threat="Persuades others to attack for 1 Effect and promises rewards for loyalty"
toughness={2}
currentToughness={2}
SD_imageUri="ethereal full body fantasy concept art of a warlord with a scroll on solid white background, (strong white vignette:0.7), center composition, SK_Fantasy painterly, fantasy art, dreamy"
/>`;
                        dispatch({
                            type: StepGeneratorActionTypeEnum.Update,
                            updater: (state) => ({ ...state, generationResult: sample }),
                        });
                    }}
                >
                    Paste some Actors
                </Button>
                <Button
                    color="success"
                    onClick={() => {
                        const sample = `1. <Asset
                    size="Mini European"
                    SD_icon="ethereal fantasy concept art of a broadaxe on solid white background, (soft white vignette:0.3), center composition, SK_Fantasy painterly, fantasy art, dreamy"
                    className="not-prose drop-shadow-md print:drop-shadow-none print:filter-none"
                    title="Broadaxe"
                    effect="Attacks for 1 Effect (crushing)"
                    />
                    2. <Asset
                    size="Mini European"
                    SD_icon="ethereal fantasy concept art of a war hammer on solid white background, (strong white vignette:0.7), center composition, SK_Fantasy painterly, fantasy art, dreamy"
                    className="not-prose drop-shadow-md print:drop-shadow-none print:filter-none"
                    title="War Hammer"
                    effect="Attacks for 1 Effect (crushing)"
                    />
                    3. <Asset
                    size="Mini European"
                    SD_icon="ethereal fantasy concept art of a crossbow on solid white background, (soft white vignette:0.3), center composition, SK_Fantasy painterly, fantasy art, dreamy"
                    className="not-prose drop-shadow-md print:drop-shadow-none print:filter-none"
                    title="Crossbow"
                    effect="Attacks for 1 Effect (piercing) ballistically"
                    />
                    4. <Asset
                    size="Mini European"
                    SD_icon="ethereal fantasy concept art of a morning star on solid white background, (strong white vignette:0.7), center composition, SK_Fantasy painterly, fantasy art, dreamy"
                    className="not-prose drop-shadow-md print:drop-shadow-none print:filter-none"
                    title="Morning Star"
                    effect="Attacks for 1 Effect (crushing)"
                    />`;
                        dispatch({
                            type: StepGeneratorActionTypeEnum.Update,
                            updater: (state) => ({ ...state, generationResult: sample }),
                        });
                    }}
                >
                    Paste some Assets
                </Button>
            </div>
            <textarea
                value={state.generationResult}
                className="rounded-md border-2 border-slate-500 bg-slate-100 p-2 min-h-32"
                onChange={(e) =>
                    dispatch({
                        type: StepGeneratorActionTypeEnum.Update,
                        updater: (state) => ({ ...state, generationResult: e.target.value }),
                    })
                }
            />
            {state.generationResult && (
                <>
                    <h2 className="font-kacHeading text-lg text-kac-cloth mt-4">Preview</h2>
                    <PreviewCode />
                </>
            )}
            {children}
        </div>
    );
}
