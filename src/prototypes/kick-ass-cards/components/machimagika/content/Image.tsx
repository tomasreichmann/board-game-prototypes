import { twMerge } from "tailwind-merge";
import { SharedContentProps } from "./sharedContentProps";

export type ImageProps = {
    src: string;
} & React.ImgHTMLAttributes<HTMLImageElement> &
    SharedContentProps;

export default function Image({ src, className, componentMap, children, ...restProps }: ImageProps) {
    return <img src={src} className={twMerge("w-full h-full object-cover", className)} {...restProps} />;
}
