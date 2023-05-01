import React from "react";
import ColorList from "../../../../components/ColorList";
import Toggle from "../../../../components/Toggle";
import { justDwarvesName } from "../../JustDwarvesPrototype";
import Changelog from "../content/Changelog";

export default function InfoRoute() {
    return (
        <>
            <div className="mt-4 print:m-0 w-full text-jd-iron md:pl-10 bg-jd-emerald flex flex-col md:flex-row gap-4 items-center">
                <h2 className="text-3xl font-bold text-jd-gold-light py-5 px-5 md:px-0">
                    <span className="font-jd-heading uppercase">{justDwarvesName}</span> is a board game about dwarves.
                    (TODO)
                </h2>
                <img src="/JD/just_dwarves_2022.jpg" alt="Just Dwarves overview" className="w-full md:w-2/3" />
            </div>
            <div className="mt-4 print:m-0 w-full text-jd-iron md:py-5 px-2 md:px-10 container">
                <p className="mb-10 text-xl">
                    This game is in development. You can sign up for a newsletter to get info once it becomes available
                    to purchase. In the meantime, you can download the print-to-play version. (TODO)
                </p>
                <Toggle buttonContent="Colors">
                    <ColorList filter={/^jd-/} />
                </Toggle>
                <Changelog />
            </div>
        </>
    );
}
