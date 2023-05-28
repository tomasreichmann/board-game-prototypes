import React from "react";
import Credits from "../content/Credits";
import Glossary from "../content/Glossary";
import DrinkingRules from "../content/DrinkingRules";

export default function RulesRoute() {
    return (
        <>
            <div className="mt-4 print:m-0 w-full text-jd-iron md:py-5 px-2 md:px-10 container">
                <Glossary />
                <DrinkingRules className="mt-10" />
                <Credits className="mt-10" />
            </div>
        </>
    );
}
