import DataPreview from "../../../../../components/DataPreview";

export default function Pre({ componentMap, ...restProps }: any) {
    return <DataPreview data={restProps} />;
}
