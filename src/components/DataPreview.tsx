export type DataPreviewProps = {
    data: any;
    className?: string;
};

export default function DataPreview({
    data,
    className = "self-stretch overflow-auto print:hidden text-xs text-slate-800 bg-slate-100 border-2 border-slate-500 rounded-md p-2",
}: DataPreviewProps) {
    return (
        <pre className={className} style={{ maxHeight: "calc(100vh - 150px)" }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}
