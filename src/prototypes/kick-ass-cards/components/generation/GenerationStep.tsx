import { HTMLAttributes, useEffect } from "react";
import { StepGeneratorActionTypeEnum, useStepGenerator } from "./useStepGenerator";
import { StepEnum, StepGeneratorStateType } from "./stepGeneratorTypes";
import copyToClipboard from "../../../../utils/copyToClipboard";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import Toggle from "../../../../components/Toggle";
import ToggleData from "../../../../components/DataToggle";
import { twMerge } from "tailwind-merge";
import Button from "../content/Button";
import getComponentCode from "./getComponentCode";
import { MistralModelEnum, useMistral } from "../../../../hooks/useMistral";
import Pending from "../../../../components/form/Pending";
import DataPreview from "../../../../components/DataPreview";

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
        `I want to add a new ${state.presetName} element: ${state.elementPrompt}` +
        "\n" +
        Object.keys(state.propPrompts || {})
            .map((key) => {
                const prop = state?.propPrompts?.[key];
                return `"${key}" prop: ${prop}`;
            })
            .join("\n") +
        "\n" +
        `This is a sample ${preset.componentName} React component:` +
        "\n" +
        getComponentCode(preset.componentName, { ...state.presetProps, ...(preset.sampleProps || {}) }) +
        "\n" +
        `Give me ${state.generationCount > 1 ? `${state.generationCount} variants of` : ""} the ${
            preset.componentName
        } code according to the sample.`
    );
};

/**
 * Parses the value of a property.
 * Example: '={123}' will return 123
 * Example: '="abc"' will return "abc"
 * Example: '' will return true
 *
 * @param {string} value - the value to parse
 * @return {type} description of the parsed value
 */
const parsePropValue = (value: string) => {
    if (!value) {
        return true;
    }
    if (value.startsWith('="') && value.endsWith('"')) {
        return value.slice(2, -1);
    }
    const isInBrackets = value.startsWith("={") && value.endsWith("}");
    if (isInBrackets) {
        const valueInBrackets = value.slice(2, -1);
        const numberParse = Number(valueInBrackets);
        if (!isNaN(numberParse)) {
            return numberParse;
        }
        if (valueInBrackets === "true") {
            return true;
        }
        if (valueInBrackets === "false") {
            return false;
        }
        if (valueInBrackets === "null") {
            return null;
        }
    }
    return value;
};

/**
 * Parses the given string of React code and extracts the props as an object.
 *
 * @param {string} codeString - the string of React code
 * @return {object} an object containing the extracted props
 */
function getPropsFromCodeString(codeString: string): { [key: string]: string | number | boolean | null } {
    const props: { [key: string]: string | number | boolean | null } = {};
    const propRegex = /(\w+)(=["{]?[^"}]*["'}])?/g;
    let match;
    while ((match = propRegex.exec(codeString)) !== null) {
        const key = match[1];
        const value = parsePropValue(match[2]);
        props[key] = value;
    }
    return props;
}

function getCodeBlocks(code: string, componentName: string): string[] {
    const codeBlocks: string[] = [];
    const fragments = (" " + code).split("<" + componentName).slice(1);
    fragments.forEach((fragment) => {
        codeBlocks.push(
            "<" +
                componentName +
                "\n" +
                fragment
                    .replaceAll(/\/\/.*\n/g, "")
                    .replaceAll(/\/\*.*\*\//g, "")
                    .trim()
                    .split(new RegExp(`\/>`, "g"))[0] +
                "/>"
        );
    });

    return codeBlocks;
}

export default function GenerationStep({ className, children }: HTMLAttributes<HTMLDivElement>) {
    const { state, dispatch } = useStepGenerator();
    const mistral = useMistral({
        model: MistralModelEnum["open-mixtral-8x7b"],
        maxTokens: 100 * state.generationCount,
        includeHistoryLength: 0,
    });
    const preset = state.presets.find((preset) => preset.name === state.presetName);
    if (!state.presetName || !state.presetProps || !preset) {
        dispatch({ type: StepGeneratorActionTypeEnum.SetStep, step: StepEnum.Preset });
        return null;
    }

    const generationPrompt = getGenerationPrompt(state);

    const codeBlocks =
        state.generationResult && preset.componentName
            ? getCodeBlocks(state.generationResult, preset.componentName)
            : [];
    const previews = codeBlocks.map((codeBlock) => {
        const propsCode = codeBlock.slice(codeBlock.indexOf("\n") + 1, codeBlock.lastIndexOf("\n"));
        const props = getPropsFromCodeString(propsCode);
        return {
            codeBlock,
            props,
        };
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
        <div className="flex-1 flex flex-col">
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
                <pre className="rounded-md border-2 border-slate-500 bg-slate-100 p-2 whitespace-pre-wrap text-kac-steel-dark">
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
                    <div className={twMerge("flex flex-row flex-wrap gap-4", className)}>
                        {previews.map(({ codeBlock, props }, index) => {
                            const Component = preset.Component;
                            return (
                                <div key={index} className="flex flex-col gap-2">
                                    <ErrorBoundary className="text-kac-steel">
                                        <Component {...props} />
                                    </ErrorBoundary>
                                    <div className="flex flex-row gap-4 justify-between">
                                        <div className="flex flex-col gap-2 items-stretch">
                                            <Toggle
                                                className="w-auto"
                                                buttonContent="Code Block"
                                                buttonProps={{ className: "shrink-0 h-auto btn-sm" }}
                                                initialCollapsed
                                            >
                                                <pre className="rounded-md border-2 border-slate-500 bg-slate-100 p-2 whitespace-pre-wrap">
                                                    {codeBlock}
                                                </pre>
                                            </Toggle>
                                            <ToggleData
                                                initialCollapsed
                                                data={props}
                                                className="w-auto"
                                                buttonContent="Props"
                                                buttonProps={{ className: "shrink-0 h-auto btn-sm" }}
                                            />
                                        </div>
                                        <Button
                                            color="success"
                                            onClick={() =>
                                                dispatch({ type: StepGeneratorActionTypeEnum.FineTune, props })
                                            }
                                        >
                                            Fine Tune
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-row flex-wrap gap-4 mt-4">
                        <ToggleData data={codeBlocks} buttonContent="Code Blocks" />
                        <ToggleData data={previews} buttonContent="Preview Data" />
                    </div>
                </>
            )}
            {children}
        </div>
    );
}
