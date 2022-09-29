import { useState } from "react";
import { Button, ButtonProps } from "react-daisyui";

export type ToggleProps = React.PropsWithChildren<{
    className?: string;
    buttonProps?: Partial<ButtonProps>;
    buttonContent?: React.ReactNode;
    initialCollapsed?: boolean;
}>;

export default function Toggle({
    className = "print:hidden flex flex-col w-full items-start relative",
    buttonContent = "Show Data",
    buttonProps = {
        size: "sm",
        className: "mb-2",
        children: buttonContent,
    },
    initialCollapsed,
    children,
}: ToggleProps) {
    const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
    return (
        <div className={className}>
            <Button
                {...buttonProps}
                variant={isCollapsed ? undefined : "outline"}
                onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
            />
            {!isCollapsed && children}
        </div>
    );
}
