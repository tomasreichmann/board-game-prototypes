import { useState } from "react";
import ToggleCheckbox from "../../controls/ToggleCheckbox";
import { OutcomeCardFlippable } from "../../gameComponents/OutcomeCard";
import outcomes from "../../../data/outcomeDeck";
import { outcomeCardSize } from "../model/createInitialBoard";

export default function FlippableTest() {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div className="w-full [perspective:500px]">
            <ToggleCheckbox checked={isFlipped} onChange={(e) => setIsFlipped(e.target.checked)} />
            <div className="flex flex-row">
                <OutcomeCardFlippable {...outcomes[1]} style={outcomeCardSize} isFaceDown={isFlipped} />
                <OutcomeCardFlippable {...outcomes[5]} style={outcomeCardSize} isFaceDown={!isFlipped} />
            </div>
        </div>
    );
}
