import { range } from "lodash";
import React from "react";
import Icon from "../Icon";
import { cardSizes } from "../../../../components/print/paperSizes";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import PaperCraftBox from "../PaperCraftBox";

const copies = 6;

export default function PlayerBoxPages() {
    const safetyMargin = 5;
    return (
        <>
            {range(copies).map((pageIndex) => (
                <PrintPage key={"page-" + pageIndex}>
                    <div className="flex-1 flex flex-col content-center items-stretch">
                        <PaperCraftBox
                            contentWidth={cardSizes["Mini US game"].mm[0] + safetyMargin}
                            contentHeight={cardSizes["Mini US game"].mm[1] + safetyMargin}
                            contentDepth={20}
                            classNameVisible="bg-kac-bone-light"
                            bendStyles={{ borderColor: "#a3835f" }}
                            contentLidOutsideTop={
                                <div className="h-full w-full flex flex-col justify-center items-center ">
                                    <Icon icon="backpack" className="text-kac-fire-dark h-16" />
                                    <div className="w-32 text-lg border-kac-bone-dark border-b-2 border-dashed min-h-16" />
                                </div>
                            }
                        />
                    </div>
                </PrintPage>
            ))}
            <PrintPage key="page-gm">
                <div className="flex-1 flex flex-col content-center items-stretch">
                    <PaperCraftBox
                        contentWidth={cardSizes["Mini US game"].mm[0] + safetyMargin}
                        contentHeight={cardSizes["Mini US game"].mm[1] + safetyMargin}
                        contentDepth={30}
                        classNameVisible="bg-kac-steel"
                        bendStyles={{ borderColor: "#65738b" }}
                        contentLidOutsideTop={
                            <div className="h-full w-full flex flex-col justify-center items-center ">
                                <Icon icon="crownedSkull" className="text-kac-blood-dark h-16" />
                                <div className="w-32 text-lg text-kac-blood-dark min-h-10 mt-4 text-center font-kacLogo">
                                    Game Master
                                </div>
                            </div>
                        }
                    />
                </div>
            </PrintPage>
        </>
    );
}
