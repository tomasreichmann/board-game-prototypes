import twm from "@/utils/twm";
import React, { HTMLAttributes, PropsWithChildren } from "react";

export type Stage2dProps = PropsWithChildren<{
    className?: string;
    width: number; // in pixels
    height: number; // in pixels
}> &
    HTMLAttributes<HTMLDivElement>;

export const Stage2d = ({ className, children, width, height, ...restProps }: Stage2dProps) => {
    return (
        <div
            className={twm("Stage relative", className)}
            style={{ width, height, transformStyle: "preserve-3d" }}
            {...restProps}
        >
            {children}
        </div>
    );
};
