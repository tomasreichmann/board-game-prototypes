import { useState } from "react";
import { Button } from "react-daisyui";
import DataPreview from "./DataPreview";
import ErrorBoundary from "./ErrorBoundary";

export type ToggleDataProps = {
    data: any;
    className?: string;
    initialCollapsed: boolean;
};

export default function ToggleData({
    data,
    initialCollapsed,
}: ToggleDataProps) {
    const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
    return (
        <div className="print:hidden flex flex-col w-full items-start relative">
            <Button
                variant={isCollapsed ? undefined : "outline"}
                size="sm"
                className="mb-2"
                onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
            >
                Show Data
            </Button>
            {!isCollapsed && (
                <ErrorBoundary>
                    <DataPreview data={data} />
                </ErrorBoundary>
            )}
        </div>
    );
}
