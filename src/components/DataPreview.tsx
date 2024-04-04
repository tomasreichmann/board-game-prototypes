import { twMerge } from "tailwind-merge";
import safeStringify from "../utils/safeStringify";

export type DataPreviewProps = {
    data: any;
    className?: string;
};

export default function DataPreview({ data, className }: DataPreviewProps) {
    return (
        <pre
            className={twMerge(
                "self-stretch print:hidden text-xs text-slate-800 bg-slate-100 border-2 border-slate-500 rounded-md p-2 overflow-auto max-w-[calc(100vw-100px)] max-h-[calc(100vh-200px)] whitespace-pre-wrap",
                className
            )}
        >
            {safeStringify(data, null, 2)}
        </pre>
    );
}
