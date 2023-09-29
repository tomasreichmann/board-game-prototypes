import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type ListItemProps = React.PropsWithChildren<{
    className?: string;
} & HTMLAttributes<HTMLLIElement>>;

export default function ListItem({
    className,
    children,
    ...restProps
}: ListItemProps) {
    return (
        <li
            className={twMerge(
                "ListItem max-w-2xl",
                className
            )}
            {...restProps}
        >
            {children}
        </li>
    );
}
