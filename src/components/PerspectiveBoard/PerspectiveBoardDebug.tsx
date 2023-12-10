import DataPreview from "../DataPreview";
import { usePerspectiveBoard } from "./PerspectiveBoardProvider";

export type PerspectiveBoardProps = React.HTMLAttributes<HTMLDivElement>;

export function PerspectiveBoardDebug({ ...restProps }: PerspectiveBoardProps) {
    const { state } = usePerspectiveBoard();
    return <DataPreview data={state} {...restProps} />;
}
