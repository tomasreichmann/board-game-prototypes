import Icon, { isIcon as defaultIsIcon, IconProps, IconMap } from "./Icon";

export type GetIconComponentPropsParamType = { icon: string; className?: string };
export type IconOrImageProps<T> = {
    icon: string;
    className?: string;
    style?: React.CSSProperties;
    IconComponent?: React.ComponentType<T>;
    getIconComponentProps?: (props: GetIconComponentPropsParamType) => T;
    getImgProps?: (props: GetIconComponentPropsParamType) => React.HTMLAttributes<HTMLImageElement>;
    isIcon?: (icon: string) => boolean;
};

export const defaultGetIconComponentProps = (props: GetIconComponentPropsParamType) => props;
export const defaultGetImgProps = ({ icon, ...restProps }: GetIconComponentPropsParamType) => ({
    ...restProps,
    src: icon,
});

export function IconOrImage<T extends {} = IconProps<IconMap>>({
    icon,
    className,
    style = {},
    IconComponent = Icon as unknown as React.ComponentType<T>,
    getIconComponentProps = defaultGetIconComponentProps as unknown as (props: GetIconComponentPropsParamType) => T,
    getImgProps = defaultGetImgProps as unknown as (props: GetIconComponentPropsParamType) => T,
    isIcon = defaultIsIcon,
}: IconOrImageProps<T>) {
    if (!icon) {
        return null;
    }
    if (isIcon(icon)) {
        return <IconComponent {...getIconComponentProps({ icon, className })} style={style} />;
    }
    return <img alt="" {...getImgProps({ icon, className })} style={style} />;
}
