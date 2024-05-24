import React from "react";
import { PaperOrDiv, PaperProps } from "../../../../components/print/Paper/Paper";
import { twMerge } from "tailwind-merge";

export type WgBusinessCardProps = React.PropsWithChildren<
    {
        name: string;
        role: string;
        product: string;
        company: string;
        email: string;
        phone: string;
        url: string;
    } & Partial<PaperProps>
>;

export default function WgBusinessCard({
    className,
    name,
    role,
    product,
    company,
    email,
    phone,
    url,
    children,
    ...restProps
}: WgBusinessCardProps) {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;
    return (
        <PaperOrDiv
            className={twMerge(
                "WgBusinessCard bg-white rounded-lg print:rounded-none flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="flex-1 flex flex-col justify-start items-stretch"
                style={{
                    margin: `-${bleedTopMm}mm -${bleedRightMm}mm -${bleedBottomMm}mm -${bleedLeftMm}mm`,
                    padding: `${bleedTopMm}mm ${bleedRightMm}mm ${bleedBottomMm}mm ${bleedLeftMm}mm`,
                    background: `url(/misc/wg-business-card-blank.png) center center / contain no-repeat`,
                    fontFamily: "Roboto, sans-serif",
                    color: "white",
                }}
            >
                <div className="pl-[33px] pt-[42px] text-[9px] leading-tight">
                    <div className="text-[15.5px] font-bold">{name}</div>
                    <div className="mt-[1px]">{role}</div>
                    <div>{product}</div>
                    <div className="text-[#EC1E27] text-[11.5px] font-bold mt-[14px] mb-[4px]">{company}</div>
                    <div className="mb-[8px]">{email}</div>
                    <div className="mb-[8px]">{phone}</div>
                    <div>{url}</div>
                </div>
            </div>
        </PaperOrDiv>
    );
}

export const WgBusinessCardBackFace = ({ className, children, ...restProps }: Partial<PaperProps>) => {
    const {
        bleedMm = 0,
        bleedTopMm = bleedMm,
        bleedRightMm = bleedMm,
        bleedBottomMm = bleedMm,
        bleedLeftMm = bleedMm,
    } = restProps;
    return (
        <PaperOrDiv
            className={twMerge(
                "WgBusinessCardBackFace gap-2 print:rounded-none flex flex-col justify-stretch items-stretch",
                className
            )}
            {...restProps}
        >
            <div
                className="flex-1 flex flex-col justify-center items-stretch"
                style={{
                    margin: `-${bleedTopMm}mm -${bleedRightMm}mm -${bleedBottomMm}mm -${bleedLeftMm}mm`,
                    padding: `${bleedTopMm}mm ${bleedRightMm}mm ${bleedBottomMm}mm ${bleedLeftMm}mm`,
                    background: `url(/misc/wg-business-card-back.png) center center / contain no-repeat`,
                }}
            ></div>
        </PaperOrDiv>
    );
};
