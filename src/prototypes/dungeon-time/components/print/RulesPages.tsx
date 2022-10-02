import ContentItem from "../ContentItem";
import DataToggle from "../../../../components/DataToggle";
import { useRules } from "../../hooks/useRules";

export default function RulesPages() {
    const { data: rules = [] } = useRules();
    return (
        <>
            <div className="flex flex-col">
                {rules.map((rule, ruleIndex) => (
                    <ContentItem key={ruleIndex} {...rule} />
                ))}
            </div>
            <div className="w-full">
                <DataToggle data={rules} initialCollapsed />
            </div>
        </>
    );
}
