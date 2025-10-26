import React, { PropsWithChildren, useCallback } from "react";
import { EffectType } from "../types/effectTypes";
import Button from "@/prototypes/kick-ass-cards/components/controls/Button";
import Image from "@/prototypes/kick-ass-cards/components/Image";
import { useEffectBoard } from "../hooks/useEffectBoard";

export type EffectButtonProps = PropsWithChildren & { effect: EffectType };

export default function EffectButton({ children, effect }: EffectButtonProps) {
    const { dispatch } = useEffectBoard();
    const handleButtonClick = useCallback(() => {
        dispatch({ type: "playEffect", effect });
    }, [effect]);

    return (
        <div className="EffectButton flex flex-col gap-4">
            <Button onClick={handleButtonClick}>
                <Image src={effect.icon} className="h-16" />
                {effect.title}
            </Button>
            {children}
        </div>
    );
}
