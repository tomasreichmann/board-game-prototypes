import React, { useEffect, useState } from "react";

export type AnimateTextProps = {
    mode?: "word" | "character";
    delayMs?: number;
    children: string;
};

export default function AnimateText({ mode = "word", delayMs = 200, children }: AnimateTextProps) {
    const [progress, setProgress] = useState(0);
    const isWordMode = mode === "word";
    useEffect(() => {
        setProgress(0);
        let interval: number;
        const maxProgress = isWordMode ? children.split(" ").length : children.length;
        if (children.length > 0) {
            interval = setInterval(() => {
                setProgress((progress) => {
                    if (progress + 1 >= maxProgress) {
                        clearInterval(interval);
                    }
                    return progress + 1;
                });
            }, delayMs);
        }
        return () => clearInterval(interval);
    }, [mode, delayMs, children]);
    const separator = isWordMode ? " " : "";
    const fragments = isWordMode ? children.split(" ") : children.split("");
    const shownPart = fragments.slice(0, progress).join(separator);
    const hiddenPart = fragments.slice(progress).join(separator);
    return (
        <>
            <span>{shownPart}</span>
            {separator}
            <span className="opacity-0">{hiddenPart}</span>
        </>
    );
}
