import { twMerge } from "tailwind-merge";
import DataPreview from "./DataPreview";
import ErrorBoundary from "./ErrorBoundary";
import Toggle, { ToggleProps } from "./Toggle";

export type ToggleDataProps = {
    data: any;
    className?: string;
    previewClassName?: string;
} & Partial<ToggleProps>;

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
                <DataPreview data={data} className={previewClassName} />
            </ErrorBoundary>
        </Toggle>
    );
}
