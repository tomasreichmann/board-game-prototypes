import { useState } from "react";
import generate from "../data/LSV-npc-generator";
import generateFamily from "../generators/generateFamily";
import FamilyTree from "./gameComponents/FamilyTree";
import clsx from "clsx";
import { Button } from "react-daisyui";

export default function NPCs({ className }: { className?: string }) {
    const [counter, setCounter] = useState(0);
    const npcs = generate(0).sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
    });

    const families = Array(10)
        .fill(0)
        .map(() => generateFamily());

    return (
        <div className={clsx("mt-5 print:hidden flex flex-row gap-5 flex-wrap", className)}>
            <Button onClick={() => setCounter((c) => c + 1)} size="xs" color="secondary">
                Reroll ({counter})
            </Button>
            {families.map((family, familyIndex) => (
                <FamilyTree {...family} key={familyIndex} />
            ))}

            {/* {npcs.map((npc, npcIndex) => (
                <NPC key={npcIndex} {...npc} />
            ))} */}
        </div>
    );
}
