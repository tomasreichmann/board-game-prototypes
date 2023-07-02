import { twMerge } from "tailwind-merge";
import NormalizedChildren from "./NormalizedChildren";
import { SharedContentProps } from "./sharedContentProps";

export type DialogIntrospectionProps = {
    className?: string;
    style?: React.CSSProperties;
} & SharedContentProps;

export default function DialogIntrospection({ className, style, children, ...restProps }: DialogIntrospectionProps) {
    return (
        <div className={twMerge("transition-all", className)} style={style}>
            <NormalizedChildren {...restProps}>{children}</NormalizedChildren>
        </div>
    );
}
