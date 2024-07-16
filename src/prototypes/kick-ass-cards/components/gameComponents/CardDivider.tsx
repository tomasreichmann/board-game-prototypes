import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import { PropsWithChildren } from "react";
import Card, { CardHeader } from "./Card";
import Icon from "../Icon";

export type CardDividerType = {
    heading: string;
    imageUri: string;
    iconUri: string;
    backfaceUri: string;
    color: React.CSSProperties["color"];
};

export type CardDividerProps = CardDividerType & {
    size?: PaperProps["size"];
} & Omit<PaperProps, "size">;

export default function CardDivider({
    className,
    children,
    heading,
    iconUri,
    imageUri,
    backfaceUri,
    color,
    size = "54x96",
    ...restProps
}: CardDividerProps) {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;
    return (
        <Card {...restProps} size={size} className={twMerge("CardDivider", className)}>
            <div className="-m-3 mb-0">
                <div
                    className={twMerge("bg-opacity-25 bg-blend-multiply ", color)}
                    style={{
                        minHeight: 16 + bleedTopMm + "mm",
                        marginTop: -bleedTopMm + "mm",
                        marginBottom: -bleedBottomMm + "mm",
                        marginLeft: -bleedLeftMm + "mm",
                        marginRight: -bleedRightMm + "mm",
                        paddingTop: bleedTopMm + "mm",
                        paddingRight: bleedRightMm + "mm",
                        paddingBottom: bleedBottomMm + "mm",
                        paddingLeft: bleedLeftMm + "mm",
                        maskImage: "linear-gradient(to bottom, black 80%, transparent)",
                    }}
                >
                    <div className="p-3 pb-3 flex flex-row items-top gap-1 -mt-[0.5mm]">
                        <div className="flex-1 text-kac-iron-light text-sm font-kacLogo leading-[0.85]">{heading}</div>
                        <IconOrImage icon={iconUri} className="text-kac-iron text-opacity-50 h-6 -mt-2" />
                    </div>
                </div>
            </div>

            <div className="flex-1 relative self-stretch mt-[20%] mb-[40%] mx-[5%] drop-shadow-lg">
                {imageUri && (
                    <IconOrImage icon={imageUri} className="absolute w-full h-full object-contain drop-shadow-lg" />
                )}
            </div>
        </Card>
    );
}

export function CardDividerBackFace({
    className,
    children,
    heading,
    iconUri,
    imageUri,
    backfaceUri,
    color,
    size = "54x96",
    ...restProps
}: CardDividerProps) {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;
    return (
        <Card
            {...restProps}
            size={size}
            backgroundImageUri="/KAC/paper-dark.png"
            className={twMerge("CardDivider", className)}
        >
            <div className="-m-3 mb-0">
                <div
                    className={twMerge("bg-opacity-25 bg-blend-multiply ", color)}
                    style={{
                        minHeight: 16 + bleedTopMm + "mm",
                        marginTop: -bleedTopMm + "mm",
                        marginBottom: -bleedBottomMm + "mm",
                        marginLeft: -bleedLeftMm + "mm",
                        marginRight: -bleedRightMm + "mm",
                        paddingTop: bleedTopMm + "mm",
                        paddingRight: bleedRightMm + "mm",
                        paddingBottom: bleedBottomMm + "mm",
                        paddingLeft: bleedLeftMm + "mm",
                        maskImage: "linear-gradient(to bottom, black 80%, transparent)",
                    }}
                >
                    <div className="p-3 pb-3 flex flex-row items-top gap-1 -mt-[0.5mm]">
                        <div className="flex-1 text-white mix-blend-hard-light opacity-90 text-sm font-kacLogo leading-[0.85] text-shadow-sm shadow-black/50">
                            {heading}
                        </div>
                        <IconOrImage icon={iconUri} className="text-kac-bone-light h-6 -mt-2" />
                    </div>
                </div>
            </div>

            <div className="flex-1 relative self-stretch mt-[20%] mb-[40%] mx-[0%] drop-shadow-lg">
                {imageUri && (
                    <IconOrImage icon={imageUri} className="absolute w-full h-full object-contain drop-shadow-lg" />
                )}
            </div>
        </Card>
    );
}
