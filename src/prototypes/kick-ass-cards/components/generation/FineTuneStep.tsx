import { HTMLAttributes } from "react";
import clsx from "clsx";
import { Button } from "react-daisyui";
import ComponentList from "../ComponentList";

import { StepGeneratorActionTypeEnum, useStepGenerator } from "./useStepGenerator";
import { twMerge } from "tailwind-merge";
import Input from "../controls/Input";

const getTypeFromValue = (value: any) => {
    if (typeof value === "number") {
        return "number";
    }
    if (typeof value === "boolean") {
        return "checkbox";
    }
    if (typeof value === "string" && value.length > 20) {
        return "textarea";
    }
    return "text";
};

export default function FineTuneStep({ className, children }: HTMLAttributes<HTMLDivElement>) {
    const { state, dispatch } = useStepGenerator();

    const preset = state.presets.find((preset) => preset.name === state.presetName);

    return (
        <div className={twMerge("flex flex-col gap-5", className)}>
            {Object.entries(state?.presetProps || {}).map(([key, value]) => {
                const type = getTypeFromValue(value);
                return (
                    <Input
                        type={type}
                        label={key}
                        labelClassName="max-w-none"
                        className="w-full max-w-none"
                        value={value}
                        textareaProps={{ rows: type === "textarea" ? 3 : undefined }}
                        onChange={(event) =>
                            dispatch({
                                type: StepGeneratorActionTypeEnum.Update,
                                updater: (state) => ({
                                    ...state,
                                    presetProps: { ...state.presetProps, [key]: event.target.value },
                                }),
                            })
                        }
                    />
                );
            })}
            {children}
        </div>
    );
}
