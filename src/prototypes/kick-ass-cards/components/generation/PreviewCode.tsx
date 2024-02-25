import { HTMLAttributes } from "react";
import { Button } from "react-daisyui";
import { twMerge } from "tailwind-merge";
import ErrorBoundary from "../../../../components/ErrorBoundary";
import ToggleData from "../../../../components/DataToggle";
import Toggle from "../../../../components/Toggle";

export type PreviewCodeProps<T> = {
    Component: React.ComponentType<T>;
    componentName: string;
    code: string;
} & HTMLAttributes<HTMLDivElement>;

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
        codeBlocks.push("<" + componentName + fragment.split(new RegExp(`\/>`, "g"))[0]);
    });

    console.log("code", code);
    console.log("codeBlocks", codeBlocks);

    return codeBlocks;
}

export default function PreviewCode<T extends JSX.IntrinsicAttributes>({
    className,
    code,
    Component,
    componentName,
    children,
}: PreviewCodeProps<T>) {
    const codeBlocks = getCodeBlocks(code, componentName);
    return (
        <div className={twMerge("flex flex-row flex-wrap gap-4", className)}>
            {codeBlocks.map((codeBlock, index) => {
                // remove first and last line
                const propsCode = codeBlock.slice(codeBlock.indexOf("\n") + 1, codeBlock.lastIndexOf("\n"));
                const props = getPropsFromCodeString(propsCode) as unknown as T;
                return (
                    <div key={index} className="flex flex-col gap-2">
                        <ErrorBoundary className="text-kac-steel">
                            <Component {...props} />
                        </ErrorBoundary>
                        <div className="flex flex-row gap-4 justify-between">
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
                    </div>
                );
            })}
            {children}
        </div>
    );
}
