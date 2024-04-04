import { AnyRecord } from "../../../../utils/simpleTypes";
import { PresetType } from "./stepGeneratorTypes";

const createPreset = <T extends AnyRecord>(
    name: PresetType<T>["name"],
    meta: PresetType<T>["meta"],
    Component: PresetType<T>["Component"],
    componentName: PresetType<T>["componentName"],
    defaultProps: PresetType<T>["defaultProps"] = {},
    additionalProps: PresetType<T>["additionalProps"] = {},
    sampleProps: PresetType<T>["sampleProps"] = {},
    propPrompts: PresetType<T>["propPrompts"] = {}
): PresetType<any> => ({
    name,
    scheme: meta.schema,
    meta,
    Component,
    componentName,
    defaultProps,
    additionalProps,
    sampleProps,
    propPrompts,
});

export default createPreset;
