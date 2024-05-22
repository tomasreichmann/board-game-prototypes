import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes, useEffect, useState } from "react";
import Button, { ButtonButtonType, ButtonProps } from "./Button";

export type ButtonWithConfirmationProps = ButtonButtonType & {
    confirmText?: string;
    confirmProps?: Partial<ButtonButtonType>;
    timeoutMs?: number | null;
};

export default function ButtonWithConfirmation({
    className,
    children,
    confirmText = "Confirm" + (typeof children === "string" ? " " + children + "?" : ""),
    confirmProps = {},
    timeoutMs = 4000,
    onClick,
    ...restProps
}: ButtonWithConfirmationProps) {
    const [isConfirming, setIsConfirming] = useState(false);
    const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (!isConfirming) {
            setIsConfirming(true);
        } else if (onClick) {
            onClick(e);
            setIsConfirming(false);
        }
    };

    // un-confirm after 3s
    useEffect(() => {
        if (isConfirming && timeoutMs) {
            const timer = setTimeout(() => {
                setIsConfirming(false);
            }, timeoutMs);
            return () => clearTimeout(timer);
        }
    }, [isConfirming, timeoutMs]);

    if (isConfirming) {
        const {
            className: confirmClassName,
            color: confirmColor = "danger",
            children: confirmChildren = confirmText,
            ...confirmRestProps
        } = confirmProps ?? {};
        return (
            <Button
                className={twMerge(className, confirmProps.className)}
                color={confirmColor}
                onClick={handleOnClick}
                {...restProps}
                {...confirmRestProps}
            >
                {confirmChildren}
            </Button>
        );
    }

    return (
        <Button className={className} onClick={handleOnClick} {...restProps}>
            {children}
        </Button>
    );
}
