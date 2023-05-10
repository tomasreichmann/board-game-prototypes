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
                        imageUri="/LP/ScrattCZ_several_screaming_slender_6_feet_tall_feminine-looking_70707d8f-a4ff-474f-974a-608f4d82b3c9.png"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        baseContent="Spórové sirény"
                        imageStyle={{ backgroundPosition: "center bottom" }}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        backBaseContent="Spórové sirény"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_futuristic_killer_military_robot_with_leaves_flowers_a_eb1a5d76-ca30-4811-a6d8-6fa94a15d1af.png"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        baseContent="Robo-žoldák"
                        imageStyle={{ backgroundPosition: "center 60%", filter: "brightness(1.5)" }}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        backBaseContent="Robo-žoldák"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_huge_flying_alien_with_electric_tentacles_and_weeds_gr_3507de64-ba9e-4db4-a383-a7d4e892dd34.png"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Nákladní-brouk"
                        imageStyle={{ backgroundPosition: "70% 60%", filter: "brightness(1.5)" }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Nákladní-brouk"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="2in"
                    />
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
                        imageUri="/LP/ScrattCZ_sleek_futuristic_sci-fi_cyberpunk_hovering_personal_sp_85268259-c973-4bc2-b4a6-3eb736ad93f6.png"
                        baseClassName="pt-2 bg-kac-steel-dark text-white text-center"
                        baseContent="Vznášedlo"
                        imageStyle={{ backgroundPosition: "center 65%" }}
                        backBaseClassName="pt-2 bg-kac-steel-dark text-white text-center"
                        backBaseContent="Vznášedlo"
                        baseWidth="0.5in"
                        height="0.5in"
                        width="1.5in"
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
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_sleek_futuristic_sci-fi_cyberpunk_hovering_personal_sp_8ca199bb-eb2f-4693-ada7-1602b069c5b6.png"
                        baseClassName="pt-2 bg-kac-steel-dark text-white text-center"
                        baseContent="Stíhačka"
                        imageStyle={{ backgroundPosition: "center center" }}
                        backBaseClassName="pt-2 bg-kac-steel-dark text-white text-center"
                        backBaseContent="Stíhačka"
                        baseWidth="0.5in"
                        height="1in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_black_cyberpunk_cargo_van_shuttle_c8c4edc7-994d-4198-81d1-c9a35b12acc3.png"
                        baseClassName="pt-2 bg-kac-steel-dark text-white text-center"
                        baseContent="Nákladní vznášedlo"
                        imageStyle={{ backgroundPosition: "center center", backgroundSize: "110% auto" }}
                        backBaseClassName="pt-2 bg-kac-steel-dark text-white text-center"
                        backBaseContent="Nákladní vznášedlo"
                        baseWidth="0.5in"
                        height="1in"
                        width="2in"
                    />
                    <PaperMini
                        className="-mt-[2in]"
                        imageUri="/LP/ScrattCZ_full-body_44c3eab3-1d18-456c-b787-347f44d15553.png"
                        baseClassName="pt-2 bg-kac-blood text-white text-center"
                        baseContent="Viktor"
                        imageStyle={{ backgroundPosition: "30% center" }}
                        backBaseClassName="pt-2 bg-kac-blood text-white text-center"
                        backBaseContent="Viktor"
                        baseWidth="0.5in"
                        height="2in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_full-body_sci-fi_robot_security_guard_with_metal_feet__eaa4adba-0aec-4aa3-9fc7-01a59d0129ab.png"
                        className="-mt-[2in]"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Robo-bezpečák"
                        imageStyle={{ backgroundPosition: "center bottom" }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Robo-bezpečák"
                        baseWidth="0.5in"
                        height="2in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/several_small_bulky_sci-fi_firefighting_drones_spraying_water_on_a_burning_cyberpunk_street_stall.jpg"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Hasicí drony"
                        imageStyle={{ backgroundPosition: "right top", backgroundSize: "125% auto" }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Hasicí drony"
                        baseWidth="0.5in"
                        height="1in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_full-body_sci-fi_security_guards_armed_standing_on_met_3ad7f186-b088-4c65-bc94-248b3b0a4df0.png"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Bezpečáci"
                        imageStyle={{}}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Bezpečáci"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_full-body_sci-fi_security_guards_armed_standing_on_met_3ad7f186-b088-4c65-bc94-248b3b0a4df0.png"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Bezpečáci"
                        imageStyle={{}}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Bezpečáci"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_full-body_sci-fi_security_guards_armed_standing_on_met_3ad7f186-b088-4c65-bc94-248b3b0a4df0.png"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Bezpečáci"
                        imageStyle={{}}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Bezpečáci"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/BlipBlop_Dark_fantasy_zombie_spores_animated_body_left_for_dead_e0a2eb85-983f-4aea-ac67-02c4e62e618d.png"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center text-xs"
                        baseContent="Spórový dron"
                        imageStyle={{}}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center text-xs"
                        backBaseContent="Spórový dron"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/BlipBlop_Dark_fantasy_zombie_spores_animated_body_left_for_dead_e0a2eb85-983f-4aea-ac67-02c4e62e618d.png"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center text-xs"
                        baseContent="Spórový dron"
                        imageStyle={{}}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center text-xs"
                        backBaseContent="Spórový dron"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/BlipBlop_Dark_fantasy_zombie_spores_animated_body_left_for_dead_e0a2eb85-983f-4aea-ac67-02c4e62e618d.png"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center text-xs"
                        baseContent="Spórový dron"
                        imageStyle={{}}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center text-xs"
                        backBaseContent="Spórový dron"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                </div>
            </PrintPage>
            <PrintPage>
                <div className="flex flex-wrap content-center items-top">
                    <PaperMini
                        imageUri="/LP/insectoid.jpg"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Insectoid"
                        imageStyle={{ backgroundPosition: "left 50%", backgroundSize: "185%" }}
                        backImageStyle={{
                            backgroundPosition: "right 50%",
                            backgroundSize: "188%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Insectoid"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/insectoid.jpg"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Insectoid"
                        imageStyle={{ backgroundPosition: "left 50%", backgroundSize: "185%" }}
                        backImageStyle={{
                            backgroundPosition: "right 50%",
                            backgroundSize: "188%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Insectoid"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/ScrattCZ_several_sci-fi_insectoid_aliens_367f922c-6a98-45ef-acf0-c311f562483e.png"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Insectoid"
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Insectoid"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/rat_man.jpg"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Rodentoid"
                        imageStyle={{ backgroundPosition: "0% 50%", backgroundSize: "185%" }}
                        backImageStyle={{
                            backgroundPosition: "right 50%",
                            backgroundSize: "188%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Rodentoid"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/rat_man.jpg"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Rodentoid"
                        imageStyle={{ backgroundPosition: "0% 50%", backgroundSize: "185%" }}
                        backImageStyle={{
                            backgroundPosition: "right 50%",
                            backgroundSize: "188%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Rodentoid"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/pilot.jpg"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Pilot"
                        imageStyle={{ backgroundPosition: "center", backgroundSize: "105%" }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Pilot"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/hacker.jpg"
                        baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        baseContent="Martor"
                        imageStyle={{ backgroundPosition: "5% 75%", backgroundSize: "180%" }}
                        backImageStyle={{
                            backgroundPosition: "95% 75%",
                            backgroundSize: "180%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                        backBaseContent="Martor"
                        baseWidth="0.5in"
                        height="1.5in"
                        width="1in"
                    />
                </div>
            </PrintPage>
            <PrintPage>
                <div className="flex flex-wrap content-center items-top">
                    <PaperMini
                        imageUri="/LP/reptilian_male.jpg"
                        baseClassName="pt-2 bg-kac-blood text-white text-center"
                        baseContent="K'Chark"
                        imageStyle={{ backgroundPosition: "left bottom", backgroundSize: "210%" }}
                        backImageStyle={{
                            backgroundPosition: "right bottom",
                            backgroundSize: "210%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-blood text-white text-center"
                        backBaseContent="K'Chark"
                        baseWidth="0.5in"
                        height="2in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/security-guard.jpg"
                        baseClassName="pt-2 bg-kac-blood text-white text-center"
                        baseContent="Xander"
                        imageStyle={{ backgroundPosition: "8% bottom", backgroundSize: "220%" }}
                        backImageStyle={{
                            backgroundPosition: "92% bottom",
                            backgroundSize: "220%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-blood text-white text-center"
                        backBaseContent="Xander"
                        baseWidth="0.5in"
                        height="2in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/rat_man.jpg"
                        baseClassName="pt-2 bg-kac-blood text-white text-center"
                        baseContent="Squeko"
                        imageStyle={{ backgroundPosition: "5% bottom", backgroundSize: "210%" }}
                        backImageStyle={{
                            backgroundPosition: "95% bottom",
                            backgroundSize: "210%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-blood text-white text-center"
                        backBaseContent="Squeko"
                        baseWidth="0.5in"
                        height="2in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/reptilian_female.jpg"
                        baseClassName="pt-2 bg-kac-blood text-white text-center"
                        baseContent="Hbfuoaoqli"
                        imageStyle={{ backgroundPosition: "9% bottom", backgroundSize: "260%" }}
                        backImageStyle={{
                            backgroundPosition: "91% bottom",
                            backgroundSize: "260%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-blood text-white text-center"
                        backBaseContent="Hbfuoaoqli"
                        baseWidth="0.5in"
                        height="2in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/felian_female.jpg"
                        baseClassName="pt-2 bg-kac-blood text-white text-center"
                        baseContent="Lyra"
                        imageStyle={{ backgroundPosition: "3% bottom", backgroundSize: "210%" }}
                        backImageStyle={{
                            backgroundPosition: "97% bottom",
                            backgroundSize: "210%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-blood text-white text-center"
                        backBaseContent="Lyra"
                        baseWidth="0.5in"
                        height="2in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/insectoid_female.jpg"
                        baseClassName="pt-2 bg-kac-blood text-white text-center"
                        baseContent="Buzz"
                        imageStyle={{ backgroundPosition: "3% bottom", backgroundSize: "210%" }}
                        backImageStyle={{
                            backgroundPosition: "97% bottom",
                            backgroundSize: "210%",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-blood text-white text-center"
                        backBaseContent="Buzz"
                        baseWidth="0.5in"
                        height="2in"
                        width="1in"
                    />
                    <PaperMini
                        imageUri="/LP/green_tentacle.jpg"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        baseContent="Liána"
                        imageStyle={{ backgroundPosition: "center bottom", backgroundSize: "cover" }}
                        backImageStyle={{
                            backgroundPosition: "center bottom",
                            backgroundSize: "cover",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        backBaseContent="Liána"
                        baseWidth="0.5in"
                        height="2in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/green_tentacle.jpg"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        baseContent="Liána"
                        imageStyle={{ backgroundPosition: "center bottom", backgroundSize: "cover" }}
                        backImageStyle={{
                            backgroundPosition: "center bottom",
                            backgroundSize: "cover",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        backBaseContent="Liána"
                        baseWidth="0.5in"
                        height="2in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/green_tentacle.jpg"
                        baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        baseContent="Liána"
                        imageStyle={{ backgroundPosition: "center bottom", backgroundSize: "cover" }}
                        backImageStyle={{
                            backgroundPosition: "center bottom",
                            backgroundSize: "cover",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                        backBaseContent="Liána"
                        baseWidth="0.5in"
                        height="2in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/kids.jpg"
                        baseClassName="pt-2 bg-kac-cloth text-white text-center"
                        baseContent="Děti"
                        imageStyle={{ backgroundPosition: "center bottom", backgroundSize: "cover" }}
                        backImageStyle={{
                            backgroundPosition: "center bottom",
                            backgroundSize: "cover",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-cloth text-white text-center"
                        backBaseContent="Děti"
                        baseWidth="0.5in"
                        height="2in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/buxus_final.jpg"
                        baseClassName="pt-2 bg-kac-curse-dark text-white text-center"
                        baseContent="Buxus"
                        imageStyle={{ backgroundPosition: "center bottom", backgroundSize: "cover" }}
                        backImageStyle={{
                            backgroundPosition: "center bottom",
                            backgroundSize: "cover",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-curse-dark text-white text-center"
                        backBaseContent="Buxus"
                        baseWidth="0.5in"
                        height="2in"
                        width="1.5in"
                    />
                    <PaperMini
                        imageUri="/LP/buxus_monster.jpg"
                        baseClassName="pt-2 bg-kac-curse-dark text-white text-center"
                        baseContent="Buxus-monstrum"
                        imageStyle={{ backgroundPosition: "center bottom", backgroundSize: "cover" }}
                        backImageStyle={{
                            backgroundPosition: "center bottom",
                            backgroundSize: "cover",
                            transform: "rotateX(180deg)",
                        }}
                        backBaseClassName="pt-2 bg-kac-curse-dark text-white text-center"
                        backBaseContent="Buxus-monstrum"
                        baseWidth="0.5in"
                        height="2in"
                        width="1.5in"
                    />
                </div>
            </PrintPage>
        </>
    );
}
