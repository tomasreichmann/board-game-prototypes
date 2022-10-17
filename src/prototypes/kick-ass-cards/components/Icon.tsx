import { mapValues } from "lodash";
import GenericIcon, { IconProps as GenericIconProps, iconMap as genericIconMap } from "../../../components/Icon/Icon";

export const aliasMap = {} as const;
export type IconProps = Omit<GenericIconProps<typeof aliasMap>, "aliasMap">;

export const iconMap = { ...genericIconMap, ...mapValues(aliasMap, (value) => genericIconMap[value]) };

export type IconType = keyof typeof iconMap;

export default function Icon(props: IconProps) {
    return <GenericIcon {...props} aliasMap={{}} />;
}
