import { range } from "lodash";
import React from "react";
import PrintMarkerCorners from "../../../../components/print/PrintMarker/PrintMarkerCorners";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import PaperMini from "../gameComponents/PaperMini";

export default function PaperMiniPages() {
    return (
        <>
            <PrintPage>
                <div className="flex flex-wrap content-center items-top">
                    <PaperMini
                        imageUri="/LP/ScrattCZ_sci-fi_engineer_in_engineers_uniform_with_a_beard_and__d280e504-42d6-4a48-8fd0-6d5919feea53.png"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Viktor"
                        imageStyle={{ backgroundPosition: "center top" }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Viktor"
                        baseWidth="0.5in"
                        height="0.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_several_screaming_slender_6_feet_tall_feminine-looking_70707d8f-a4ff-474f-974a-608f4d82b3c9.png"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        baseContent="Spórové sirény"
                        imageStyle={{ backgroundPosition: "center top" }}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        backBaseContent="Spórové sirény"
                        baseWidth="0.5in"
                        height="2in"
                        width="2in"
                    />
                    <PaperMini
                        imageUri="/LP/several_small_bulky_sci-fi_firefighting_drones_spraying_water_on_a_burning_cyberpunk_street_stall.jpg"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Hasicí drony"
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Hasicí drony"
                        baseWidth="0.5in"
                        height="1in"
                        width="2in"
                    />
                    <PaperMini
                        imageUri="/LP/alien-swarm.jpg"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        baseContent="Spórový roj"
                        imageStyle={{ backgroundPosition: "center top" }}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        backBaseContent="Spórový roj"
                        baseWidth="0.5in"
                        height="1in"
                        width="2in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_futuristic_killer_military_robot_with_leaves_flowers_a_eb1a5d76-ca30-4811-a6d8-6fa94a15d1af.png"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        baseContent="Robo-žoldák"
                        imageStyle={{ backgroundPosition: "center 60%", filter: "brightness(1.5)" }}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        backBaseContent="Robo-žoldák"
                        baseWidth="0.5in"
                        height="1.6in"
                        width="1.5in"
                    />
                </div>
            </PrintPage>
        </>
    );
}
