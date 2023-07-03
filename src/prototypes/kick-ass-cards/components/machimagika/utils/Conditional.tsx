import getDeepValue from "../../../../../utils/getDeepValue";

import useGameContext from "../model/GameContext";

export type ConditionType = {
    selector: string;
    value?: any;
    minValue?: number;
    maxValue?: number;
    not?: boolean;
};

export type ConditionalProps = React.PropsWithChildren<{
    conditions?: ConditionType[];
}>;

const resolveCondition = ({ not, ...condition }: ConditionType, value: any): boolean => {
    if (not) {
        return !resolveCondition(condition, value);
    }
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
};

export const resolveConditions = (state: any, conditions: ConditionType[] = []): boolean => {
    const hasConditions = (conditions && conditions.length > 0) || false;
    const passesConditions =
        !hasConditions ||
        conditions?.every((condition) => {
            const value = getDeepValue(state, condition.selector);
            return resolveCondition(condition, value);
        });
    return passesConditions;
};

export default function Conditional({ children, conditions }: ConditionalProps) {
    const { state } = useGameContext();

    if (resolveConditions(state, conditions || [])) {
        return <>{children}</>;
    }
    return null;
}
