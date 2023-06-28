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
                    </div>
                </PrintPage>
            </div>
        </>
    );
}
