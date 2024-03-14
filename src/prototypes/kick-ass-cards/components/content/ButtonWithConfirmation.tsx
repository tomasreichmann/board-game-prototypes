import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes, useState } from "react";
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
