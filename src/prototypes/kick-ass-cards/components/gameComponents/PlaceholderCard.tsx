import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import Card, { CardProps } from "./Card";
import Text, { TextProps } from "../content/Text";
import { HTMLAttributes } from "react";

export type PlaceholderCardProps = {
    text: string;
    textProps?: TextProps;
    cardProps?: CardProps;
} & HTMLAttributes<HTMLDivElement>;

export default function PlaceholderCard({
    className,
    cardProps,
    children,
    text,
    textProps,
    ...restProps
}: PlaceholderCardProps) {
    return (
        <div
            className={twMerge("PlaceholderCard rounded-lg bg-kac-gold-light/50 outline-2 outline-kac-gold", className)}
            {...restProps}
        >
            <Card backgroundImageUri="" {...cardProps}>
                <Text {...textProps}>{text}</Text>
                {children}
            </Card>
        </div>
    );
}
