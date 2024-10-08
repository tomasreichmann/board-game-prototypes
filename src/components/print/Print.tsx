import React, { HTMLAttributes, PropsWithChildren, useRef } from "react";
import { IReactToPrintProps, useReactToPrint } from "react-to-print";

import Button, { ButtonProps } from "../../prototypes/kick-ass-cards/components/controls/Button";
import { twMerge } from "tailwind-merge";

export type PrintProps = PropsWithChildren<IReactToPrintProps> & {
    className?: string;
    buttonProps?: Partial<ButtonProps>;
};

export default function Print({ className, buttonProps = {}, children, ...restProps }: PrintProps) {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        ...restProps,
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
