import React, { useState } from "react";

/**
 * Generates a random number between 1 and 6 and sets it as the state of the component.
 *
 * @return {JSX.Element} A JSX element containing a button to roll the dice and display the result.
 */
function RollButton({ className }: { className?: string }): JSX.Element {
    const [number, setNumber] = useState<number | null>(null);

    function roll(): void {
        const newNumber = Math.floor(Math.random() * 6) + 1;
        setNumber(newNumber);
    }

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={roll}>
                Roll
            </button>
            {number !== null && <p className="text-2xl font-bold">{number}</p>}
        </div>
    );
}

export default RollButton;
