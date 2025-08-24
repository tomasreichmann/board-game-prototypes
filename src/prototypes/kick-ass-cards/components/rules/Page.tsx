import React from "react";
import Paper, { PaperProps } from "@/components/print/Paper/Paper";

export type PageProps = Partial<PaperProps>;

export default function Page(props: PageProps) {
    const widthMm = 100;
    const heightMm = 210;
    const bleedInMm = 3;
    const margin = "0mm";
    return (
        <>
            <style>{`
            @media print {
              @page {
                size: ${widthMm}mm ${heightMm}mm;
                margin: ${margin};
              }
            }
                  `}</style>
            <Paper
                sizeInMm={[widthMm, heightMm]}
                bleedMm={bleedInMm}
                bleedClassName="bg-[url(/mighty-decks/base/a5-paper.png)] bg-cover bg-center"
                trimClassName="px-[5mm] pt-[10mm] pb-[15mm]"
                {...props}
            />
        </>
    );
}
