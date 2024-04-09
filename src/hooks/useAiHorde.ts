import { useMemo } from "react";

import AiHorde, { AiHordeConfigType } from "../services/AiHorde/AiHorde";

export const useAiHorde = (config: AiHordeConfigType = {}) => {
    const client = useMemo(() => {
        return AiHorde(config);
    }, [config]);

    return {
        ...client,
    };
};
