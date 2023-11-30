import React, { CSSProperties, PropsWithChildren, useEffect, useReducer } from "react";
import perspectiveViewReducer, {
    PerspectiveViewActionTypeEnum,
} from "../../../components/PerspectiveView/perspectiveViewReducer";
import { initialState } from "../../kick-ass-cards/components/machimagika/model/gameState";
import { usePerspectiveView } from "../../../components/PerspectiveView/PerspectiveViewProvider";
import Position, { PositionProps } from "../../../components/PerspectiveView/Position";

// import "./KickAssCardsPrototype.css";

const positionCount = 100;
const positions = Array(positionCount)
    .fill(0)
    .map(
        (): PositionProps => ({
            x: Math.floor(Math.random() * 1920),
            y: Math.floor(Math.random() * 1080),
            z: Math.floor(Math.random() * 2000 - 1000),
        })
    );

const imgSize = 200;

export default function TestScene({ children }: PropsWithChildren) {
    const { dispatch, state } = usePerspectiveView();

    useEffect(() => {
        dispatch({
            type: PerspectiveViewActionTypeEnum.Updater,
            payload: (state) => ({
                ...state,
                stage: { ...state.stage, width: 1920, height: 1080 },
                lens: { ...state.lens, depthOfField: 250 },
            }),
        });
    }, []);

    return (
        <div className="TestScene w-[1920px] h-[1080px] border-2 border-kac-fire-light" style={state.stageStyle}>
            <Position x={0} y={0} z={0}>
                <img src="https://i.imgur.com/SX614q8.png" width={imgSize} />
            </Position>
            <Position x={200} y={300} z={0}>
                <img src="https://i.imgur.com/SX614q8.png" width={imgSize} />
            </Position>
            <Position x={400} y={100} z={10}>
                <img src="https://i.imgur.com/SX614q8.png" width={imgSize} />
            </Position>
            <Position x={100} y={500} z={100}>
                <img src="https://i.imgur.com/SX614q8.png" width={imgSize} />
            </Position>
            <Position x={700} y={100} z={300}>
                <img src="https://i.imgur.com/SX614q8.png" width={imgSize} />
            </Position>
            {positions.map(({ x, y, z }, index) => (
                <Position key={index} x={x} y={y} z={z}>
                    <img src="https://i.imgur.com/SX614q8.png" width={imgSize} />
                </Position>
            ))}
            {children}
        </div>
    );
}
