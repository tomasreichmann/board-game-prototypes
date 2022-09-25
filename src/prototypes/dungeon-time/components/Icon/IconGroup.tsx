import Icon, { IconProps, IconType } from "./Icon";

export type IconGroupProps = {
    icons: IconType[];
} & Omit<IconProps, "icon">;

export default function IconGroup({ icons, ...iconProps }: IconGroupProps) {
    return (
        <>
            {icons.map((icon, iconIndex) => (
                <Icon key={iconIndex + "-" + icon} icon={icon} {...iconProps} />
            ))}
        </>
    );
}
