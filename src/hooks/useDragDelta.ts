import { HTMLAttributes, useState } from "react";

export default function useDragDelta() {
    const [delta, setDelta] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const events: HTMLAttributes<HTMLElement> = {
        onMouseUp: () => {
            setTimeout(() => {
                setIsDragging(false);
            }, 100);
        },
        onPointerMove: (event) => {
            // check if button is pressed
            if (event.buttons === 1) {
                setIsDragging(true);
                // Button is pressed
                // Add your code here
                setDelta({ x: event.movementX, y: event.movementY });
            }
        },
    };
    return {
        events,
        delta,
        isDragging,
    };
}
