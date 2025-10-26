import { EffectType } from "../types/effectTypes";

export type EffectBoardStateType = {
    activeEffect?: EffectType;
    dmxParams: Record<string, number>;
    effectMap: Record<string, EffectType>;
};

export type EffectBoardAction =
    | {
          type: "addEffect";
          effect: EffectType;
      }
    | {
          type: "removeEffect";
          slug: string;
      }
    | {
          type: "updateEffect";
          effect: EffectType;
      }
    | {
          type: "playEffect";
          effect: EffectType;
      }
    | {
          type: "reset";
      };
