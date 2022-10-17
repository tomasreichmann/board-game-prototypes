import ContentItem from "./ContentItem";
import DataToggle from "../../../components/DataToggle";
import changelog from "../data/changelog.csv";
import groupContentItems from "../adapters/groupContentItems";

export default function Changelog() {
    const contentItems = groupContentItems(changelog);
    return (
        <>
            <div className="flex flex-col print:hidden">
                <ContentItem key="heading" component="h1">
                    Changelog
                </ContentItem>
                {contentItems.map((content, contentIndex) => (
                    <ContentItem key={contentIndex} {...content} />
                ))}
            </div>
            <div className="w-full">
                <DataToggle data={contentItems} initialCollapsed />
            </div>
        </>
    );
}
