import { twMerge } from "tailwind-merge";
import DataPreview from "./DataPreview";
import ErrorBoundary from "./ErrorBoundary";
import Toggle, { ToggleProps } from "./Toggle";

export type ToggleDataProps = {
    data: any;
    className?: string;
    previewClassName?: string;
} & Partial<ToggleProps>;

const isReactComponent = (value: any) => typeof value === "function" && value.prototype?.render;
const isJsxElement = (value: any) => typeof value === "object" && value?.$$typeof === Symbol.for("react.element");

const stripComponentsAndElements = (data: any) => {
    if (typeof data === "object") {
        return Object.fromEntries(
            Object.entries(data).filter(([_, value]) => !isReactComponent(value) && !isJsxElement(value))
        );
    }
    return data;
};

export default function ToggleData({
    data,
    className,
    previewClassName,
    initialCollapsed,
    ...restProps
}: ToggleDataProps) {
    return (
        <Toggle
            className={twMerge("print:hidden flex flex-col max-w-full items-start relative", className)}
            initialCollapsed={initialCollapsed}
            {...restProps}
        >
            <ErrorBoundary>
                <DataPreview data={stripComponentsAndElements(data)} className={previewClassName} />
            </ErrorBoundary>
        </Toggle>
    );
}
