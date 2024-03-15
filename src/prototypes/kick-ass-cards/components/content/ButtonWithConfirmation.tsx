import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes, useEffect, useState } from "react";
import Button, { ButtonButtonType, ButtonProps } from "./Button";

export type ButtonWithConfirmationProps = ButtonButtonType & {
    confirmText?: string;
    confirmProps?: Partial<ButtonButtonType>;
};

export default function ButtonWithConfirmation({
    className,
    children,
    confirmProps = { color: "danger", children: <>Confirm {children}</> },
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
        if (isConfirming) {
            const timer = setTimeout(() => {
                setIsConfirming(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isConfirming]);

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
