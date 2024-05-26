import React, { HTMLAttributes, PropsWithChildren, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Button, { ButtonProps } from "../../prototypes/kick-ass-cards/components/controls/Button";
import { twMerge } from "tailwind-merge";

export type PrintProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & { buttonProps?: Partial<ButtonProps> };

export default function Print({ className, buttonProps = {}, children }: PrintProps) {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={twMerge("Print relative", className)}>
            <div ref={componentRef}>{children}</div>
            <Button onClick={handlePrint} color="primary" {...(buttonProps as ButtonProps)}>
                {buttonProps.children ?? "Print"}
            </Button>
        </div>
    );
}
