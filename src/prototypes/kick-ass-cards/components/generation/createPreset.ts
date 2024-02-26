import { PresetType } from "./stepGeneratorTypes";

const createPreset = <T extends any>(
    name: PresetType<T>["name"],
    scheme: PresetType<T>["scheme"],
    Component: PresetType<T>["Component"],
    componentName: PresetType<T>["componentName"],
    defaultProps: PresetType<T>["defaultProps"] = {},
    additionalProps: PresetType<T>["additionalProps"] = {},
    sampleProps: PresetType<T>["sampleProps"] = {},
    propPrompts: PresetType<T>["propPrompts"] = {}
): PresetType<any> => ({
    name,
    scheme,
    Component,
    componentName,
    defaultProps,
    additionalProps,
    sampleProps,
    propPrompts,
});

export default createPreset;
