import React from "react";
import Toggle from "../../../../components/Toggle";
import Credits from "../content/Credits";

import DataPreview from "../../../../components/DataPreview";
import Table from "../../../../components/Table";
import { buildingsData, clanChiefsData, componentsData, eventsData } from "../../data";

export default function DataRoute() {
    return (
        <div className="mt-4 print:m-0 w-full text-jd-iron md:py-5 px-2 md:px-10 container">
            <Toggle buttonContent="Components" className="mb-5">
                <div className="overflow-x-auto w-full mb-2">
                    <Table
                        header={[
                            ["name", "Name", 200],
                            ["imageUri", "Image URI"],
                            ["width", "Width"],
                            ["height", "Height"],
                            ["thickness", "Thickness"],
                            ["form", "Form"],
                            ["material", "Material"],
                            ["punchout", "Punchout"],
                            ["variations", "Variations"],
                            ["count", "Count"],
                            ["pricePerPiece", "Price Per Piece"],
                            ["priceTotal", "Price Total"],
                            ["description", "Description", 200],
                        ]}
                        rows={componentsData}
                        adapters={{ imageUri: (imageUri) => <img src={String(imageUri)} className="w-full" /> }}
                    />
                </div>
                <Toggle buttonContent="Components Data" initialCollapsed>
                    <DataPreview data={componentsData} />
                </Toggle>
            </Toggle>
            <Toggle buttonContent="Clan Chiefs" className="mb-5">
                <div className="overflow-x-auto w-full mb-2">
                    <Table
                        header={[
                            ["name", "Name"],
                            ["imageUri", "Image URI", 200],
                            ["artDescription", "Art Description", 200],
                            ["graphicDraft", "Graphic Draft"],
                            ["graphicFeedback", "Graphic Feedback", 200],
                            ["graphicDone", "Graphic Done"],
                            ["startingResources", "Starting Resources"],
                            ["startingGold", "Starting Gold"],
                            ["startingProductionTokens", "Starting Production Tokens", 100],
                            ["effect1", "Effect 1", 200],
                            ["effect2", "Effect 2", 200],
                            ["effect3", "Effect 3", 200],
                            ["slotCount", "Slot Count"],
                            ["consumption", "Consumption", 100],
                            ["production", "Production", 100],
                        ]}
                        rows={clanChiefsData}
                        adapters={{ imageUri: (imageUri) => <img src={String(imageUri)} className="w-full" /> }}
                    />
                </div>
                <Toggle buttonContent="Clan Chiefs Data" initialCollapsed>
                    <DataPreview data={clanChiefsData} />
                </Toggle>
            </Toggle>
            <Toggle buttonContent="Buildings" className="mb-5">
                <div className="overflow-x-auto w-full mb-2">
                    <Table
                        header={[
                            ["name", "Name"],
                            ["cost", "Cost", 100],
                            ["costInGoldMin", "Cost In Gold Min"],
                            ["costInGoldMax", "Cost In Gold Max"],
                            ["production", "Production"],
                            ["productionValueMin", "Production Value Min"],
                            ["productionValueMax", "Production Value Max"],
                            ["consumption", "Consumption"],
                            ["consumtionValueMin", "Consumtion Value Min"],
                            ["consumtionValueMax", "Consumtion Value Max"],
                            ["incomeMin", "Income Min"],
                            ["incomeMax", "Income Max"],
                            ["slotCount", "Slot Count"],
                            ["golemSlotCount", "Golem Slot Count"],
                            ["slotBuilt", "Slot Built"],
                            ["townBoardOrder", "Town Board Order"],
                            ["numberOfMachineryToAutomate", "Number Of Machinery To Automate"],
                            ["description", "Description", 200],
                            ["story", "Story", 200],
                        ]}
                        rows={buildingsData}
                    />
                </div>
                <Toggle buttonContent="Buildings Data" initialCollapsed>
                    <DataPreview data={buildingsData} />
                </Toggle>
            </Toggle>
            <Toggle buttonContent="Events" className="mb-5">
                <div className="overflow-x-auto w-full mb-2">
                    <Table
                        header={[
                            ["name", "Name"],
                            ["tier", "Tier"],
                            ["imageUri", "Image URL", 200],
                            ["artDescription", "Artwork Description", 200],
                            ["artDescription2", "Artwork Description 2", 200],
                            ["graphicDraft", "Graphic Draft"],
                            ["graphicFeedback", "Graphic Feedback", 200],
                            ["graphicDone", "Graphic Done"],
                            ["type", "Type"],
                            ["group", "Group"],
                            ["subGroup", "Subgroup"],
                            ["players", "Players"],
                            ["count", "Count"],
                            ["description", "Description", 200],
                            ["drawExtra", "Draw Extra"],
                            ["story", "Story", 200],
                            ["cost", "Cost"],
                            ["value", "Value"],
                            ["minResourceCost", "Min. Resource Cost"],
                            ["maxResourceCost", "Max. Resource Cost"],
                            ["roi", "Return on Investment (ROI)"],
                        ]}
                        rows={eventsData}
                        adapters={{ imageUri: (imageUri) => <img src={String(imageUri)} className="w-full" /> }}
                    />
                </div>
                <Toggle buttonContent="Events Data" initialCollapsed>
                    <DataPreview data={eventsData} />
                </Toggle>
            </Toggle>
            <Credits />
        </div>
    );
}
