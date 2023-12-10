import { HTMLAttributes, useEffect, useState } from "react";

export type DragDeltaOptions = {
    isDisabled?: boolean;
    minDistance?: number;
    minDistanceX?: number;
    minDistanceY?: number;
};

const isDistanceEnough = (
    initialX?: number,
    initialY?: number,
    x?: number,
    y?: number,
    minDistanceX?: number,
    minDistanceY?: number
) => {
    if (
        initialX === undefined ||
        initialY === undefined ||
        x === undefined ||
        y === undefined ||
        minDistanceX === undefined ||
        minDistanceY === undefined
    ) {
        return false;
    }
    return Math.abs(x - initialX) >= minDistanceX || Math.abs(y - initialY) >= minDistanceY;
};

export default function useDragDelta({
    isDisabled = false,
    minDistance = 10,
    minDistanceX = minDistance,
    minDistanceY = minDistance,
}: DragDeltaOptions = {}) {
    const [{ x: initialX, y: initialY }, setInitialPosition] = useState<{
        x: number | undefined;
        y: number | undefined;
    }>({ x: undefined, y: undefined });
    const [{ x: lastX, y: lastY }, setLastPosition] = useState<{
        x: number | undefined;
        y: number | undefined;
    }>({ x: undefined, y: undefined });
    const [delta, setDelta] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const events: HTMLAttributes<HTMLElement> = isDisabled
        ? {}
        : {
              onPointerDown: (event) => {
                  setInitialPosition({
                      x: event.clientX,
                      y: event.clientY,
                  });
                  setLastPosition({
                      x: event.clientX,
                      y: event.clientY,
                  });
              },
              onPointerUp: () => {
                  setInitialPosition({ x: undefined, y: undefined });
                  setLastPosition({ x: undefined, y: undefined });
                  setTimeout(() => {
                      setIsDragging(false);
                  }, 100);
              },
              onPointerMove: (event) => {
                  // check if button is pressed and distance is enough
                  if (
                      event.buttons === 1 &&
                      isDistanceEnough(initialX, initialY, event.clientX, event.clientY, minDistanceX, minDistanceY)
                  ) {
                      event.preventDefault();
                      event.stopPropagation();
                      setLastPosition({
                          x: event.clientX,
                          y: event.clientY,
                      });
                      setIsDragging(true);
                      // Button is pressed
                      // Add your code here
                      setDelta({
                          x: event.clientX - (lastX ?? 0),
                          y: event.clientY - (lastY ?? 0),
                      });
                  }
              },
          };

    return {
        events,
        delta,
        isDragging,
    };
}
