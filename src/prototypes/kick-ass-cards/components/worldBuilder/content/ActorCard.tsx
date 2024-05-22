import React, { PropsWithChildren } from "react";
import Paper from "../../../../../components/print/Paper/Paper";
import { cardSizes } from "../../../../../components/print/paperSizes";
import { twMerge } from "tailwind-merge";
import Editable, {
    ControlMapType,
    EditableControlItemType,
    EditableProps,
} from "../../../../../components/Editable/Editable";
import Input from "../../controls/Input";
import Select from "../../controls/Select";

export type ActorCardProps = PropsWithChildren<{
    cardSize?: keyof typeof cardSizes;
    currentPower?: number;
    className?: string;
    imageUri?: string;
    name: string;
}>;

const controlMap: ControlMapType<string, ActorCardProps> = {
    text: ({ label, value, onChange, prop }) => {
        return (
            <Input label={label} type="text" value={String(value)} onChange={(e) => onChange(prop, e.target.value)} />
        );
    },
    number: ({ label, value, onChange, prop }) => {
        return (
            <Input
                type="number"
                label={label}
                value={parseFloat(value as any)}
                onChange={(e) => onChange(prop, Number(e.target.value))}
            />
        );
    },
    select: ({ label, inputProps: { options = [], ...inputProps } = {}, value, onChange, prop }) => {
        return (
            <Select
                {...inputProps}
                type="number"
                label={label}
                options={options}
                value={parseFloat(value as any)}
                onChange={(e) => onChange(prop, e.target.value)}
            />
        );
    },
};

export const controls: EditableControlItemType<ActorCardProps, typeof controlMap>[] = [
    {
        prop: "imageUri",
        label: "Image URI",
        type: "text",
        optional: true,
    },
    {
        prop: "name",
        label: "Name",
        type: "text",
    },
    {
        prop: "currentPower",
        label: "Current Power",
        type: "number",
        optional: true,
        inputProps: {
            min: 0,
        },
    },
    {
        prop: "cardSize",
        label: "Card Size",
        type: "select",
        inputProps: {
            options: Object.keys(cardSizes).map((key) => {
                return {
                    label: key,
                    value: key,
                } as const;
            }),
        },
    },
];

export type ActorCardEditableAllProps = EditableProps<ActorCardProps, keyof typeof controlMap, typeof controlMap>;
export type ActorCardEditableProps = Partial<ActorCardEditableAllProps> &
    Pick<ActorCardEditableAllProps, "onChange" | "props">;

export const ActorCardEditable = ({ onChange, props, ...restProps }: ActorCardEditableProps) => {
    return (
        <Editable
            {...restProps}
            Component={ActorCard}
            controlMap={controlMap}
            controls={controls}
            props={props}
            formClassName="p-4 pt-6 bg-white relative -mt-2 z-10 rounded-b-md shadow-md text-kac-iron"
            editButtonClassName="pt-4 relative -mt-2 z-0"
            onChange={onChange}
        />
    );
};

export default function ActorCard({
    className,
    name,
    currentPower,
    imageUri,
    cardSize = "Tarot",
    children,
}: ActorCardProps) {
    return (
        <Paper
            size={cardSize}
            className={twMerge(
                "ActorCard bg-white rounded-md flex flex-col gap-2 justify-end items-stretch relative drop-shadow-md",
                className
            )}
        >
            {imageUri && (
                <img
                    src={imageUri}
                    className="absolute left-0 top-0 w-full h-full rounded-md object-cover"
                    draggable="false"
                />
            )}
            {currentPower && (
                <div className="absolute top-0 right-0 rounded-se-md overflow-hidden min-w-[40px] min-h-[40px]">
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.75)_60%,rgba(0,0,0,0)_100%)] text-3xl text-kac-fire text-right -mt-4 -mr-4 rounded-full font-bold pr-8 pt-8 pb-4 pl-4 leading-none">
                        {currentPower}
                    </div>
                </div>
            )}
            <h2 className="text-xl text-kac-monster-light text-center font-bold p-2 pt-8 pb-4 bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_60%,rgba(0,0,0,0)_100%)] rounded-bl-md rounded-br-md overflow-hidden relative z-10">
                {name}
            </h2>
            {children}
        </Paper>
    );
}
