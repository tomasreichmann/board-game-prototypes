import { twMerge } from "tailwind-merge";
import config from "tailwind-config";
import { ThemeConfig } from "tailwindcss/types/config";

const { colors: colorMap } = config?.theme?.extend || ({ colors: {} } as ThemeConfig);

console.log("theme", config);

export type ColorListProps = {
    className?: string;
    filter?: RegExp;
};

export default function ColorList({ className, filter }: ColorListProps) {
    if (!colorMap) {
        return null;
    }

    const colors = filter ? Object.keys(colorMap).filter((color) => filter.test(color)) : Object.keys(colorMap);

    return (
        <div
            className={twMerge(
                "flex flex-row flex-wrap gap-2 p-8 bg-white text-kac-iron rounded-md shadow-lg mb-2",
                className
            )}
        >
            {(colors as (keyof typeof colorMap)[]).map((colorKey) => (
                <div key={String(colorKey)} className={`flex flex-col gap-1 items-center`}>
                    <div className={`h-20 w-20`} style={{ backgroundColor: colorMap[colorKey] }}></div>
                    <div className="text-sm">{String(colorKey)}</div>
                    <div className="text-sm">{colorMap[colorKey]}</div>
                </div>
            ))}
        </div>
    );
}
