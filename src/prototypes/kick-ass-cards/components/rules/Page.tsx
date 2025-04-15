import React from "react";
import Paper, { PaperProps } from "@/components/print/Paper/Paper";

export type PageProps = Partial<PaperProps>;

export default function Page(props: PageProps) {
    return (
        <Paper sizeInMm={[100, 210]} bleedMm={3} bleedClassName="bg-[url(/mighty-decks/base/a5-paper.png)] bg-cover bg-center" trimClassName="px-[5mm] pt-[10mm] pb-[15mm]" {...props} />
    );
}
