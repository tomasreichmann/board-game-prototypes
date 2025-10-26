import React, { PropsWithChildren } from "react";
import { useEffectBoard } from "../hooks/useEffectBoard";
import ToggleData from "@/components/DataToggle";
import EffectButton from "./EffectButton";

export type EffectBoardProps = PropsWithChildren & {};

export default function EffectBoard({ children }: EffectBoardProps) {
    const { state } = useEffectBoard();

    return (
        <div className="EffectBoard flex flex-col gap-4">
            <div className="EffectBoard flex flex-row gap-4 flex-wrap">
                {state.effectMap
                    ? Object.values(state.effectMap).map((effect) => <EffectButton key={effect.slug} effect={effect} />)
                    : null}
            </div>
            <ToggleData data={state} />
            {children}
        </div>
    );
}
