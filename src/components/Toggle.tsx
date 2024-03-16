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
    buttonProps: {
        size: buttonSize = "sm",
        className: buttonClassName,
        children: buttonChildren = buttonContent,
        ...buttonProps
    } = {},
    initialCollapsed,
    children,
}: ToggleProps) {
    const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
    return (
        <div className={className}>
            <Button
                className={buttonClassName}
                {...buttonProps}
                size={buttonSize}
                children={buttonChildren}
                variant={isCollapsed ? undefined : "outline"}
                onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
            />
            {!isCollapsed && children}
        </div>
    );
}
