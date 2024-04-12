import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../prototypes/kick-ass-cards/components/content/Button";

export type TextPreviewProps = {
    initialCollapsed?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function TextPreview({ className, children, initialCollapsed }: TextPreviewProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsed);
    return (
        <div className={twMerge("print:hidden", isCollapsed ? "flex flex-row items-center" : "inline", className)}>
            <div className={twMerge(isCollapsed && "truncate overflow-hidden")}>{children}</div>
            <Button
                variant="text"
                color="info"
                className="self-end px-2 py-1 [font-size:inherit] -mr-2 -my-1"
                onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
            >
                {isCollapsed ? "more" : "less"}
            </Button>
        </div>
    );
}
