import { twMerge } from "tailwind-merge";
import ChunkedPages from "../print/ChunkedPages";
import ToggleData from "../../../../components/DataToggle";
import Print from "../../../../components/print/Print";
import Icon from "../Icon";
import { useChunkedPagesProps, useItemAdapter } from "./printControlUtils";
import dividers from "../../data/dividers";
import CardDivider, { CardDividerBackFace } from "../gameComponents/CardDivider";
import ColorBars from "../../../../components/print/PrintMarker/ColorBars";
import RegistrationMark from "../../../../components/print/PrintMarker/RegistrationMark";

export type DividersPrintControlsProps = {
    className?: string;
};

export default function DividersPrintControls({ className }: DividersPrintControlsProps) {
    const { ...chunkedPagesProps } = useChunkedPagesProps();
    const items = useItemAdapter(dividers).map((item) => ({
        ...item,
        orientation: "portrait" as const,
        size: "54x96" as const,
        className: "relative",
        style: undefined,
    }));
    return (
        <div className={twMerge("flex flex-col gap-4 print:gap-0", className)}>
            <ToggleData data={items} initialCollapsed className="print:hidden mt-4" />
            <Print
                className="flex flex-col-reverse gap-2"
                buttonProps={{
                    className: "self-center flex flex-row items-center",
                    children: (
                        <>
                            <Icon icon="print" className="w-6 h-6" />
                            &ensp;Print all pages
                        </>
                    ),
                }}
            >
                <div className="flex flex-col items-center w-full">
                    <ChunkedPages
                        {...chunkedPagesProps}
                        Component={CardDivider}
                        frontFacePrintPageProps={{
                            ...chunkedPagesProps.frontFacePrintPageProps,
                            orientation: "portrait",
                            children: (
                                <>
                                    <RegistrationMark className="absolute top-0 left-0" />
                                    <RegistrationMark className="absolute top-0 right-0" />
                                    <ColorBars className="absolute bottom-0 right-6 origin-top-right" />
                                    <ColorBars className="absolute top-0 left-6 origin-bottom-left" />
                                    <RegistrationMark className="absolute bottom-0 right-0" />
                                    <RegistrationMark className="absolute bottom-0 left-0" />
                                </>
                            ),
                        }}
                        frontFacePageContentProps={{
                            ...chunkedPagesProps.frontFacePageContentProps,
                            style: undefined,
                            className: "pt-8 pb-8",
                        }}
                        backFacePrintPageProps={{
                            ...chunkedPagesProps.backFacePrintPageProps,
                            orientation: "portrait",
                            children: (
                                <>
                                    <RegistrationMark className="absolute top-0 left-0" />
                                    <RegistrationMark className="absolute top-0 right-0" />
                                    <ColorBars className="absolute bottom-0 right-6 origin-top-right" />
                                    <ColorBars className="absolute top-0 left-6 origin-bottom-left" />
                                    <RegistrationMark className="absolute bottom-0 right-0" />
                                    <RegistrationMark className="absolute bottom-0 left-0" />
                                </>
                            ),
                        }}
                        backFacePageContentProps={{
                            ...chunkedPagesProps.backFacePageContentProps,
                            style: undefined,
                            className: "pt-8 pb-8",
                        }}
                        BackFaceComponent={CardDividerBackFace}
                        items={items}
                        itemsPerPage={3 * 2}
                        label="dividers"
                        labelPosition="top"
                    />
                </div>
            </Print>
        </div>
    );
}
