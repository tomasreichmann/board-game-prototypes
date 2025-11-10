import Text from "../content/Text";

export type ElementNamesType = "Text";

export enum ElementControlTypeEnum {
    Input = "Input",
    Select = "Select",
    Nodes = "Nodes",
}

export type ElementControlType =
    | {
          type: ElementControlTypeEnum.Select;
          options: any[];
          default?: any;
      }
    | {
          type: ElementControlTypeEnum.Nodes;
          default: React.ReactNode[];
      };

export type SmartDocElementType<P extends Record<string, unknown>> = {
    Component: React.ComponentType<P>;
    componentName: string;
    label: string;
    group: string;
    controls: {
        [Key in keyof P]: ElementControlType;
    };
};

export type ElementMapType = {
    [Key in ElementNamesType]: ElementControlType;
};

export const getDefaultProps = <P extends Record<string, unknown>>(controls: SmartDocElementType<P>["controls"]) => {
    return Object.fromEntries(
        (Object.entries(controls) as [keyof P, ElementControlType][]).map(([key, control]) => [key, control.default])
    );
};

const smartDocElementMap: {
    [Key in ElementNamesType]: SmartDocElementType<any>;
} = {
    Text: {
        Component: Text,
        componentName: "Text",
        label: "Text",
        group: "Format",
        controls: {
            variant: {
                type: ElementControlTypeEnum.Select,
                options: ["body", "h1", "h2", "h3", "h4", "h5", "h6"],
                default: "body",
            },
            color: {
                type: ElementControlTypeEnum.Select,
                options: ["body", "primary", "success", "danger", "info"],
            },
            children: {
                type: ElementControlTypeEnum.Nodes,
                default: ["Text"],
            },
        },
    },
};

export default smartDocElementMap;
