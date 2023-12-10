import { twMerge } from "tailwind-merge";
import Button from "../../prototypes/kick-ass-cards/components/content/Button";

export type ControlMapType<ControlTypes extends string, Props extends {}> = {
    [key in ControlTypes]: React.ComponentType<ControlProps<Props>>;
};

export type EditableControlItemType<Props extends {}, ControlMap extends {}> = {
    prop: keyof Props;
    type: keyof ControlMap;
    label: string;
    optional?: boolean;
    inputProps?: {
        [key: string]: any;
    };
};

export type ControlProps<Props extends {}, Prop extends keyof Props = keyof Props> = {
    prop: Prop;
    label: string;
    value?: Props[Prop];
    error?: string;
    disabled?: boolean;
    optional?: boolean;
    inputProps?: {
        [key: string]: any;
    };
    onChange: (prop: Prop, value: Props[Prop]) => void;
};

export type EditablePropsBase<
    Props extends {},
    ControlTypes extends string,
    ControlMap extends ControlMapType<ControlTypes, Props>
> = {
    preview?: boolean;
    disabled?: boolean;
    editing?: boolean;
    props: Props;
    controls: EditableControlItemType<Props, ControlMap>[];
    controlMap: ControlMap;
    Component: React.ComponentType<Props>;
    onChange: (prop: keyof Props, value: unknown) => void;
};

export type EditableProps<
    Props extends {},
    ControlTypes extends string,
    ControlMap extends ControlMapType<ControlTypes, Props>
> = EditablePropsBase<Props, ControlTypes, ControlMap> & {
    formClassName?: string;
    editButtonClassName?: string;
    hideEditToggleButton?: boolean;
    onEditToggle?: () => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, keyof EditablePropsBase<Props, ControlTypes, ControlMap>>;

export default function Editable<
    Props extends {},
    ControlTypes extends string,
    ControlMap extends ControlMapType<ControlTypes, Props>
>({
    preview,
    disabled,
    editing,
    hideEditToggleButton = false,
    props,
    controls,
    controlMap,
    Component,
    onChange,
    onEditToggle,
    className,
    formClassName,
    editButtonClassName,
}: EditableProps<Props, ControlTypes, ControlMap>) {
    return (
        <div className={twMerge("Editable", className)}>
            {(!editing || preview) && <Component {...props} />}

            {editing && (
                <div className={twMerge("flex flex-col gap-2", formClassName)}>
                    {controls.map((control, controlIndex) => {
                        const Control = controlMap[control.type] as React.ComponentType<ControlProps<Props>>;
                        if (!Control) {
                            return (
                                <div className="text-red-500" key={controlIndex}>
                                    Control type {String(control.type)} not found
                                </div>
                            );
                        }
                        return (
                            <Control
                                key={controlIndex}
                                disabled={disabled}
                                {...control}
                                value={props[control.prop]}
                                onChange={onChange}
                            />
                        );
                    })}
                </div>
            )}
            {!hideEditToggleButton && (
                <Button onClick={onEditToggle} color="info" className={twMerge("cursor-pointer", editButtonClassName)}>
                    📝
                </Button>
            )}
        </div>
    );
}
