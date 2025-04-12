import React from "react";
import { Navigation } from "../Navigation";
import PrintPage from "@/components/print/PrintPage/PrintPage";
import twm from "@/utils/twm";
import Print from "@/components/print/Print";
import Icon from "@/components/Icon/Icon";
import StuntCard from "../gameComponents/StuntCard";
import { stuntMap } from "../../data/stunts-en-deck";
import Scaled from "@/components/Scaled/Scaled";
import PrintMarkerCorners from "@/components/print/PrintMarker/PrintMarkerCorners";
import Paper from "@/components/print/Paper/Paper";
import Text, { H1, Title } from "../rules/Text";
import CoverPage from "../rules/CoverPage";
import Page from "../rules/Page";
import Introduction from "../rules/Introduction";
import PageCounter from "../rules/PageCounter";

export default function RulesRoute() {
    const headingClassName = [
        "text-kac-cloth-dark",
        "font-kacHeading",
        "font-bold",
        "leading-tight",
        "tracking-tighter",
    ].join(" ");
    const bodyClassName = "text-kac-iron";
    console.log("stuntMap", stuntMap);
    return (
        <>
            <Navigation />
            <div className="flex-1 mt-4 print:m-0 w-full text-kac-iron p-2 md:px-10 bg-white">
                <section className="flex flex-col gap-8 ">
                    <div className="flex-1 flex flex-col relative">
                        <Print
                            className="flex flex-col-reverse gap-2 w-[200mm]"
                            documentTitle="Rules"
                            buttonProps={{
                                className: "self-center flex flex-row items-center",
                                children: (
                                    <>
                                        <Icon icon="print" className="w-6 h-6" />
                                        &ensp;Print page
                                    </>
                                ),
                            }}
                        >
                            <CoverPage />
                        </Print>
                        <Print
                            className="flex flex-col-reverse gap-2 w-[200mm]"
                            documentTitle="Rules"
                            buttonProps={{
                                className: "self-center flex flex-row items-center",
                                children: (
                                    <>
                                        <Icon icon="print" className="w-6 h-6" />
                                        &ensp;Print page
                                    </>
                                ),
                            }}
                        >
                            <Page>
                                <Introduction />
                                <PageCounter current={1} />
                            </Page>
                        </Print>
                        {/* <PrintPage sizeInMm={[100, 210]} className="outline outline-kac-steel-light" >
                                    <h2 className={twm("text-3xl", headingClassName)}>3xl sample heading</h2>
                                    <p className={twm("text-3xl", bodyClassName)}>
                                        Lorem ipsum dolor.
                                    </p>
                                    <h2 className={twm("text-2xl", headingClassName)}>2xl sample heading</h2>
                                    <p className={twm("text-2xl", bodyClassName)}>
                                        Lorem ipsum dolor sit amet.
                                    </p>
                                    <h2 className={twm("text-xl", headingClassName)}>xl sample heading</h2>
                                    <p className={twm("text-xl", bodyClassName)}>
                                        Lorem ipsum dolor sit amet. Consecteteur.
                                    </p>
                                    <h2 className={twm("text-lg", headingClassName)}>lg sample heading</h2>
                                    <p className={twm("text-lg", bodyClassName)}>
                                        Lorem ipsum dolor sit amet. Consecteteur.
                                    </p>
                                    <h2 className={twm("text-md", headingClassName)}>md sample heading</h2>
                                    <p className={twm("text-md", bodyClassName)}>
                                        Lorem ipsum dolor sit amet. Consecteteur.
                                    </p>
                                    <h2 className={twm("text-sm", headingClassName)}>sm sample heading</h2>
                                    <p className={twm("text-sm", bodyClassName)}>
                                        Lorem ipsum dolor sit amet. Consecteteur.
                                    </p>
                                    <h2 className={twm("text-xs", headingClassName)}>xs sample heading</h2>
                                    <p className={twm("text-xs", bodyClassName)}>
                                        Lorem ipsum dolor sit amet. Consecteteur.
                                    </p>
                                    <h2 className={twm("text-2xs", headingClassName)}>2xs sample heading</h2>
                                    <p className={twm("text-2xs", bodyClassName)}>
                                        Lorem ipsum dolor sit amet. Consecteteur.
                                    </p>
                                    <h2 className={twm("text-3xs", headingClassName)}>3xs sample heading</h2>
                                    <p className={twm("text-3xs", bodyClassName)}>
                                        Lorem ipsum dolor sit amet. Consecteteur.
                                    </p>
                                    <div className="flex flex-row">
                                        <Scaled className="absolute right-[10mm] bottom-[40%]" scale={0.5} ><StuntCard size="54x86" {...stuntMap.offensiveThrow} /></Scaled>
                                        <Scaled scale={0.75} ><StuntCard size="54x86" {...stuntMap.offensiveThrow} /></Scaled>
                                        <StuntCard size="54x86" {...stuntMap.offensiveThrow} />
                                    </div>
                                </PrintPage> */}
                    </div>
                </section>
            </div>
        </>
    );
}
