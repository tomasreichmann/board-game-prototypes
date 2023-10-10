import React from "react";

import { Navigation } from "../Navigation";
import PaperMini from "../gameComponents/PaperMini";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";
import NPCs from "../NPCs";

export default function PlaygroundRoute() {
    return (
        <>
            <Navigation />
            <div className="mt-4 print:m-0 w-full text-kac-iron p-4 bg-white">
                <NPCs className="mb-10" />
                <PrintPage>
                    <div className="flex flex-wrap content-center items-top">
                        <PaperMini
                            imageUri="/misc/winlynn.jpg"
                            baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                            baseContent="Winlynn"
                            imageStyle={{ backgroundPosition: "9% bottom", backgroundSize: "260%" }}
                            backImageStyle={{
                                backgroundPosition: "91% bottom",
                                backgroundSize: "260%",
                                transform: "rotateX(180deg)",
                            }}
                            backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                            backBaseContent="Winlynn"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/racius.jpg"
                            baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                            baseContent="Racius"
                            imageStyle={{ backgroundPosition: "15% bottom", backgroundSize: "220%" }}
                            backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}
                            backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                            backBaseContent="Racius"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/lores.png"
                            baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                            baseContent="Lores"
                            imageStyle={{
                                backgroundPosition: "43% 90%",
                                backgroundSize: "145%",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                            backBaseContent="Lores"
                            baseWidth="0.5in"
                            height="1.5in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/narfras.jpg"
                            baseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                            baseContent="Narfras"
                            imageStyle={{
                                backgroundPosition: "60% bottom",
                                backgroundSize: "cover",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-kac-monster-dark text-white text-center"
                            backBaseContent="Narfras"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/elaina.png"
                            baseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                            baseContent="Elaina"
                            imageStyle={{
                                backgroundPosition: "90% 60%",
                                backgroundSize: "130%",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-kac-cloth-dark text-white text-center"
                            backBaseContent="Elaina"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/broom.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Koště"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Koště"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/vampires.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Vampirát"
                            imageStyle={{
                                backgroundPosition: "left 80%",
                                backgroundSize: "1.6in",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Vampirát"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/gadabout.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Gadabout"
                            imageStyle={{
                                backgroundPosition: "center bottom",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Gadabout"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />

                        <PaperMini
                            imageUri="/misc/githyanki.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Gith Mystik"
                            imageStyle={{
                                backgroundPosition: "left bottom",
                                backgroundSize: "cover",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Gith Mystic"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/githyanki.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Gith Xenomancer"
                            imageStyle={{
                                backgroundPosition: "center bottom",
                                backgroundSize: "cover",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Gith Xenomancer"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/githyanki.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Gith Bukanýr"
                            imageStyle={{
                                backgroundPosition: "right center",
                                backgroundSize: "cover",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Gith Bukanýr"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/goon-balloon.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Goon Balón"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Goon Balón"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/hadozee.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Hadozee"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Hadozee"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/hadozee-shipmate.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Hadozee Námořník"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Hadozee Námořník"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                    </div>
                </PrintPage>
                <PrintPage>
                    <div className="flex flex-wrap content-center items-top">
                        <PaperMini
                            imageUri="/misc/hadozee-warrior.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Hadozee Bojovník"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Hadozee Bojovník"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/plasmoid.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Plasmoid"
                            imageStyle={{
                                backgroundPosition: "center bottom",
                                backgroundSize: "cover",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Plasmoid"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/plasmoid.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Plasmoid"
                            imageStyle={{
                                backgroundPosition: "center bottom",
                                backgroundSize: "cover",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Plasmoid"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/plasmoid-boss.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Plasmoid Boss"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Plasmoid Boss"
                            baseWidth="0.5in"
                            height="2in"
                            width="2in"
                        />
                        <PaperMini
                            imageUri="/misc/plasmoid-warrior.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Plasmoid Bojovník"
                            imageStyle={{
                                backgroundPosition: "90% center",
                                backgroundSize: "cover",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Plasmoid Bojovník"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/psurlon.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Psurlon"
                            imageStyle={{
                                backgroundPosition: "center 80%",
                                backgroundSize: "1.3in",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Psurlon"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/reigar.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Reigar"
                            imageStyle={{
                                backgroundPosition: "90% center",
                                backgroundSize: "cover",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Reigar"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/star-lancer.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Hvězdný Rytíř"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Hvězdný Rytíř"
                            baseWidth="0.5in"
                            height="2in"
                            width="2in"
                        />
                        <PaperMini
                            imageUri="/misc/starlight-apparition.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center leading-none"
                            baseContent="Hvězdné Zjevení"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center leading-none"
                            backBaseContent="Hvězdné Zjevení"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/thri-kreen-gladiator.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Thri-Kreen Gladiátor"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "1.6in",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Thri-Kreen Gladiátor"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/thri-kreen-hunter.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center leading-none"
                            baseContent="Thri-Kreen Lovec"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center leading-none"
                            backBaseContent="Thri-Kreen Lovec"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/thri-kreen-mystic.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Thri-Kreen Mystik"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "1.7in",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Thri-Kreen Mystik"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                    </div>
                </PrintPage>
                <PrintPage>
                    <div className="flex flex-wrap content-center items-top">
                        <PaperMini
                            imageUri="/misc/astral-elf.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Astrální Elf"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Astrální Elf"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/astral-elf.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Astrální Elf"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Astrální Elf"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/astral-elf.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Astrální Elf"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Astrální Elf"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/astral-elf-commander.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Astrální Elf Velitel"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "1.5in",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Astrální Elf Velitel"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/astral-elf-guard.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Astrální Elf Stráž"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Astrální Elf Stráž"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/astral-elf-priest.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Astrální Elf&ensp;Kněz"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Astrální Elf&ensp;Kněz "
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/astral-elf-warrior.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            baseContent="Astrální Elf Bojovník"
                            imageStyle={{
                                backgroundPosition: "center center",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm leading-none"
                            backBaseContent="Astrální Elf Bojovník"
                            baseWidth="0.5in"
                            height="2in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/giff.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Giff"
                            imageStyle={{
                                backgroundPosition: "center bottom",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Giff"
                            baseWidth="0.5in"
                            height="1.5in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/giff-trooper.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Giff Voják"
                            imageStyle={{
                                backgroundPosition: "center bottom",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Giff Voják"
                            baseWidth="0.5in"
                            height="1.5in"
                            width="1in"
                        />
                        <PaperMini
                            imageUri="/misc/giff-warlord.png"
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
                            baseContent="Giff Velitel"
                            imageStyle={{
                                backgroundPosition: "center bottom",
                                backgroundSize: "contain",
                                backgroundColor: "#aaa",
                            }}
                            /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                            backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                            backBaseContent="Giff Velitel"
                            baseWidth="0.5in"
                            height="1.5in"
                            width="1in"
                        />
                        <div className="flex flex-wrap w-[4in]">
                            <PaperMini
                                imageUri="/misc/ballista.png"
                                baseClassName="pt-2 bg-slate-500 text-white text-center"
                                baseContent="Balista"
                                imageStyle={{
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                    backgroundColor: "#aaa",
                                }}
                                /*backImageStyle={{
                                    backgroundPosition: "85% bottom",
                                    backgroundSize: "220%",
                                    transform: "rotateX(180deg)",
                                }}*/
                                backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                                backBaseContent="Balista"
                                baseWidth="0.5in"
                                height="1in"
                                width="1in"
                            />
                            <PaperMini
                                imageUri="/misc/ballista.png"
                                baseClassName="pt-2 bg-slate-500 text-white text-center"
                                baseContent="Balista"
                                imageStyle={{
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                    backgroundColor: "#aaa",
                                }}
                                /*backImageStyle={{
                                    backgroundPosition: "85% bottom",
                                    backgroundSize: "220%",
                                    transform: "rotateX(180deg)",
                                }}*/
                                backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                                backBaseContent="Balista"
                                baseWidth="0.5in"
                                height="1in"
                                width="1in"
                            />
                            <PaperMini
                                imageUri="/misc/booster.jpg"
                                baseClassName="pt-2 bg-slate-500 text-white text-center"
                                baseContent="Protektor"
                                imageStyle={{
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                    backgroundColor: "#aaa",
                                }}
                                /*backImageStyle={{
                                    backgroundPosition: "85% bottom",
                                    backgroundSize: "220%",
                                    transform: "rotateX(180deg)",
                                }}*/
                                backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                                backBaseContent="Protektor"
                                baseWidth="0.5in"
                                height="1in"
                                width="1in"
                            />
                            <PaperMini
                                imageUri="/misc/flamethrower.jpg"
                                baseClassName="pt-2 bg-slate-500 text-white text-center text-sm"
                                baseContent="Plamenomet"
                                imageStyle={{
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                    backgroundColor: "#aaa",
                                }}
                                /*backImageStyle={{
                                    backgroundPosition: "85% bottom",
                                    backgroundSize: "220%",
                                    transform: "rotateX(180deg)",
                                }}*/
                                backBaseClassName="pt-2 bg-slate-500 text-white text-center text-sm"
                                backBaseContent="Plamenomet"
                                baseWidth="0.5in"
                                height="1in"
                                width="1in"
                            />
                            <PaperMini
                                imageUri="/misc/autognome.png"
                                baseClassName="pt-2 bg-slate-500 text-white text-center"
                                baseContent="Autognóm"
                                imageStyle={{
                                    backgroundPosition: "center center",
                                    backgroundSize: "contain",
                                    backgroundColor: "#aaa",
                                }}
                                /*backImageStyle={{
                                    backgroundPosition: "85% bottom",
                                    backgroundSize: "220%",
                                    transform: "rotateX(180deg)",
                                }}*/
                                backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                                backBaseContent="Autognóm"
                                baseWidth="0.5in"
                                height="1in"
                                width="1in"
                            />
                            <PaperMini
                                imageUri="/misc/autognome.png"
                                baseClassName="pt-2 bg-slate-500 text-white text-center"
                                baseContent="Autognóm"
                                imageStyle={{
                                    backgroundPosition: "center center",
                                    backgroundSize: "contain",
                                    backgroundColor: "#aaa",
                                }}
                                /*backImageStyle={{
                                    backgroundPosition: "85% bottom",
                                    backgroundSize: "220%",
                                    transform: "rotateX(180deg)",
                                }}*/
                                backBaseClassName="pt-2 bg-slate-500 text-white text-center"
                                backBaseContent="Autognóm"
                                baseWidth="0.5in"
                                height="1in"
                                width="1in"
                            />
                            <PaperMini
                                imageUri="/misc/clockwork-horror.png"
                                baseClassName="pt-2 bg-slate-500 text-white text-center leading-none"
                                baseContent="Clockwork Horor"
                                imageStyle={{
                                    backgroundPosition: "center center",
                                    backgroundSize: "1.3in",
                                    backgroundColor: "#aaa",
                                }}
                                /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                                backBaseClassName="pt-2 bg-slate-500 text-white text-center leading-none"
                                backBaseContent="Clockwork Horor"
                                baseWidth="0.5in"
                                height="1in"
                                width="1in"
                            />
                            <PaperMini
                                imageUri="/misc/clockwork-horror.png"
                                baseClassName="pt-2 bg-slate-500 text-white text-center leading-none"
                                baseContent="Clockwork Horor"
                                imageStyle={{
                                    backgroundPosition: "center center",
                                    backgroundSize: "1.3in",
                                    backgroundColor: "#aaa",
                                }}
                                /*backImageStyle={{
                                backgroundPosition: "85% bottom",
                                backgroundSize: "220%",
                                transform: "rotateX(180deg)",
                            }}*/
                                backBaseClassName="pt-2 bg-slate-500 text-white text-center leading-none"
                                backBaseContent="Clockwork Horor"
                                baseWidth="0.5in"
                                height="1in"
                                width="1in"
                            />
                        </div>
                    </div>
                </PrintPage>
            </div>
        </>
    );
}
