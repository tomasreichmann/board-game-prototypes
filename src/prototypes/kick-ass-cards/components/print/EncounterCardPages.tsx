import React from "react";

const encounterMap = (import.meta as any).glob("../../data/encounters/kjb/*.md", { eager: true }) as Record<
    string,
    { default: React.ComponentType<{}> }
>;
const encounterModules = Object.values(encounterMap);
export default function EncounterCardPages() {
    return (
        <>
            {encounterModules.map((encounterModule, pageIndex) => (
                <article key={"page-" + pageIndex} className="w-full text-kac-iron p-4 bg-white container mx-auto">
                    <div className="prose text-kac-iron max-w-none prose-headings:font-kacHeading prose-headings:text-kac-blood prose-a:text-kac-monster prose-strong:text-kac-iron-dark prose-blockquote:text-kac-iron-dark prose-em:text-kac-cloth prose-ul:[--tw-prose-bullets:rgb(123,0,29)]">
                        <encounterModule.default />
                    </div>
                </article>
            ))}
        </>
    );
}
