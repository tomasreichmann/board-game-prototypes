import { HTMLAttributes } from "react";
import clsx from "clsx";
import { Button } from "react-daisyui";
import ComponentList from "../ComponentList";

import { StepGeneratorActionTypeEnum, useStepGenerator } from "./useStepGenerator";

export default function PresetStep({ className, children }: HTMLAttributes<HTMLDivElement>) {
    const { state, dispatch } = useStepGenerator();
    return (
        <div className="flex flex-col gap-5">
            <div className={clsx("mt-5 print:hidden flex flex-row gap-5 flex-wrap", className)}>
                <ComponentList className="">
                    {state.presets.map((preset, presetIndex) => (
                        <div className="flex flex-col gap-2 items-center" key={preset.name + "-" + presetIndex}>
                            {<preset.Component {...preset.defaultProps} />}
                            <Button
                                onClick={() =>
                                    dispatch({ type: StepGeneratorActionTypeEnum.SetPreset, presetName: preset.name })
                                }
                                color="secondary"
                                className="h-auto text-left normal-case font-normal"
                            >
                                Select: {preset.name}
                            </Button>
                        </div>
                    ))}
                </ComponentList>
            </div>
        </div>
    );
}
