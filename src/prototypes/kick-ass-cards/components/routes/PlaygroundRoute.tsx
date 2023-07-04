import React from "react";

import { Navigation } from "../Navigation";
import PaperMini from "../gameComponents/PaperMini";
import PrintPage from "../../../../components/print/PrintPage/PrintPage";

export default function PlaygroundRoute() {
    return (
        <>
            <Navigation />
            <div className="mt-4 print:m-0 w-full text-kac-iron p-4 bg-white container">
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
                            baseClassName="pt-2 bg-slate-500 text-white text-center"
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
                    </div>
                </PrintPage>
            </div>
        </>
    );
}
