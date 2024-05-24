import React, { HTMLAttributes, PropsWithChildren, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Button from "../../prototypes/kick-ass-cards/components/controls/Button";
import { twMerge } from "tailwind-merge";

export type PrintProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function Print({ className, children }: PrintProps) {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={twMerge("Print relative", className)}>
            <div ref={componentRef}>{children}</div>
            <Button onClick={handlePrint} color="secondary" size="sm" className="absolute right-0 top-0">
                Print
            </Button>
        </div>
    );
}
