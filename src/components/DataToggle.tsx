import DataPreview from "./DataPreview";
import ErrorBoundary from "./ErrorBoundary";
import Toggle, { ToggleProps } from "./Toggle";

export type ToggleDataProps = {
    data: any;
    className?: string;
} & Partial<ToggleProps>;

export default function ToggleData({
    data,
    className = "print:hidden flex flex-col w-full items-start relative",
    initialCollapsed,
}: ToggleDataProps) {
    return (
        <Toggle className={className} initialCollapsed={initialCollapsed}>
            <ErrorBoundary>
                <DataPreview data={data} />
            </ErrorBoundary>
        </Toggle>
    );
}
