import React, { PropsWithChildren, useEffect, useReducer } from "react";
import perspectiveViewReducer, { PerspectiveViewActionTypeEnum } from "../model/perspectiveViewReducer";
import { initialState } from "../../kick-ass-cards/components/machimagika/model/gameState";
import { usePerspectiveView } from "./PerspectiveViewProvider";

// import "./KickAssCardsPrototype.css";

export default function TestScene({ children }: PropsWithChildren) {
    const { dispatch, state } = usePerspectiveView();

    useEffect(() => {
        dispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({ ...state, stage: { ...state.stage, width: 1920, height: 1080 } }),
        });
    });

    return (
        <div className="TestScene w-[1920px] h-[1080px] border-2 border-kac-fire-light" style={state.stageStyle}>
            {children}
        </div>
    );
}
