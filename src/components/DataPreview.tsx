export type DataPreviewProps = {
    data: any;
    className?: string;
};

export default function DataPreview({
    data,
    className = "max-h-screen self-stretch overflow-auto print:hidden text-xs bg-slate-100 border-2 border-slate-500 rounded-md p-2",
}: DataPreviewProps) {
    return (
        <pre className={className} style={{ maxHeight: "80vh" }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}
