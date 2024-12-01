import { twMerge } from "tailwind-merge";
import Card, { CardProps } from "./Card";
import Text, { TextProps } from "../content/Text";
import { HTMLAttributes } from "react";
import { ContentItemComponentProps } from "../playOnline/components/ContentItem";

export type PlaceholderCardProps = {
    text: string;
    textProps?: TextProps;
    cardProps?: CardProps;
} & ContentItemComponentProps &
    HTMLAttributes<HTMLDivElement>;

export default function PlaceholderCard({
    className,
    cardProps,
    children,
    text,
    textProps,
    isClickable,
    isSelected,
    isHighlighted,
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
