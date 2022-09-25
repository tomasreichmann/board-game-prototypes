export type DataPreviewProps = {
    data: any;
    className?: string;
};

export default function DataPreview({
    data,
    className = "h-screen overflow-auto print:hidden text-xs bg-slate-100 border-2 border-slate-500 rounded-md",
}: DataPreviewProps) {
    return (
        <pre
            className={className}
            style={{ maxHeight: "80vh", maxWidth: "80vw" }}
        >
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}
