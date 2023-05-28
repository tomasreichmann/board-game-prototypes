import { twMerge } from "tailwind-merge";
import Icon, { uriMap, componentMap } from "./Icon";

export type IconListProps = {
    className?: string;
};

const icons = Object.keys(uriMap) as (keyof typeof componentMap)[];

export default function IconList({ className }: IconListProps) {
    return (
        <div
            className={twMerge(
                "flex flex-row flex-wrap gap-2 p-8 bg-white text-kac-iron rounded-md shadow-lg mb-2",
                className
            )}
        >
            {icons.map((icon) => (
                <div key={String(icon)} className={`flex flex-col gap-1 items-center`}>
                    <Icon className="h-10" icon={icon} />
                    <div className="text-sm">{String(icon)}</div>
                </div>
            ))}
        </div>
    );
}
