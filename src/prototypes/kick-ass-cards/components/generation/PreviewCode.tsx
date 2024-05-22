import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import ToggleData from "../../../../components/DataToggle";
import Toggle from "../../../../components/Toggle";
import { StepGeneratorActionTypeEnum, useStepGenerator } from "./useStepGenerator";
import Button from "../controls/Button";
import ComponentMetaEditor from "./ComponentMetaEditor";
import { assetCardMeta } from "../gameComponents/AssetCard";

export type PreviewCodeProps = {} & HTMLAttributes<HTMLDivElement>;

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

export default function PreviewCode({ className, children }: PreviewCodeProps) {
    const { state, dispatch } = useStepGenerator();
    const preset = state.presets.find((preset) => preset.name === state.presetName);
    if (!preset || !state.generationResult) {
        return null;
    }
    const codeBlocks = getCodeBlocks(state.generationResult, preset.componentName);
    return (
        <div className={twMerge("flex flex-row flex-wrap gap-4", className)}>
            {codeBlocks.map((codeBlock, index) => {
                // remove first and last line
                const propsCode = codeBlock.slice(codeBlock.indexOf("\n") + 1, codeBlock.lastIndexOf("\n"));
                const propsWithoutDefaults = getPropsFromCodeString(propsCode) as any;
                const props = { ...preset.defaultProps, ...propsWithoutDefaults };
                return (
                    <div key={index} className="flex flex-col gap-2">
                        <ErrorBoundary className="text-kac-steel">
                            <div className="flex flex-row flex-wrap gap-2 items-stretch max-w-[300px]">
                                <Toggle
                                    className="w-auto"
                                    buttonContent="Initial Code Block"
                                    buttonProps={{ className: "shrink-0 h-auto btn-sm" }}
                                    initialCollapsed
                                >
                                    <pre className="rounded-md border-2 border-slate-500 bg-slate-100 p-2 whitespace-pre-wrap text-sm">
                                        {codeBlock}
                                    </pre>
                                </Toggle>
                                <ToggleData
                                    initialCollapsed
                                    data={props}
                                    className="w-auto"
                                    buttonContent="Initial Props"
                                    previewClassName="text-sm"
                                    buttonProps={{ className: "shrink-0 h-auto btn-sm" }}
                                />
                            </div>
                            <ComponentMetaEditor
                                {...preset.meta}
                                componentName={preset.componentName}
                                Component={preset.Component}
                                initialProps={props}
                            />
                        </ErrorBoundary>
                        <div className="flex flex-row gap-4 justify-between">
                            <Button
                                color="success"
                                onClick={() => dispatch({ type: StepGeneratorActionTypeEnum.FineTune, props })}
                            >
                                Fine Tune
                            </Button>
                        </div>
                    </div>
                );
            })}
            {children}
        </div>
    );
}
