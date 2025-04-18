import Print from "@/components/print/Print";
import { PrintPageProps } from "@/components/print/PrintPage/PrintPage";
import Icon from "../Icon";
import PageCounter from "./PageCounter";
import Page from "./Page";

export const RulesTwoPageLayout = ({
    pages,
    startingPageNumber = 1,
}: {
    pages: React.ReactNode[];
    startingPageNumber: number;
}) => {
    return (
        <>
            {pages.reduce((acc, _page, index) => {
                if (index % 2 === 0) {
                    (acc as React.ReactNode[]).push(
                        <div key={index} className="flex flex-row flex-wrap">
                            <RulesPrintPage pageNumber={startingPageNumber + index}>
                                <Page>
                                    {pages[index]}
                                    <PageCounter current={startingPageNumber + index} />
                                </Page>
                            </RulesPrintPage>
                            {pages[index + 1] && (
                                <RulesPrintPage pageNumber={startingPageNumber + 1 + index}>
                                    <Page>
                                        {pages[index + 1]}
                                        <PageCounter current={startingPageNumber + 1 + index} />
                                    </Page>
                                </RulesPrintPage>
                            )}
                        </div>
                    );
                }
                return acc;
            }, [] as React.ReactNode[])}
        </>
    );
};

export default function RulesPrintPage({ pageNumber, ...props }: PrintPageProps & { pageNumber: number }) {
    return (
        <Print
            {...props}
            className="flex flex-col-reverse"
            documentTitle={"Rules-" + pageNumber}
            buttonProps={{
                className: "self-center flex flex-row items-center",
                children: (
                    <>
                        <Icon icon="print" className="w-6 h-6" />
                        &ensp;Print page {pageNumber}
                    </>
                ),
            }}
        />
    );
}
