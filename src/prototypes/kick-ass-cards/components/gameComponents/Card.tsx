import { twMerge } from "tailwind-merge";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { IconOrImage } from "../../../../components/Icon/IconOrImage";
import { PropsWithChildren } from "react";

export type CardHeaderProps = PropsWithChildren<{
    className?: string;
    icon?: string;
    iconClassName?: string;
    deck?: string;
    deckClassName?: string;
    cornerIcon?: string;
    cornerIconClassName?: string;
}>;

export const CardHeader = ({
    className,
    icon,
    cornerIcon,
    deck,
    deckClassName,
    iconClassName,
    cornerIconClassName,
    children,
}: CardHeaderProps) => {
    return (
        <div className={twMerge("CardHeader flex flex-row items-center gap-1", className)}>
            {icon && <IconOrImage icon={icon} className={twMerge("h-6 text-kac-steel-dark", iconClassName)} />}
            {
                <div className={twMerge("flex-1 text-kac-bone-dark text-right text-xs leading-none", deckClassName)}>
                    {deck}
                </div>
            }
            {cornerIcon && (
                <IconOrImage
                    icon={cornerIcon}
                    className={twMerge("text-kac-bone-dark text-opacity-50 h-4", cornerIconClassName)}
                />
            )}
            {children}
        </div>
    );
};

export type CardBodyProps = {
    className?: string;
    icon?: string;
    iconClassName?: string;
    iconContent?: React.ReactNode;
    title?: string;
    titleClassName?: string;
    children?: React.ReactNode;
    childrenClassName?: string;
};

export const CardBody = ({
    className,
    icon,
    iconClassName,
    iconContent,
    title,
    titleClassName,
    children,
    childrenClassName,
}: CardBodyProps) => {
    return (
        <div
            className={twMerge(
                "CardBody flex-1 relative flex flex-col justify-center items-stretch gap-2 z-10",
                className
            )}
        >
            <div className="flex-1 basis-[60%] flex flex-col items-center justify-end gap-2">
                <div className="flex-1 relative self-stretch ">
                    {icon && (
                        <IconOrImage
                            icon={icon}
                            className={twMerge("absolute w-full h-full object-contain drop-shadow-lg", iconClassName)}
                        />
                    )}
                    {iconContent}
                </div>
                {title && (
                    <div
                        className={twMerge(
                            "font-kacLogo text-kac-iron text-lg leading-none text-center mb-1",
                            titleClassName
                        )}
                    >
                        {title}
                    </div>
                )}
            </div>
            <div
                className={twMerge(
                    "flex-1 basis-[40%] text-xs text-center min-h-[6em] text-kac-iron-light leading-tight text-balance",
                    childrenClassName
                )}
            >
                {children}
            </div>
        </div>
    );
};

export type CardProps = {
    size?: PaperProps["size"];
    backgroundImageUri?: string;
} & Omit<PaperProps, "size">;

export default function Card({
    className,
    children,
    backgroundImageUri = "/KAC/paper.png",
    size = "54x86",
    ...restProps
}: CardProps) {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;
    return (
        <PaperOrDiv
            size={size}
            bleedMm={bleedMm}
            className={twMerge(
                "Card bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch font-kacBody",
                className
            )}
            {...restProps}
        >
            <div
                className="relative flex-1 flex flex-col justify-center items-stretch"
                style={{
                    margin: `-${bleedTopMm}mm -${bleedRightMm}mm -${bleedBottomMm}mm -${bleedLeftMm}mm`,
                    padding: `${bleedTopMm}mm ${bleedRightMm}mm ${bleedBottomMm}mm ${bleedLeftMm}mm`,
                }}
            >
                <img
                    src={backgroundImageUri}
                    alt=""
                    className="absolute left-0 top-0 w-full h-full object-cover max-w-none"
                />
                <div className="flex-1 relative flex flex-col justify-center items-stretch p-3 gap-2 z-10">
                    {children}
                </div>
            </div>
        </PaperOrDiv>
    );
}
