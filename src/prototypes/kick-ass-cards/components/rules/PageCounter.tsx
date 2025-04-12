import React from "react";
import Text, { TextProps } from "./Text";

export type PageCounterProps = Partial<TextProps> & { current: number, total?: number };

export default function PageCounter({ current, total, ...props}: PageCounterProps) {
    return (
        <Text variant="h3" className="absolute left-1/2 bottom-[5mm] -translate-x-1/2" {...props} >{current}{ total !== undefined && <>/ {total}</>}</Text>
    );
}
