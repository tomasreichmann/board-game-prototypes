import useGameContext from "../model/GameContext";

export type ConditionType = {
    selector: string;
    value?: any;
    minValue?: number;
    maxValue?: number;
};

export type ConditionalProps = React.PropsWithChildren<{
    conditions?: ConditionType[];
}>;

export default function Conditional({ children, conditions }: ConditionalProps) {
    const hasConditions = (conditions && conditions.length > 0) || false;
    const { state } = useGameContext();
    const passesConditions =
        !hasConditions ||
        conditions?.every((condition) => {
            const value = getDeepValue(state, condition.selector);
            if ("value" in condition && condition.value !== value) {
                return false;
            }
            if (condition.minValue !== undefined && condition.value < condition.minValue) {
                return false;
            }
            if (condition.maxValue !== undefined && condition.value > condition.maxValue) {
                return false;
            }
            return true;
        });
    if (passesConditions) {
        return <>{children}</>;
    }
    return null;
}
