import React, { useEffect, useState } from "react";
import { Navigation } from "../Navigation";
import { PerspectiveView, PerspectiveViewProps } from "../../../../components/perspectiveView/PerspectiveView";
import EffectCard from "../gameComponents/EffectCard";

import effects from "../../data/effects.csv";
import { Position } from "../../../../components/perspectiveView/Position";
import Spread from "../layout/Spread";
import OutcomeBackFace from "../gameComponents/OutcomeBackFace";
import { PerspectiveCard, PerspectiveCardProps } from "../../../../components/perspectiveView/PerspectiveCard";
import { cardSizes } from "../../../../components/print/paperSizes";
import SceneRouter from "../machimagika/scene/SceneRouter";
import { GameContextProvider } from "../machimagika/model/GameContext";

export default function MachimagikaRoute() {
    const [isNavigationVisible, setIsNavigationVisible] = useState(true);
    const [perspectivePreset, setPerspectivePreset] = useState<Partial<PerspectiveViewProps>>({});
    const [firstCardPreset, setFirstCardPreset] = useState<Partial<PerspectiveCardProps>>({});

    useEffect(() => {
        let timeout: number;
        if (isNavigationVisible) {
            timeout = setTimeout(() => {
                setIsNavigationVisible(false);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [isNavigationVisible]);
    return (
        <div className="w-full h-full select-none bg-black">
            <div
                className="absolute left-0 top-0 right-0 z-40 transition-all duration-300 ease-in-out hover:!translate-x-0"
                style={{ transform: isNavigationVisible ? "translateY(0%)" : "translateY(-100%)" }}
            >
                <Navigation className="relative left-0 top-0 right-0" />
                <button
                    className="absolute right-0 top-[100%] translate-y-2 -mt-40 z-30 text-xl pt-40 pb-2 px-4 rounded-tr-none rounded-br-none rounded-tl-none font-bold bg-[rgba(255,255,255,0.5)] border-none outline-none text-black focus:outline-0"
                    onClick={() => setIsNavigationVisible((isNavigationVisible) => !isNavigationVisible)}
                >
                    ☰
                </button>
            </div>
            <GameContextProvider>
                <SceneRouter />
            </GameContextProvider>
            {/* <PerspectiveView
                className="w-full h-full z-0"
                showGrid
                targetX={0}
                targetY={0}
                targetZ={0}
                {...perspectivePreset}
            >
                <div className="absolute left-[0px] top-[0px] -translate-x-1/2 -translate-y-1/2">0x0</div>
                <PerspectiveCard
                    x={-400}
                    rotateY={0}
                    shadow
                    center
                    front={<EffectCard className="outline outline-1 outline-slate-200" {...effects[0]} />}
                    back={<OutcomeBackFace />}
                    {...firstCardPreset}
                />
                <PerspectiveCard
                    x={-200}
                    shadow
                    center
                    front={<EffectCard className="outline outline-1 outline-slate-200" {...effects[1]} />}
                    back={<OutcomeBackFace />}
                />
                <PerspectiveCard
                    x={0}
                    shadow
                    center
                    front={<EffectCard className="outline outline-1 outline-slate-200" {...effects[2]} />}
                    back={<OutcomeBackFace />}
                />
                <PerspectiveCard
                    x={200}
                    shadow
                    center
                    front={<EffectCard className="outline outline-1 outline-slate-200" {...effects[3]} />}
                    back={<OutcomeBackFace />}
                />
                <PerspectiveCard
                    x={400}
                    shadow
                    center
                    front={<EffectCard className="outline outline-1 outline-slate-200" {...effects[4]} />}
                    back={<OutcomeBackFace />}
                />
                <Position center z={-1}>
                    <div
                        style={{ background: "url(/wood2.jpg) center center / 25% repeat" }}
                        className="w-[2000px] h-[2000px] max-w-none max-h-none"
                    />
                </Position>
            </PerspectiveView>
            <div className="absolute left-2 bottom-2 z-20 flex flex-col gap-2">
                <Button
                    size="xs"
                    color="secondary"
                    onClick={() => {
                        setFirstCardPreset((preset) => ({
                            ...preset,
                            z: preset.z === 100 ? 0 : 100,
                        }));
                    }}
                >
                    Raise first card
                </Button>
                <Button
                    size="xs"
                    color="secondary"
                    onClick={() => {
                        setFirstCardPreset((preset) => ({
                            ...preset,
                            rotateY: ((preset.rotateY || 0) + 180) % 360,
                        }));
                    }}
                >
                    Flip first card
                </Button>
                <Button
                    size="xs"
                    color="secondary"
                    onClick={() => {
                        setFirstCardPreset((preset) => ({
                            ...preset,
                            x: preset.x === 200 ? -400 : 200,
                            z: preset.x === 200 ? 0 : 20,
                            rotateZ: preset.x === 200 ? 0 : 20,
                        }));
                    }}
                >
                    Move first card
                </Button>
                <Button
                    size="xs"
                    color="secondary"
                    onClick={() => {
                        setPerspectivePreset({});
                    }}
                >
                    reset view
                </Button>
                <Button
                    size="xs"
                    color="secondary"
                    onClick={() => {
                        setPerspectivePreset({ targetX: -320, targetZ: 0, rotateX: 15, scale: 2 });
                    }}
                >
                    Zoom in on first
                </Button>
            </div> */}
        </div>
    );
}
