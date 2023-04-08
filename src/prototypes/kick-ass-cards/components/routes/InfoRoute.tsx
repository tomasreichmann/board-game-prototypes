import React from "react";
import Playtesters from "../Playtesters";
import Credits from "../Credits";
import Changelog from "../../../dungeon-time/components/Changelog";

export default function InfoRoute() {
    return (
        <>
            <div className="mt-4 print:m-0 w-full text-kac-iron p-4 bg-white container">
                <article className="prose text-kac-iron max-w-none prose-headings:font-kacHeading prose-headings:text-kac-blood prose-a:text-kac-monster prose-strong:text-kac-iron-dark prose-blockquote:text-kac-iron-dark prose-em:text-kac-cloth prose-ul:[--tw-prose-bullets:rgb(123,0,29)]">
                    <p>
                        Kick Ass Cards is a tabletop game system to run narrative games. It is setting independent
                        focused on roleplay and building drama.
                    </p>
                </article>
                <Changelog />
                <Playtesters />
                <Credits />
            </div>
        </>
    );
}
