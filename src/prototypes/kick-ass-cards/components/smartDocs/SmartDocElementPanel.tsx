import { twMerge } from "tailwind-merge";
import smartDocElementMap from "./smartDocElementMap";
import SmartDocElement from "./SmartDocElement";

export type SmartDocElementPanelProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function SmartDocElementPanel({ className, children }: SmartDocElementPanelProps) {
    const elements = Object.values(smartDocElementMap);
    return (
        <div className={twMerge("SmartDocElementPanel flex flex-col gap-2", className)}>
            {elements.map((element) => {
                return <SmartDocElement key={element.componentName} {...element} />;
            })}
            {children}
        </div>
    );
}
