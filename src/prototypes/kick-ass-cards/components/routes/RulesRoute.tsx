import { Navigation } from "../Navigation";
import CoverPage from "../rules/CoverPage";
import Page from "../rules/Page";
import Introduction from "../rules/Introduction";
import PageCounter from "../rules/PageCounter";
import Components from "../rules/Components";
import RunningTheGame from "../rules/RunningTheGame";
import RulesPrintPage from "../rules/RulesPrintPage";

export default function RulesRoute() {
    return (
        <>
            <Navigation />
            <div className="flex-1 mt-4 print:m-0 w-full text-kac-iron p-2 md:px-10 bg-white flex flex-col">
                <section className="flex flex-col gap-8 self-center">
                    <div className="flex flex-row flex-wrap justify-end">
                        <RulesPrintPage pageNumber={0} >
                            <CoverPage />
                        </RulesPrintPage>
                    </div>
                    <div className="flex flex-row flex-wrap">
                        <RulesPrintPage pageNumber={1} >
                            <Page>
                                <Introduction />
                                <PageCounter current={1} />
                            </Page>
                        </RulesPrintPage>
                        <RulesPrintPage pageNumber={2} >
                            <Page>
                                <Components />
                                <PageCounter current={2} />
                            </Page>
                        </RulesPrintPage>
                    </div>
                    <RunningTheGame />
                </section>
            </div>
        </>
    );
}
