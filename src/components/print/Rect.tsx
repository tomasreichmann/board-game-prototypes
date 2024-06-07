import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

const Content = ({
    children,
    rotate,
    className,
    style = {},
    ...restProps
}: React.PropsWithChildren<{ rotate?: number } & React.HTMLAttributes<HTMLDivElement>>) => (
    <div
        {...restProps}
        className={twMerge("absolute left-1/2 top-1/2", className)}
        style={{
            translate: "-50% -50%",
            rotate: rotate ? `${rotate}deg` : undefined,
            transformOrigin: "50% 50%",
            ...style,
        }}
    >
        {children}
    </div>
);

export type LabelProps = React.PropsWithChildren<{ rotate?: number } & React.HTMLAttributes<HTMLDivElement>>;

const Label = ({ children, rotate, className, style = {}, ...restProps }: LabelProps) => (
    <div
        {...restProps}
        className={twMerge(
            "absolute left-1/2 top-1/2 flex flex-col justify-center items-center text-[10px] font-sans text-black",
            className
        )}
        style={{
            translate: "-50% -50%",
            rotate: rotate ? `${rotate}deg` : undefined,
            transformOrigin: "50% 50%",
            ...style,
        }}
    >
        {children}
    </div>
);

const defaultCutWidth = "0.2mm";
const defaultCutColor = "rgba(0,0,0,0.25)";
const defaultCutStyle = "solid";
const defaultBendWidth = defaultCutWidth;
const defaultBendColor = defaultCutColor;
const defaultBendStyle = "dotted";

export type RectProps = {
    className?: string;
    content?: React.ReactNode;
    label?: React.ReactNode;
    labelProps?: LabelProps;
    widthMm?: number;
    heightMm?: number;
    paperThicknessMm?: number;
    bendStyles?: { [key in "top" | "right" | "bottom" | "left"]?: CSSProperties };
    cutStyles?: { [key in "top" | "right" | "bottom" | "left"]?: CSSProperties };
    children?: React.ReactNode;
    style?: React.CSSProperties;
    bendTop?: boolean;
    bendRight?: boolean;
    bendBottom?: boolean;
    bendLeft?: boolean;
    cutTop?: boolean;
    cutRight?: boolean;
    cutBottom?: boolean;
    cutLeft?: boolean;
};

export default function Rect({
    className,
    content,
    widthMm,
    heightMm,
    label = false,
    labelProps,
    bendStyles = {},
    cutStyles = {},
    style = {},
    bendTop,
    bendRight,
    bendBottom,
    bendLeft,
    cutTop,
    cutRight,
    cutBottom,
    cutLeft,
    children,
}: RectProps) {
    return (
        <div
            className={twMerge("Rect relative", className)}
            style={{
                width: widthMm ? `${widthMm}mm` : undefined,
                height: heightMm ? `${heightMm}mm` : undefined,
                ...(bendTop
                    ? bendStyles.top || { borderTop: `${defaultBendWidth} ${defaultBendStyle} ${defaultBendColor}` }
                    : {}),
                ...(bendRight
                    ? bendStyles.right || { borderRight: `${defaultBendWidth} ${defaultBendStyle} ${defaultBendColor}` }
                    : {}),
                ...(bendBottom
                    ? bendStyles.bottom || {
                          borderBottom: `${defaultBendWidth} ${defaultBendStyle} ${defaultBendColor}`,
                      }
                    : {}),
                ...(bendLeft
                    ? bendStyles.left || { borderLeft: `${defaultBendWidth} ${defaultBendStyle} ${defaultBendColor}` }
                    : {}),
                ...(cutTop
                    ? cutStyles.top || { borderTop: `${defaultCutWidth} ${defaultCutStyle} ${defaultCutColor}` }
                    : {}),
                ...(cutRight
                    ? cutStyles.right || { borderRight: `${defaultCutWidth} ${defaultCutStyle} ${defaultCutColor}` }
                    : {}),
                ...(cutBottom
                    ? cutStyles.bottom || { borderBottom: `${defaultCutWidth} ${defaultCutStyle} ${defaultCutColor}` }
                    : {}),
                ...(cutLeft
                    ? cutStyles.left || { borderLeft: `${defaultCutWidth} ${defaultCutStyle} ${defaultCutColor}` }
                    : {}),
                ...style,
            }}
        >
            <Content>{content}</Content>
            {label && <Label {...labelProps}>{label}</Label>}
            {children}
        </div>
    );
}
