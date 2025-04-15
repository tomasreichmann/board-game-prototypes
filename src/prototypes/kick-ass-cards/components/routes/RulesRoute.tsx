import { Navigation } from "../Navigation";
import { PrintPageProps } from "@/components/print/PrintPage/PrintPage";
import Print from "@/components/print/Print";
import Icon from "@/components/Icon/Icon";
import CoverPage from "../rules/CoverPage";
import Page from "../rules/Page";
import Introduction from "../rules/Introduction";
import PageCounter from "../rules/PageCounter";
import Components from "../rules/Components";
import Setup from "../rules/Setup";

const CustomPrintPage = ({pageNumber, ...props}: PrintPageProps & { pageNumber: number}) => {
    return (
        <Print
            {...props}
            className="flex flex-col-reverse"
            documentTitle={'Rules-' + pageNumber}
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
};

export default function RulesRoute() {
    return (
        <>
            <Navigation />
            <div className="flex-1 mt-4 print:m-0 w-full text-kac-iron p-2 md:px-10 bg-white">
                <section className="flex flex-col gap-8 ">
                    <div className="flex-1 flex flex-row flex-wrap">
                        <CustomPrintPage pageNumber={0} >
                            <CoverPage />
                        </CustomPrintPage>
                        <CustomPrintPage pageNumber={1} >
                            <Page>
                                <Introduction />
                                <PageCounter current={1} />
                            </Page>
                        </CustomPrintPage>
                        <CustomPrintPage pageNumber={2} >
                            <Page>
                                <Components />
                                <PageCounter current={2} />
                            </Page>
                        </CustomPrintPage>
                        <CustomPrintPage pageNumber={3} >
                            <Page>
                                <Setup />
                                <PageCounter current={3} />
                            </Page>
                        </CustomPrintPage>
                    </div>
                </section>
            </div>
        </>
    );
}
