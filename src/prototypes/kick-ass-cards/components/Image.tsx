import React from "react";
import clsx from "clsx";

export type ImageProps = React.PropsWithChildren<{ className?: string; src: string; style?: React.CSSProperties }>;

export default function Image({ className, style = {}, src, children }: ImageProps) {
    return (
        <div className={clsx("bg-no-repeat min-h-[300px] relative", className)} style={style}>
            <img src={src} alt="" className="object-contain" />
            {children}
        </div>
    );
}
