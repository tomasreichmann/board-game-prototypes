import React from "react";
import ColorList from "../../../../components/ColorList";
import Toggle from "../../../../components/Toggle";
import { justDwarvesName } from "../../JustDwarvesPrototype";
import Changelog from "../content/Changelog";
import Playtesters from "../content/Playtesters";
import Credits from "../content/Credits";
import IconList from "../misc/IconList";

export default function InfoRoute() {
    return (
        <>
            <div className="print:m-0 w-full text-jd-iron md:pl-10 bg-jd-emerald flex flex-col md:flex-row gap-2 md:gap-8 items-center justify-between">
                <div className="flex-1 pt-2 px-2 md:px-0 md:py-5">
                    <h2 className="text-xl lg:text-2xl text-jd-gold-light md:max-w-sm">
                        Hear ye, my fellow brethren!
                        <br />
                        <span className="font-jd-heading uppercase whitespace-nowrap">{justDwarvesName}</span> is a
                        board-game about our kind! It's a hill-arious and strategic challenge for 2-4 big dwarves, where
                        you can trade stuff, buy stuff, sell stuff, but most importantly drink to your heart's desire
                        and mine for precious gems of course. You must be wary of other players trying to outdwarf you!
                        Maybe drink while playing or not if yer a wee elf. This challenge is only for big HAIRY dwarfs
                        who can handle a bit of friendly double-crossing no-good trickery! Laugh your beard off and show
                        the true size of your jewels! Just Dwarves is a fun and memorable experience created by Ján
                        Zámborský, Hiro Kozaka, and Tomáš Reichmann in Prague. Get rich or get drunk trying!
                    </h2>
                </div>
                <img
                    src="/JD/just_dwarves_2022.jpg"
                    alt="Just Dwarves overview"
                    className="w-full md:w-2/3 max-w-[800px] h-full object-cover"
                />
            </div>
            <div className="mt-4 print:m-0 w-full text-jd-iron md:py-5 px-2 md:px-10 container">
                <p className="mb-10 text-xl">
                    This game is in development. You can sign up for a newsletter to get info once it becomes available
                    to purchase. In the meantime, you can download the print-to-play version. (TODO)
                </p>
                <Toggle buttonContent="Colors">
                    <ColorList filter={/^jd-/} />
                </Toggle>
                <Toggle buttonContent="Icons">
                    <IconList />
                </Toggle>
                <Changelog className="mt-5" />
                <Playtesters className="mt-5" />
                <Credits className="mt-5" />
            </div>
        </>
    );
}
