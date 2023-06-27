import React from "react";
import { twMerge } from "tailwind-merge";

interface DeckProps {
    className?: string;
    items: JSX.Element[];
}

const Deck: React.FC<DeckProps> = ({ className, items }) => {
    return (
        <div className={twMerge("Deck w-full flex flex-row justify-center", className)}>
            <div className={twMerge("relative")}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            transform: `translateZ(${index * 5}px) translateX(-50%)`,
                            transformStyle: "preserve-3d",
                        }}
                        className="absolute transform-gpu transition-all duration-300 "
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Deck;
