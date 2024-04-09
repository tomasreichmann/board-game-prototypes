import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../prototypes/kick-ass-cards/components/content/Button";

export type TextPreviewProps = {
    initialCollapsed?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function TextPreview({ className, children, initialCollapsed }: TextPreviewProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsed);
    return (
        <div className={twMerge("flex print:hidden", isCollapsed ? "flex-row items-center" : "flex-col", className)}>
            <div className={twMerge(isCollapsed && "truncate overflow-hidden")}>{children}</div>
            <Button
                variant="text"
                color="info"
                className="self-end px-2 py-1 [font-size:inherit]"
                onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
            >
                {isCollapsed ? "more" : "less"}
            </Button>
        </div>
    );
}
