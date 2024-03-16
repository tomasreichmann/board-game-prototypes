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
    confirmProps = { color: "danger", children: <>Confirm {children}</> },
    timeoutMs = 3000,
    onClick,
    ...restProps
}: ButtonWithConfirmationProps) {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (!isConfirming && confirmProps) {
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
        const { className: confirmClassName, ...confirmRestProps } = confirmProps ?? {};
        return (
            <Button className={twMerge(className)} onClick={handleOnClick} {...restProps} {...confirmRestProps}>
                {confirmProps?.children ?? "Confirm"}
            </Button>
        );
    }

    return (
        <Button className={className} onClick={handleOnClick} {...restProps}>
            {children}
        </Button>
    );
}
