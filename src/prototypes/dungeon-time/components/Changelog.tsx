import ContentItem from "./ContentItem";
import DataToggle from "../../../components/DataToggle";
import { useChangelog } from "../hooks/useChangelog";

export default function Changelog() {
    const { data: changelog = [] } = useChangelog();
    return (
        <>
            <div className="flex flex-col print:hidden">
                {changelog.map((change, changeIndex) => (
                    <ContentItem key={changeIndex} {...change} />
                ))}
            </div>
            <div className="w-full">
                <DataToggle data={changelog} initialCollapsed />
            </div>
        </>
    );
}
